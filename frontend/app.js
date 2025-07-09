// LOGIN PAGE LOGIC
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'admin@example.com' && password === 'admin123') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Try: admin@example.com / admin123');
    }
  });
}

// LEAVE FORM LOGIC
const leaveForm = document.getElementById('leaveForm');
if (leaveForm) {
  leaveForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const leaveData = {
      empId: document.getElementById('empId').value,
      startDate: document.getElementById('startDate').value,
      endDate: document.getElementById('endDate').value,
      reason: document.getElementById('reason').value,
    };

    try {
      const res = await fetch('http://localhost:3000/leaves/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveData),
      });

      const result = await res.json();
      if (result.success) {
        alert('Leave applied successfully!');
        leaveForm.reset();
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      alert('Server error!');
    }
  });
}
