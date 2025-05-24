function saveClass() {
  const email = document.getElementById('teacherEmail').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const assignment = document.getElementById('assignment').value.trim();
  const result = document.getElementById('result');

  if (!email || !title || !assignment) {
    result.innerText = "⚠️ Fill in all fields.";
    return;
  }

  const classData = {
    id: Date.now(),
    email,
    title,
    assignment
  };

  let classes = JSON.parse(localStorage.getItem('classes') || '[]');
  classes.push(classData);
  localStorage.setItem('classes', JSON.stringify(classes));

  result.innerText = "✅ Class Created!";
  document.getElementById('teacherEmail').value = '';
  document.getElementById('classTitle').value = '';
  document.getElementById('assignment').value = '';
}

function loadClasses() {
  const classList = document.getElementById('classList');
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');

  if (classes.length === 0) {
    classList.innerHTML = "<p>🚫 No classes yet.</p>";
    return;
  }

  classList.innerHTML = classes.map(c => `
    <div class="tip-box">
      <strong>${c.title}</strong> <br>
      📧 ${c.email}<br>
      📝 ${c.assignment}
    </div>
  `).join('');
}

if (window.location.pathname.includes('classes.html')) {
  loadClasses();
}
