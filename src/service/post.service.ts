import { env } from "@/env";
import { BlogData } from "@/types";
import { cookies } from "next/headers";

interface GetBlogPostParam {
  isFeatured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}

const API_URL = env.API_URL;
export const postService = {
  getPost: async function (
    params: GetBlogPostParam,
    cacheOptions?: ServiceOption,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const cacheOption: RequestInit = {};
      if (cacheOptions?.cache) {
        cacheOption.cache = cacheOptions.cache;
      }

      if (cacheOptions?.revalidate) {
        cacheOption.next = { revalidate: cacheOptions.revalidate };
      }

      cacheOption.next = { ...cacheOption.next, tags: ["posts"] };

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

  getPostById: async function (id: string) {
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
  },

  createPost: async function (data: BlogData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json()

      if(result.error){
        return {data:null,error:{message:"Post not created"}}
      }
      



      return {data:result,error:null}
    } catch (error) {
      return {data:null,error:{message:"Something went wrong"}}
    }
  },
};
