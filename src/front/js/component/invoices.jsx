import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/forum.css";

export const Invoices = () => {
    const { store, actions } = useContext(Context);
    // const invoices = [
    //     { id: 656465, amount: "$5.00", concept: "Membership May", status: "Paid", paymentDate: "01/05/2024", isPaid: true },
    //     { id: 694168, amount: "$5.00", concept: "Membership June", status: "Paid", paymentDate: "01/06/2024", isPaid: true },
    //     { id: 484561, amount: "$5.00", concept: "Membership July", status: "Pending", paymentDate: "-", isPaid: false },
    //   ];

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
                  <td>{item.status}</td>
                  <td>{item.payment_date}</td>
                  <td>
                    <button
                      className={`btn btn-${item.status == false ? "secondary" : "danger"} btn-sm`}
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
