function saveCode() {
  const code = codeInput.value;
  localStorage.setItem("savedUserCode", code);

  const history = JSON.parse(localStorage.getItem("codeHistory") || "[]");
  const timestamp = new Date().toLocaleString();
  history.push({ code, timestamp });
  localStorage.setItem("codeHistory", JSON.stringify(history));

  alert("✅ Your code and version have been saved!");
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem("codeHistory") || "[]");
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = "<p>❌ No saved versions yet.</p>";
    return;
  }

  history.reverse().forEach((entry, index) => {
    const box = document.createElement("div");
    box.className = "tip-box";
    box.innerHTML = `
      <strong>🕒 Version from ${entry.timestamp}</strong><br>
      <button class="btn" onclick="loadVersion(${history.length - 1 - index})">🔁 Restore</button>
      <pre style="margin-top: 0.5rem;"><code>${escapeHtml(entry.code).slice(0, 300)}${entry.code.length > 300 ? "..." : ""}</code></pre>
    `;
    container.appendChild(box);
  });
}

function loadVersion(index) {
  const history = JSON.parse(localStorage.getItem("codeHistory") || "[]");
  const entry = history[index];
  if (!entry) return alert("❌ Version not found.");

  if (confirm(`Restore version from ${entry.timestamp}?`)) {
    codeInput.value = entry.code;
    previewFrame.srcdoc = entry.code;
    localStorage.setItem("savedUserCode", entry.code);
    alert("✅ Version restored!");
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

