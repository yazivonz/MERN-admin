import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { Button, Select, MenuItem } from "@mui/material"; // Importing Select and MenuItem
import AddDrinks from "./AddDrinks";
import EditDrinks from "./EditDrinks";

const MENU_DATA = [
  { id: 1, name: "Espresso", origin: "Ethiopian Coffee", price: 2.99, stock: 100, image: "/img/Expresso.png" },
  { id: 2, name: "Cappuccino", origin: "Brazilian Coffee", price: 3.99, stock: 75, image: "/img/Cappuccino.png" },
  { id: 3, name: "Latte", origin: "Vietnamese Coffee", price: 4.49, stock: 50, image: "/img/Latte.png" },
];

const MenuTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenus, setFilteredMenus] = useState(MENU_DATA);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentDrink, setCurrentDrink] = useState(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = MENU_DATA.filter(
      (menu) => menu.name.toLowerCase().includes(term) || menu.origin.toLowerCase().includes(term)
    );
    setFilteredMenus(filtered);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleAddDrink = (newDrink) => {
    const updatedMenus = [
      ...filteredMenus,
      { ...newDrink, id: filteredMenus.length + 1 } // Add a unique ID
    ];
    setFilteredMenus(updatedMenus);
    handleCloseAdd();
  };

  const handleEditClick = (drink) => {
    setCurrentDrink(drink);
    handleOpenEdit();
  };

  const handleUpdateDrink = (updatedDrink) => {
    const updatedMenus = filteredMenus.map(menu => 
      menu.id === updatedDrink.id ? updatedDrink : menu
    );
    setFilteredMenus(updatedMenus);
    handleCloseEdit();
  };

  const handleDeleteClick = (id) => {
    const updatedMenus = filteredMenus.filter(menu => menu.id !== id);
    setFilteredMenus(updatedMenus);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.image} alt={row.name} className="w-10 h-10 rounded-full" />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: "Origin", // Change from Category to Origin
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (typeof row.price === 'number' ? `$${row.price.toFixed(2)}` : 'N/A'),
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="text-indigo-400 hover:text-indigo-300" onClick={() => handleEditClick(row)}>
            <Edit size={18} />
          </button>
          <button className="text-red-400 hover:text-red-300" onClick={() => handleDeleteClick(row.id)}>
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Menu List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search menus..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Button onClick={handleOpenAdd} variant="contained" className="ml-4 bg-indigo-500">Add Drink</Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredMenus}
        pagination
        highlightOnHover
        customStyles={{
          rows: {
            style: {
              backgroundColor: 'rgb(31 41 55 / var(--tw-bg-opacity))',
              '--tw-bg-opacity': '1',
              color: '#ddd',
            },
          },
          headCells: {
            style: {
              backgroundColor: 'rgb(31 41 55 / var(--tw-bg-opacity))',
              '--tw-bg-opacity': '1',
              color: '#fff',
            },
          },
          cells: {
            style: {
              color: '#ddd',
            },
          },
          pagination: {
            style: {
              backgroundColor: 'rgb(31 41 55 / var(--tw-bg-opacity))',
              '--tw-bg-opacity': '1',
              color: '#fff',
            },
          },
        }}
      />

      {/* AddDrinks component */}
      <AddDrinks open={openAdd} handleClose={handleCloseAdd} handleAddDrink={handleAddDrink} />
      {/* EditDrinks component */}
      <EditDrinks isOpen={openEdit} onClose={handleCloseEdit} drink={currentDrink} onUpdateDrink={handleUpdateDrink} />
    </motion.div>
  );
};

export default MenuTable;
