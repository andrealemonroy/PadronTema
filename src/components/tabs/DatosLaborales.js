import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useFilters } from 'react-table';
import { useForm } from 'react-hook-form';

const initialWorkers = [
  { id: 1, name: 'Gregor Alfredo Abarca Chavez', dni: '73671897', startDate: '01/01/2020', endDate: '31/12/2024', contractType: 'Indefinido', organization: 'Company A', reasonForLeaving: '', salary: 3000 },
  { id: 2, name: 'Jesus Alexander Aburto Santiago', dni: '43505153', startDate: '15/05/2018', endDate: '15/05/2023', contractType: 'Temporal', organization: 'Company B', reasonForLeaving: 'Contract ended', salary: 2500 },
];

const DatosLaborales = () => {
  const [workers, setWorkers] = useState(initialWorkers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleAdd = () => {
    setIsModalOpen(true);
    setFormData({
      name: '',
      dni: '',
      startDate: '',
      endDate: '',
      contractType: '',
      organization: '',
      reasonForLeaving: '',
      salary: '',
    });
  };

  const handleEdit = (worker) => {
    setIsModalOpen(true);
    setFormData(worker);
  };

  const handleDelete = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setWorkers(workers.map(worker => (worker.id === form.id ? form : worker)));
    } else {
      setWorkers([...workers, { ...form, id: workers.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'DNI', accessor: 'dni' },
    { Header: 'Fecha de Inicio', accessor: 'startDate' },
    { Header: 'Fecha de Fin', accessor: 'endDate' },
    { Header: 'Tipo de Contrato', accessor: 'contractType' },
    { Header: 'Organización', accessor: 'organization' },
    { Header: 'Motivo de Baja', accessor: 'reasonForLeaving' },
    { Header: 'Remuneración', accessor: 'salary' },
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
  ], [workers]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data: workers }, useFilters);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Datos Laborales</h1>
      <div className="mb-4 flex justify-between">
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Añadir Trabajador
        </button>
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar por Nombre..."
            className="border border-gray-300 rounded p-2 mr-2"
            onChange={(e) => setFilter('name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por DNI..."
            className="border border-gray-300 rounded p-2 mr-2"
            onChange={(e) => setFilter('dni', e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por Tipo de Contrato..."
            className="border border-gray-300 rounded p-2 mr-2"
            onChange={(e) => setFilter('contractType', e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por Organización..."
            className="border border-gray-300 rounded p-2"
            onChange={(e) => setFilter('organization', e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
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
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
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

      {isModalOpen && (
        <Form
          data={formData}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
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
    () => Object.keys(data).filter(key => key !== 'id'),
    [data]
  );

  // Reset form values when data changes
  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{data.id ? 'Editar Trabajador' : 'Añadir Trabajador'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={field.includes('Date') ? 'date' : field === 'salary' ? 'number' : 'text'}
                  {...register(field)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
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

export default DatosLaborales;