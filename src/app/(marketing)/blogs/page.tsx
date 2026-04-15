import BlogCard from "@/components/modules/home/BlogCard";
import { postService } from "@/service/post.service"
import { BlogPost } from "@/types";

export default async function BlogPage (){

    const { data } = await postService.getPost({}, {cache: "default", revalidate: 10});
  
    return(
        <div className="grid grid-cols-3 gap-5 px-5 max-w-7xl mx-auto">
             {data?.data?.map((post: BlogPost) => (
               <BlogCard key={post.id} post={post}></BlogCard>
             ))}
           </div>
    )
 
}
