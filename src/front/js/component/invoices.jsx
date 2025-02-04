import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/forum.css";

export const Invoices = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadInvoices(); // Llamamos a la acción que obtiene las facturas
    }, []);

    return (
        <div className="container mt-4">
          <table className="table table-bordered text-center">
            <thead className="table-danger">
              <tr>
                <th>Factura</th>
                <th>Monto</th>
                <th>Concepto</th>
                <th>Status</th>
                <th>Fecha de Pago</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {store.invoices?.map((item, index) => (
                <tr key={index}>
                  <td>{item.id_invoice}</td>
                  <td>{item.amount}</td>
                  <td>{item.concept}</td>
                  <td>{item.status ? "Pagado" : "Pendiente"}</td>
                  <td>{item.payment_date}</td>
                  <td>
                    <button
                      className={`btn btn-${item.status ? "secondary" : "danger"} btn-sm`}
                      disabled={item.status}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
};
