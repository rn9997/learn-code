function submitClass() {
  const email = document.getElementById('teacherEmail').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const assignment = document.getElementById('assignment').value.trim();
  const result = document.getElementById('result');

  if (!email || !title || !assignment) {
    result.innerText = "⚠️ Please fill in all fields.";
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbxId4oara42ZJQUW2USw4Oee1NC55dlo7iqEq3ygH5mmFxvCG7PdvmKHlUbE1xUxUTB/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, title, assignment })
  })
  .then(res => res.json())
  .then(data => {
    if (data.classCode) {
      result.innerHTML = `✅ Class Created!<br>🔑 <strong>Class Code:</strong> <code>${data.classCode}</code>`;
    } else {
      result.innerText = "❌ Something went wrong. Try again.";
    }
  })
  .catch(err => {
    console.error("Error:", err);
    result.innerText = "❌ Failed to create class.";
  });
}
