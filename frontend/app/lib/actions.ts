import BaseService from "@/services/baseService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const apiService = new BaseService();

export const createBlog = async (currentState, formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const language = formData.get("language");
  console.log(title, content, language);
  try {
    await apiService.post("posts", { data: { title, content, language } });
    revalidatePath("/blogs");
  } catch (e: any) {
    console.log(e.message);
  }
  redirect("/blogs");
};
