import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
    const initialOptions = {
        "client-id": "AcWlZyLHQTTB4CcoUAgJYwtoKhW3i_GSW9zKkol9kSanSIDB9Qimdt8KXboSFSr8eljOjDmo2uLuNGCj",
        currency: "USD",
        intent: "capture"
    };

    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/create-paypal-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ amount: "5" }) // Cambia "5" por el monto dinámico si es necesario
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Error al crear la orden");

            return data.id; // Retorna el ID de la orden creada por el backend
        } catch (error) {
            console.error("Error al crear la orden de PayPal:", error);
            return null;
        }
    };

    const onApprove = async (data) => {
        try {
            const response = await fetch(`http://localhost:5000/capture-paypal-order/${data.orderID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const captureData = await response.json();
            if (!response.ok) throw new Error(captureData.error || "Error al capturar el pago");

            alert("Transacción completada por " + captureData.payer.name.given_name);
        } catch (error) {
            console.error("Error al capturar el pago:", error);
            alert("Hubo un problema con el pago");
        }
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{
                    layout: "horizontal",
                    color: "blue",
                    shape: "rect",
                    label: "paypal"
                }}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
};
