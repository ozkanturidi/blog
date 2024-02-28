import { Button, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";

const LoginForm = () => {
  const submitHandler = async (e: any) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    await axios.post("http://localhost:3000/login/api", formData);
  };
  return (
    <form onSubmit={submitHandler}>
      <TextFieldInput type="email" name="email" />
      <TextFieldInput type="password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
