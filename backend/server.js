const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(cors());
app.use(bodyParser.json());

// Set default structure (add leaves too)
db.defaults({
  employees: [],
  attendance: [],
  payroll: [],
  performance: [],
  leaves: []
}).write();

// ==================== Employee Routes ====================
app.get('/employees', (req, res) => {
  const data = db.get('employees').value();
  res.send(data);
});

// ==================== Attendance Routes ====================
app.get('/attendance', (req, res) => {
  const data = db.get('attendance').value();
  res.send(data);
});

// ==================== Payroll Routes ====================
app.get('/payroll', (req, res) => {
  const data = db.get('payroll').value();
  res.send(data);
});

// ==================== Performance Routes ====================
app.get('/performance', (req, res) => {
  const data = db.get('performance').value();
  res.send(data);
});

// ==================== Leave Management Routes ====================

// Apply for leave
app.post('/leaves/apply', (req, res) => {
  const { empId, startDate, endDate, reason } = req.body;
  const leave = {
    id: Date.now(),
    empId,
    startDate,
    endDate,
    reason,
    status: 'Pending'
  };
  db.get('leaves').push(leave).write();
  res.send({ success: true, leave });
});

// Get all leaves
app.get('/leaves/all', (req, res) => {
  const leaves = db.get('leaves').value();
  res.send(leaves);
});

// Update leave status
app.post('/leaves/update-status', (req, res) => {
  const { id, status } = req.body;
  db.get('leaves').find({ id }).assign({ status }).write();
  res.send({ success: true });
});

// ==================== Server Start ====================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
//server.js file