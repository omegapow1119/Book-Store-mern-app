import os
import pandas as pd
from typing import Optional
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from bson import ObjectId
from dotenv import load_dotenv

# Load env variables from backend
backend_env_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(backend_env_path)

db_url = os.getenv("DB_URL")
if not db_url:
    # default fallback from index.js comment just in case
    db_url = "mongodb+srv://omegapow1119:JQjls6Hp1ckdpd5H@cluster0.e5uv2pj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(db_url)
# The database name wasn't explicitly mentioned, but usually Mongoose connects to the default DB in URL.
# Let's get the default database. pymongo uses get_default_database() if provided in connection URI. 
# Alternatively, extract DB name. The URL might not have a DB name, default is 'test' or whatever in mongoose.
try:
    db = client.get_default_database()
except Exception:
    db = client.test # Default to 'test' DB which mongoose uses

app = FastAPI()

def serialize_book(book):
    book['_id'] = str(book['_id'])
    return book

@app.get("/recommend")
def get_recommendations(email: Optional[str] = None):
    try:
        # Fetch all books
        books_cursor = db.books.find()
        books_list = list(books_cursor)
        
        if not books_list:
            return []
            
        books_df = pd.DataFrame(books_list)
        books_df['_id'] = books_df['_id'].astype(str)
        
        # Prepare text matching field
        # Combine title, category, and description
        books_df['content'] = books_df['title'].fillna('') + ' ' + books_df['category'].fillna('') + ' ' + books_df['description'].fillna('')
        
        purchased_book_ids = []
        
        if email:
            # Fetch user orders
            orders_cursor = db.orders.find({"email": email})
            orders = list(orders_cursor)
            for order in orders:
                if 'productIds' in order:
                    purchased_book_ids.extend([str(pid) for pid in order['productIds']])
        
        # If no purchase history, return trending books
        if not purchased_book_ids:
            # Return trending books
            trending = [serialize_book(b) for b in books_list if b.get('trending', False)]
            if len(trending) > 0:
                # Return up to 10 trending
                return trending[:10]
            else:
                # Fallback to random/first 10
                return [serialize_book(b) for b in books_list[:10]]
        
        # We have a purchase history, run content-based filtering
        # TF-IDF
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(books_df['content'])
        
        # Cosine Similarity
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        
        recommended_indices = set()
        purchased_indices = []
        
        for pid in purchased_book_ids:
            # Find the index of the purchased book in the dataframe
            idx_list = books_df.index[books_df['_id'] == pid].tolist()
            if idx_list:
                purchased_indices.append(idx_list[0])
                
        for idx in purchased_indices:
            # Get similarity scores for this book
            sim_scores = list(enumerate(cosine_sim[idx]))
            # Sort them
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            # Take top 5 similar books per purchased book
            top_similar = [i[0] for i in sim_scores[1:6] if i[0] not in purchased_indices]
            recommended_indices.update(top_similar)
            
        # Convert indices back to book objects
        recommended_books = []
        for idx in list(recommended_indices)[:10]: # Max 10 recommendations
            book_dict = books_df.iloc[idx].to_dict()
            book_dict.pop('content', None) # Remove the combined content field
            recommended_books.append(book_dict)
            
        if not recommended_books:
            # Fallback
            trending = [serialize_book(b) for b in books_list if b.get('trending', False)]
            return trending[:10]
            
        return recommended_books

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
