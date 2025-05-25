// === Get Elements ===
const teacherBtn = document.getElementById("teacherBtn");
const studentBtn = document.getElementById("studentBtn");

const teacherPanel = document.getElementById("teacherPanel");
const studentPanel = document.getElementById("studentPanel");
const assignmentPanel = document.getElementById("assignmentPanel");

const teacherClassList = document.getElementById("teacherClassList");
const studentClassList = document.getElementById("studentClassList");

const closeBtns = document.querySelectorAll(".close-btn");

let currentClassTitle = "";

// === Panel Logic ===
function showPanel(panel) {
  hideAllPanels();
  panel.classList.add("active");
}

function hideAllPanels() {
  [teacherPanel, studentPanel, assignmentPanel].forEach(p => p.classList.remove("active"));
}

teacherBtn.addEventListener("click", () => showPanel(teacherPanel));
studentBtn.addEventListener("click", () => showPanel(studentPanel));
closeBtns.forEach(btn => btn.addEventListener("click", hideAllPanels));

// === Create Class ===
function createClass() {
  const name = document.getElementById("teacherName").value.trim();
  const title = document.getElementById("classTitle").value.trim();
  const msg = document.getElementById("createClassMsg");

  if (!name || !title) {
    msg.textContent = "Please fill in all fields.";
    return;
  }

  const code = generateCode();

  const div = document.createElement("div");
  div.className = "class-card";
  div.innerHTML = `
    <img class="profile-img" src="https://api.dicebear.com/7.x/initials/svg?seed=${name}" alt="avatar" />
    <h4>${title}</h4>
    <p>By ${name}</p>
    <p><strong>Code:</strong> ${code}</p>
  `;
  div.addEventListener("click", () => openAssignmentPanel(title));

  teacherClassList.appendChild(div);
  msg.textContent = "✅ Class created!";
  document.getElementById("teacherName").value = "";
  document.getElementById("classTitle").value = "";
}

// === Join Class ===
function joinClass() {
  const student = document.getElementById("studentName").value.trim();
  const code = document.getElementById("classCodeInput").value.trim();
  const msg = document.getElementById("joinClassMsg");

  if (!student || !code) {
    msg.textContent = "Please enter name and class code.";
    return;
  }

  const div = document.createElement("div");
  div.className = "class-card";
  div.innerHTML = `
    <img class="profile-img" src="https://api.dicebear.com/7.x/initials/svg?seed=${student}" alt="avatar" />
    <h4>Class Joined</h4>
    <p>${student}</p>
    <p><strong>Code:</strong> ${code}</p>
  `;
  div.addEventListener("click", () => openAssignmentPanel("Joined Class"));

  studentClassList.appendChild(div);
  msg.textContent = "✅ Joined class!";
  document.getElementById("studentName").value = "";
  document.getElementById("classCodeInput").value = "";
}

// === Assignment ===
function openAssignmentPanel(title) {
  document.getElementById("activeClassTitle").textContent = title;
  showPanel(assignmentPanel);
  currentClassTitle = title;
  document.getElementById("assignmentList").innerHTML = "";
}

function addAssignment() {
  const title = document.getElementById("assignmentTitle").value.trim();
  const due = document.getElementById("assignmentDue").value;

  if (!title || !due) return;

  const div = document.createElement("div");
  div.innerHTML = `<p>📌 <strong>${title}</strong> — Due: ${due}</p>`;
  document.getElementById("assignmentList").appendChild(div);

  document.getElementById("assignmentTitle").value = "";
  document.getElementById("assignmentDue").value = "";
}

// === Generate Unique Class Code ===
function generateCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
