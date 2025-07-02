# Employee Management System

A minimal full‑stack web application demonstrating **Employee Profiles**, **Attendance Tracking**, **Payroll Management**, and **Performance Reviews**.

## 📦 Tech Stack
- **Backend:** Node.js, Express, LowDB (JSON file database)
- **Frontend:** Vanilla JavaScript, Tailwind CSS (via CDN)

## 🚀 Quick Start

```bash
# 1. Install dependencies and start the server
cd employee-management-system/backend
npm install
npm start    # or: node server.js

# 2. Open your browser
http://localhost:3000
```

The Express server serves both the API (`/api/...`) and the static frontend.

## 🛠️ API Endpoints

| Resource | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| Employees | GET | /api/employees | List employees |
|  | POST | /api/employees | Add employee |
|  | PUT | /api/employees/:id | Update employee |
|  | DELETE | /api/employees/:id | Delete employee |
| Attendance | GET | /api/attendance | List attendance logs |
|  | POST | /api/attendance | Add attendance log |
| Reviews | GET | /api/reviews | List performance reviews |
|  | POST | /api/reviews | Add performance review |
| Payroll | GET | /api/payroll/:id | Get salary for employee |

## 📝 Notes
* **Persistence:** Data is stored in `backend/db.json`; edit it manually or via API.
* **Authentication & Validation:** Not included (for brevity).
* **Scaling Up:** Swap out LowDB for a real database (PostgreSQL, MongoDB, etc.) and add auth.

Enjoy hacking on your Employee Management System!