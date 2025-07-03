document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      sections.forEach(sec => sec.hidden = (sec.id !== target));
      navLinks.forEach(l => l.classList.remove('font-bold'));
      link.classList.add('font-bold');

      if (target === 'employees') loadEmployees();
      else if (target === 'attendance') loadAttendance();
      else if (target === 'payroll') loadPayroll();
      else if (target === 'reviews') loadReviews();
    });
  });

  const loadEmployees = () => fetch('/api/employees')
      .then(r => r.json())
      .then(data => {
        const div = document.getElementById('employeeList');
        if (!data.length) return div.innerHTML = '<p class="p-4">No employees yet.</p>';
        div.innerHTML = data.map(emp => `
          <div class="p-2 border-b">${emp.name} — ${emp.position} — ₹${emp.salary}</div>
        `).join('');
      });

  const loadAttendance = () => fetch('/api/attendance')
      .then(r => r.json())
      .then(data => {
        const div = document.getElementById('attendanceList');
        if (!data.length) return div.innerHTML = '<p class="p-4">No attendance records.</p>';
        div.innerHTML = data.map(a => `
          <div class="p-2 border-b">ID:${a.employeeId} — ${a.date} — ${a.status}</div>
        `).join('');
      });

  const loadPayroll = () => fetch('/api/employees')
      .then(r => r.json())
      .then(data => {
        const div = document.getElementById('payrollList');
        if (!data.length) return div.innerHTML = '<p class="p-4">No payroll data.</p>';
        div.innerHTML = data.map(emp => `
          <div class="p-2 border-b">${emp.name} — Monthly Salary: ₹${emp.salary}</div>
        `).join('');
      });

  const loadReviews = () => fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        const div = document.getElementById('reviewList');
        if (!data.length) return div.innerHTML = '<p class="p-4">No reviews on record.</p>';
        div.innerHTML = data.map(rev => `
          <div class="p-2 border-b">ID:${rev.employeeId} — ${rev.period} — Score: ${rev.score}</div>
        `).join('');
      });

  // Load default section
  loadEmployees();
});