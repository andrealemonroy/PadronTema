import React, { useState, useMemo } from 'react';
import { useTable, useFilters } from 'react-table';
import DynamicForm from '../Form/Form';

const initialData = [
  { id: 1, surname1: 'González', surname2: 'Pérez', name1: 'Juan', name2: '', name3: '', dniNumber: '12345678', dniType: 'DNI', birthDate: '1990-01-01', correlative: 1, fullName: 'González Pérez Juan' },
  { id: 2, surname1: 'Rodríguez', surname2: 'Sánchez', name1: 'Ana', name2: '', name3: '', dniNumber: '87654321', dniType: 'DNI', birthDate: '1992-02-02', correlative: 2, fullName: 'Rodríguez Sánchez Ana' },
];

const MasterDataBase = () => {
  const [data, setData] = useState(initialData);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDniType, setFilterDniType] = useState('');
  const [filterDni, setFilterDni] = useState('');

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Apellido Paterno', accessor: 'surname1' },
      { Header: 'Apellido Materno', accessor: 'surname2' },
      { Header: 'Primer Nombre', accessor: 'name1' },
      { Header: 'Segundo Nombre', accessor: 'name2' },
      { Header: 'Tercer Nombre', accessor: 'name3' },
      { Header: 'Número de DNI', accessor: 'dniNumber' },
      { Header: 'Tipo de DNI', accessor: 'dniType' },
      { Header: 'Fecha de Nacimiento', accessor: 'birthDate' },
      { Header: 'Correlativo', accessor: 'correlative' },
      { Header: 'Apellidos y Nombres', accessor: 'fullName' },
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

  const tableInstance = useTable({ columns, data }, useFilters);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = tableInstance;

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((record) => record.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setData(data.map((record) => (record.id === form.id ? form : record)));
    } else {
      setData([...data, { ...form, id: data.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilter('fullName', e.target.value);
  };

  const handleFilterDniTypeChange = (e) => {
    setFilterDniType(e.target.value);
    setFilter('dniType', e.target.value);
  };

  const handleFilterDniChange = (e) => {
    setFilterDni(e.target.value);
    setFilter('dniNumber', e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Máster Data Base</h1>
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => {
            setSelectedRecord({ id: '', surname1: '', surname2: '', name1: '', name2: '', name3: '', dniNumber: '', dniType: '', birthDate: '', correlative: '', fullName: '' });
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Añadir Registro
        </button>
        <input
          type="text"
          placeholder="Buscar por Nombre..."
          className="border border-gray-300 rounded p-2 w-1/3"
          value={search}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Buscar por DNI..."
          className="border border-gray-300 rounded p-2 w-1/4"
          value={filterDni}
          onChange={handleFilterDniChange}
        />
        <select className="border border-gray-300 rounded p-2 w-1/4" value={filterDniType} onChange={handleFilterDniTypeChange}>
          <option value="">Todos los Tipos de DNI</option>
          <option value="DNI">DNI</option>
          {/* Agregar más opciones si es necesario */}
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
          data={selectedRecord}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MasterDataBase;