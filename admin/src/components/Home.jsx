import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { deletePosts, getPosts } from '../api/post'
import { useNotification } from '../contex/NotificationProvider';
import { useSearch } from '../contex/SearchProvider';
import PostCards from './PostCards';

let pageNo = 0;
const POST_LIMIT = 6;
const getPaginationCount = (length) => {
    const division = length / POST_LIMIT;

    if (division % 1 !== 0) {
        return Math.floor(division) + 1;
    }
    return division;


};


function Home() {
    const { searchResult } = useSearch();

    const [posts, setPosts] = useState([]);
    const [TotalPostCount, setTotalPostCount] = useState([]);

    const paginationCount = getPaginationCount(TotalPostCount);
    const paginationArr = new Array(paginationCount).fill(' ');
    const { updateNotification } = useNotification();

    const fetchPosts = async () => {
        const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
        if (error) return updateNotification('error', error);
        setPosts(posts);
        setTotalPostCount(postCount);
    };

    const fetchMorePosts = (index) => {
        pageNo = index;
        fetchPosts();
    }
    useEffect(() => {
        fetchPosts();
    }, []);


    const deletePostHandler = async ({ id }) => {
        const confirmed = window.confirm("Are You sure!");
        if (!confirmed) return;

        const { error, message } = await deletePosts(id);

        if (error) return updateNotification('error', error);
        updateNotification('success', message);
        const newPosts = posts.filter(p => p.id !== id);

        setPosts(newPosts);

    }
    return (
        <div>

            <div className='grid grid-cols-3 gap-3'>
                {searchResult.length
                    ? searchResult.map((post) => {
                        return (
                            <PostCards
                                key={post.id}
                                post={post}
                                onDeleteClick={() => deletePostHandler(post)} />
                        );
                    })

                    : posts.map((post) => {
                        return (
                            <PostCards
                                key={post.id}
                                post={post}
                                onDeleteClick={() => deletePostHandler(post)} />
                        );
                    })
                }
            </div>
            {(paginationArr.length > 1) ? (
                <div className='py-5 flex justify-center items-center space-x-3'>
                    {paginationArr.map((_, index) => {
                        return (
                            <button key={index} onClick={() => fetchMorePosts(index)}
                                className={index === pageNo ? 'text-blue-500 border-b-2 border-b-blue-500' : 'text-gray-500'} >{index + 1} </button>)
                    })}
                </div>
            ) : null}

        </div>
    )
};

export default Home