/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { WrapperAuth } from "./AuthStyled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";

const schema = yup
  .object({
    code: yup.number().required("Trường này bắt buộc nhập"),
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

  const handleValidateCode = (params: any) => {
    console.log("🚀 -> handleValidateCode -> params:", params);
  };

  return (
    <WrapperAuth>
      <h4 className="title-auth">Xác nhận đăng ký</h4>

      <Form onSubmit={handleSubmit(handleValidateCode)}>
        <div className="label-auth">Code</div>
        <Form.Control {...register("code")} type="text" />
        <p className="auth-error">{errors.code?.message}</p>

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
