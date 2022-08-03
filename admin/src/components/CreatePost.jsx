import React, { useState } from 'react'
import { ImEye, ImFileEmpty, ImFilePicture, ImSpinner11 } from "react-icons/im"
const mdRules = [
  { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: "",
  content: "",
  tags: "",
  meta: "",
};

function CreatePost() {

  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailImage, setSelectedThumbnailImage] = useState('');
  // const handleChange = ({target}) => { // destructure the 'target' from event
  const handleChange = (e) => {
    const { value, name } = e.target;
    // console.log(name);
    if (name === 'thumbnail') {
      const file = e.target.files[0];
      if (!file.type?.includes('image')) {
        return alert('this is not an image!')
      }
      setPostInfo({ ...postInfo, thumbnail: value });
      return setSelectedThumbnailImage(URL.createObjectURL(file));
    }
    setPostInfo({ ...postInfo, [name]: value });

  };

  const { title, content, featured, tags, meta } = postInfo;


  return (
    <form className='flex p-2'>
      <div className='w-9/12 h-screen space-y-3 flex flex-col'>

        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>
          <div className="flex items-center space-x-5 ">
            <button className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button className='flex items-center space-x-2 px-2 ring-1 ring-blue-500 rounded h-9 text-blue-500 hover:text-white hover:bg-blue-500 transition'>
              <ImEye />
              <span> View</span>
            </button>
            <button className='px-5 h-10 w-36 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>
              Post
            </button>
          </div>
        </div>
        {/* featured check box*/}
        <div>
          <input type="checkbox" name="featured" id="featured" hidden />
          <label className='flex items-center space-x-2 text-gray-700 cursor-pointer group' htmlFor="featured">
            <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover: border-blue-700">
              <div className='w-2 h-2 rounded-full  bg-gray-700 group-hover:bg-blue-500' />
            </div>
            <span className='group-hover:text-blue-500'>Featured</span>
          </label>
        </div>
        {/** image input */}

        <div className='flex space-x-2'>

          <div>
            <input type="file" hidden name="" id="image-input" />
            <label htmlFor='image-input' className='flex items-center space-x-2 px-2 ring-1 ring-gray-500 rounded h-9 text-gray-500 hover:text-white hover:bg-gray-500 transition cursor-pointer'>
              <ImFilePicture />
              <span> Place Image</span>
            </label>

          </div>
          <div className="flex flex-1 justify-between rounded overflow-hidden bg-gray-400">
            <input type="text" name="" id="" value='http://hfska.com'
              disabled className='bg-transparent  text-white px-2 w-full' />
            <button className='text-xs flex items-center flex-col justify-center p-1 self-stretch bg-gray-700 text-white'>
              <ImFileEmpty />
              copy
            </button>
          </div>
        </div>
        {/** title input  */}
        <input type="text" onChange={handleChange} name="title" value={title} id="" placeholder="Post title" className='text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold' />
        {/** content input  */}
        <textarea name="content" onChange={handleChange} value={content} className='resize-none outline-none focus:ring-1 rounded p-2  w-full flex-1 font-mono tracking-wide text-lg ' placeholder='## markdown..'></textarea>

        {/** tags input  */}
        <div>
          <label htmlFor="tags">Tags</label>
          <input type="text" onChange={handleChange} name="tags" value={tags} id="tags" placeholder="tag1, tag2" className='outline-none focus:ring-1 rounded p-2 w-full' />
        </div>
        {/** Meta description  */}
        <label htmlFor="meta">Meta description</label>
        <textarea id='meta' onChange={handleChange} name="meta" value={meta} className='resize-none  outline-none focus:ring-1 rounded p-2 w-full font-semibold' placeholder='Meta description'></textarea>
      </div>
      {/** Markdown Rules */}
      <div className='w-1/4 px-2 relative flex flex-col '>
        <h1 className="text-xl font-semibold text-gray-700 mb-2">Thumbnail</h1>
        <div className=''>
          <input type="file" onChange={handleChange} name="thumbnail" hidden id="thumbnail" />
          <label htmlFor="thumbnail" className='cursor-pointer'>
          { selectedThumbnailImage ? (<img src={selectedThumbnailImage} alt="" className='aspect-video shadow-sm rounded'/>
       ):(    <div className='border border-dashed border-gray-500 aspect-video flex items-center justify-center flex-col  '>
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
              <a href="" target="_blank">Find more</a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  )
}

export default CreatePost