import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/post';
import { useNotification } from '../contex/NotificationProvider';
import PostForm, { defaultPost } from './PostForm'

function CreatePost() {
  const [postInfo, setPostInfo ] = useState(null);
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmitForm, setResetAfterSubmitForm] = useState(false);
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const formSubmitHandle = async (data) => {
    setBusy(true);
    const { error, post } = await createPost(data);
    setBusy(false);
    
    if (error) return updateNotification('error', error);
    setResetAfterSubmitForm(true);
    navigate(`/update-post/${post.slug}`);
   };
  useEffect(() => {
    const result = localStorage.getItem("BlogPost");
    if (!result) return;
    const oldPost = JSON.parse(result);
    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);

  return (
    <PostForm onSubmit={formSubmitHandle} initialPost={postInfo} busy={busy} postBtnTitle="Post" resetAfterSubmitForm={resetAfterSubmitForm}
     
    />
  )

}

export default CreatePost