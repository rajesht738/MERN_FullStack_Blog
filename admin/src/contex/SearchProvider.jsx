import React , { createContext, useContext, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { searchPosts } from '../api/post';
import { useNotification } from './NotificationProvider';


const SearchConext = createContext();


export default function SearchProvider({children}) {
    const [searchResult, setSearchResult] = useState([]);
    const {updateNotification} = useNotification();
const navigate = useNavigate();
    const handleSearch = async (query) =>{
        const {error, posts} = await searchPosts(query);
        if(error) return updateNotification('error', error);
        setSearchResult(posts);
        navigate('/');

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

// custome hooks to use it at any of component by  using useSearch
export const useSearch = () => useContext(SearchConext);
