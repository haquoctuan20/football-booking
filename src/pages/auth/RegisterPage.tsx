/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoadingComponent from "../../components/LoadingComponent";
import { ROLES } from "../../constants/constants";
import { AccountServices, accountRegister } from "../../datasource/Account";
import useNotification from "../../hooks/useNotification";
import { useRegisterStore } from "../../store/useRegisterStore";
import { WrapperAuth } from "./AuthStyled";

const schema = yup
  .object({
    username: yup.string().required("Trường này bắt buộc nhập"),
    role: yup.string().required("Trường này bắt buộc nhập"),
    email: yup
      .string()
      .required("Trường này bắt buộc nhập")
      .matches(/^\S+@\S+\.\S+$/, "Email bạn nhập không hợp lệ"),
    password: yup
      .string()
      .required("Trường này bắt buộc nhập")
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(32, "Mật khẩu tối đa 32 ký tự"),
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const setMailVerify = useRegisterStore((state) => state.setMailVerify);
  const { handleMessageError } = useNotification();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (params: any) => {
    try {
      setLoading(true);

      const accountRegister: accountRegister = {
        username: params.username,
        email: params.email,
        password: params.password,
        role: params.role,
      };

      const {
        data: { user },
      } = await AccountServices.register(accountRegister);

      setMailVerify(user.email);
      navigate(`/confirm-register`);
    } catch (error: any) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperAuth>
      {loading && <LoadingComponent />}

      <h4 className="title-auth">Đăng ký</h4>

      <Form onSubmit={handleSubmit(handleLogin)}>
        <div className="label-auth">Tên tài khoản</div>
        <Form.Control {...register("username")} type="text" />
        <p className="auth-error">{errors.username?.message}</p>

        <div className="label-auth">Email</div>
        <Form.Control {...register("email")} type="text" />
        <p className="auth-error">{errors.email?.message}</p>

        <div className="label-auth">Mật khẩu</div>
        <Form.Control {...register("password")} type="password" />
        <p className="auth-error">{errors.password?.message}</p>

        <div className="label-auth">Vai trò của bạn</div>
        <Form.Check
          type="radio"
          label="Người dùng"
          id="radio-user"
          value={ROLES.user}
          {...register("role")}
        />

        <Form.Check
          type="radio"
          label="Chủ sân"
          id="radio-owner"
          value={ROLES.owner}
          {...register("role")}
        />
        <br />

        <div className="d-flex justify-content-center">
          <Button variant="light" type="submit">
            Đăng ký
          </Button>
        </div>

        <hr />

        <Link to="/login">Tôi đã có tài khoản</Link>
      </Form>
    </WrapperAuth>
  );
};

export default RegisterPage;
