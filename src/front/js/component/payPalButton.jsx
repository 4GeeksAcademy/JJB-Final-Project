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
            value: "8",
            concept: "mensualidad"
          }
        }
      ]
    });
  }

  const onApprove = (data, actions) => {
    console.log(data);

    return actions.order.capture().then(function (details) {
      console.log(details);
      console.log(details.purchase_units[0].amount.value);
      console.log(details.purchase_units[0].amount.concept);
      // const amount = details.purchase_units[0].amount.value
      // const concept = details.purchase_units[0].amount.concept


    })
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="">
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
      </div>

    </PayPalScriptProvider>
  )

};

