import React, { useEffect, useState } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      trending: false,
      oldPrice: '',
      newPrice: '',
    },
  });

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title || '');
      setValue('description', bookData.description || '');
      setValue('category', bookData.category || '');
      setValue('trending', bookData.trending || false);
      setValue('oldPrice', bookData.oldPrice || '');
      setValue('newPrice', bookData.newPrice || '');
      setImagePreview(bookData.coverImage || null); // Set initial preview
      setImageFileName(bookData.coverImage ? 'Current image' : '');
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('trending', data.trending);
    formData.append('oldPrice', parseFloat(data.oldPrice) || 0);
    formData.append('newPrice', parseFloat(data.newPrice) || 0);
    if (imageFile) {
      formData.append('coverImage', imageFile);
      console.log(formData.get('coverImage'));
    }
    
     else {
      formData.append('coverImage', bookData?.coverImage || '');
    }

    try {
      await updateBook({ id, formData }).unwrap();
      Swal.fire({
        title: 'Book Updated',
        text: 'Your book is updated successfully!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, It\'s Okay!',
      });
      await refetch();
      reset();
      setImageFile(null);
      setImageFileName('');
      setImagePreview(null);
    } catch (error) {
      console.error('Failed to update book:', error);
      Swal.fire({
        title: 'Error',
        text: error?.data?.message || 'Failed to update book. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
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
    console.log(file);
    console.log(file.name);
    console.log(URL.createObjectURL(file));
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

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500 text-center">Error fetching book data. Please check the book ID or try again later.</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          validation={{ required: 'Old price is required', min: { value: 0, message: 'Price must be positive' } }}
          errors={errors}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
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
              className="cursor-pointer inline-block w-full py-2 px-4 bg-blue-500 text-gray-100 font-primary font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
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
            {imageFileName.startsWith('Please select') || imageFileName.startsWith('Image size') ? (
              <p className="text-red-500 text-xs mt-1 font-primary">{imageFileName}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;