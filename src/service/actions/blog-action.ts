"use server";

import { BlogData } from '@/types';
import { postService } from '../post.service';
import { updateTag } from 'next/cache';




export const getBlogs = async () => {
  return await postService.getPost({});
};

export const createBlogPost = async (data: BlogData) => {
  const res = await postService.createPost(data)
  if(res.data){
    updateTag("blogPosts");
  }
  
  return res;
};