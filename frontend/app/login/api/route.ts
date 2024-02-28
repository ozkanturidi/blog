import { NextRequest } from "next/server";
import BaseService from "@/services/baseService";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";
import { cookies } from "next/headers";

const apiService = new BaseService();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const response = await apiService.post("auth/local", {
    identifier: formData.get("email"),
    password: formData.get("password"),
  });
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("token", response.jwt, { expires: Date.now() - oneDay });

  permanentRedirect("/blogs");
}
