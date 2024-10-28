import React, { useState } from "react";

interface SearchProps {
  onSearch: (term: string) => void; // función para enviar el término de búsqueda
  placeholder?: string; // placeholder opcional
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = "Buscar..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Manejar cambios en el input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // enviar el término de búsqueda a la función proporcionada
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default Search;
