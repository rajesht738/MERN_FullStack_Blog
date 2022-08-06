import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, updatePost } from '../api/post';
import { useNotification } from '../contex/NotificationProvider';
import NotFound from './NotFound';
import PostForm from './PostForm';


function UpdatePost() {

  const [postInf, setPostInf] = useState(null);
  const [notfound, setNotfound] = useState(false);
  const [busy, setBusy] = useState(false);
  const { slug } = useParams();

  const { updateNotification } = useNotification();
 
  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotfound(true);
      return updateNotification('error', error);
    }
    setPostInf({ ...post, tags: post.tags?.join(', ')});
  }
  useEffect(() => {
    fetchPost();
  }, []);
  const formSubmitHandle = async (data) => {
    setBusy(true);
    const { error, post } = await updatePost(postInf.id, data);
    setBusy(false);
    if (error) return updateNotification('error', error);
    setPostInf({...post, tags: post.tags?.join(', ')})
   
   };
  if (notfound) return <NotFound />
  return (
    <PostForm onSubmit={formSubmitHandle} busy={busy} initialPost={postInf} postBtnTitle="Update"  resetAfterSubmitForm />
  )
}

export default UpdatePost