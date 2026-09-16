const USERS_KEY = "registeredUsers";
const SESSION_KEY = "placementPilotSession";

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers() {
  return readJson(USERS_KEY, []);
}

export function saveUsers(users) {
  writeJson(USERS_KEY, users);
}

export function getSession() {
  return readJson(SESSION_KEY, null);
}

export function setSession(session) {
  writeJson(SESSION_KEY, session);
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("role", session.role);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("role");
}

export function getCurrentUser() {
  const session = getSession();
  if (!session || session.role !== "user") return null;
  return getUsers().find((user) => user.id === session.userId) || null;
}

export function getCurrentAdmin() {
  const session = getSession();
  if (!session || session.role !== "admin") return null;
  return readJson("admin", { name: "Admin", email: session.email });
}

export function getUserApplications(userId) {
  const all = readJson("applications", []);
  return all.filter((application) => application.userId === userId || (!application.userId && userId === "legacy"));
}

export function saveApplications(applications) {
  writeJson("applications", applications);
}

export function getAllApplications() {
  return readJson("applications", []);
}

export function getJobs() {
  return readJson("jobs", []);
}

export function saveJobs(jobs) {
  writeJson("jobs", jobs);
}

export function logout() {
  clearSession();
  localStorage.removeItem("userSession");
  localStorage.removeItem("admin");
}
