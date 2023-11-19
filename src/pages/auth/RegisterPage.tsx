/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useRegisterStore } from "../../store/useRegisterStore";
import { WrapperAuth } from "./AuthStyled";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Trường này bắt buộc nhập")
      .matches(/^\S+@\S+\.\S+$/, "Email bạn nhập không hợp lệ"),
    password: yup.string().required("Trường này bắt buộc nhập"),
    rePassword: yup.string().required("Trường này bắt buộc nhập"),
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

  const handleLogin = (params: any) => {
    console.log("🚀 - handleLogin - params: ", params);
    setMailVerify(params.email);
    navigate(`/confirm-register`);
  };

  return (
    <WrapperAuth>
      <h4 className="title-auth">Đăng ký</h4>

      <Form onSubmit={handleSubmit(handleLogin)}>
        <div className="label-auth">Email</div>
        <Form.Control {...register("email")} type="text" />
        <p className="auth-error">{errors.email?.message}</p>

        <div className="label-auth">Mật khẩu</div>
        <Form.Control {...register("password")} type="password" />
        <p className="auth-error">{errors.password?.message}</p>

        <div className="label-auth">Nhập lại mật khẩu</div>
        <Form.Control {...register("rePassword")} type="password" />
        <p className="auth-error">{errors.rePassword?.message}</p>

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
