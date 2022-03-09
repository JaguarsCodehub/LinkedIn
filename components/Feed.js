import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import {handlePostState, useSSRPostsState} from '../atoms/postAtom';
import Input from './Input';
import Post from './Post'

const Feed = ({ posts }) => {

  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {

    // Fetch Posts from the database..
    const fetchPosts = async() => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);

      
      // These are set to false bcoz We don't want our website to refresh everytime.
      /* Also when the user posts something the ${realTimePosts} should be true and not the ${SSR Posts} */
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);

  console.log(realtimePosts);



  return (
    <div className='space-y-6 pb-24 max-w-lg'>
        <Input />
        {/* Posts */}
        {!useSSRPosts
            ? realtimePosts.map((post) => <Post key={post.id} post={post}/>) 
            : posts.map((post) => <Post key={post._id} post={post}/>)}
        {/* Server Side Posts */}
    </div>
  )
}

export default Feed