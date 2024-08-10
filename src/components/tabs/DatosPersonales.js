import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useFilters } from 'react-table';
import { useForm } from 'react-hook-form';

const DatosPersonales = () => {
  const [data, setData] = useState([
    {
      id: 1,
      nombre: 'Gregor Alfredo Abarca Chavez',
      dni: '73671897',
      tipoDocumento: 'DNI',
      paisEmision: 'Perú',
      fechaNacimiento: '1985-06-12',
      sexo: 'Masculino',
      grupoSanguineo: 'O+',
      estadoCivil: 'Soltero',
      celular: '987654321',
      email: 'gregor@example.com',
      hijosMenores: true,
      numeroHijos: 2,
    },
    {
      id: 2,
      nombre: 'Jesus Alexander Aburto Santiago',
      dni: '43505153',
      tipoDocumento: 'DNI',
      paisEmision: 'Perú',
      fechaNacimiento: '1990-09-15',
      sexo: 'Masculino',
      grupoSanguineo: 'A+',
      estadoCivil: 'Casado',
      celular: '987123456',
      email: 'jesus@example.com',
      hijosMenores: false,
      numeroHijos: 0,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    setIsFormOpen(true);
    setFormData({
      nombre: '',
      dni: '',
      tipoDocumento: '',
      paisEmision: '',
      fechaNacimiento: '',
      sexo: '',
      grupoSanguineo: '',
      estadoCivil: '',
      celular: '',
      email: '',
      hijosMenores: false,
      numeroHijos: 0,
    });
  };

  const handleEdit = (item) => {
    setIsFormOpen(true);
    setFormData(item);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      setData([...data, { ...form, id: data.length + 1 }]);
    }
    setIsFormOpen(false);
  };

  const columns = useMemo(
    () => [
      { Header: 'Nombre', accessor: 'nombre' },
      { Header: 'DNI', accessor: 'dni' },
      { Header: 'Tipo de Documento', accessor: 'tipoDocumento' },
      { Header: 'País Emisión', accessor: 'paisEmision' },
      { Header: 'Fecha de Nacimiento', accessor: 'fechaNacimiento' },
      { Header: 'Sexo', accessor: 'sexo' },
      { Header: 'Grupo Sanguíneo', accessor: 'grupoSanguineo' },
      { Header: 'Estado Civil', accessor: 'estadoCivil' },
      { Header: 'N° Celular', accessor: 'celular' },
      { Header: 'Correo Electrónico', accessor: 'email' },
      {
        Header: 'Hijos Menores',
        accessor: 'hijosMenores',
        Cell: ({ value }) => (value ? 'Sí' : 'No'),
      },
      { Header: 'Número de Hijos', accessor: 'numeroHijos' },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleEdit(row.original)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          onChange={(e) => setFilter('nombre', e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2 mr-2"
        />
        <input
          type="text"
          placeholder="Buscar por DNI..."
          onChange={(e) => setFilter('dni', e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2"
        />
      </div>
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Añadir
      </button>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white" style={{ minWidth: '1200px' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-2 px-4 border-b border-gray-200"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-2 px-4 border-b border-gray-200"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <Form
          data={formData}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

const Form = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  const fields = useMemo(
    () => Object.keys(data).filter((key) => key !== 'id'),
    [data]
  );

  // Reset form values when data changes
  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-2">
          {data.id ? 'Editar Datos Personales' : 'Añadir Datos Personales'}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {fields.map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-gray-700 mb-2 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {field === 'hijosMenores' ? (
                <input
                  type="checkbox"
                  {...register(field)}
                  className="border border-gray-300 rounded p-2"
                />
              ) : (
                <input
                  type={field.includes('fecha') ? 'date' : 'text'}
                  {...register(field)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default DatosPersonales;