import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRef } from "react";

const Payment = () => {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            "AVqc7Ng7WHvvVAU-h3s4ZXs2BuJV2qZZh4bRifJhkpz2M-z8fsF4Gm8Zd82Z20VyLa-Ln_eE-FziGxoV",
          locale: "en_VN",
        }}
      >
        <PayPalButtons style={{ layout: "vertical" }} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Payment;
