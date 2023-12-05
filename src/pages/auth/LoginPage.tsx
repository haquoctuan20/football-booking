/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoadingComponent from "../../components/LoadingComponent";
import { AccountServices } from "../../datasource/Account";
import { Account, useAccountStore } from "../../store/useAccountStore";
import { WrapperAuth } from "./AuthStyled";
import useNotification from "../../hooks/useNotification";

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

  const navigate = useNavigate();

  const { setAccount, resetAccount } = useAccountStore((state) => state);
  const { handleMessageError } = useNotification();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (params: any) => {
    try {
      setLoading(true);
      const { data } = await AccountServices.login(params.email, params.password);

      AccountServices.setAccessToken(data);

      const { data: user } = await AccountServices.getInfoUser();

      const userData: Account = {
        age: user.age,
        email: user.email,
        gender: user.gender,
        id: user.id,
        image: user.image,
        roles: user.roles,
        username: user.username,
        status: user.status,
        accessToken: data,
      };

      setAccount(userData);

      navigate("/");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
