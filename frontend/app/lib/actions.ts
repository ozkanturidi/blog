import BaseService from "@/services/baseService";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const apiService = new BaseService();

export default async function createBlog(
  currentState: any,
  formData: FormData
) {
  const token = document.cookie.split("token=")[1].split(";")[0];
  const userData = JSON.parse(
    decodeURIComponent(document.cookie.split("user=")[1].split(";")[0])
  );
  const title = formData.get("title");
  const image = formData.get("image") as File;
  const content = formData.get("content");
  const language = formData.get("language");

  try {
    const response = await apiService.post(
      "posts",
      {
        data: { title, content, language, user: userData },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newformData = new FormData();
    newformData.append("ref", "api::post.post");
    newformData.append("refId", response.data.id);
    newformData.append("field", "image");
    newformData.append("files", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (response.data) {
      try {
        await apiService.post("upload", newformData, config);
      } catch (error) {
        console.log(error);
      }
      revalidatePath("/blogs");
      redirect("/blogs");
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
