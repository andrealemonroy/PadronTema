import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useFilters } from 'react-table';
import { useForm } from 'react-hook-form';

const Direccion = () => {
    const [data, setData] = useState([
        { id: 1, dni: '12345678', tipoVia: 'Jirón', nombreVia: 'San Juan', numeroVia: '123', departamento: 'Lima', provincia: 'Lima', distrito: 'Lima' },
        { id: 2, dni: '87654321', tipoVia: 'Avenida', nombreVia: 'La Marina', numeroVia: '456', departamento: 'Callao', provincia: 'Callao', distrito: 'Callao' },
    ]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const handleAdd = () => {
        setIsFormOpen(true);
        setFormData({
            dni: '',
            tipoVia: '',
            nombreVia: '',
            numeroVia: '',
            departamento: '',
            provincia: '',
            distrito: ''
        });
    };

    const handleEdit = (item) => {
        setIsFormOpen(true);
        setFormData(item);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleFormSubmit = (form) => {
        if (form.id) {
            setData(data.map(item => item.id === form.id ? form : item));
        } else {
            setData([...data, { ...form, id: data.length + 1 }]);
        }
        setIsFormOpen(false);
    };

    const columns = useMemo(() => [
        { Header: 'DNI', accessor: 'dni' },
        { Header: 'Tipo de Vía', accessor: 'tipoVia' },
        { Header: 'Nombre de Vía', accessor: 'nombreVia' },
        { Header: 'Número', accessor: 'numeroVia' },
        { Header: 'Departamento', accessor: 'departamento' },
        { Header: 'Provincia', accessor: 'provincia' },
        { Header: 'Distrito', accessor: 'distrito' },
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
            )
        }
    ], []);

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
                    placeholder="Buscar por DNI..."
                    onChange={(e) => setFilter('dni', e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Buscar por Tipo de Vía..."
                    onChange={(e) => setFilter('tipoVia', e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Buscar por Departamento..."
                    onChange={(e) => setFilter('departamento', e.target.value)}
                    className="border border-gray-300 rounded p-2 mb-2"
                />
            </div>
            <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Añadir
            </button>
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
        () => Object.keys(data).filter(key => key !== 'id'),
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
                <h2 className="text-xl font-bold mb-4">{data.id ? 'Editar Dirección' : 'Añadir Dirección'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {fields.map(field => (
                        <div key={field} className="mb-4">
                            <label className="block text-gray-700 mb-2 capitalize">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                                type="text"
                                {...register(field)}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Guardar
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Direccion;