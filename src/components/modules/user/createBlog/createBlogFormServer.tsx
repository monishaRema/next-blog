import { env } from "@/env";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export default async function CreateBlogFormServer() {
  const createBlog = async (formdata: FormData) => {
    "use server";

    const title = formdata.get("title") as string;
    const content = formdata.get("content") as string;
    const tags = formdata.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });

    if (res.status === 201) {
      // revalidateTag("posts","max")

      updateTag("posts")
      redirect("/blogs");
    } else {
      redirect("/dashboard/create-blog?error=true");
    }
  };
  return (
    <Card className=" w-xl py-10 mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>Card description is here</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Blog title"
                required
              ></Input>
            </Field>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <Input
                type="text"
                id="tags"
                name="tags"
                placeholder="tags"
                required
              ></Input>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="blog-form" className="">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
