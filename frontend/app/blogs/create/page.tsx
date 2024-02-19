"use client";
import { createBlog } from "@/app/lib/actions";
import {
  Box,
  Flex,
  TextArea,
  TextField,
  TextFieldInput,
  TextFieldRoot,
  Text,
  Section,
  Button,
  Switch,
} from "@radix-ui/themes";

import { useFormState } from "react-dom";

const Page = () => {
  const initialState = new FormData();
  const [state, formAction] = useFormState(createBlog, null);
  return (
    <form action={formAction}>
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
            minLength={10}
            maxLength={400}
            name="content"
          />
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
