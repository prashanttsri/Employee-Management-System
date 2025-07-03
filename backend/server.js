import express from 'express';
import path from 'path';
import { Low, JSONFile } from 'lowdb';

const app = express();
const __dirname = path.resolve();

// Database setup
const adapter = new JSONFile(path.join(__dirname, 'backend', 'db.json'));
const db = new Low(adapter);
await db.read();
db.data ||= { employees: [], attendance: [], reviews: [] };
const save = () => db.write();

app.use(express.json());

// Employees CRUD
app.get('/api/employees', (req, res) => res.json(db.data.employees));

app.post('/api/employees', (req, res) => {
  const employee = { id: Date.now(), ...req.body };
  db.data.employees.push(employee);
  save();
  res.json(employee);
});

app.put('/api/employees/:id', (req, res) => {
  const emp = db.data.employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ error: 'Not found' });
  Object.assign(emp, req.body);
  save();
  res.json(emp);
});

app.delete('/api/employees/:id', (req, res) => {
  db.data.employees = db.data.employees.filter(e => e.id != req.params.id);
  save();
  res.json({ success: true });
});

// Attendance
app.get('/api/attendance', (req, res) => res.json(db.data.attendance));

app.post('/api/attendance', (req, res) => {
  const log = { id: Date.now(), ...req.body };
  db.data.attendance.push(log);
  save();
  res.json(log);
});

// Performance Reviews
app.get('/api/reviews', (req, res) => res.json(db.data.reviews));

app.post('/api/reviews', (req, res) => {
  const rev = { id: Date.now(), ...req.body };
  db.data.reviews.push(rev);
  save();
  res.json(rev);
});

// Payroll (simple static salary pulled from employee record)
app.get('/api/payroll/:id', (req, res) => {
  const emp = db.data.employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  res.json({ employeeId: emp.id, salary: emp.salary || 0 });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Employee Management System running on port ${PORT}`));
// Instant, case‑insensitive employee search
function searchEmployee() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const employees = document.querySelectorAll(".employee-card");

  employees.forEach((emp) => {
    const name = emp
      .querySelector(".employee-name")
      .textContent.toLowerCase();
    emp.style.display = name.includes(query) ? "" : "none";
  });
}
