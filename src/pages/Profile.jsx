import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const defaultProfile = { name: "Anshika Gupta", email: "anshika@example.com", phone: "+91 98765 43210", college: "Your College", degree: "B.Tech Computer Science", year: "4th Year", skills: "React, JavaScript, HTML, CSS" };

export default function Profile() {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("profile") || "null") || defaultProfile);
  const [saved, setSaved] = useState(false);
  useEffect(() => localStorage.setItem("profile", JSON.stringify(profile)), [profile]);
  const update = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });
  const submit = (event) => { event.preventDefault(); localStorage.setItem("profile", JSON.stringify(profile)); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return <div className="dashboard-page"><Sidebar /><main className="dashboard-main"><Navbar />
    <section className="page-toolbar"><div><p className="panel-kicker">PERSONAL SPACE</p><h2>Your profile</h2><p className="dashboard-subtitle">Keep your information updated for better opportunities.</p></div><div className="profile-large-avatar">{profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div></section>
    {saved && <div className="success-message">Profile saved successfully.</div>}
    <form className="profile-layout" onSubmit={submit}><section className="dashboard-panel"><div className="dashboard-panel-header"><div><p className="panel-kicker">BASIC INFORMATION</p><h2>Personal details</h2></div></div><div className="profile-form-grid">{[["name","Full name"],["email","Email address"],["phone","Phone number"],["college","College / university"],["degree","Degree"],["year","Academic year"]].map(([name,label]) => <label key={name}>{label}<input name={name} value={profile[name]} onChange={update} /></label>)}</div><label className="full-field">Skills<input name="skills" value={profile.skills} onChange={update} /></label><button className="dashboard-primary-button" type="submit">Save changes</button></section><aside className="dashboard-panel profile-side-card"><p className="panel-kicker">RESUME</p><h2>Build your profile</h2><p>Upload your latest resume so recruiters can understand your skills and experience.</p><button type="button" className="dashboard-secondary-button" onClick={() => window.alert("Resume upload will be connected to the backend later.")}>Upload resume</button><div className="profile-checklist"><span>✓</span><p>Keep your contact details updated</p><span>✓</span><p>Add relevant technical skills</p><span>✓</span><p>Upload your latest resume</p></div></aside></form>
  </main></div>;
}
