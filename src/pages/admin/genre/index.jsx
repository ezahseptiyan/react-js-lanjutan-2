import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getGenres, deleteGenre } from '../../../_services/genres';

function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const genreData = await getGenres();
            setGenres(genreData?.data || genreData);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAddGenre = () => {
        navigate("/admin/genres/create");
    };

    const handleEdit = (id) => {
        navigate(`/admin/genres/edit/${id}`);
    };

      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this genre?");
        if (!confirmDelete) return;

        try {
            await deleteGenre(id);
            alert("Genre deleted successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting genre:", error);
            alert("Failed to delete genre. Please try again.");
        }
    };

    return (
        <section className="p-4 sm:p-6 bg-gray-900 min-h-screen text-gray-100">
            <div className="shadow-lg rounded-lg bg-gray-800 border border-gray-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b border-gray-700">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="border border-gray-700 bg-gray-900 text-gray-100 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full pl-10 p-2"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="w-full md:w-auto flex items-center justify-end">
                        <button
                            type="button"
                            onClick={handleAddGenre}
                            className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Add New Genre
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-gray-100 bg-gray-700 uppercase">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.length > 0 ? (
                                genres.map((g) => (
                                    <tr key={g.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-100">{g.name}</td>
                                        <td className="px-4 py-3 text-gray-300">{g.description}</td>
                                        <td className="px-4 py-3 flex items-center justify-end relative">
                                            <button
                                                onClick={() => toggleDropdown(g.id)}
                                                className="inline-flex items-center p-1 text-sm text-gray-400 hover:text-blue-400 rounded-lg"
                                            >
                                                ⋮
                                            </button>

                                            {openDropdownId === g.id && (
                                                <div className="absolute right-0 mt-2 z-10 w-44 bg-gray-800 border border-gray-700 rounded shadow-lg divide-y divide-gray-700">
                                                    <ul className="py-1 text-sm text-gray-200">
                                                        <li>
                                                            <button
                                                                onClick={() => handleEdit(g.id)}
                                                                className="block py-2 px-4 hover:bg-gray-700 text-left w-full"
                                                            >
                                                                Edit
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleDelete(g.id)}
                                                            className="block py-2 px-4 text-red-400 hover:bg-gray-700 text-left w-full"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-4 text-gray-400">Data not found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default AdminGenres;
