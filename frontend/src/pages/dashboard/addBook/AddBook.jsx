import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFile
    }

    // const formData = new FormData();
    // formData.append('title', data.title);
    // formData.append('description', data.description);
    // formData.append('category', data.category);
    // formData.append('trending', data.trending);
    // formData.append('oldPrice', parseFloat(data.oldPrice) || 0);
    // formData.append('newPrice', parseFloat(data.newPrice) || 0);
    // formData.append('coverImage', imageFile); // Append the actual file

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: 'Book Added',
        text: 'Your book was uploaded successfully!',
        icon: 'success',
        confirmButtonColor: '#14b8a6',
        showCancelButton: false,
      });
      reset();
      setImageFile(null);
      setImageFileName('');
      setImagePreview(null);
    } catch (err) {
      console.error('Error adding book:', err);
      Swal.fire({
        title: 'Error',
        text: err?.data?.message || 'Failed to add book. Please try again.',
        icon: 'error',
        confirmButtonColor: '#14b8a6',
      });
    }
  };

  const fileToBase64 = (imageFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImageFile(base64);
      console.log(base64);
      setImageFileName(file.name);
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
          />

          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
          />

          <SelectField
            label="Category"
            name="category"
            options={[
              { value: '', label: 'Choose A Category' },
              { value: 'business', label: 'Business' },
              { value: 'technology', label: 'Technology' },
              { value: 'fiction', label: 'Fiction' },
              { value: 'horror', label: 'Horror' },
              { value: 'adventure', label: 'Adventure' },
            ]}
            register={register}
          />

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('trending')}
                className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500 font-primary"
                aria-label="Trending book"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 font-primary">
                Trending
              </span>
            </label>
          </div>

          <InputField
            label="Old Price"
            name="oldPrice"
            type="number"
            placeholder="Enter old price"
            register={register}
          />

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="Enter new price"
            register={register}
          />

          {/* cover image uploaded */}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
            {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
          </div>

          <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
            {
              isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;