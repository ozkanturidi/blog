"use client";

import { createUser } from "@/app/lib/actions";
import { Button, TextFieldInput } from "@radix-ui/themes";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [state, registerAction] = useFormState(createUser, null);

  return (
    <form action={registerAction}>
      <TextFieldInput type="text" placeholder="username" name="username" />
      <TextFieldInput type="email" placeholder="email" name="email" />
      <TextFieldInput type="password" placeholder="password" name="password" />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
