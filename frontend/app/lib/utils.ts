import axios from "axios";
import BaseService from "@/services/baseService";
import { Post } from "../blogs/types";
import { unstable_noStore as noStore } from "next/cache";
const apiService = new BaseService();
export interface PostsType {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const getPosts = async (params: any) => {
  noStore();
  const response: PostsType = await apiService.get(
    `posts?filters[title][$contains]=${
      params || ""
    }&populate[user][populate][0]=profilePicture&populate=image`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  return response;
};

export const getSingePost = async (id: string) => {
  noStore();
  const response = await apiService.get(
    `posts/${id}?populate[user][populate][0]=profilePicture&populate=image`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  return response.data;
};
