const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  recipient: { type: String, required: true },  
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String, required: true }, 
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
