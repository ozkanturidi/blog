"use client";
import LoginForm from "@/components/login/loginForm";
import RegisterForm from "@/components/login/registerForm";
import { Button, TextFieldInput } from "@radix-ui/themes";
import { useFormState } from "react-dom";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
