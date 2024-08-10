import React, { useState, useMemo } from 'react';
import { useTable, useFilters } from 'react-table';
import DynamicForm from '../Form/Form';

const initialEvaluations = [
  { id: 1, dni: '12345678', surname: 'González', lastname: 'Pérez', name: 'Juan', period: '2023', date: '01/01/2024', supervisor: 'Supervisor A', status: 'Vetado', quality: 4, programs: 3, learning: 5, compliance: 4 },
  { id: 2, dni: '87654321', surname: 'Rodríguez', lastname: 'Sánchez', name: 'Ana', period: '2023', date: '01/02/2024', supervisor: 'Supervisor B', status: 'Bueno', quality: 4, programs: 5, learning: 4, compliance: 5 },
  { id: 3, dni: '11223344', surname: 'Martínez', lastname: 'López', name: 'Carlos', period: '2023', date: '01/03/2024', supervisor: 'Supervisor C', status: 'Extraordinario', quality: 5, programs: 5, learning: 5, compliance: 5 },
];

const PeriodicEvaluation = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchDni, setSearchDni] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const columns = useMemo(
    () => [
      { Header: 'DNI', accessor: 'dni' },
      { Header: 'Apellidos', accessor: 'surname' },
      { Header: 'Nombres', accessor: 'name' },
      { Header: 'Periodo', accessor: 'period' },
      { Header: 'Fecha', accessor: 'date' },
      { Header: 'Supervisor', accessor: 'supervisor' },
      { Header: 'Estado', accessor: 'status' },
      { Header: 'Calidad en desarrollos', accessor: 'quality' },
      { Header: 'Manejo de programas informáticos', accessor: 'programs' },
      { Header: 'Capacidad de aprendizaje', accessor: 'learning' },
      { Header: 'Cumplimiento de procesos', accessor: 'compliance' },
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

  const tableInstance = useTable({ columns, data: evaluations }, useFilters);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = tableInstance;

  const handleEdit = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setEvaluations(evaluations.filter((evaluation) => evaluation.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setEvaluations(evaluations.map((evaluation) => (evaluation.id === form.id ? form : evaluation)));
    } else {
      setEvaluations([...evaluations, { ...form, id: evaluations.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleSearchDniChange = (e) => {
    setSearchDni(e.target.value);
    setFilter('dni', e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setFilter('name', e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setFilter('status', e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Evaluación Periódica</h1>
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => {
            setSelectedEvaluation({ id: '', dni: '', surname: '', lastname: '', name: '', period: '', date: '', supervisor: '', status: '', quality: '', programs: '', learning: '', compliance: '' });
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Añadir Evaluación
        </button>
        <input
          type="text"
          placeholder="Buscar por DNI..."
          className="border border-gray-300 rounded p-2 w-1/4"
          value={searchDni}
          onChange={handleSearchDniChange}
        />
        <input
          type="text"
          placeholder="Buscar por Nombre..."
          className="border border-gray-300 rounded p-2 w-1/4"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <select className="border border-gray-300 rounded p-2 w-1/4" value={filterStatus} onChange={handleFilterStatusChange}>
          <option value="">Todos los Estados</option>
          <option value="Vetado">Vetado</option>
          <option value="Bueno">Bueno</option>
          <option value="Extraordinario">Extraordinario</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="py-2 px-4 border-b border-gray-200">
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
                    <td {...cell.getCellProps()} className="py-2 px-4 border-b border-gray-200">
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
        <DynamicForm
          data={selectedEvaluation}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PeriodicEvaluation;