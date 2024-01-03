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
import UploadCloudinary from "../../components/UploadCloudinary/UploadCloudinary";
import { AccountServices } from "../../datasource/Account";
import useNotification from "../../hooks/useNotification";
registerLocale("vi", vi);

const schema = yup
  .object({
    name: yup.string().required("Trường này bắt buộc nhập").trim(),
    phone: yup.string().required("Trường này bắt buộc nhập").trim(),
    gender: yup.string().required("Trường này bắt buộc nhập").trim(),
    image: yup
      .string()
      .matches(/^[^\s]+$/, "URL chưa hợp lệ")
      .required("Trường này bắt buộc nhập"),
    birthDate: yup.date().required("Trường này bắt buộc nhập"),
    age: yup.string(),
  })
  .required();

interface UpdateProfileProps {
  callbackSuccess?: () => void;
}

const UpdateProfile = ({ callbackSuccess }: UpdateProfileProps) => {
  const { handleMessageError, messageSuccess } = useNotification();
  const { account, fetchingUser } = useAccountStore();

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
      image: account.image ? account.image : "",
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
  const image = watch("image");

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleUploadAvatar = (url: string) => {
    setValue("image", url);
  };

  const handleUpdate = async (params: any) => {
    try {
      setLoadingUpdate(true);

      const paramsUpdate = {
        name: params.name,
        phone: params.phone,
        age: params.age,
        gender: params.gender,
        image: params.image,
        birthDate: moment(params.birthDate).format("DD/MM/yyyy"),
      };

      await AccountServices.updateMyProfile(paramsUpdate);
      fetchingUser();
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
      <div>
        <div className="text-center fs-5 fw-bold">Cập nhật thông tin</div>
        {loadingUpdate ? (
          <>
            <SkeletonRow />
          </>
        ) : (
          <Row>
            <Col lg={4}>
              <div className="height-90">
                <Form.Label>Tên hiển thị</Form.Label>
                <Form.Control type="text" {...register("name")} />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="height-90">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" {...register("phone")} />
                <p className="form-error">{errors.phone?.message}</p>
              </div>
            </Col>
            <Col lg={2}>
              <div className="height-90">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select {...register("gender")}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Form.Select>
              </div>
              <div className="height-90">
                <Form.Label>Ngày sinh - Tuổi : {age}</Form.Label>
                <div>
                  <ReactDatePicker
                    className="w-100"
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
                  {/* <Form.Label className="mx-2">Tuổi : {age}</Form.Label> */}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Form.Label>Ảnh đại diện</Form.Label>

              <UploadCloudinary urlImage={image} callbackUrl={handleUploadAvatar} />

              {/* <Form.Control type="text" {...register("image")} />
              <p className="form-error">{errors.image?.message}</p>

              {image && (
                <div className="d-flex flex-column align-items-center">
                  <div>Xem trước</div>
                  <img src={image} style={{ width: 150, height: 150 }} />
                </div>
              )} */}
            </Col>
          </Row>
        )}
      </div>

      <div>
        <Button
          className="mt-2"
          disabled={loadingUpdate}
          variant="success"
          onClick={handleSubmit(handleUpdate)}
        >
          Cập nhật
        </Button>
      </div>
    </WrapperUpdateProfile>
  );
};

export default UpdateProfile;

const WrapperUpdateProfile = styled.div`
  margin-top: 12px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .react-datepicker-wrapper {
    width: 100%;
  }
`;
