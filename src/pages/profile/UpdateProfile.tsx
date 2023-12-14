import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { useAccountStore } from "../../store/useAccountStore";

import vi from "date-fns/locale/vi";
import moment from "moment";
import { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import SkeletonRow from "../../components/SkeletonRow";
import { AccountServices } from "../../datasource/Account";
import useNotification from "../../hooks/useNotification";
registerLocale("vi", vi);

const schema = yup
  .object({
    name: yup.string().required("Trường này bắt buộc nhập").trim(),
    phone: yup.string().required("Trường này bắt buộc nhập").trim(),
    gender: yup.string().required("Trường này bắt buộc nhập").trim(),
    birthDate: yup.date().required("Trường này bắt buộc nhập"),
    age: yup.string(),
  })
  .required();

interface UpdateProfileProps {
  callbackSuccess?: () => void;
}

const UpdateProfile = ({ callbackSuccess }: UpdateProfileProps) => {
  const { handleMessageError, messageSuccess } = useNotification();
  const { account } = useAccountStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: account.name ? account.name : "",
      phone: account.phone ? account.phone : "",
      gender: account.gender
        ? ["Nam", "Nữ"].includes(account.gender)
          ? account.gender
          : "Nam"
        : "Nam",
      birthDate: account.birthDate ? new Date(account.birthDate) : new Date(),
      age: account.age ? account.age : "0",
    },
  });

  const birthDate = watch("birthDate");
  const age = watch("age");

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleUpdate = async (params: any) => {
    try {
      setLoadingUpdate(true);

      const paramsUpdate = {
        name: params.name,
        phone: params.phone,
        age: params.age,
        gender: params.gender,
      };

      await AccountServices.updateMyProfile(paramsUpdate);
      messageSuccess("Cập nhật thành công");

      if (callbackSuccess) {
        callbackSuccess();
      }
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <WrapperUpdateProfile>
      <div className="text-center fs-5 fw-bold">Cập nhật thông tin</div>

      {loadingUpdate ? (
        <>
          <SkeletonRow />
        </>
      ) : (
        <Row>
          <Col lg={4}>
            <Form.Label>Tên hiển thị</Form.Label>
            <Form.Control type="text" {...register("name")} />
            <p className="form-error">{errors.name?.message}</p>

            <Form.Label className="mt-2">Số điện thoại</Form.Label>
            <Form.Control type="text" {...register("phone")} />
            <p className="form-error">{errors.phone?.message}</p>
          </Col>

          <Col lg={4}>
            <Form.Label className="mt-2">Giới tính</Form.Label>
            <Form.Select {...register("gender")}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </Form.Select>

            <Form.Label className="mt-2">Sinh nhật</Form.Label>
            <div>
              <ReactDatePicker
                selected={birthDate}
                locale="vi"
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                showYearDropdown
                onChange={(date: any) => {
                  const years = moment().diff(date, "years");
                  setValue("birthDate", date);
                  setValue("age", years.toString());
                }}
              />
              <Form.Label className="mx-2">Tuổi : {age}</Form.Label>
            </div>
          </Col>
        </Row>
      )}

      <Button
        className="mt-2"
        disabled={loadingUpdate}
        variant="success"
        onClick={handleSubmit(handleUpdate)}
      >
        Cập nhật
      </Button>
    </WrapperUpdateProfile>
  );
};

export default UpdateProfile;

const WrapperUpdateProfile = styled.div`
  margin-top: 12px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
