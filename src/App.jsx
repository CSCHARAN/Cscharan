

import { useState } from "react";
import { ShieldCheck, Network, Terminal, Cloud, Code2, Database, BriefcaseBusiness, GraduationCap, Award, Mail, Phone, ExternalLink, Contact, SquarePlay, Camera, Menu, X, Copy, Check, Download } from "lucide-react";
import { profile, skillGroups } from "../data/profile.js";

const icons = { security: ShieldCheck, network: Network, terminal: Terminal, cloud: Cloud, database: Database, code: Code2 };
const socials = [
  { name: "GitHub", url: profile.github, Icon: Code2 },
  { name: "LinkedIn", url: profile.linkedin, Icon: Contact },
  { name: "YouTube", url: profile.youtube, Icon: SquarePlay },
  { name: "Instagram", url: profile.instagram, Icon: Camera },
];
const navigation = ["About", "Skills", "Experience", "Projects", "Contact"];

function SocialLinks({ text = false }) {
  return <div className={text ? "social-links with-text" : "social-links"}>
    {socials.map(({ name, url, Icon }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}><Icon size={18}/>{text && <span>{name}</span>}</a>)}
  </div>;
}
function SectionLabel({ number, title, note }) {
  return <div className="section-label"><span>{number} / {title}</span><span>{note}</span></div>;
}
function Tags({ items }) {
  return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");

  async function prepareMessage(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = `Hi Charan,\n\n${values.get("message")}\n\n${values.get("name")}\n${values.get("email")}`;
    setDraft(message);
    if (event.nativeEvent.submitter?.value === "email") {
      setCopied(false);
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.get("name")}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
      setStatus("This opens your configured email app. Review the draft before sending.");
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setStatus("Message copied. You can send it by email or through LinkedIn.");
    } catch {
      setCopied(false);
      setStatus("Select and copy the draft below, then send it by email or through LinkedIn.");
    }
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label="Sure Sri Hari Charan home"><span className="brand-mark">Sure</span><span className="brand-wordmark"><span>Sri Hari Charan</span><small>Cybersecurity portfolio</small></span></a>
        <nav id="mobile-navigation" className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {navigation.map(label => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="nav-contact" href={`mailto:${profile.email}`}>Get in touch <Mail size={16}/></a>
        <button variant="ghost" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main id="main">
      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><ShieldCheck size={16}/> Cybersecurity undergraduate</div>
          <h1>{profile.name}<span className="name-period">.</span></h1>
          <h2>Understanding threats.<br/><span>Building stronger foundations.</span></h2>
          <p className="hero-intro">A cybersecurity student at Marwadi University with a foundation in networking, Linux, Python, and security fundamentals. Learning through labs, CTF challenges, and practical experience.</p>
          <div className="hero-actions"><a className="button primary" href="#projects">Explore my projects</a><a className="button secondary" href="#experience">View my experience</a><a className="button secondary" href={`${import.meta.env.BASE_URL}S_SRI_HARI_CHARAN_RESUME.pdf`} download="S_SRI_HARI_CHARAN_RESUME.pdf"><Download size={17} aria-hidden="true"/> Download resume</a></div>
          <div className="hero-foot"><SocialLinks/><span>Security. Systems. Curiosity.</span></div>
        </div>
        <aside className="profile-console" aria-label="Charan’s profile">
          <div className="console-bar"><div className="console-controls" aria-hidden="true"><i/><i/><i/></div><span>~/charan/profile</span><Terminal size={16}/></div>
          <div className="console-body">
            <p className="terminal-command"><span>$</span> cat profile.txt</p>
            <div className="profile-identity"><div className="identity-photo"><img src={`${import.meta.env.BASE_URL}charan-portrait.png`} alt="Portrait of Sure Sri Hari Charan" fetchPriority="high" width="1254" height="1254"/></div><div><span className="profile-kicker">Profile</span><h3>{profile.name}</h3><p>{profile.brand}</p><span className="identity-label">B.Tech · Cyber Security</span></div></div>
            <dl className="profile-fields"><div><dt>education</dt><dd>Marwadi University</dd></div><div><dt>graduation</dt><dd>2028</dd></div><div><dt>foundation</dt><dd>Networking / Linux / Python</dd></div><div><dt>practice</dt><dd>TryHackMe / CTF challenges</dd></div></dl>
            <div className="console-note"><span>// approach</span><p>Understand the system.<br/>Investigate the risk.</p></div>
            <p className="terminal-command console-prompt"><span>$</span><span className="prompt-cursor" aria-hidden="true"/></p>
          </div>
        </aside>
        <div className="hero-baseline"><span>Cybersecurity · Networking · Linux</span><a href="#credentials">Courses & practical learning</a></div>
      </section>

      <div className="focus-strip"><div className="section-shell focus-strip-inner"><span className="focus-strip-label">Areas of focus</span><span>Vulnerability assessment</span><span>Network security</span><span>Threat analysis</span></div></div>

      <section className="section-shell section-block about" id="about">
        <SectionLabel number="01" title="About" note="A security-focused foundation"/>
        <div className="about-grid"><h2>Curiosity informed<br/>by <span>practical learning.</span></h2><div className="about-copy"><p>I’m {profile.name}, pursuing a B.Tech in Computer Science (Cyber Security) at Marwadi University. My foundation spans networking, Linux, Python, and security fundamentals.</p><p>Through TryHackMe labs, CTF competitions, Cisco courses, and a cybersecurity internship, I’m developing practical exposure to vulnerability assessment, network security, threat analysis, and secure system administration.</p><p>I also build web applications and share content through the CS Charan YouTube channel, bringing together technical learning and clear communication.</p></div></div>
        <div className="focus-areas"><span className="focus-areas-label">Professional interests</span><Tags items={profile.functionalAreas}/></div>
        <div className="education-card"><div className="education-icon"><GraduationCap size={26}/></div><div className="education-copy"><span className="small-label">Education</span><h3>{profile.education.degree}</h3><p>{profile.education.university}</p></div><div className="education-meta"><span>{profile.education.duration}</span><p>CGPA <strong>{profile.education.cgpa}</strong></p></div></div>
      </section>

      <section className="section-shell section-block" id="skills">
        <SectionLabel number="02" title="Skills" note="Security, systems, and development"/>
        <div className="section-heading"><h2>Technical foundation<span className="lime">.</span></h2><p>Core security knowledge, supported<br/>by networking and application development.</p></div>
        <div className="skills-grid">{skillGroups.map(({ title, icon, description, skills }, index) => {
          const Icon = icons[icon];
          return <article className="skill-card" key={title}><div className="skill-card-top"><Icon size={25}/><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><Tags items={skills}/></article>;
        })}</div>
      </section>

      <section className="section-shell section-block" id="experience">
        <SectionLabel number="03" title="Experience" note="Learning in practice"/>
        <div className="section-heading"><h2>Experience & contributions<span className="lime">.</span></h2><p>Security exposure, creative work,<br/>and team responsibilities.</p></div>
        <div className="experience-list">{profile.experience.map(item => <article className={item.category === "Cybersecurity" ? "experience-row security-experience" : "experience-row"} key={item.company + item.role}><div className="experience-date"><span>{item.duration}</span><span className="experience-category">{item.category}</span></div><div className="experience-content"><div className="experience-role"><h3>{item.role}</h3>{item.category === "Cybersecurity" ? <ShieldCheck size={20}/> : <BriefcaseBusiness size={19}/>}</div><p className="experience-company">{item.company}</p><p className="experience-description">{item.description}</p></div></article>)}</div>
        <div className="contributions"><h3>Community & leadership</h3><div className="contributions-grid">{profile.volunteering.map(item => <article key={item.title}><h4>{item.title}</h4><p>{item.description}</p></article>)}</div></div>
      </section>

      <section className="section-shell section-block" id="projects">
        <SectionLabel number="04" title="Projects" note="Application development"/>
        <div className="section-heading"><h2>Selected projects<span className="lime">.</span></h2><a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer"><Code2 size={18}/> Explore my GitHub</a></div>
        <div className="projects-grid">{profile.projects.map((project, index) => <article className="project-card updated-project" key={project.title}><div className="project-topline"><span>Project 0{index + 1}</span><span>{project.category}</span></div><div className="project-body"><div className="project-icon">{index === 0 ? <Code2 size={30}/> : <Database size={30}/>}</div><h3>{project.title}</h3><p>{project.summary}</p><Tags items={project.technologies}/><details><summary>Read project details</summary><ul>{project.points.map(point => <li key={point}>{point}</li>)}</ul></details>{project.url && <a className="text-link project-live-link" href={project.url} target="_blank" rel="noopener noreferrer">View original portfolio <ExternalLink size={15}/></a>}</div></article>)}</div>
      </section>

      <section className="section-shell section-block" id="credentials">
        <SectionLabel number="05" title="Learning & credentials" note="Courses and hands-on practice"/>
        <div className="section-heading"><h2>Learning beyond<br/>the classroom<span className="lime">.</span></h2><p>Structured learning through Cisco,<br/>and security challenges through TryHackMe.</p></div>
        <div className="credential-layout"><div><h3 className="subsection-title">Cisco courses</h3><div className="course-list">{profile.courses.map(course => <article className="course-card" key={course.title}><Award size={22}/><div><span className="small-label">{course.area}</span><h4>{course.title}</h4><p>{course.provider}</p></div></article>)}</div></div><div><h3 className="subsection-title">Labs & CTF participation</h3><div className="practice-list">{profile.practice.map(item => <article className="practice-card" key={item.title}><div className="practice-card-heading"><h4>{item.title}</h4><span>{item.type}</span></div><p>{item.description}</p></article>)}</div></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="section-shell section-block">
        <SectionLabel number="06" title="Contact" note="Start a conversation"/>
        <div className="contact-grid"><div className="contact-copy"><h2>Let’s connect<br/><span>and exchange ideas.</span></h2><p>For cybersecurity opportunities, technical collaboration, or a conversation about learning and building.</p><div className="contact-methods"><a href={`mailto:${profile.email}`}><Mail size={19}/><span><small>Email</small>{profile.email}</span></a><a href={`tel:${profile.phone}`}><Phone size={19}/><span><small>Phone</small>{profile.phone}</span></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Contact size={19}/><span><small>LinkedIn</small>Connect with Charan</span></a></div><SocialLinks text/></div>
          <form className="contact-form" onSubmit={prepareMessage}><h3>Compose a message</h3><p>Prepare an email draft or copy your message.</p><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Name" required maxLength={100}/></label><label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254}/></label></div><label>Your message<textarea name="message" placeholder="Hi Charan, I’d like to connect about…" rows={5} required maxLength={4000} onChange={() => {setCopied(false);setStatus("");setDraft("");}}/></label><div className="contact-form-actions"><button className="copy-button" type="submit" value="email"><Mail size={17}/> Open email draft</button><button className="copy-secondary" type="submit" value="copy">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Copied" : "Copy message"}</button></div><p className="delivery-note">Email drafts open in your configured email app. Nothing is sent automatically.</p><p className="form-status" role="status">{status}</p>{draft && !copied && <label className="message-draft">Your message draft<textarea value={draft} readOnly rows={6} onFocus={event => event.target.select()}/></label>}</form>
        </div>
      </div></section>
    </main>
    <footer className="section-shell site-footer"><a className="brand footer-brand" href="#home">Charan<span className="brand-period">.</span></a><p>© {new Date().getFullYear()} {profile.brand}</p><a href="#home">Back to top</a></footer>
  </>;
}
