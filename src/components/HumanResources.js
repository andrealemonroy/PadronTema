// RecursosHumanos.js
import React, { useState } from 'react';
import DynamicForm from './Form/Form';

const initialWorkers = [
  {
    id: 1,
    dni: '73671897',
    name: 'Gregor Alfredo Abarca Chavez',
    salary: 3000,
    startDate: '01/01/2020',
    contractType: 'Indefinido',
    endDate: '31/12/2024',
    projectCode: 'PRJ001',
    occupation: 'Ingeniero',
    position: 'Ingeniero de Proyectos',
    educationLevel: 'Universitario',
    supervisor: 'Juan Pérez',
  },
  {
    id: 2,
    dni: '43505153',
    name: 'Jesus Alexander Aburto Santiago',
    salary: 2500,
    startDate: '15/05/2018',
    contractType: 'Temporal',
    endDate: '15/05/2023',
    projectCode: 'PRJ002',
    occupation: 'Supervisor',
    position: 'Supervisor de Operaciones',
    educationLevel: 'Técnico',
    supervisor: 'Ana García',
  },
];

const RecursosHumanos = () => {
  const [workers, setWorkers] = useState(initialWorkers);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterContractType, setFilterContractType] = useState('');
  const [filterDni, setFilterDni] = useState('');
  const [filterSupervisor, setFilterSupervisor] = useState('');

  const handleEdit = (worker) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setWorkers(
        workers.map((worker) => (worker.id === form.id ? form : worker))
      );
    } else {
      setWorkers([...workers, { ...form, id: workers.length + 1 }]);
    }
    setIsModalOpen(false);
    setSelectedWorker(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterContractTypeChange = (e) => {
    setFilterContractType(e.target.value);
  };

  const handleFilterDniChange = (e) => {
    setFilterDni(e.target.value);
  };

  const handleFilterSupervisorChange = (e) => {
    setFilterSupervisor(e.target.value);
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterContractType
        ? worker.contractType === filterContractType
        : true) &&
      (filterDni ? worker.dni.includes(filterDni) : true) &&
      (filterSupervisor
        ? worker.supervisor
            .toLowerCase()
            .includes(filterSupervisor.toLowerCase())
        : true)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recursos Humanos</h1>
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => {
            setSelectedWorker({
              dni: '',
              name: '',
              salary: '',
              startDate: '',
              contractType: '',
              endDate: '',
              projectCode: '',
              occupation: '',
              position: '',
              educationLevel: '',
              supervisor: '',
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Añadir Trabajador
        </button>
        <input
          type="text"
          placeholder="Buscar por Nombre..."
          className="border border-gray-300 rounded p-2 w-1/4"
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
        <input
          type="text"
          placeholder="Buscar por Supervisor..."
          className="border border-gray-300 rounded p-2 w-1/4"
          value={filterSupervisor}
          onChange={handleFilterSupervisorChange}
        />
        <select
          className="border border-gray-300 rounded p-2 w-1/4"
          value={filterContractType}
          onChange={handleFilterContractTypeChange}
        >
          <option value="">Todos los Tipos de Contrato</option>
          <option value="Indefinido">Indefinido</option>
          <option value="Temporal">Temporal</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">DNI</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Apellidos y Nombres
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Sueldo</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Fecha Inicio Contrato
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Tipo de Contrato
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Fecha Término Contrato
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Código de Proyecto
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Ocupación</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Cargo en la Boleta
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Nivel Educativo
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Supervisor Inmediato
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map((worker) => (
            <tr key={worker.id}>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.dni}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.salary}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.startDate}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.contractType}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.endDate}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.projectCode}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.occupation}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.position}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.educationLevel}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {worker.supervisor}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleEdit(worker)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(worker.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DynamicForm
          data={selectedWorker}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RecursosHumanos;
