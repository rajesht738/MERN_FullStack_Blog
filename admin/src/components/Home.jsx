import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { getPosts } from '../api/post'
import PostCards from './PostCards';

let pageNo = 0;
const POST_LIMIT = 6;
const getPaginationCount = (length) => {
    const devision = length / POST_LIMIT;
    if (devision % 1 !== 0) {
        return Math.floor(devision) + 1;
    }
    return devision;
}


function Home() {

    const [posts, setPosts] = useState([]);
    const [TotalPostCount, setTotalPostCount] = useState([]);

    const paginationCount = getPaginationCount(TotalPostCount);
    const paginationArr = new Array(paginationCount).fill(' ');

    const fetchPosts = async () => {
        const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
        if (error) return console.log(error);
        setPosts(posts);
        setTotalPostCount(postCount);
    };
   
    useEffect(() => {
        fetchPosts();

    }, []);

    const fetchMorePosts = (index) => {
        pageNo = index;
        fetchPosts();
    }
    return (
        <div>

            <div className='grid grid-cols-3 gap-3'>
                {posts.map((post) => {
                    return <PostCards key={post.id} post={post} />
                })}
            </div>
            <div className='py-5 flex justify-center items-center space-x-3'>
                {paginationArr.map((_, index) => {
                    return (
                        <button onClick={() => fetchMorePosts(index)}
                            className={index === pageNo ? 'text-blue-500 border-b-2 border-b-blue-500' : 'text-gray-500'} >{index + 1} </button>)
                })}
            </div>

        </div>
    )
}

export default Home