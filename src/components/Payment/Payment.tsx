import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Payment = () => {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "Adht7Yqs_kdhjoqRr2LXrGh1B-DLEKqQU7_y3BgxQnUMwjzhG4M3AjEhhMTeu4hn1oP-pu28Kj3UYJVN",
          locale: "en_VN",
        }}
      >
        <PayPalButtons style={{ layout: "vertical" }} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
