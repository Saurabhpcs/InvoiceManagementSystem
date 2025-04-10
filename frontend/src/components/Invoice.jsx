import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Invoice.css'; 

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTriggering, setIsTriggering] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices/getdata'); 
        setInvoices(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch invoices.');
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleTriggerEmails = async () => {
    setIsTriggering(true);
    try {
      const dueInvoices = invoices.filter(invoice => invoice.status === 'Due');

      if (dueInvoices.length === 0) {
        alert('No invoices with status "Due" to trigger emails for.');
        setIsTriggering(false);
        return;
      }

      for (const invoice of dueInvoices) {
        const {
          invoiceId,
          recipientEmail,
          recipient,
          amount,
          dueDate,
          status
        } = invoice;

        await axios.post('http://localhost:5000/api/invoices/trigger', {
          invoiceId,
          recipientEmail,
          recipient,
          amount,
          dueDate,
          status
        });
      }

      alert('Emails triggered successfully for all due invoices.');
    } catch (err) {
      console.error('Error triggering emails:', err);
      alert('Failed to trigger emails. Please check the console for more details.');
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <div className={`container mt-5 mb-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Invoice Details</h2>
        <button
          className="btn btn-primary"
          onClick={handleTriggerEmails}
          disabled={isTriggering}
        >
          {isTriggering ? 'Triggering...' : 'Trigger Due Invoices'}
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : invoices.length === 0 ? (
        <div className="alert alert-info text-center">No invoices found.</div>
      ) : (
        <div className="row">
          {invoices.map((invoice) => (
            <div className="col-md-3 mb-4" key={invoice.invoiceId}>
              <div className="card invoice-card">
                <div className="card-body">
                  <h5 className="card-title">{invoice.invoiceId}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <strong>Name: {invoice.recipient}</strong>
                  </h6>
                  <p className="card-text">
                    <strong>Amount:</strong> ${invoice.amount.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {invoice.recipientEmail}
                  </p>
                  <p className="card-text">
                    <strong>User ID:</strong> {invoice.userId}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Purchase Date:</strong> {new Date(invoice.purchaseDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {invoice.location}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>
                    <span
                      className={`badge ${invoice.status === 'Due' ? 'badge-warning' : 'badge-success'}`}
                    >
                      {invoice.status}
                    </span>
                  </p>

                  <div>
                    <strong>Items Purchased:</strong>
                    <ul>
                      {invoice.itemsPurchased.map((item, index) => (
                        <li key={index}>
                          {item.itemName} - {item.quantity} x ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoice;