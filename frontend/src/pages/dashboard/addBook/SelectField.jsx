import React from 'react';

const SelectField = ({ label, name, options, register, validation, errors }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 font-primary mb-2"
      >
        {label}
      </label>
      <select
        {...register(name, validation)}
        id={name}
        name={name}
        className="h-10 border border-gray-300 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 font-primary">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectField;