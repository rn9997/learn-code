function submitClass() {
  const email = document.getElementById('teacherEmail').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const assignment = document.getElementById('assignment').value.trim();
  const result = document.getElementById('result');
  const button = document.getElementById('submitButton');

  // Reset result display
  result.innerText = '';

  // Check if any field is empty
  if (!email || !title || !assignment) {
    result.innerText = "⚠️ Please fill in all fields.";
    return;
  }

  // Disable the button to prevent multiple submissions
  button.disabled = true;
  result.innerText = "Submitting...";

  // Send data to Google Apps Script
  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, title, assignment })
  })
    .then(res => res.json())
    .then(data => {
      if (data.classCode) {
        result.innerHTML = `✅ Class Created!<br><strong>Class Code:</strong> <code>${data.classCode}</code>`;
      } else {
        result.innerText = "❌ Something went wrong.";
      }
    })
    .catch(err => {
      console.error("Error:", err);
      result.innerText = "❌ Failed to create class.";
    })
    .finally(() => {
      button.disabled = false;
    });
}

