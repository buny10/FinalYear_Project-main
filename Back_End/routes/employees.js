const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const { search = '', dept } = req.query;
    const query = {};
    if (dept && dept !== 'All') query.dept = dept;
    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { role:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create employee
router.post('/', async (req, res) => {
  try {
    const { name, role, dept, email, phone, salary, status, joined } = req.body;
    if (!name || !role || !dept || !email || !salary) {
      return res.status(400).json({ success: false, message: 'Name, role, dept, email and salary are required' });
    }
    const avatar = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const emp = await Employee.create({ name, role, dept, email, phone, salary: Number(salary), status, joined, avatar });
    res.status(201).json({ success: true, data: emp });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'An employee with this email already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update employee
router.put('/:id', async (req, res,) => {
  try {
    const { name, role, dept, email, phone, salary, status, joined } = req.body;
    const avatar = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : undefined;
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, role, dept, email, phone, salary: Number(salary), status, joined, ...(avatar && { avatar }) },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.json({ success: true, data: updated });
  }   catch (err) {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message
  });
}
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;