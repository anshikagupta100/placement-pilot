import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../lib/auth";

export default function Profile() {
  const user = getCurrentUser() || {};
  const storageKey = `profile_${user.id || "guest"}`;
  const defaults = useMemo(() => ({ name: user.name || "", email: user.email || "", phone: "", college: "", degree: "B.Tech Computer Science", year: "4th Year", skills: "" }), [user.name, user.email]);
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || defaults; } catch { return defaults; }
  });
  const [saved, setSaved] = useState(false);
  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(profile)), [profile, storageKey]);
  useEffect(() => { setProfile((current) => ({ ...current, name: current.name || user.name || "", email: current.email || user.email || "" })); }, [user.name, user.email]);
  const submit = (event) => { event.preventDefault(); localStorage.setItem(storageKey, JSON.stringify(profile)); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const update = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });
  const initials = (profile.name || "Student").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return <div className="dashboard-page"><Sidebar /><main className="dashboard-main"><Navbar /><section className="page-toolbar"><div><p className="panel-kicker">PERSONAL SPACE</p><h2>Your profile</h2><p className="dashboard-subtitle">Keep your information updated for better opportunities.</p></div><div className="profile-large-avatar">{initials}</div></section>{saved && <div className="success-message">Profile saved successfully.</div>}<form className="profile-layout" onSubmit={submit}><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">BASIC INFORMATION</p><h2>Personal details</h2></div></div><div className="profile-form-grid">{[["name","Full name"],["email","Email address"],["phone","Phone number"],["college","College / university"],["degree","Degree"],["year","Academic year"]].map(([name,label]) => <label key={name}>{label}<input name={name} value={profile[name] || ""} onChange={update} /></label>)}</div><label className="full-field">Skills<input name="skills" value={profile.skills || ""} onChange={update} placeholder="React, JavaScript, AWS, SQL..." /></label><button className="dashboard-primary-button" type="submit">Save changes</button></section><aside className="dashboard-panel profile-side-card"><p className="panel-kicker">PROFILE CHECKLIST</p><h2>Build your profile</h2><p>A complete profile makes your PlacementPilot workspace more useful and keeps your application details organised.</p><div className="profile-checklist"><span>✓</span><p>Keep your contact details updated</p><span>✓</span><p>Add relevant technical skills</p><span>✓</span><p>Keep your academic information current</p></div></aside></form></main></div>;
}
