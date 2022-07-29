import React from 'react'
import dateFormat, { masks } from "dateformat";
import {Link} from "react-router-dom";

import {BsPencilSquare, BsTrash} from "react-icons/bs";
const now = new Date();

function PostCards({post}) {
    if(!post) return null;
    const {title, thumbnail, tags, meta,createdAt,slug} = post;

  return (
    <div className='bg-white shadow-sm rounded'>
        <img className='aspect-video' src={thumbnail || './blank.jpg' } alt={title}/>
        <div className='p-2'>
        <h1 className='text-lg font-semibold text-gray-700'>{title}</h1>
        <p className='text-gray-500'>{meta}</p>
        <div className="flex justify-between">
        <p className='text-gray-500 text-sm '>{tags.join(',')}</p>
        <p className='text-gray-500 text-sm'>{dateFormat(createdAt, "mediumDate")}</p>

        </div>
        <div className="flex space-x-3 py-2">
       <Link to= {`update-post/${slug}`} className='w-8 h-8 rounded-full bg-blue-400 hover:bg-blue-600 flex justify-center items-center text-white'>
        <BsPencilSquare />
       </Link>
       <button className='w-8 h-8 rounded-full bg-red-400 hover:bg-red-600 flex justify-center items-center text-white'>
        <BsTrash/>
       </button>

        </div>

        </div>

    </div>
  )
}

export default PostCards