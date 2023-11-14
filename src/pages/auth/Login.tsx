/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WrapperAuth } from "./AuthStyled";

const schema = yup
  .object({
    email: yup.string().required("Error bat buoc nhap"),
    password: yup.string().required("Error bat buoc nhap"),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (params: any) => {
    console.log("🚀 -> handleLogin -> params:", params);
    alert(JSON.stringify(params));
  };

  return (
    <WrapperAuth>
      <Container className="container-auth">
        <div className="left-side">left side</div>

        <div className="right-side">
          <h4>Login</h4>

          <Form onSubmit={handleSubmit(handleLogin)}>
            <div>Email</div>
            <Form.Control {...register("email")} type="password" />
            <p className="auth-error">{errors.email?.message}</p>

            <br />

            <div>Password</div>
            <Form.Control {...register("password")} type="password" />
            <p className="auth-error">{errors.password?.message}</p>

            <br />

            <Button type="submit">Login</Button>
          </Form>
        </div>
      </Container>
    </WrapperAuth>
  );
};

export default LoginPage;
