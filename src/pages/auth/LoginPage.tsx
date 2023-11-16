/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WrapperAuth } from "./AuthStyled";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Trường này bắt buộc nhập")
      .matches(/^\S+@\S+\.\S+$/, "Email bạn nhập không hợp lệ"),
    password: yup.string().required("Trường này bắt buộc nhập"),
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
        <div className="left-side"></div>

        <div className="right-side">
          <h4 className="title-auth">Đăng nhập</h4>

          <Form onSubmit={handleSubmit(handleLogin)}>
            <div className="label-auth">Email</div>
            <Form.Control {...register("email")} type="text" />
            <p className="auth-error">{errors.email?.message}</p>

            <div className="label-auth">Mật khẩu</div>
            <Form.Control {...register("password")} type="password" />
            <p className="auth-error">{errors.password?.message}</p>

            <br />

            <div className="d-flex justify-content-center">
              <Button variant="light" type="submit">
                Đăng nhập
              </Button>
            </div>

            <hr />

            <Link to="/register">Tôi chưa có tài khoản</Link>
          </Form>
        </div>
      </Container>
    </WrapperAuth>
  );
};

export default LoginPage;
