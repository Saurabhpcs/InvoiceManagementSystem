const Invoice = require("../Model/Invoice");
const axios = require('axios');

const getdata = async(req,res)=>{
    try{
        const data = await Invoice.find();
        res.status(201).json({data: data});
    } catch(err){
        console.log(err);
    }
}
const triggerZapier = async (req, res) => {
  const { invoiceId, recipientEmail, recipient, amount, dueDate, status } = req.body;

  try {
    if (!invoiceId || !recipientEmail || !recipient || !amount || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields in the request.' });
    }

    const dataToSend = {
      recipientEmail,
      recipientName: recipient,
      invoiceAmount: amount,
      dueDate,
      invoiceId,
      subject: `Reminder: Invoice ${invoiceId} is Due`,
      body: `Dear ${recipient},\n\nThis is a reminder that your invoice with ID ${invoiceId} for $${amount} is due on ${dueDate}. Please make the payment at your earliest convenience.`
    };

    const response = await axios.post(process.env.ZAPIER_WEBHOOK_URL, dataToSend);

    res.status(200).json({
      message: `Zapier triggered successfully. Email sent to ${recipientEmail}.`,
      zapierResponse: response.data
    });
  } catch (error) {
    console.error('Error triggering Zapier:', error.message);
    res.status(500).json({ error: 'Failed to trigger Zapier' });
  }
};



module.exports = {triggerZapier, getdata };
