import BlogCard from "@/components/modules/home/BlogCard";
import { postService } from "@/service/post.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await postService.getPost({}, {cache: "no-store", revalidate: 60});

  return (
    <div className="grid grid-cols-3 gap-5 px-5 max-w-7xl mx-auto">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}
