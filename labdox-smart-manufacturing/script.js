const state = {
  xp: 0,
  selectedMission: null,
  solved: new Set(),
  badges: new Set()
};

const credCopy = {
  founder: "Why it matters: Institutions need a founder-led partner who understands students, training operations, entrepreneurship, skill programs and industry expectations.",
  global: "Why it matters: Global delivery exposure helps Labdox design content that works for Indian cohorts while still matching international skilling expectations.",
  network: "Why it matters: Smart manufacturing needs PLC, robotics, AI, IoT, data, maintenance and design expertise. One trainer cannot carry the full stack.",
  outcomes: "Why it matters: Learners need projects, troubleshooting, documentation and presentations that convert training into real workplace confidence."
};

const layers = {
  physical: { score: 12, oee: 2, roles: 1 },
  control: { score: 18, oee: 6, roles: 4 },
  supervisory: { score: 14, oee: 5, roles: 3 },
  data: { score: 18, oee: 8, roles: 5 },
  ai: { score: 20, oee: 10, roles: 4 },
  human: { score: 16, oee: 6, roles: 3 }
};

const missions = [
  {
    id: "downtime",
    title: "Downtime keeps repeating before breakdowns.",
    detail: "Maintenance is reactive and data is trapped in notebooks.",
    skill: "Predictive maintenance",
    lesson: "Vibration, temperature and downtime data can trigger early warnings before failures become expensive stoppages."
  },
  {
    id: "quality",
    title: "Defects are caught too late.",
    detail: "Inspection happens after batches are already produced.",
    skill: "AI vision inspection",
    lesson: "Computer vision and process analytics can detect defects earlier and reveal process drift."
  },
  {
    id: "islands",
    title: "Machines, HMI and ERP do not talk.",
    detail: "Teams manually copy production data across systems.",
    skill: "OPC UA and IIoT",
    lesson: "OPC UA, edge gateways and MQTT create a reliable bridge from OT devices to IT dashboards."
  },
  {
    id: "operator",
    title: "Operators ignore alarms.",
    detail: "Screens show too much data and not enough action.",
    skill: "Human-centric HMI",
    lesson: "Industry 5.0 design makes interfaces safer, clearer and more useful for human decision-making."
  },
  {
    id: "robot",
    title: "Manual material handling slows the cell.",
    detail: "Workers spend time moving parts instead of improving flow.",
    skill: "Robotics and cobots",
    lesson: "Robots, cobots and AMRs can reduce repetitive movement while keeping humans in higher-value roles."
  }
];

const skills = [
  "Predictive maintenance",
  "AI vision inspection",
  "OPC UA and IIoT",
  "Human-centric HMI",
  "Robotics and cobots"
];

const modules = [
  ["Safety and manufacturing flow", 40, "5S, machine safety, PPE, LOTO, shop-floor roles"],
  ["Electrical and control fundamentals", 48, "Relays, contactors, VFDs, panels, wiring, motor control"],
  ["Sensors and instrumentation", 44, "Proximity, photoelectric, encoders, analog signals, calibration"],
  ["Pneumatics and actuation", 36, "Solenoids, cylinders, grippers, hydraulic basics, pick-and-place"],
  ["PLC programming", 58, "I/O, ladder logic, timers, interlocks, sequencing, troubleshooting"],
  ["HMI and SCADA", 48, "Screens, tags, alarms, trends, data logging, operator controls"],
  ["Robotics and cobots", 54, "Teach pendant, TCP, safety zones, vision-guided robotics, AMRs"],
  ["CNC and precision manufacturing", 42, "Tooling, tolerance, GD&T, inspection, CNC process planning"],
  ["Maintenance and troubleshooting", 48, "PM, PdM, MTBF, MTTR, RCA, vibration and thermal basics"],
  ["Industry 4.0 and IIoT", 52, "OPC UA, MES, ERP, edge devices, dashboards, ISA-95"],
  ["AI and predictive analytics", 50, "Anomaly detection, vision quality, time-series, responsible AI"],
  ["Industry 5.0 and beyond", 50, "Cobots, sustainability, digital twins, self-healing systems"]
];

const roleBase = {
  technician: { min: 2.8, max: 5.2, label: "Strong fit for wiring, sensors, PLC basics, HMI operation and maintenance readiness." },
  plc: { min: 4.0, max: 8.0, label: "PLC/HMI value rises when learners can also diagnose panels, sensors and SCADA data." },
  robotics: { min: 5.2, max: 10.5, label: "Robotics roles reward safety, TCP calibration, tooling, PLC handshakes and cell integration." },
  smart: { min: 6.0, max: 13.0, label: "Smart manufacturing needs OT/IT convergence, dashboards, OEE, IIoT and systems thinking." },
  data: { min: 7.0, max: 16.0, label: "Industrial AI roles need manufacturing context, not just generic data science." }
};

const zones = [
  ["Safety Gate", "Safety, 5S, factory roles, machine hazards, emergency stop and LOTO basics."],
  ["Control Room", "PLC, HMI, SCADA, VFD, ladder logic, motor control and control cabinets."],
  ["Sensor Tunnel", "Sensor wiring, calibration, analog and digital signals, encoders and signal conditioning."],
  ["Robotics Bay", "Robot safety, pick and place, machine tending, grippers, vision and human-cobot collaboration."],
  ["IIoT Data Bridge", "Industrial networking, OPC UA, MQTT, edge gateways, dashboards and UNS architecture."],
  ["Digital Twin Lab", "Digital twins, predictive maintenance, Edge AI, simulation and self-healing systems."],
  ["Industry 5.0 Zone", "Sustainability, energy monitoring, worker-machine collaboration and human-centric manufacturing."]
];

const projects = [
  {
    title: "PLC-HMI conveyor sorter",
    hardware: "Conveyor, PLC, sensors, motor starter, HMI panel",
    software: "PLC ladder logic, HMI tags, alarm screens",
    skills: "PLC, HMI, sensors, troubleshooting, safety",
    roles: "Automation Technician, PLC Programmer, Smart Manufacturing Associate",
    difficulty: "Starter to builder",
    track: "100-hour Starter or 3-Month Builder"
  },
  {
    title: "Vision-assisted robotic pick-and-place",
    hardware: "Robot or cobot, gripper, vision camera, safety scanner",
    software: "Robot teach pendant, vision setup, PLC handshake",
    skills: "Robotics, machine vision, safety zones, PLC integration",
    roles: "Robotics Technician, Vision Integration Associate",
    difficulty: "Advanced",
    track: "6-Month Industry X.O Professional"
  },
  {
    title: "Predictive maintenance system",
    hardware: "Vibration sensor, temperature sensor, edge gateway",
    software: "Dashboard, anomaly logic, maintenance alert workflow",
    skills: "IIoT, data analytics, predictive maintenance, RCA",
    roles: "Maintenance Technician, Industrial Data Technician",
    difficulty: "Builder to advanced",
    track: "3-Month Builder or 6-Month Professional"
  },
  {
    title: "Energy monitoring system",
    hardware: "Energy meter, edge device, machine load simulator",
    software: "OEE and energy dashboard, reporting workflow",
    skills: "Sustainability, dashboards, IIoT, process improvement",
    roles: "Sustainability Analyst, Smart Utilities Technician",
    difficulty: "Builder",
    track: "3-Month Smart Factory Builder"
  }
];

function addXp(points, badge) {
  state.xp += points;
  document.querySelector("#xpScore").textContent = state.xp;
  updateReadiness();
  if (badge && !state.badges.has(badge)) {
    state.badges.add(badge);
    document.querySelector("#badgeText").textContent = `${badge} badge earned`;
    renderBadges();
  }
}

function updateReadiness() {
  const score = Math.min(100, 42 + state.solved.size * 9 + Math.floor(state.xp / 20));
  const scoreText = `${score}/100`;
  const readiness = document.querySelector("#readinessScore");
  const finalScore = document.querySelector("#finalScore");
  if (readiness) readiness.textContent = scoreText;
  if (finalScore) finalScore.textContent = scoreText;
  const summary = document.querySelector("#reportSummary");
  if (summary) {
    const track = score >= 75 ? "6-Month Industry X.O Professional" : score >= 55 ? "3-Month Smart Factory Builder" : "100-Hour Smart Manufacturing Starter";
    summary.textContent = `Recommended path: ${track}.`;
  }
}

document.querySelectorAll(".trust-pod").forEach((pod) => {
  pod.addEventListener("click", () => {
    document.querySelectorAll(".trust-pod").forEach((item) => item.classList.remove("active"));
    pod.classList.add("active");
    document.querySelector("#trustReadout").textContent = pod.dataset.trust;
    addXp(6, "Trust Core Unlocked");
  });
});

document.querySelectorAll(".persona").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".persona").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#personaMission").textContent = button.dataset.mission;
    addXp(5, "Opportunity Radar");
  });
});

function renderBadges() {
  const box = document.querySelector("#badges");
  if (!box) return;
  box.innerHTML = [...state.badges].map((badge) => `<span class="badge">${badge}</span>`).join("");
}

document.querySelectorAll(".cred-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".cred-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    document.querySelector("#credDetail").innerHTML = `<strong>${credCopy[card.dataset.cred].split(":")[0]}:</strong>${credCopy[card.dataset.cred].split(":").slice(1).join(":")}`;
    addXp(5, "Trust Builder");
  });
});

document.querySelectorAll(".story-hotspot").forEach((hotspot, index) => {
  hotspot.addEventListener("click", () => {
    document.querySelectorAll(".story-hotspot").forEach((item) => item.classList.remove("active"));
    hotspot.classList.add("active");
    document.querySelector("#storyText").textContent = hotspot.dataset.story;
    document.querySelectorAll(".story-progress span").forEach((item, progressIndex) => {
      item.classList.toggle("active", progressIndex === Math.min(index, 4));
    });
    addXp(7, "Future Factory Explorer");
  });
});

function drawRadar() {
  const canvas = document.querySelector("#radar");
  const ctx = canvas.getContext("2d");
  const active = [...document.querySelectorAll(".layer.active")].map((item) => item.dataset.layer);
  const total = active.reduce((sum, key) => sum + layers[key].score, 0);
  const oee = active.reduce((sum, key) => sum + layers[key].oee, 0);
  const roles = active.reduce((sum, key) => sum + layers[key].roles, 0);

  document.querySelector("#capabilityScore").textContent = Math.min(100, total);
  document.querySelector("#oeeGain").textContent = `${Math.min(42, oee)}%`;
  document.querySelector("#rolesUnlocked").textContent = Math.min(20, roles);

  ctx.clearRect(0, 0, 360, 360);
  ctx.translate(180, 180);
  const labels = ["Machines", "PLC", "SCADA", "Data", "AI", "Human"];
  const values = ["physical", "control", "supervisory", "data", "ai", "human"].map((key) =>
    active.includes(key) ? layers[key].score / 20 : 0.18
  );

  ctx.strokeStyle = "#d8e4e8";
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 4; ring += 1) {
    ctx.beginPath();
    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
      const radius = ring * 36;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();
  }

  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const radius = 142 * value;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(63, 159, 211, 0.28)";
  ctx.strokeStyle = "#3f9fd3";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#263746";
  ctx.font = "700 13px system-ui";
  labels.forEach((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const x = Math.cos(angle) * 164;
    const y = Math.sin(angle) * 164;
    ctx.textAlign = x < -20 ? "right" : x > 20 ? "left" : "center";
    ctx.fillText(label, x, y);
  });
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

document.querySelectorAll(".layer").forEach((layer) => {
  layer.addEventListener("click", () => {
    layer.classList.toggle("active");
    drawRadar();
    addXp(4, "Stack Mapper");
  });
});

function renderGame() {
  document.querySelector("#missionList").innerHTML = missions.map((mission) => `
    <button class="mission ${state.solved.has(mission.id) ? "solved" : ""}" data-id="${mission.id}">
      <strong>${mission.title}</strong><br>
      <small>${mission.detail}</small>
    </button>
  `).join("");

  document.querySelector("#skillList").innerHTML = skills.map((skill) => `
    <button class="skill" data-skill="${skill}">${skill}</button>
  `).join("");

  document.querySelectorAll(".mission").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMission = missions.find((mission) => mission.id === button.dataset.id);
      document.querySelectorAll(".mission").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      document.querySelector("#coachText").textContent = `Mission selected: ${state.selectedMission.title}`;
    });
  });

  document.querySelectorAll(".skill").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".skill").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      if (!state.selectedMission) {
        document.querySelector("#coachText").textContent = "Pick a factory mission first.";
        return;
      }
      if (button.dataset.skill === state.selectedMission.skill) {
        state.solved.add(state.selectedMission.id);
        document.querySelector("#coachText").textContent = state.selectedMission.lesson;
        addXp(20, state.solved.size >= 5 ? "Smart Factory Strategist" : "Problem Solver");
        renderGame();
      } else {
        document.querySelector("#coachText").textContent = "Close, but not the best match. Think about the root cause and try another skill.";
        addXp(2);
      }
    });
  });
}

function renderZones() {
  const map = document.querySelector("#zoneMap");
  if (!map) return;
  map.innerHTML = zones.map((zone, index) => `
    <button class="zone-card ${index === 0 ? "active" : ""}" data-zone="${zone[1]}">
      <strong>${index + 1}. ${zone[0]}</strong>
      <span>${zone[1].split(",").slice(0, 3).join(",")}</span>
    </button>
  `).join("");
  document.querySelectorAll(".zone-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".zone-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      document.querySelector("#zoneReadout").textContent = card.dataset.zone;
      addXp(7, "Mission Zone Unlocked");
    });
  });
}

function renderModules() {
  const target = Number(document.querySelector("#trackSelect").value);
  const pathway = document.querySelector("#pathwaySelect").value;
  document.querySelector("#selectedHours").textContent = target;

  let running = 0;
  const active = modules.map((module, index) => {
    const needed = target === 100 ? index < 6 : target === 270 ? index < 10 : true;
    if (needed) running += Math.round(module[1] * (target / 570));
    return needed;
  });

  document.querySelector("#moduleGrid").innerHTML = modules.map((module, index) => `
    <article class="module-card ${active[index] ? "active" : ""}" data-index="${index}">
      <strong>${String(index + 1).padStart(2, "0")} ${module[0]}</strong>
      <small>${module[2]}</small>
      <span>${Math.max(8, Math.round(module[1] * (target / 570)))} suggested hours</span>
    </article>
  `).join("");

  const pathwayCopy = {
    dual: "Dual cohort: shared labs with B.Tech systems design and ITI operations depth.",
    btech: "B.Tech emphasis: architecture, PLC code, analytics, IIoT, digital twins and integration.",
    iti: "ITI emphasis: installation, wiring, operation, diagnostics, maintenance and safe overrides."
  };

  const monthLabels = target === 100
    ? ["Foundation", "Automation", "HMI", "Sensors", "Mini project", "Demo day"]
    : target === 270
      ? ["Safety", "Controls", "Sensors", "PLC/HMI", "Robotics", "Capstone"]
      : ["Foundation", "Automation", "Machines", "Industry 4.0", "AI + 5.0", "Deployment"];

  document.querySelector("#roadmap").innerHTML = monthLabels.map((label, index) => `
    <div>
      <strong>${index + 1}. ${label}</strong>
      <p>${pathwayCopy[pathway]}</p>
    </div>
  `).join("");
}

document.querySelector("#trackSelect").addEventListener("change", () => {
  renderModules();
  addXp(8, "Curriculum Architect");
});
document.querySelector("#pathwaySelect").addEventListener("change", () => {
  renderModules();
  addXp(8, "Curriculum Architect");
});

function updateSalary() {
  const role = roleBase[document.querySelector("#roleSelect").value];
  const years = Number(document.querySelector("#experienceRange").value);
  const depth = Number(document.querySelector("#skillDepth").value);
  const multiplier = 1 + years * 0.09 + depth * 0.08;
  const min = (role.min * multiplier).toFixed(1);
  const max = (role.max * multiplier).toFixed(1);
  document.querySelector("#salaryRange").textContent = `INR ${min}L - ${max}L`;
  document.querySelector("#salaryNarrative").textContent = role.label;
}

document.querySelectorAll(".sector-wall button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#sectorReadout").textContent = `Roles unlocked: ${button.dataset.sector}`;
    addXp(4, "Hiring Landscape Explorer");
  });
});

function renderProjects(activeIndex = 0) {
  const list = document.querySelector("#projectList");
  const output = document.querySelector("#projectOutput");
  if (!list || !output) return;
  list.innerHTML = projects.map((project, index) => `
    <button class="${index === activeIndex ? "active" : ""}" data-project="${index}">${project.title}</button>
  `).join("");
  const project = projects[activeIndex];
  output.innerHTML = `
    <h3>${project.title}</h3>
    <dl>
      <dt>Hardware</dt><dd>${project.hardware}</dd>
      <dt>Software</dt><dd>${project.software}</dd>
      <dt>Skills</dt><dd>${project.skills}</dd>
      <dt>Roles</dt><dd>${project.roles}</dd>
      <dt>Difficulty</dt><dd>${project.difficulty}</dd>
      <dt>Track</dt><dd>${project.track}</dd>
    </dl>
  `;
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      renderProjects(Number(button.dataset.project));
      addXp(8, "Capstone Builder");
    });
  });
}

document.querySelector("#downloadReport")?.addEventListener("click", () => {
  const userType = document.querySelector("#userType")?.value || "Student";
  const targetRole = document.querySelector("#targetRole")?.value || "Smart Manufacturing Associate";
  const track = document.querySelector("#trackSelect")?.selectedOptions[0]?.textContent || "3-month project program";
  document.querySelector("#reportList").innerHTML = `
    <li>User type: ${userType}</li>
    <li>Target role: ${targetRole}</li>
    <li>Suggested curriculum: ${track}</li>
    <li>Skill gaps to close: OT/IT integration, predictive maintenance, digital twin and human-cobot collaboration.</li>
    <li>Recommended project: ${projects[0].title} or ${projects[2].title}.</li>
    <li>CTA: speak with Labdox about learner profile, lab infrastructure and delivery model.</li>
  `;
  addXp(15, "Future Factory Architect");
});

["roleSelect", "experienceRange", "skillDepth"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", () => {
    updateSalary();
    addXp(3, "Career Mapper");
  });
});

document.querySelectorAll(".lead-form input, .lead-form select, .lead-form textarea").forEach((field) => {
  field.addEventListener("focus", () => addXp(3, "Partner Intent"), { once: true });
});

drawRadar();
renderGame();
renderZones();
renderModules();
renderProjects();
updateSalary();
updateReadiness();
