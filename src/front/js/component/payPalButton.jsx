import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const { store, actions } = useContext(Context); // ✅ Se extrae actions del contexto

  const initialOptions = {
    "client-id": "Afxyb16-s7wljjjWVdqGTkeWmFBeevsII4kkwn1_G3zX4C59yioQxzbCoSswp8NFqcdFyTec1xGgtVGL",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "8",
          },
          description: "Suscripción Plan Premium",
        },
      ],
    });
  };

  const onApprove = async (data, paypalActions) => {
    try {
      const details = await paypalActions.order.capture(); // ✅ Se usa el actions de PayPal

      const amount = details.purchase_units[0].amount.value;
      const concept = details.purchase_units[0].description;
      const id_order = details.id;

      // ✅ Aquí se usa actions.SendInvoices del contexto correctamente
      await actions.sendInvoices(id_order, amount, concept);
      await actions.updateMembership()

      console.log("Factura enviada correctamente");
    } catch (error) {
      console.error("Error al enviar la factura:", error);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)} // ✅ Se pasa correctamente
        />
      </div>
    </PayPalScriptProvider>
  );
};
