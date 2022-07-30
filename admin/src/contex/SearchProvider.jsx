import React , { createContext, useContext, useState }from 'react'
import { searchPosts } from '../api/post';


const SearchConext = createContext();


export default function SearchProvider({children}) {
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async (query) =>{
        const {error, posts} = await searchPosts(query);
        if(error) return console.log(error);
        setSearchResult(posts);
    }
 
    const resetSearch = () =>{
        setSearchResult([]);
    }



    return (
    <SearchConext.Provider value={{searchResult, handleSearch, resetSearch}}>
     {children}
    </SearchConext.Provider>
  )
}


export const useSearch = () => useContext(SearchConext);
