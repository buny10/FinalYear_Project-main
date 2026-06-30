const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');

// GET all customers, with computed totalSpent + lastPurchase from invoices
router.get('/', async (req, res) => {
  try {
    const { search = '', status } = req.query;
    const query = { userId: req.user.id };
    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 }).lean();

    // Pull all invoices for this user's customers in one query,
    // then aggregate per customer instead of querying per customer (N+1).
    const customerIds = customers.map(c => c._id);
    const invoices = await Invoice.find({
      userId: req.user.id,
      customerId: { $in: customerIds },
    }).lean();

    const enriched = customers.map(c => {
      const custInvoices = invoices.filter(
        inv => inv.customerId.toString() === c._id.toString()
      );
      const totalSpent = custInvoices
        .filter(inv => inv.status === 'Paid')
        .reduce((sum, inv) => sum + inv.amount, 0);
      const lastPurchase = custInvoices.length
        ? custInvoices.reduce((latest, inv) =>
            new Date(inv.createdAt) > new Date(latest.createdAt) ? inv : latest
          ).createdAt
        : null;

      return { ...c, totalSpent, lastPurchase, invoiceCount: custInvoices.length };
    });

    res.json({ success: true, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create customer
router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, address, status, notes } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    const customer = await Customer.create({
      userId: req.user.id,
      name, company, email, phone, address, status, notes,
    });
    res.status(201).json({ success: true, data: customer });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'A customer with this email already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update customer
router.put('/:id', async (req, res) => {
  try {
    const { name, company, email, phone, address, status, notes } = req.body;
    const updated = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, company, email, phone, address, status, notes },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE customer
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;