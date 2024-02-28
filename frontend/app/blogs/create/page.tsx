"use client";
import createBlog from "@/app/lib/actions";
import {
  Box,
  Flex,
  TextArea,
  TextFieldInput,
  Text,
  Section,
  Button,
  Switch,
} from "@radix-ui/themes";
import BaseService from "@/services/baseService";

import { useFormState } from "react-dom";
import axios from "axios";
import { headers } from "next/headers";
const apiService = new BaseService();

const Page = () => {
  const userData = JSON.parse(
    decodeURIComponent(document.cookie.split("user=")[1].split(";")[0])
  );

  const submitHandler = async (e: any) => {
    const formData = new FormData(e.target);
    await axios.post("http://localhost:3000/blogs/create/api", {
      title: formData.get("title"),
      content: formData.get("content"),
      language: formData.get("language"),
      image: formData.get("image") as File,
      user: userData,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <Section width={"100%"}>
        <Text>Create Your Blog</Text>
        <Flex direction={"column"} gap={"4"}>
          <TextFieldInput
            style={{ borderColor: "transparent" }}
            placeholder="Title"
            size="2"
            name="title"
            radius="medium"
            id="title"
          />

          <TextArea
            rows={10}
            placeholder="Content"
            maxLength={400}
            name="content"
          />
          <input type="file" name="image" id="file" accept="image/*" />
          <Text as="label" size="2">
            <Flex gap="2">
              <Switch defaultChecked value={"Turkish"} name="language" /> Türkçe
            </Flex>
          </Text>
          <Flex justify={"end"}>
            <Button type="submit">Submit</Button>
          </Flex>
        </Flex>
      </Section>
    </form>
  );
};

export default Page;
