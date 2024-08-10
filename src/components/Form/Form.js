// DynamicForm.js
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

const DynamicForm = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  // Generate form fields dynamically, excluding the 'id' field
  const fields = useMemo(
    () => Object.keys(data).filter(key => key !== 'id'),
    [data]
  );

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 className="text-xl font-bold mb-4">
          {data.id ? 'Editar' : 'Añadir'} Registro
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            {fields.map(field => (
              <div key={field} className="mb-2">
                <label className="block text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={field.includes('Date') ? 'date' : 'text'}
                  {...register(field)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;