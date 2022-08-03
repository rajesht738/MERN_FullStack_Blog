import React, { useState } from 'react'
import { ImEye, ImFileEmpty, ImFilePicture, ImSpinner11, ImSpinner3 } from "react-icons/im"
import { uploadImage } from '../api/post';
const mdRules = [
  { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
};

function CreatePost() {

  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailImage, setSelectedThumbnailImage] = useState('');
  const [imageUploadUrl, setImageUploadUrl] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  // const handleChange = ({target}) => { // destructure the 'target' from event
  const handleChange = (e) => {
    const { value, name, checked } = e.target;
    // console.log(name);
    if (name === 'thumbnail') {
      const file = e.target.files[0];
      if (!file.type?.includes('image')) {
        return alert('this is not an image!')
      }
      setPostInfo({ ...postInfo, thumbnail: value });
      return setSelectedThumbnailImage(URL.createObjectURL(file));
    }
    if (name === 'featured') {
      return setPostInfo({ ...postInfo, [name]: checked });
    }
    if (name === "tags") {

      const newTags = tags.split(', ');
      if (newTags.length > 4) {
        console.log("Only first four tags will be selected!");
      }
    }
    if (meta === 'meta' && meta.length >= 149) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    }
    setPostInfo({ ...postInfo, [name]: value });
  };

  const handleImageUpload = async ({target}) =>{
    if(imageUploading) return;

     const file = target.files[0];

      if (!file.type?.includes('image'))  {
        return alert('this is not an image!')
      }
      setImageUploading(true);
     const formData = new FormData();

     formData.append('image', file);
     // network should be present due to file upload on cloudinary server
     const {error, image} = await uploadImage(formData);
      setImageUploading(false)
     if (error) return console.log(error);    
     setImageUploadUrl(image);
  };
const handleOnCopy = () =>{
  const texToCopy = `![Add image descriptions](${imageUploadUrl})`;
  navigator.clipboard.writeText(texToCopy);
}
  const { title, content, featured, tags, meta } = postInfo;


  return (
    <form className='flex p-2'>
      <div className='w-9/12 h-screen space-y-3 flex flex-col'>

        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>
          <div className="flex items-center space-x-5 ">
            <button type="button" className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button type="button" className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
              <ImEye />
              <span> View</span>
            </button>
            <button  className='px-5 h-10 w-36 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>
              Post
            </button>
          </div>
        </div>
        {/* featured check box*/}
        <div className='flex'>
          <input type="checkbox" onChange={handleChange} name="featured" id="featured" hidden />
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
             { !imageUploading ?<ImFilePicture />: <ImSpinner3 className='animate-spin'/>}
             
            </label>
          </div>

        { imageUploadUrl &&(<div className="flex flex-1 justify-between rounded overflow-hidden bg-gray-400">
          <input type="text"  name="" id="" value={imageUploadUrl}
            disabled className='bg-transparent  text-white px-2 w-full' />
          <button onClick={handleOnCopy} type="button" className='text-xs flex items-center flex-col justify-center p-1 self-stretch bg-gray-700 text-white'>
            <ImFileEmpty />
            copy
          </button>
        </div>)}
        </div>
        {/** title input  */}
        <div>
          <input type="text" onChange={handleChange} name="title" value={title} id="" placeholder="Post title" className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold' />
          {/** content input  */}
          <textarea name="content" onChange={handleChange} value={content} className='resize-none outline-none focus:ring-1 rounded p-2  w-full flex-1 font-mono tracking-wide text-lg ' placeholder='## markdown..'></textarea>
        </div>
        {/** tags input  */}
        <div>
          <label htmlFor="tags">Tags</label>
          <input type="text" onChange={handleChange}
            name="tags" value={tags} id="tags" placeholder="tag1, tag2" className='outline-none focus:ring-1 rounded p-2 w-full' />
        </div>
        {/** Meta description  */}
        <label htmlFor="meta">
        Meta description {meta.length}/150
        </label>
        <textarea id='meta' onChange={handleChange} name="meta" value={meta} className='resize-none  outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='Meta description'></textarea>
      </div>
      {/** Markdown Rules */}
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
        <div className='bg-white absolute top-1/2  px-2 py-4 rounded'>
          <h1 className='font-semibold text-center'>General markdown rules</h1>
          <ul>
            {mdRules.map(({ title, rule }) => {
              return <li key={title}>
                <p className='font-semibold text-gray-500'>{title}</p>
                <p className='font-semibold text-gray-700 pl-2 font-mono'>{rule}</p>
              </li>
            })}
            <li className='text-center text-blue-500'>
              <a href="#https://www.markdownguide.org/basic-syntax/" target="_blank">Find more</a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  )
}

export default CreatePost