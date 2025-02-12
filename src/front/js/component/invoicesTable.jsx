import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/forum.css";
import "../../styles/invoicesTable.css";

import { Link } from "react-router-dom";

export const InvoicesTable = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadInvoices();
    }, []);

    return (
        <div className="container mt-8">
  <div className="table-responsive">  {/* Aquí puedes usar una clase como "table-responsive" */}
    <table className="table">
      <thead>
        <tr>
          <th>N° Orden</th>
          <th className="d-none d-md-table-cell">Monto</th>
          <th>Concepto</th>
          <th className="d-none d-md-table-cell">Fecha de Pago</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {store.invoices?.map((item, index) => (
          <tr key={index}>
            <td>{item.id_order || "Pendiente de N° Orden"}</td>
            <td className="d-none d-md-table-cell">${item.amount}</td>
            <td>{item.concept}</td>
            <td className="d-none d-md-table-cell">{item.payment_date || "Pendiente de pago"}</td>
            <td>
              {item.payment_date ? (
                <button className="btn">Detalles</button>
              ) : (
                <Link to={`/invoice/${item.id_invoice}`}>
                  <button className="btn">Pagar</button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    );
};

