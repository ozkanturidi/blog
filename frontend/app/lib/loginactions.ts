import { cookies } from "next/headers";
import BaseService from "@/services/baseService";

const apiService = new BaseService();
export const loginUser = async (currentState, formData: FormData) => {
  const identifier = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await apiService.post("auth/local", {
      identifier,
      password,
    });
    cookies().set("jwt", response.jwt);
  } catch (error) {
    console.log(error.message);
  }
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
