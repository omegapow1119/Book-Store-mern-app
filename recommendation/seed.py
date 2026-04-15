import os
import requests
import random
import time
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

# Load env variables from backend
backend_env_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(backend_env_path)

db_url = os.getenv("DB_URL")
if not db_url:
    db_url = "mongodb+srv://omegapow1119:JQjls6Hp1ckdpd5H@cluster0.e5uv2pj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(db_url)
try:
    db = client.get_default_database()
except Exception:
    db = client.test

def fetch_books(category, max_results=40):
    url = f"https://www.googleapis.com/books/v1/volumes?q=subject:{category}&maxResults={max_results}"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to fetch books for category: {category}")
        return []
    
    data = response.json()
    items = data.get("items", [])
    
    books = []
    for item in items:
        info = item.get("volumeInfo", {})
        title = info.get("title", "Unknown Title")
        description = info.get("description", "No description available.")
        # Some books don't have thumbnails, skip them so UI looks good
        image_links = info.get("imageLinks", {})
        coverImage = image_links.get("thumbnail") or image_links.get("smallThumbnail")
        if not coverImage:
            continue
        
        # force https for image
        if coverImage.startswith("http://"):
            coverImage = coverImage.replace("http://", "https://")
            
        # Create fake pricing depending on category or just random between 100-800
        oldPrice = random.randint(300, 1000)
        newPrice = oldPrice - random.randint(50, 200)
        
        book_doc = {
            "title": title,
            "description": description,
            "category": category, # Map google category to our simple string
            "trending": random.choice([True, False, False]), # 33% chance to be trending
            "coverImage": coverImage,
            "oldPrice": oldPrice,
            "newPrice": newPrice,
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        }
        books.append(book_doc)
        
    return books

categories = ["law", "horror"]
all_books = []

print("Fetching books from Google API...")
for cat in categories:
    print(f"Fetching {cat}...")
    cat_books = fetch_books(cat, 40)
    all_books.extend(cat_books)
    time.sleep(2)

print(f"Total valid books fetched: {len(all_books)}")

if all_books:
    result = db.books.insert_many(all_books)
    print(f"Successfully inserted {len(result.inserted_ids)} books into MongoDB!")
else:
    print("No books to insert.")
