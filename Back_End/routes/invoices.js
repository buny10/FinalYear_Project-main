const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// GET all invoices (optionally filtered by customer)
router.get('/', async (req, res) => {
  try {
    const { customerId, status } = req.query;
    const query = { userId: req.user.id };
    if (customerId) query.customerId = customerId;
    if (status && status !== 'All') query.status = status;

    const invoices = await Invoice.find(query)
      .populate('customerId', 'name company email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create invoice
router.post('/', async (req, res) => {
  try {
    const { customerId, invoiceNumber, amount, status, dueDate, description } = req.body;
    if (!customerId || !invoiceNumber || !amount) {
      return res.status(400).json({ success: false, message: 'Customer, invoice number and amount are required' });
    }
    const invoice = await Invoice.create({
      userId: req.user.id,
      customerId, invoiceNumber,
      amount: Number(amount),
      status, dueDate, description,
    });
    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update invoice (e.g. mark as Paid)
router.put('/:id', async (req, res) => {
  try {
    const { invoiceNumber, amount, status, dueDate, description } = req.body;
    const updated = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { invoiceNumber, amount: Number(amount), status, dueDate, description },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE invoice
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Invoice.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;