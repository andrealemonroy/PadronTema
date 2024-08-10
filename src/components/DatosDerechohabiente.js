import React, { useState } from 'react';
import DynamicForm from './Form/Form';

const initialWorkers = [
  {
    id: 1,
    dniType: 'DNI',
    dniNumber: '12345678',
    country: 'Perú',
    birthDate: '1990-01-01',
    surname1: 'González',
    surname2: 'Pérez',
    name1: 'Juan',
    gender: 'M',
    familyLink: 'Padre',
    docTypeLink: 'DNI',
    docNumberLink: '87654321',
    conceptionMonth: 'Enero'
  },
  // other workers...
];

const DatosDerechohabiente = () => {
  const [workers, setWorkers] = useState(initialWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterFamilyLink, setFilterFamilyLink] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    dniType: '', 
    dniNumber: '', 
    country: '', 
    birthDate: '', 
    surname1: '', 
    surname2: '', 
    name1: '', 
    gender: '', 
    familyLink: '', 
    docTypeLink: '', 
    docNumberLink: '', 
    conceptionMonth: '', 
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterCountryChange = (e) => {
    setFilterCountry(e.target.value);
  };

  const handleFilterGenderChange = (e) => {
    setFilterGender(e.target.value);
  };

  const handleFilterFamilyLinkChange = (e) => {
    setFilterFamilyLink(e.target.value);
  };

  const filteredData = workers.filter(item =>
    (item.name1?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCountry ? item.country === filterCountry : true) &&
    (filterGender ? item.gender === filterGender : true) &&
    (filterFamilyLink ? item.familyLink === filterFamilyLink : true)
  );

  const handleAdd = () => {
    setIsFormOpen(true);
    setFormData({
      dniType: '', 
      dniNumber: '', 
      country: '', 
      birthDate: '', 
      surname1: '', 
      surname2: '', 
      name1: '', 
      gender: '', 
      familyLink: '', 
      docTypeLink: '', 
      docNumberLink: '', 
      conceptionMonth: '', 
    });
  };

  const handleEdit = (item) => {
    setIsFormOpen(true);
    setFormData(item);
  };

  const handleDelete = (id) => {
    setWorkers(workers.filter(item => item.id !== id));
  };

  const handleFormSubmit = (form) => {
    if (form.id) {
      setWorkers(workers.map(item => item.id === form.id ? form : item));
    } else {
      setWorkers([...workers, { ...form, id: workers.length + 1 }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar nombre"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <div className="flex mb-4">
        <select onChange={handleFilterCountryChange} className="border border-gray-300 rounded p-2 mr-2">
          <option value="">Todos los Países</option>
          <option value="Perú">Perú</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <select onChange={handleFilterGenderChange} className="border border-gray-300 rounded p-2 mr-2">
          <option value="">Todos los Géneros</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <select onChange={handleFilterFamilyLinkChange} className="border border-gray-300 rounded p-2 mr-2">
          <option value="">Todos los Vínculos</option>
          <option value="Padre">Padre</option>
          <option value="Madre">Madre</option>
          <option value="Hijo">Hijo</option>
          <option value="Hija">Hija</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>
      <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Añadir
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Tipo de doc</th>
            <th className="py-2 px-4 border-b border-gray-200">Número de documento</th>
            <th className="py-2 px-4 border-b border-gray-200">País</th>
            <th className="py-2 px-4 border-b border-gray-200">Fecha de nacimiento</th>
            <th className="py-2 px-4 border-b border-gray-200">Apellido paterno</th>
            <th className="py-2 px-4 border-b border-gray-200">Apellido materno</th>
            <th className="py-2 px-4 border-b border-gray-200">Nombres</th>
            <th className="py-2 px-4 border-b border-gray-200">Sexo</th>
            <th className="py-2 px-4 border-b border-gray-200">Vínculo familiar</th>
            <th className="py-2 px-4 border-b border-gray-200">Tipo de Doc. Que acredita el vínculo</th>
            <th className="py-2 px-4 border-b border-gray-200">N.º de Doc. que acredita el vínculo</th>
            <th className="py-2 px-4 border-b border-gray-200">Mes de concepción</th>
            <th className="py-2 px-4 border-b border-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b border-gray-200">{item.dniType}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.dniNumber}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.country}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.birthDate}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.surname1}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.surname2}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.name1}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.gender}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.familyLink}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.docTypeLink}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.docNumberLink}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.conceptionMonth}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <DynamicForm
          data={formData}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default DatosDerechohabiente;