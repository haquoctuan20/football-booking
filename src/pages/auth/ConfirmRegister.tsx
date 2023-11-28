/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRegisterStore } from "../../store/useRegisterStore";
import { WrapperAuth } from "./AuthStyled";
import { useState } from "react";
import { AccountServices } from "../../datasource/Account";
import LoadingComponent from "../../components/LoadingComponent";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

const schema = yup
  .object({
    otp: yup.number().required("Trường này bắt buộc nhập"),
  })
  .required();

const ConfirmRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleMessageError } = useNotification();
  const mailVerify = useRegisterStore((state) => state.mailVerify);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleValidateCode = async (params: any) => {
    console.log("🚀 -> handleValidateCode -> params:", params);

    try {
      setLoading(true);

      if (!mailVerify) {
        navigate("/register");
        return;
      }

      const rs = await AccountServices.verifyRegister(mailVerify, params.otp);
      console.log("🚀 -> handleValidateCode -> rs:", rs);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperAuth>
      {loading && <LoadingComponent />}

      <h4 className="title-auth">Xác nhận đăng ký</h4>

      <div>Email: {mailVerify}</div>

      <Form onSubmit={handleSubmit(handleValidateCode)}>
        <div className="label-auth">Mã xác nhận</div>
        <Form.Control {...register("otp")} type="text" />
        <p className="auth-error">{errors.otp?.message}</p>

        <div className="d-flex justify-content-center">
          <Button variant="light" type="submit">
            Xác nhận
          </Button>
        </div>
      </Form>
    </WrapperAuth>
  );
};

export default ConfirmRegister;
