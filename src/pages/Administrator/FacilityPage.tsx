import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { CreateFacility, FieldInterface } from "../../constants/facility";
import useNotification from "../../hooks/useNotification";
import { useAccountStore } from "../../store/useAccountStore";
import { FacilityService } from "../../datasource/Factility";
import MessageError from "../../components/MessageError";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";

const schema = yup
  .object({
    name: yup.string().required("Trường này bắt buộc nhập"),
    // address
    number: yup.string().required("Thiếu số"),
    street: yup.string().required("Thiếu tên đường"),
    ward: yup.string().required("Thiếu phường"),
    city: yup.string().required("Thiếu thành phố"),

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

  const { messageWarning, handleMessageError, messageSuccess } =
    useNotification();
  const { account } = useAccountStore();
  const navigate = useNavigate();

  const [fields, setFields] = useState<FieldInterface[]>([]);
  const [fieldTmp, setFieldTmp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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

      await FacilityService.createFacility(facilityAdd);
      messageSuccess("Thêm cơ sở thành công");
      navigate("/administrator/facility");
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const numOfFields = fields.length;
    setValue("numOfFields", numOfFields.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  return (
    <WrapperFacilityPage>
      {loading && <LoadingComponent />}

      <Container>
        <Form.Group className="mb-3">
          <Form.Label>
            Tên cơ sở <span className="required-field">*</span>
          </Form.Label>
          <Form.Control {...register("name")} type="text" />
          <MessageError msg={errors.name?.message} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <br />
          <Row>
            <Col xl={3}>
              <div>
                Thành phố <span className="required-field">*</span>
              </div>
              <Form.Control {...register("city")} type="text" />
              <MessageError msg={errors.city?.message} />
            </Col>

            <Col xl={4}>
              <div>
                Phường <span className="required-field">*</span>
              </div>
              <Form.Control {...register("ward")} type="text" />
              <MessageError msg={errors.ward?.message} />
            </Col>

            <Col xl={4}>
              <div>
                Đường <span className="required-field">*</span>
              </div>
              <Form.Control {...register("street")} type="text" />
              <MessageError msg={errors.street?.message} />
            </Col>

            <Col xl={1}>
              <div>
                Số <span className="required-field">*</span>
              </div>
              <Form.Control {...register("number")} type="text" />
              <MessageError msg={errors.number?.message} />
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col xl={4}>
            <Form.Group className="mb-3" onChange={onChangeField}>
              <Form.Label>Sân trong cơ sở:</Form.Label>
              <div>Loại sân</div>
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

            <Button variant="secondary" size="sm" onClick={handleAddField}>
              Thêm sân
            </Button>
          </Col>

          <Col xl={8}>
            <Form.Label>Số sân trong cơ sở</Form.Label>
            <Form.Control {...register("numOfFields")} type="text" disabled />

            <div className="table-fields mt-2">
              {/* {fields.map((field: FieldInterface, index: number) => (
                <div key={index}>
                  <span>Index: {field.index}</span> - Type:{" "}
                  <span>{field.type}</span>
                </div>
              ))} */}

              <Table size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Loại sân</th>
                  </tr>
                </thead>

                <tbody>
                  {fields.map((field: FieldInterface, index: number) => (
                    <tr key={index}>
                      <td>{field.index}</td>
                      <td>{field.type}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <div className="w-100 text-center mt-5">
          <Button variant="success" onClick={handleSubmit(handleAddFacility)}>
            Thêm cơ sở
          </Button>
        </div>
      </Container>
    </WrapperFacilityPage>
  );
};

export default FacilityPage;

const WrapperFacilityPage = styled.div`
  .table-fields {
    max-height: 300px;
    overflow: auto;
  }
`;
