const state = {
  xp: 0,
  solved: new Set(),
  badges: new Set(),
  user: "Student",
  role: "Smart Manufacturing Associate",
  track: "6-Month Industry X.O Professional",
  project: 0
};

const users = ["Student", "Faculty", "College", "Manufacturer", "HR / L&D", "Working Professional"];
const roles = ["Smart Manufacturing Associate", "PLC Programmer", "Robotics Technician", "IIoT Technician", "Maintenance Technician", "Industrial Data Technician"];

const zones = [
  { title: "Safety Gate", icon: "E-STOP", copy: "Helmet, safety lock, emergency stop and LOTO tag unlock safety, 5S, roles and hazards.", meter: 16 },
  { title: "Control Room", icon: "PLC", copy: "PLC rack, HMI panel, control cabinet and ladder logic screen unlock PLC, HMI, SCADA, VFD and motor control.", meter: 30 },
  { title: "Sensor Tunnel", icon: "SENSOR", copy: "Proximity sensor, photoelectric sensor, encoder and waveform unlock wiring, calibration and signal conditioning.", meter: 44 },
  { title: "Robotics Bay", icon: "COBOT", copy: "Robot arm, cobot, gripper and vision camera unlock robot safety, pick-and-place and human-robot collaboration.", meter: 58 },
  { title: "IIoT Data Bridge", icon: "OPC UA", copy: "Edge gateway, MQTT broker, OPC UA node and dashboard unlock industrial networking, data acquisition and UNS architecture.", meter: 72 },
  { title: "Digital Twin Lab", icon: "TWIN", copy: "Holographic machine, sensor stream, AI prediction graph and simulation model unlock digital twins and self-healing systems.", meter: 86 },
  { title: "Industry 5.0 Zone", icon: "5.0", copy: "Energy meter, human-cobot station and carbon dashboard unlock sustainability and worker-machine collaboration.", meter: 100 }
];

const skillSlots = [
  { zone: "Machine Zone", skill: "Safety", badge: "Safety Starter", hint: "Machine hazards, PPE, emergency stops and LOTO." },
  { zone: "Control Zone", skill: "PLC", badge: "PLC Explorer", hint: "PLC, HMI, SCADA, VFD and repeatable control." },
  { zone: "Data Zone", skill: "IIoT", badge: "IIoT Connector", hint: "OPC UA, MQTT, edge gateway and OEE dashboards." },
  { zone: "Robot Zone", skill: "Robotics", badge: "Robot Ready", hint: "Cobots, grippers, machine tending and robot safety." },
  { zone: "Maintenance Zone", skill: "Predictive Maintenance", badge: "Predictive Maintenance Thinker", hint: "Vibration, temperature, anomaly detection and RCA." },
  { zone: "Human-Centric Zone", skill: "Human-Cobot Collaboration", badge: "Industry 5.0 Champion", hint: "Safe collaboration, ergonomics and human-centric HMI." }
];

const tracks = [
  {
    title: "100-Hour Smart Manufacturing Starter",
    outcome: "Learner understands how modern smart factory systems work.",
    modules: ["Safety", "Controls", "Sensors", "PLC/HMI", "Robotics", "IIoT Demo"]
  },
  {
    title: "3-Month Smart Factory Builder",
    outcome: "Learner can build, operate, troubleshoot and present a working automation project.",
    modules: ["Shop Floor", "Electrical", "Sensors", "PLC/HMI/SCADA", "Robotics", "CNC + Quality", "Dashboard", "Mini Capstone"]
  },
  {
    title: "6-Month Industry X.O Professional",
    outcome: "Learner can understand, operate, troubleshoot, maintain, improve and partially design smart industrial systems.",
    modules: ["Safety", "PLC/HMI", "SCADA", "Robotics", "CNC", "Maintenance", "IIoT/UNS", "OT Security", "AI", "Digital Twin", "Sustainability", "Industry Project"]
  }
];

const projects = [
  {
    title: "PLC-HMI conveyor sorter",
    hardware: "Conveyor, PLC, proximity sensors, motor starter, HMI panel",
    software: "PLC ladder logic, HMI tags, alarm screens",
    value: "Shows machine, control and visualization layers.",
    roles: "Automation Technician, PLC Programmer, Smart Manufacturing Associate"
  },
  {
    title: "Vision-assisted robotic pick-and-place",
    hardware: "Robot or cobot, gripper, vision camera, safety scanner",
    software: "Robot programming, vision setup, PLC handshake",
    value: "Shows robotics, safety, machine vision and integration.",
    roles: "Robotics Technician, Vision Integration Associate"
  },
  {
    title: "Predictive maintenance system",
    hardware: "Vibration sensor, temperature sensor, edge gateway",
    software: "Dashboard, anomaly logic, maintenance alert workflow",
    value: "Shows sensor data, AI thinking and maintenance decision-making.",
    roles: "Maintenance Technician, Industrial Data Technician"
  },
  {
    title: "Energy monitoring dashboard",
    hardware: "Energy meter, edge device, load simulator",
    software: "OEE and energy dashboard, reporting workflow",
    value: "Shows sustainability, IIoT and process improvement.",
    roles: "Sustainability Analyst, Smart Utilities Technician"
  }
];

const personas = [
  ["College / University", "Your mission: Build a future-ready smart manufacturing program for students."],
  ["Manufacturer", "Your mission: Upgrade workforce capability for connected, data-driven factories."],
  ["Skill Center", "Your mission: Create a practical smart manufacturing lab that earns institutional credibility."],
  ["CSR / Government", "Your mission: Convert training spend into visible projects, roles and workforce readiness."]
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function addXp(points, badge) {
  state.xp += points;
  if (badge) state.badges.add(badge);
  updateHud();
}

function readiness() {
  return Math.min(100, 42 + state.solved.size * 7 + Math.floor(state.xp / 12));
}

function level(score) {
  if (score >= 88) return "Level 6: Future Factory Architect";
  if (score >= 76) return "Level 5: Industry 5.0 Collaborator";
  if (score >= 64) return "Level 4: Industry 4.0 Builder";
  if (score >= 52) return "Level 3: Smart Factory Explorer";
  if (score >= 44) return "Level 2: Automation Ready";
  return "Level 1: Machine Aware";
}

function updateHud() {
  const score = readiness();
  qs("#xpScore").textContent = state.xp;
  qs("#readinessScore").textContent = `${score}/100`;
  qs("#finalScore").textContent = `${score}/100`;
  qs("#levelText").textContent = level(score);
  qs("#badgeText").textContent = state.badges.size ? `${[...state.badges].at(-1)} unlocked` : "No badge unlocked yet";
  qs("#badges").innerHTML = [...state.badges].map((badge) => `<span class="badge">${badge}</span>`).join("");
  const widths = [score, Math.max(32, score - 10), Math.max(25, score - 18), Math.max(20, score - 24)];
  ["#barAutomation", "#barRobotics", "#barData", "#barHuman"].forEach((id, index) => {
    qs(id).style.width = `${widths[index]}%`;
  });
  qs("#reportList").innerHTML = `
    <li>User type: ${state.user}</li>
    <li>Target role: ${state.role}</li>
    <li>Recommended track: ${state.track}</li>
    <li>Recommended capstone: ${projects[state.project].title}</li>
    <li>Skill gaps to close: OT/IT integration, predictive maintenance, digital twin and human-cobot collaboration.</li>
  `;
}

function renderTrust() {
  qsa(".trust-pod").forEach((pod) => {
    pod.addEventListener("click", () => {
      qsa(".trust-pod").forEach((item) => item.classList.remove("active"));
      pod.classList.add("active");
      qs("#trustReadout").textContent = pod.dataset.copy;
      addXp(6, "Trust Core");
    });
  });
}

function renderMap() {
  qs("#factoryMap").innerHTML = zones.map((zone, index) => `
    <button class="map-zone ${index === 0 ? "active" : ""}" data-index="${index}">
      <strong>${zone.icon}</strong>
      <span>${zone.title}</span>
    </button>
  `).join("");
  qsa(".map-zone").forEach((button) => {
    button.addEventListener("click", () => {
      const zone = zones[Number(button.dataset.index)];
      qsa(".map-zone").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      qs("#zoneTitle").textContent = zone.title;
      qs("#zoneText").textContent = zone.copy;
      qs("#zoneMeter").style.width = `${zone.meter}%`;
      addXp(8, `${zone.title} Unlocked`);
    });
  });
  qs("#zoneMeter").style.width = "16%";
}

function renderScanner() {
  qs("#userChips").innerHTML = users.map((user, index) => `<button class="persona-chip ${index === 0 ? "active" : ""}" data-user="${user}">${user}</button>`).join("");
  qs("#roleChips").innerHTML = roles.map((role, index) => `<button class="mission-chip ${index === 0 ? "active" : ""}" data-role="${role}">${role}</button>`).join("");
  qs("#skillZones").innerHTML = skillSlots.map((slot) => `
    <button class="skill-slot ${state.solved.has(slot.zone) ? "solved" : ""}" data-zone="${slot.zone}">
      <strong>${slot.zone}</strong>
      <span>${slot.hint}</span>
    </button>
  `).join("");
  qsa("[data-user]").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-user]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.user = button.dataset.user;
      qs("#coachTitle").textContent = `${state.user} profile loaded`;
      qs("#coachText").textContent = "Now choose a target role and unlock the factory skill slots.";
      addXp(4, "Mission Identity");
    });
  });
  qsa("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-role]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.role = button.dataset.role;
      qs("#coachTitle").textContent = `${state.role} target selected`;
      qs("#coachText").textContent = "Solve skill slots to increase role fit and readiness.";
      addXp(4, "Role Locked");
    });
  });
  qsa(".skill-slot").forEach((button) => {
    button.addEventListener("click", () => {
      const slot = skillSlots.find((item) => item.zone === button.dataset.zone);
      state.solved.add(slot.zone);
      button.classList.add("solved");
      qs("#coachTitle").textContent = `${slot.skill} mapped`;
      qs("#coachText").textContent = `${slot.zone} now maps to ${slot.skill}. ${slot.hint}`;
      addXp(12, slot.badge);
    });
  });
}

function drawRadar() {
  const canvas = qs("#radarCanvas");
  const ctx = canvas.getContext("2d");
  const labels = ["Employability", "Lab Readiness", "Upskilling", "Credibility", "Future Tech", "Projects"];
  const score = readiness();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(210, 210);
  for (let ring = 1; ring <= 4; ring += 1) {
    ctx.beginPath();
    labels.forEach((_, i) => {
      const angle = Math.PI * 2 * i / labels.length - Math.PI / 2;
      const radius = ring * 42;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "rgba(72,230,255,.22)";
    ctx.stroke();
  }
  ctx.beginPath();
  labels.forEach((_, i) => {
    const angle = Math.PI * 2 * i / labels.length - Math.PI / 2;
    const radius = (86 + ((score + i * 9) % 46)) * 1.25;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(72,230,255,.22)";
  ctx.strokeStyle = "#48e6ff";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#edfaff";
  ctx.font = "800 12px system-ui";
  labels.forEach((label, i) => {
    const angle = Math.PI * 2 * i / labels.length - Math.PI / 2;
    const x = Math.cos(angle) * 190;
    const y = Math.sin(angle) * 190;
    ctx.textAlign = x < -20 ? "right" : x > 20 ? "left" : "center";
    ctx.fillText(label, x, y);
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function renderPersonas() {
  qs("#personaOptions").innerHTML = personas.map((persona, index) => `<button class="persona-chip ${index === 0 ? "active" : ""}" data-persona="${index}">${persona[0]}</button>`).join("");
  qsa("[data-persona]").forEach((button) => {
    button.addEventListener("click", () => {
      const persona = personas[Number(button.dataset.persona)];
      qsa("[data-persona]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      qs("#personaMission").textContent = persona[1];
      addXp(6, "Opportunity Radar");
      drawRadar();
    });
  });
}

function renderCurriculum() {
  qs("#trackSwitch").innerHTML = tracks.map((track, index) => `<button class="track-chip ${index === 2 ? "active" : ""}" data-track="${index}">${track.title}</button>`).join("");
  function selectTrack(index) {
    const track = tracks[index];
    state.track = track.title;
    qs("#trackTitle").textContent = track.title;
    qs("#trackOutcome").textContent = track.outcome;
    qs("#moduleCircuit").innerHTML = track.modules.map((module, moduleIndex) => `<div class="module-node active"><strong>${String(moduleIndex + 1).padStart(2, "0")}</strong><p>${module}</p></div>`).join("");
    qsa("[data-track]").forEach((item) => item.classList.toggle("active", Number(item.dataset.track) === index));
  }
  qsa("[data-track]").forEach((button) => {
    button.addEventListener("click", () => {
      selectTrack(Number(button.dataset.track));
      addXp(8, "Curriculum Architect");
    });
  });
  selectTrack(2);
}

function renderProjects() {
  qs("#projectSelector").innerHTML = projects.map((project, index) => `<button class="project-chip ${index === 0 ? "active" : ""}" data-project="${index}">${project.title}</button>`).join("");
  function selectProject(index) {
    state.project = index;
    const project = projects[index];
    qs("#projectDiagnostic").innerHTML = `
      <h3>${project.title}</h3>
      <dl>
        <dt>Hardware</dt><dd>${project.hardware}</dd>
        <dt>Software</dt><dd>${project.software}</dd>
        <dt>Portfolio value</dt><dd>${project.value}</dd>
        <dt>Mapped roles</dt><dd>${project.roles}</dd>
      </dl>
    `;
    qsa("[data-project]").forEach((item) => item.classList.toggle("active", Number(item.dataset.project) === index));
    updateHud();
  }
  qsa("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      selectProject(Number(button.dataset.project));
      addXp(8, "Capstone Builder");
    });
  });
  selectProject(0);
}

qs("#generateReport").addEventListener("click", () => {
  addXp(15, "Future Factory Architect");
  qs("#coachTitle").textContent = "Readiness report generated";
  qs("#coachText").textContent = "Your diagnostic report now reflects your identity, role, score, track and capstone choices.";
});

renderTrust();
renderMap();
renderScanner();
renderPersonas();
renderCurriculum();
renderProjects();
drawRadar();
updateHud();
