import React, { useState } from 'react'
import { useEffect } from 'react';
import { ImEye, ImFileEmpty, ImFilePicture, ImSpinner11, ImSpinner3 } from "react-icons/im"
import { uploadImage } from '../api/post';
import { useNotification } from '../contex/NotificationProvider';
import DeviceView from './DeviceView';
import MarkdownHint from './MarkdownHint';


export const defaultPost = {
    title: "",
    thumbnail: "",
    featured: false,
    content: "",
    tags: "",
    meta: "",
};

function PostForm({ initialPost, onSubmit, busy, postBtnTitle, resetAfterSubmitForm }) {

    const [postInfo, setPostInfo] = useState({ ...defaultPost });
    const [selectedThumbnailImage, setSelectedThumbnailImage] = useState('');
    const [imageUploadUrl, setImageUploadUrl] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [showDeviceView, setShowDeviceView] = useState(false);
    const [displayMarkdownHints, setDisplayMarkdownHints] = useState(false);



    const { updateNotification } = useNotification();

    useEffect(() => {
        if (initialPost) {
            setPostInfo({ ...initialPost });
            setSelectedThumbnailImage(initialPost?.thumbnail);
        }
        return () => {
            if (resetAfterSubmitForm) resetForm();
        }
    }, [initialPost, resetAfterSubmitForm]);

    // const handleChange = ({target}) => { // destructure the 'target' from event
    const handleChange = (e) => {
        const { value, name, checked } = e.target;
        // console.log(name);
        if (name === 'thumbnail') {
            const file = e.target.files[0];
            if (!file.type?.includes('image')) {
                return updateNotification("error", 'This is not an image!')
            }
            setPostInfo({ ...postInfo, thumbnail: file });
            return setSelectedThumbnailImage(URL.createObjectURL(file));
        }
        if (name === 'featured') {
            localStorage.setItem('BlogPost', JSON.stringify({ ...postInfo, featured: checked }));
            return setPostInfo({ ...postInfo, [name]: checked });
        }
        if (name === 'tags') {

            const newTags = tags.split(",");

            if (newTags.length > 4) {
                updateNotification("warning", 'Only first four tags will be selected!')
            }
        }
        if (meta === 'meta' && meta.length >= 150) {
            return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
        }
        const newPost = { ...postInfo, [name]: value };
        setPostInfo({ ...newPost });

        localStorage.setItem('BlogPost', JSON.stringify(newPost));
    };

    const handleImageUpload = async ({ target }) => {
        if (imageUploading) return;

        const file = target.files[0];

        if (!file.type?.includes('image')) {
            return updateNotification("error", "This is not an image!");
        }
        setImageUploading(true);
        const formData = new FormData();

        formData.append('image', file);
        // network should be present due to file upload on cloudinary server
        const { error, image } = await uploadImage(formData);
        setImageUploading(false)
        if (error) return updateNotification('error', error);
        setImageUploadUrl(image);
    };
    const handleOnCopy = () => {
        const texToCopy = `![Add image descriptions](${imageUploadUrl})`;
        navigator.clipboard.writeText(texToCopy);
    }
    const formSubmitHandle = (e) => {
        e.preventDefault();

        const { title, content, tags, meta } = postInfo;

        if (!title.trim()) return updateNotification('error', "Title is missing");
        if (!content.trim()) return updateNotification('error', "Content is missing");
        if (!tags.trim()) return updateNotification('error', "Tags are missing");
        if (!meta.trim()) return updateNotification('error', "Meta description is missing");

        const newslug = title.toLowerCase().replace(/[^a-zA-Z]/g, ' ').split(" ").filter(item => item.trim()).join("-");

        const newTagss = tags.split(",").map((item) => item.trim()).splice(0, 4);

        const formData = new FormData();
        const finalPost = { ...postInfo, tags: JSON.stringify(newTagss), slug: newslug };
        for (let key in finalPost) {
            formData.append(key, finalPost[key]);
        }

        onSubmit(formData);

        

    };

    const resetForm = () => {
        setPostInfo({ ...defaultPost });
        localStorage.removeItem("BlogPost");
    }
    const { title, content, featured, tags, meta } = postInfo;


    return (
        <>
            <form onSubmit={formSubmitHandle} className='flex p-2' encType='multipart/form-data'>
                <div className='w-9/12 h-screen space-y-3 flex flex-col'>

                    <div className="flex items-center justify-between ">
                        <h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>
                        {/** Buttons */}
                        <div className="flex items-center space-x-5 ">
                            <button onClick={()=> resetForm()} type="button" className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
                                <ImSpinner11 />
                                <span>Reset</span>
                            </button>
                            <button onClick={()=> setShowDeviceView(true)} type="button" className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
                                <ImEye />
                                <span> View</span>
                            </button>
                            <button className='h-10  w-36 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>
                                {busy ? <ImSpinner3 className='mx-auto text-xl animate-spin' /> : postBtnTitle}
                            </button>
                        </div>
                    </div>
                    {/* featured check box*/}
                    <div className='flex'>
                        <input type="checkbox" onChange={handleChange} name="featured" value={featured} id="featured" hidden />
                        <label className='select-none  flex items-center space-x-2 text-gray-700 cursor-pointer group' htmlFor="featured">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover: border-blue-700">
                                {featured && <div className='w-2 h-2 rounded-full  bg-gray-700 group-hover:bg-blue-500' />
                                }
                            </div>
                            <span className='group-hover:text-blue-500'>Featured</span>
                        </label>
                    </div>
                    {/** image input */}

                    <div className='flex space-x-2'>

                        <div>
                            <input type="file" onChange={handleImageUpload} hidden name="uploaded_image" id="image-input" />
                            <label htmlFor='image-input' className='flex items-center space-x-2 px-2 ring-1 ring-gray-500 rounded h-9 text-gray-500 hover:text-white hover:bg-gray-500 transition cursor-pointer'>
                                <span> Place Image</span>
                                {!imageUploading ? <ImFilePicture /> : <ImSpinner3 className='animate-spin' />}

                            </label>
                        </div>

                        {imageUploadUrl && (<div className="flex flex-1 justify-between rounded overflow-hidden bg-gray-400">
                            <input type="text" name="" id="" value={imageUploadUrl}
                                disabled className='bg-transparent  text-white px-2 w-full' />
                            <button onClick={handleOnCopy} type="button" className='text-xs flex items-center flex-col justify-center p-1 self-stretch bg-gray-700 text-white'>
                                <ImFileEmpty />
                                copy
                            </button>
                        </div>)}
                    </div>
                    {/** title input  */}

                    <input type="text" onFocus={() => setDisplayMarkdownHints(false)} onChange={handleChange} name="title" value={title} id="" placeholder="Post title" className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold' />
                    {/** content input  */}
                    <textarea name="content" onFocus={() => setDisplayMarkdownHints(true)} onChange={handleChange} value={content} className='resize-none outline-none focus:ring-1 rounded p-2  w-full flex-1 font-mono tracking-wide text-lg ' placeholder='## markdown..'></textarea>

                    {/** tags input  */}
                    <div>
                        <label htmlFor="tags">Tags</label>
                        <input type="text" onChange={handleChange} name="tags" value={tags} id="tags" placeholder="tag1, tag2" className='outline-none focus:ring-1 rounded p-2 w-full' />
                    </div>
                    {/** Meta description  */}
                    <label htmlFor="meta">
                        Meta description {meta?.length}/150
                    </label>
                    <textarea id='meta' onChange={handleChange} name="meta" value={meta} className='resize-none  outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='Meta description'></textarea>
                </div>

                <div className='w-1/4 px-2 relative flex flex-col '>
                    <h1 className="text-xl font-semibold text-gray-700 mb-2">Thumbnail</h1>
                    <div className=''>
                        <input type="file" onChange={handleChange} name="thumbnail" hidden id="thumbnail" />
                        <label htmlFor="thumbnail" className='cursor-pointer'>
                            {selectedThumbnailImage ? (<img src={selectedThumbnailImage} alt="" className='aspect-video shadow-sm rounded' />
                            ) : (<div className='border border-dashed border-gray-500 aspect-video flex items-center justify-center flex-col  '>
                                <span className='text-xs'>Select thumbnail</span>
                                <span className='text-xs'>Recommended Size</span>
                                <span className='text-xs'>1280 * 720</span>
                            </div>)
                            }
                        </label>
                    </div>
                    {/** Markdown Rules */}
                    <div className='absolute top-1/3'>
                        {displayMarkdownHints && <MarkdownHint />}
                    </div>
                </div>
            </form>

            <DeviceView title={title} thumbnail={selectedThumbnailImage} content={content} visible={showDeviceView} onClose={()=> setShowDeviceView(false)}/>
        </>

    )
}

export default PostForm