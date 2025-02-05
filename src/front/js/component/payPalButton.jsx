import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const initialOptions = {
    "client-id": "Afxyb16-s7wljjjWVdqGTkeWmFBeevsII4kkwn1_G3zX4C59yioQxzbCoSswp8NFqcdFyTec1xGgtVGL",
    currency: "USD",
    intent: "capture"
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "8"
          }
        }
      ]
    });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("Transacción completada por " + details.payer.name.given_name)
    })
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "blue",
          shape: "rect",
          label: "paypal"
        }}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </PayPalScriptProvider>
  )


};

