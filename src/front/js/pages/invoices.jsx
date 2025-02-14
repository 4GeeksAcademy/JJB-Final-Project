import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { InvoicesTable } from "../component/invoicesTable.jsx";

export const Invoices = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      await actions.loadInvoices();
      setLoading(false);
    };
    loadInvoices();
  }, []);

  return (
<div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-md-9 col-12 main-content">
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : store.invoices.length > 0 ? (
        <InvoicesTable />
      ) : (
        <div className="text-center mt-5 flex-grow-1 w-100">
          <div className="alert alert-warning p-4 rounded shadow-sm w-100" role="alert">
            <h4 className="alert-heading">No se encontraron facturas</h4>
            <p>Parece que aún no hay facturas disponibles.</p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

  );
};
