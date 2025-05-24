// 🔢 Generates a random 6-character class code
function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 💾 Saves a new class to localStorage
function saveClass() {
  const email = document.getElementById('teacherEmail').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const assignment = document.getElementById('assignment').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const result = document.getElementById('result');

  if (!email || !title || !assignment) {
    result.innerText = "⚠️ Please fill in all required fields.";
    return;
  }

  const code = generateCode();

  const classData = {
    id: Date.now(),
    email,
    title,
    assignment,
    dueDate,
    classCode: code
  };

  let classes = JSON.parse(localStorage.getItem('classes') || '[]');
  classes.push(classData);
  localStorage.setItem('classes', JSON.stringify(classes));

  result.innerText = `✅ Class Created! Code: ${code}`;
  document.getElementById('previewCode').innerText = "🔑 Class Code: Auto-generated";

  // Reset form fields
  document.getElementById('teacherEmail').value = '';
  document.getElementById('classTitle').value = '';
  document.getElementById('assignment').value = '';
  document.getElementById('dueDate').value = '';
}

// 🎯 Live preview of class code as user types title
document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('classTitle');
  const codePreview = document.getElementById('previewCode');

  if (titleInput && codePreview) {
    titleInput.addEventListener('input', () => {
      codePreview.innerText = `🔑 Class Code: ${generateCode()}`;
    });
  }

  // Load classes if on classes.html
  if (window.location.pathname.includes('classes.html')) {
    loadClasses();
  }
});

// 📋 Loads and displays all saved classes on classes.html
function loadClasses() {
  const classList = document.getElementById('classList');
  const classes = JSON.parse(localStorage.getItem('classes') || '[]');

  if (!classList) return;

  if (classes.length === 0) {
    classList.innerHTML = "<p>🚫 No classes have been created yet.</p>";
    return;
  }

  classList.innerHTML = classes.map(c => `
    <div class="tip-box">
      <strong>🏷️ ${c.title}</strong><br>
      🔑 <strong>Code:</strong> <code>${c.classCode}</code><br>
      👤 <strong>Email:</strong> ${c.email}<br>
      📝 <strong>Assignment:</strong> ${c.assignment}<br>
      📅 <strong>Due:</strong> ${c.dueDate || 'Not set'}
    </div>
  `).join('');
}
