document.getElementById('toggleSidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('hidden');
});

document.getElementById('closeSidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('hidden');
});

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function generateClassCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function createClass() {
  const teacher = document.getElementById('teacherName').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const code = generateClassCode();

  if (!teacher || !title) {
    document.getElementById('createResult').innerText = 'Please fill all fields.';
    return;
  }

  const newClass = { teacher, title, code, assignments: [] };
  const stored = JSON.parse(localStorage.getItem('createdClasses')) || [];
  stored.push(newClass);
  localStorage.setItem('createdClasses', JSON.stringify(stored));
  document.getElementById('createResult').innerText = `✅ Class Created! Code: ${code}`;
  loadClasses();
}

function joinClass() {
  const name = document.getElementById('studentName').value.trim();
  const code = document.getElementById('classCode').value.trim().toUpperCase();
  const classes = JSON.parse(localStorage.getItem('createdClasses')) || [];
  const match = classes.find(c => c.code === code);

  if (!name || !code) {
    document.getElementById('joinResult').innerText = 'Please fill all fields.';
    return;
  }

  if (!match) {
    document.getElementById('joinResult').innerText = '❌ Class not found.';
    return;
  }

  let joined = JSON.parse(localStorage.getItem('joinedClasses')) || [];
  if (!joined.some(c => c.code === code)) {
    joined.push(match);
    localStorage.setItem('joinedClasses', JSON.stringify(joined));
  }

  document.getElementById('joinResult').innerText = `✅ Joined ${match.title}`;
}

function loadClasses() {
  const container = document.getElementById('classList');
  const classes = JSON.parse(localStorage.getItem('createdClasses')) || [];
  container.innerHTML = '';

  classes.forEach(cls => {
    const div = document.createElement('div');
    div.className = 'class-box';
    div.innerHTML = `
      <h3>${cls.title}</h3>
      <p><strong>Code:</strong> ${cls.code}</p>
      <p><strong>Teacher:</strong> ${cls.teacher}</p>
      <button onclick="selectClass('${cls.code}')">📑 Manage Assignments</button>
    `;
    container.appendChild(div);
  });
}

let selectedCode = null;

function selectClass(code) {
  const classes = JSON.parse(localStorage.getItem('createdClasses')) || [];
  const cls = classes.find(c => c.code === code);
  if (!cls) return;

  selectedCode = code;
  document.getElementById('assignmentsSection').classList.remove('hidden');
  document.getElementById('selectedClassTitle').innerText = cls.title;
  renderAssignments(cls.assignments);
}

function addAssignment() {
  const title = document.getElementById('assignmentTitle').value.trim();
  const due = document.getElementById('assignmentDue').value;
  if (!title || !due) return;

  let classes = JSON.parse(localStorage.getItem('createdClasses')) || [];
  const index = classes.findIndex(c => c.code === selectedCode);
  if (index === -1) return;

  classes[index].assignments.push({ title, due });
  localStorage.setItem('createdClasses', JSON.stringify(classes));
  renderAssignments(classes[index].assignments);

  document.getElementById('assignmentTitle').value = '';
  document.getElementById('assignmentDue').value = '';
}

function renderAssignments(assignments) {
  const list = document.getElementById('assignmentList');
  list.innerHTML = assignments.map(a => `
    <div class="assignment-box">
      <strong>${a.title}</strong><br/>
      Due: ${a.due}
    </div>
  `).join('');
}

window.onload = loadClasses;
