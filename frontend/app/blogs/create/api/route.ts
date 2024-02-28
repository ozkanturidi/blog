import BaseService from "@/services/baseService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
const apiService = new BaseService();

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log({ body });
  debugger;

  try {
    const response = await apiService.post("posts", {
      data: {
        title: body.title,
        content: body.content,
        language: body.language,
        user: body.user,
      },
    });

    const newformData = new FormData();
    newformData.append("ref", "api::post.post");
    newformData.append("refId", response.data.id);
    newformData.append("field", "image");
    newformData.append("files", body.image as File);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (response.data) {
      try {
        await apiService.post("upload", newformData, config);
      } catch (error) {
        console.log("While uploading the image, an error occurred: ", error);
      }
    }
  } catch (error) {
    console.log("While posting the blog, an error occurred: ", error);
  }
  revalidatePath("/blogs");
  redirect("/blogs");
}
