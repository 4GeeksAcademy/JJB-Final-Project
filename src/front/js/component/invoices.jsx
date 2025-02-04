import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/forum.css";

export const Invoices = () => {
    const { store, actions } = useContext(Context);
    const invoices = [
        { id: 656465, amount: "$5.00", concept: "Membership May", status: "Paid", paymentDate: "01/05/2024", isPaid: true },
        { id: 694168, amount: "$5.00", concept: "Membership June", status: "Paid", paymentDate: "01/06/2024", isPaid: true },
        { id: 484561, amount: "$5.00", concept: "Membership July", status: "Pending", paymentDate: "-", isPaid: false },
      ];

      return (
        <div className="container mt-4">
          <table className="table table-bordered text-center">
            <thead className="table-danger">
              <tr>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Concept</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.concept}</td>
                  <td>{invoice.status}</td>
                  <td>{invoice.paymentDate}</td>
                  <td>
                    <button
                      className={`btn btn-${invoice.isPaid ? "secondary" : "danger"} btn-sm`}
                      disabled={invoice.isPaid}
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
