import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { CreateFacility, FieldInterface } from "../../constants/facility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { FacilityService } from "../../datasource/Factility";

const schema = yup
  .object({
    name: yup.string().required("Trường này bắt buộc nhập"),
    // address
    number: yup.string().required("Trường này bắt buộc nhập"),
    street: yup.string().required("Trường này bắt buộc nhập"),
    ward: yup.string().required("Trường này bắt buộc nhập"),
    city: yup.string().required("Trường này bắt buộc nhập"),

    //
    numOfFields: yup.string().required("Trường này bắt buộc nhập"),
  })
  .required();

const FacilityPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      numOfFields: "0",
    },
  });

  const { messageWarning, handleMessageError } = useNotification();
  const { account } = useAccountStore();

  const [fields, setFields] = useState<FieldInterface[]>([]);
  const [fieldTmp, setFieldTmp] = useState<string | null>(null);

  const onChangeField = (e: any) => {
    setFieldTmp(e.target.value);
  };

  const handleAddField = () => {
    if (fieldTmp === null) {
      messageWarning("Chọn loại sân trước khi thêm");
      return;
    }

    const fieldAdd: FieldInterface = {
      index: (fields.length + 1).toString(),
      type: fieldTmp,
    };

    setFields([...fields, fieldAdd]);
  };

  const handleAddFacility = async (params: any) => {
    try {
      const facilityAdd: CreateFacility = {
        name: params.name,
        address: {
          number: params.number,
          street: params.street,
          ward: params.ward,
          city: params.city,
        },
        numOfFields: params.numOfFields,
        ownerId: account.id,
        fields: fields,
      };

      const rs = await FacilityService.createFacility(facilityAdd);
      console.log("🚀 -> handleAddFacility -> rs:", rs);
    } catch (error) {
      handleMessageError(error);
    }
  };

  useEffect(() => {
    const numOfFields = fields.length;
    setValue("numOfFields", numOfFields.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return (
    <WrapperFacilityPage>
      <Container>
        <Form.Group className="mb-3">
          <Form.Label>Tên cơ sở</Form.Label>
          <Form.Control {...register("name")} type="text" />
          <p>{errors.name?.message}</p>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <br />

          <Form.Label>Thành phố</Form.Label>
          <Form.Control {...register("city")} type="text" />
          <p>{errors.city?.message}</p>

          <Form.Label>Phường</Form.Label>
          <Form.Control {...register("ward")} type="text" />
          <p>{errors.ward?.message}</p>

          <Form.Label>Đường</Form.Label>
          <Form.Control {...register("street")} type="text" />
          <p>{errors.street?.message}</p>

          <Form.Label>Số</Form.Label>
          <Form.Control {...register("number")} type="text" />
          <p>{errors.number?.message}</p>

          <Form.Label>Số sân trong cơ sở</Form.Label>
          <Form.Control {...register("numOfFields")} type="text" disabled />
        </Form.Group>

        <Form.Group className="mb-3" onChange={onChangeField}>
          <Form.Label>Sân trong cơ sở:</Form.Label>
          <Form.Check
            label="5x5"
            name="group1"
            type="radio"
            id={`reverse-radio-1`}
            value={"5x5"}
          />
          <Form.Check
            label="7x7"
            name="group1"
            type="radio"
            id={`reverse-radio-2`}
            value={"7x7"}
          />
        </Form.Group>

        <Button onClick={handleAddField}>Thêm sân</Button>

        <br />

        {fields.map((field: FieldInterface, index: number) => (
          <div key={index}>
            <span>Index: {field.index}</span> - Type: <span>{field.type}</span>
          </div>
        ))}

        <Button onClick={handleSubmit(handleAddFacility)}>Thêm cơ sở</Button>
      </Container>
    </WrapperFacilityPage>
  );
};

export default FacilityPage;

const WrapperFacilityPage = styled.div``;
