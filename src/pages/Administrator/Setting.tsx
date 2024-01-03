import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import LoadingComponent from "../../components/LoadingComponent";
import { PaymentService } from "../../datasource/Payment";
import useNotification from "../../hooks/useNotification";
import queryString from "query-string";
import { useAccountStore } from "../../store/useAccountStore";
import { AccountServices } from "../../datasource/Account";
import { useNavigate } from "react-router-dom";
import { handleOpenPopup } from "../../utils/popupWindow";
import LOGO_PAYPAL from "../../assets/paypal_logo_icon_170865.png";

const Setting = () => {
  const { handleMessageError, messageSuccess } = useNotification();
  const { account, fetchingUser } = useAccountStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePartnerReferral = async () => {
    try {
      setLoading(true);
      const { data } = await PaymentService.partnerReferral();

      const actionURL = data.links.find((i: any) => i?.rel === "action_url");

      // window.open(`${actionURL?.href}&displayMode=minibrowser`, "mywindow", "status=1");
      handleOpenPopup({ url: `${actionURL?.href}&displayMode=minibrowser` });
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePartner = async (params: { merchantId: string; trackingId: string }) => {
    try {
      setLoading(true);

      await AccountServices.updateMyProfile(params);

      messageSuccess("Liên kết phương thức thanh toán thành công");

      navigate("/administrator/setting");

      fetchingUser();
    } catch (error) {
      handleMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account.merchantId && account.trackingId) {
      return;
    }
    /**
     * trackingId = merchantId
     * merchantId = merchantIdInPayPal
     */
    const parsedReceiver = queryString.parse(location.search);

    const parsed = JSON.parse(JSON.stringify(parsedReceiver));

    if (!parsed.merchantId || !parsed.merchantIdInPayPal) {
      return;
    }
    if (
      account.merchantId === parsed.merchantIdInPayPal ||
      account.trackingId === parsed.merchantId
    ) {
      return;
    }

    handleUpdatePartner({ merchantId: parsed.merchantIdInPayPal, trackingId: parsed.merchantId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, account]);

  return (
    <WrapperSetting>
      {loading && <LoadingComponent />}

      <Row>
        <Col md={4}>
          <h5>Phương thức thanh toán</h5>
          <div>
            Cung cấp dịch vụ khách hàng tốt hơn bằng cách thiết lập phương thức thanh toán trực
            tuyến đơn giản.
          </div>
        </Col>

        <Col md={8}>
          <div className="container-payment-method">
            <img src={LOGO_PAYPAL} alt="paypal" className="icon-method" />

            <div>
              <ul>
                <li>
                  Giúp thúc đẩy chuyển đổi bằng cách cung cấp cho khách hàng trải nghiệm thanh toán
                  liền mạch mà không cần thiết lập hoặc phí hàng tháng
                </li>
                <li>
                  Một hệ thống thanh toán tích hợp duy nhất đảm bảo bạn luôn được cập nhật các
                  phương thức thanh toán mới nhất
                </li>
                <li>
                  Chấp nhận thẻ tín dụng/thẻ ghi nợ chính và các phương thức thanh toán địa phương
                  thay thế thông qua ví PayPal
                </li>
              </ul>
            </div>

            <div className="px-2">
              {account.merchantId ? (
                <div>
                  <strong>Merchant ID: </strong> <span>{account.merchantId}</span>
                </div>
              ) : (
                <>
                  <Button variant="success" onClick={handlePartnerReferral}>
                    Kết nối với PayPal
                  </Button>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </WrapperSetting>
  );
};

export default Setting;

const WrapperSetting = styled.div`
  .container-payment-method {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 4px;

    .icon-method {
      height: 60px;
    }
  }
`;
