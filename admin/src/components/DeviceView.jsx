import React from 'react'
import Markdown from "markdown-to-jsx";
export default function DeviceView({ thumbnail, title, content, visible, onClose }) {

    if (!visible) return null;
    const handleCloseDevice = (e) => {
      if(e.target.id === "container"){
        onClose();
      }
    }
    return (
        <>
            <div id='container' onClick={handleCloseDevice} className='bg-gray-500 bg-opacity-50 fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
                <div className='bg-white w-device-width h-device-height overflow-auto rounded'>
                    <img src={thumbnail} className="aspect-video" alt="" />
                    <div className='px-2'>
                        <h1 className='font-semibold text-gray-700 py-2 text-xl ' >{title}</h1>
                        <div className='prose prose-sm '>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

