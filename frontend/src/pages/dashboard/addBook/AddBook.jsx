import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import getBaseUrl from '../../../utils/baseURL';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [addBook, { isLoading, error }] = useAddBookMutation();

  const onSubmit = async (data) => {
    if (!imageFile) {
      setImageFileName('Please select a cover image');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('trending', data.trending);
    formData.append('oldPrice', parseFloat(data.oldPrice) || 0);
    formData.append('newPrice', parseFloat(data.newPrice) || 0);
    formData.append('coverImage', imageFile); // Append the actual file

    try {
      await addBook(formData).unwrap();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageFileName('Please select a valid image file');
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageFileName('Image size must be less than 5MB');
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setImageFile(file);
      setImageFileName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Add New Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} role="form">
          <InputField
            label="Title"
            name="title"
            placeholder="Enter book title"
            register={register}
            validation={{ required: 'Title is required' }}
            errors={errors}
          />

          <InputField
            label="Description"
            name="description"
            placeholder="Enter book description"
            type="textarea"
            register={register}
            validation={{ required: 'Description is required' }}
            errors={errors}
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
            validation={{ required: 'Category is required' }}
            errors={errors}
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
            validation={{ required: 'Old price is required', min: { value: 0, message: 'Price must be positive' } }}
            errors={errors}
          />

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="Enter new price"
            register={register}
            validation={{ required: 'New price is required', min: { value: 0, message: 'Price must be positive' } }}
            errors={errors}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 font-primary mb-2">
              Cover Image
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 transition-all"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="coverImage"
                aria-label="Upload cover image"
              />
              <label
                htmlFor="coverImage"
                className="cursor-pointer inline-block w-full py-2 px-4 bg-teal-500 text-gray-100 font-primary font-medium rounded-lg shadow-md hover:bg-teal-600 transition-all duration-200"
              >
                Choose Image
              </label>
              <p className="text-sm text-gray-600 mt-2 font-primary">
                {imageFileName ? `Selected: ${imageFileName}` : 'Drag and drop an image or click to select'}
              </p>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="max-w-full h-32 object-contain rounded-lg"
                  />
                </div>
              )}
              {errors.coverImage || imageFileName.startsWith('Please select') || imageFileName.startsWith('Image size') ? (
                <p className="text-red-500 text-xs mt-1 font-primary">
                  {imageFileName || 'Cover image is required'}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-teal-500 text-gray-100 font-primary font-medium rounded-lg shadow-md hover:bg-teal-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Add book"
          >
            {isLoading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;