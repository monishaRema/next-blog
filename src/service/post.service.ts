import { env } from "@/env";

interface GetBlogPostParam {
  isFeatured?: boolean;
  search?: string;
  page?: number,
  limit?: number,
  sortBy?:string,
  sortOrder?:string
}

interface ServiceOption {
  cache?: RequestCache,
  revalidate?: number
}

const API_URL = env.API_URL;
export const postService = {
  getPost: async function (params: GetBlogPostParam, options?: ServiceOption) {
    try {
      const url = new URL(`${API_URL}/posts`);
    if(params){
      Object.entries(params).forEach(([key, value] )=> {
        if(value !== undefined && value !== null && value !== ""){
           url.searchParams.append(key, value)
        }
       
      })
    }

    const cacheOption : RequestInit = {};
  if(options?.cache){
    cacheOption.cache = options.cache
  }

  if(options?.revalidate){
    cacheOption.next= {revalidate: options.revalidate}
  }


      const res = await fetch(url.toString(), cacheOption);
      const data = await res.json();
      return {
        data: data,
        error: null,
      };
    } catch {
      return {
        data: null,
        error: {
          message: "something went wrong",
        },
      };
    }
  },

  getPostById: async function(id:string){
    try {
      const res = await fetch(`${env.API_URL}/posts/${id}`);
      const data = await res.json();
       return {
        data: data,
        error: null,
      };

    } catch {
       return {
        data: null,
        error: {
          message: "something went wrong",
        },
      };
    }
  }
};
