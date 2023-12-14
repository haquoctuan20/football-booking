import { useParams } from "react-router-dom";
import { FacilityService } from "../../datasource/Factility";
import { useEffect, useState } from "react";
import { IFacility } from "../../constants/facility";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import moment from "moment";
import MessageError from "../../components/MessageError";
import styled from "styled-components";
import useNotification from "../../hooks/useNotification";
import SkeletonRow from "../../components/SkeletonRow";
import LoadingComponent from "../../components/LoadingComponent";

const schema = yup
  .object({
    startAtTime: yup.date().required("Trường này bắt buộc nhập"),
    endAtTime: yup.date().required("Trường này bắt buộc nhập"),
    amount: yup.number().required("Trường này bắt buộc nhập"),
    specialAmount: yup.number().required("Trường này bắt buộc nhập"),
    fieldType: yup.string().required("Trường này bắt buộc nhập"),
  })
  .required();

const FacilityPrice = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      specialAmount: 0,
    },
  });
  const startAtTime = watch("startAtTime");
  const endAtTime = watch("endAtTime");

  const { id } = useParams();
  const { handleMessageError, messageSuccess } = useNotification();

  const [facility, setFacility] = useState<IFacility>();
  const [prices, setPrices] = useState([]);

  const [loadingFacility, setLoadingFacility] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timeline, setTimeline] = useState<number>(90);

  const onChangeField = (e: any) => {
    setValue("fieldType", e.target.value);
  };

  const handleGetFacilityById = async (id: string) => {
    try {
      setLoadingFacility(true);
      const { data } = await FacilityService.getFacilityById(id);
      setFacility(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingFacility(false);
    }
  };

  const handleGetPriceByFacilityById = async (id: string) => {
    try {
      setLoadingPrice(true);
      const { data } = await FacilityService.getPriceByFacilityId(id);
      setPrices(data);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleChangeTime = (date: Date | null) => {
    if (!date) {
      return;
    }

    setValue("startAtTime", date);

    const endTime = moment(date).add(timeline, "minutes");

    setValue("endAtTime", moment(endTime).toDate());
  };

  const handleAddPrice = async (params: any) => {
    if (!id) return;

    try {
      setLoading(true);

      const priceAdd = {
        facilityId: id,
        fieldType: params.fieldType,
        startAt: {
          hour: moment(params.startAtTime).hour(),
          minute: moment(params.startAtTime).minute(),
        },
        endAt: {
          hour: moment(params.endAtTime).hour(),
          minute: moment(params.endAtTime).minute(),
        },
        amount: params.amount,
        specialAmount: params.specialAmount,
      };

      await FacilityService.createPrice(priceAdd);
      messageSuccess("Thêm bảng giá thành công");
      handleGetPriceByFacilityById(id);
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeTimeline = (e: any) => {
    setTimeline(e.target.value);

    const endTime = moment(startAtTime).add(Number(e.target.value), "minutes");

    setValue("endAtTime", moment(endTime).toDate());
  };

  useEffect(() => {
    if (!id) return;

    handleGetFacilityById(id);
    handleGetPriceByFacilityById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <WrapperFacilityPrice>
      {loading && <LoadingComponent />}

      <Container>
        {/* info */}
        {loadingFacility ? (
          <SkeletonRow />
        ) : (
          <div className="container-info">
            <div>Tên cơ sở: {facility?.name}</div>
            <div>Số sân: {facility?.numOfFields}</div>
            <div>
              Địa chỉ: {facility?.address?.number}, {facility?.address?.street},{" "}
              {facility?.address?.ward}, {facility?.address?.city}
            </div>
          </div>
        )}

        {/* create price */}
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-3" onChange={onChangeField}>
              <Form.Label>Sân trong cơ sở:</Form.Label>
              <MessageError msg={errors.fieldType?.message} />

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
          </Col>

          <Col lg={4}>
            <Form.Label>Thời gian:</Form.Label>
            <MessageError msg={errors.startAtTime?.message || errors.endAtTime?.message} />

            <div>Bắt đầu</div>
            <ReactDatePicker
              showTimeSelect
              showTimeSelectOnly
              locale="vi"
              dateFormat="HH:mm"
              autoComplete="off"
              timeCaption="Bắt đầu"
              selected={startAtTime}
              onChange={(date: any) => {
                handleChangeTime(date);
              }}
            />

            <div className="mt-2">Thời gian mỗi trận</div>

            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                id="inputPassword5"
                min={0}
                value={timeline}
                onChange={handleChangeTimeline}
              />
              <InputGroup.Text id="basic-addon2">Phút</InputGroup.Text>
            </InputGroup>

            <div className="mt-2">Kết thúc</div>
            <ReactDatePicker
              showTimeSelect
              showTimeSelectOnly
              locale="vi"
              dateFormat="HH:mm"
              autoComplete="off"
              timeCaption="Kết thúc"
              selected={endAtTime}
              minTime={startAtTime}
              onChange={() => {}}
              disabled
            />
          </Col>

          <Col lg={4}>
            <Form.Label>Bảng giá:</Form.Label>
            <MessageError msg={errors.amount?.message || errors.specialAmount?.message} />
            {/* <MessageError msg={errors.specialAmount?.message} /> */}

            <div>amount</div>
            <Form.Control {...register("amount")} type="number" />

            <div className="mt-2">specialAmount</div>
            <Form.Control {...register("specialAmount")} type="number" />
          </Col>
        </Row>

        <Button variant="success" onClick={handleSubmit(handleAddPrice)}>
          Thêm bảng giá
        </Button>

        <div className="mt-5">
          {loadingPrice ? (
            <SkeletonRow />
          ) : (
            <>
              <Form.Label>Danh sách bảng giá</Form.Label>

              <Table size="sm">
                <thead>
                  <tr>
                    <th className="min-width-80">#</th>
                    <th>Loại sân</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>amount</th>
                    <th>specialAmount</th>
                  </tr>
                </thead>

                <tbody>
                  {prices.map((price: any, index: number) => (
                    <tr key={index}>
                      <td className="min-width-80">{index + 1}</td>
                      <td>{price?.fieldType}</td>
                      <td>
                        {price?.startAt?.hour}:
                        {price?.startAt?.minute === 0 ? "00" : price?.startAt?.minute}
                      </td>
                      <td>
                        {price?.endAt?.hour}:
                        {price?.endAt?.minute === 0 ? "00" : price?.endAt?.minute}
                      </td>

                      <td>{price?.amount}</td>
                      <td>{price?.specialAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Container>
    </WrapperFacilityPrice>
  );
};

export default FacilityPrice;

const WrapperFacilityPrice = styled.div`
  .container-info {
    padding: 8px;
    border: 1px solid #cfcfcf;
    border-radius: 8px;

    margin-bottom: 12px;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker-wrapper input {
    width: 100%;
  }
`;
