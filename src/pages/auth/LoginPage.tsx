/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { WrapperAuth } from "./AuthStyled";
import { AccountServices } from "../../datasource/Account";
import { useAccountStore } from "../../store/useAccountStore";
import { useState } from "react";
import LoadingComponent from "../../components/LoadingComponent";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const setAccount = useAccountStore((state) => state.setAccount);

  const [loading, setLoading] = useState(false);

  const handleLogin = (params: any) => {
    setLoading(true);

    console.log("🚀 -> handleLogin -> params:", params);
    const rs = AccountServices.login();
    console.log("🚀 - handleLogin - rs: ", rs);

    AccountServices.setAccessToken(rs.accessToken);
    setAccount({ email: rs.email });

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <WrapperAuth>
      {loading && <LoadingComponent />}

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
    </WrapperAuth>
  );
};

export default LoginPage;
