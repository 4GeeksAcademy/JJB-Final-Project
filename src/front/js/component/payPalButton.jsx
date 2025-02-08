import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation, useParams, useNavigate } from "react-router-dom";


export const PayPalButton = ({ disabled }) => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const { id_invoice } = useParams(); // Obtiene id_invoice desde la URL
  const navigate = useNavigate();

  const initialOptions = {
    "client-id": "Afxyb16-s7wljjjWVdqGTkeWmFBeevsII4kkwn1_G3zX4C59yioQxzbCoSswp8NFqcdFyTec1xGgtVGL",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });
    const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    let description = "";
    let value = "0.00";

    if (location.pathname.includes("/subscription")) {
      description = "Suscripción Plan Premium";
      value = "8.00";
    } else if (location.pathname.includes("/invoice")) {
      description = `Mensualidad de ${formattedMonth}`;
      value = "10.00";
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

      if (location.pathname.includes("/subscription")) {
        await actions.paySubscription(id_order, amount, concept);
        await actions.loadProfile();
        await actions.loadInvoices();
        navigate("/accountsettings")
      } else if (location.pathname.includes("/invoice")) {
        await actions.payInvoice(id_invoice, id_order, amount, concept);
        await actions.loadProfile();
        await actions.loadInvoices();
        navigate("/invoices")
      }

      await actions.loadProfile();
      await actions.loadInvoices();

      console.log("Pago realizado correctamente:", details);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.5 : 1 }}>
        <PayPalButtons
          style={{ layout: "horizontal", color: "blue", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </PayPalScriptProvider>
  );
};
