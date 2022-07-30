import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useSearch } from '../contex/SearchProvider';

function SearchForm() {
  const [query, setQuery] = useState("");
  const { searchResult, handleSearch, resetSearch } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearch(query)

  }
  const handleReset = (e) => {
     resetSearch();
     setQuery("");
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Escape'){
      setQuery("");
      resetSearch();
    } 
  }
  return (
    <form className='relative' onSubmit={handleSubmit}>
      <input
        value={query}
        onKeyDown={handleKeyDown}
        onChange={({ target }) => setQuery(target.value)}
        className='border border-gray-500 outline-none rounded focus:ring-1 p-1 w-56' placeholder='Search...' />
     
      {searchResult.length ? <button 
      onClick={handleReset}
      className='absolute top-1/2 -translate-y-1/2 text-gray-700 right-3 '>
        <AiOutlineClose />
      </button> : null}
    </form>
  )
}

export default SearchForm