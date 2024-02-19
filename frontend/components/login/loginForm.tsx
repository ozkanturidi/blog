"use client";

import { loginUser } from "@/app/lib/loginactions";
import { Button, TextFieldInput } from "@radix-ui/themes";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, loginAction] = useFormState(loginUser, null);
  return (
    <form action={loginAction}>
      <TextFieldInput type="email" name="email" />
      <TextFieldInput type="password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
