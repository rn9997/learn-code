function submitClass() {
  const email = document.getElementById('teacherEmail').value.trim();
  const title = document.getElementById('classTitle').value.trim();
  const assignment = document.getElementById('assignment').value.trim();
  const result = document.getElementById('result');

  if (!email || !title || !assignment) {
    result.innerText = "⚠️ Please fill in all fields.";
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbwv7nWeR_3W6xwTooZBHXVglWwvMoGw2csxDaqQqBEDIon2zvfTfi182cqJFFYTmRCM/exec", {
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
