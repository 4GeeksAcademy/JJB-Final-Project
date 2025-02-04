import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/forum.css";

export const InvoicesTable = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadInvoices();
    }, []);

    console.log(store.Invoices);
    

    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="table-danger">
                        <tr>
                            <th>Factura</th>
                            <th className="d-none d-md-table-cell">Monto</th> 
                            <th>Concepto</th>
                            <th className="d-none d-md-table-cell">Status</th> 
                            <th className="d-none d-md-table-cell">Fecha de Pago</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.invoices?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id_invoice}</td>
                                <td className="d-none d-md-table-cell">{item.amount}</td>
                                <td>{item.concept}</td>
                                <td className="d-none d-md-table-cell">{item.status}</td>
                                <td className="d-none d-md-table-cell">{item.payment_date || "N/A"}</td>
                                <td>
                                    <button
                                        className={`btn btn-${item.payment_date ? "secondary" : "danger"} btn-sm`}
                                        disabled={!!item.payment_date}
                                    >
                                        Pagar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

