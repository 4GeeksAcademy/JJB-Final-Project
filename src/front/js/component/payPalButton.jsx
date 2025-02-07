import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";

export const PayPalButton = ({ disabled }) => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  const initialOptions = {
    "client-id": "Afxyb16-s7wljjjWVdqGTkeWmFBeevsII4kkwn1_G3zX4C59yioQxzbCoSswp8NFqcdFyTec1xGgtVGL",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });
    const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    let description, value;
    if (location.pathname === "/subscription") {
      description = "Suscripción Plan Premium";
      value = "8";
    } else if (location.pathname === "/invoice") {
      description = `Mensualidad ${formattedMonth}`;
      value = "10";
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: value,
          },
          description: description,
        },
      ],
    });
  };

  const onApprove = async (data, paypalActions) => {
    try {
      const details = await paypalActions.order.capture();
      const amount = details.purchase_units[0].amount.value;
      const concept = details.purchase_units[0].description;
      const id_order = details.id;

      if (location.pathname === "/subscription") {
        await actions.paySubscription(id_order, amount, concept);
        await actions.loadProfile();
        await actions.loadInvoices();
      } else if (location.pathname === "/invoices") {
        await actions.updateInvoice(id_order, amount, concept);
        await actions.loadProfile();
        await actions.loadInvoices();
      }

      console.log("Factura enviada correctamente");
    } catch (error) {
      console.error("Error al enviar la factura:", error);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.5 : 1 }}>
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </PayPalScriptProvider>
  );
};
