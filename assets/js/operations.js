async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Failed to load " + path);
  return res.json();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function renderRuns(runs) {
  const container = document.getElementById("runs-container");
  if (!runs.length) {
    container.innerHTML = "<p>No runs recorded in the log yet.</p>";
    return;
  }

  runs.sort((a, b) => (b.date + (b.time || "")) > (a.date + (a.time || "")) ? 1 : -1);

  let html = `
    <div class="table-scroll">
      <table class="log-table-inner">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Location</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
  `;

  runs.forEach(run => {
    html += `
      <tr>
        <td>${formatDate(run.date || "")}</td>
        <td>${run.time || ""}</td>
        <td>${run.type || ""}</td>
        <td>${run.location || ""}</td>
        <td>${run.notes || ""}</td>
      </tr>
    `;
  });

  html += "</tbody></table></div>";
  container.innerHTML = html;
}

function renderTraining(trainings) {
  const container = document.getElementById("training-container");
  if (!trainings.length) {
    container.innerHTML = "<p>No training sessions listed.</p>";
    return;
  }

  trainings.sort((a, b) => (a.date > b.date ? 1 : -1));

  let html = `
    <div class="table-scroll">
      <table class="log-table-inner">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Topic</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
  `;

  trainings.forEach(t => {
    html += `
      <tr>
        <td>${formatDate(t.date || "")}</td>
        <td>${t.time || ""}</td>
        <td>${t.topic || ""}</td>
        <td>${t.notes || ""}</td>
      </tr>
    `;
  });

  html += "</tbody></table></div>";
  container.innerHTML = html;
}

async function initOpsPage() {
  try {
    const [runs, trainings] = await Promise.all([
      loadJSON("data/runs.json"),
      loadJSON("data/training.json")
    ]);
    renderRuns(runs);
    renderTraining(trainings);
  } catch (err) {
    console.error(err);
    document.getElementById("runs-container").innerHTML = "<p>Error loading run log.</p>";
    document.getElementById("training-container").innerHTML = "<p>Error loading training schedule.</p>";
  }
}

document.addEventListener("DOMContentLoaded", initOpsPage);
