import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom"; // 📌 Importamos useLocation para detectar la ruta actual

export const PayPalButton = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation(); // 📌 Obtenemos la ruta actual
  console.log(location);
  
  

  const initialOptions = {
    "client-id": "Afxyb16-s7wljjjWVdqGTkeWmFBeevsII4kkwn1_G3zX4C59yioQxzbCoSswp8NFqcdFyTec1xGgtVGL",
    currency: "USD",
    intent: "capture",
  };

  // 📌 Crear orden dinámicamente según la ruta
  const createOrder = (data, actions) => {
    const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });
    const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    let description;
    if (location.pathname === "/subscription") {
      description = "Suscripción Plan Premium";
    } else if (location.pathname === "/invoices") {
      description = `Mensualidad ${formattedMonth}`;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "8",
          },
          description: description,
        },
      ],
    });
  };

  // 📌 Manejar la aprobación del pago
  const onApprove = async (data, paypalActions) => {
    try {
      const details = await paypalActions.order.capture();
      const amount = details.purchase_units[0].amount.value;
      const concept = details.purchase_units[0].description;
      const id_order = details.id;

      if (location.pathname === "/subscription") {
        await actions.paySubscription(id_order, amount, concept);
        await actions.loadProfile()
        await actions.loadInvoices()
      } else if (location.pathname === "/invoices") {
        await actions.updateInvoices(id_order, amount, concept);
        await actions.loadProfile()
        await actions.loadInvoices()
      }

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
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </PayPalScriptProvider>
  );
};
