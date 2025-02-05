import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export const PayPalButton = () => {
    const initialOptions = {
        "client-id": "AcWlZyLHQTTB4CcoUAgJYwtoKhW3i_GSW9zKkol9kSanSIDB9Qimdt8KXboSFSr8eljOjDmo2uLuNGCj",
        currency: "USD",
        intent: "capture"
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "5"
                    }
                }
            ]
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details){
            alert("Transacción completada por" + details.payer.name.given_name)
        })
    }
    return(
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
            style ={{
                layout: "horizontal",
                color: "blue",
                shape: "rect",
                label:"paypal"}}
                createOrder={(data, actions)=>createOrder(data, actions)}
                onApprove={(data, actions)=> onApprove(data, actions)}
            />
        </PayPalScriptProvider>
    )
}