import { cookies } from "next/headers";
import BaseService from "@/services/baseService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const apiService = new BaseService();
export const loginUser = async (currentState, formData: FormData) => {
  const identifier = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await apiService.post("auth/local", {
      identifier,
      password,
    });
    document.cookie = `token=${response.jwt}; path=/;`;
    document.cookie = `user=${JSON.stringify(response.user)}; path=/;`;
    localStorage.setItem("token", response.jwt);
    localStorage.setItem("isLoggedIn", "true");
    revalidatePath("/blogs");
  } catch (error) {
    console.log(error.message);
  }
  redirect("/blogs");
};

export const createUser = async (currentState, formData: FormData) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await apiService.post("auth/local/register", { username, email, password });
  } catch (e: any) {
    console.log(e.message);
  }
};
