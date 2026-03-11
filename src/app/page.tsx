import Link from "next/link";
import CopyEmailButton from "@/components/CopyEmailButton";
import HomeNavbar from "@/components/HomeNavbar";
import ProjectCard from "@/components/ProjectCard";
import StackIconsShowcase from "@/components/StackIconsShowcase";
import { education, experience, featuredProjects, profile } from "@/lib/data";
import { formatDateLabel, getDisplayName } from "@/lib/format";

const socialLinks = [
  { label: "GitHub", href: profile.socials.github },
  { label: "LinkedIn", href: profile.socials.linkedin },
];

export default function HomePage() {
  const primaryExperience = experience[0];
  const primaryEducation = education[0];
  const displayName = getDisplayName(profile.name);

  return (
    <div className="space-y-16">
      <section className="page-fade stagger-1">
        <HomeNavbar />
      </section>

      <section id="hero" className="page-fade stagger-1 space-y-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:items-center">
          <div className="hero-intro max-w-4xl space-y-4">
            <p className="section-kicker">{profile.location}</p>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-6xl">
              {displayName}
            </h1>
            <p className="font-display text-3xl font-medium tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Software Developer
            </p>
            <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)]">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/ai" className="cta-primary">
                Open Full AI Page
              </a>
              <a href="#projects" className="cta-primary">
                View Projects
              </a>
              <a
                href="/Joshua_Kim_CV_final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                View CV
              </a>
            </div>

            <div className="flex flex-wrap gap-5 pt-3 text-sm font-semibold text-[var(--text-muted)]">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <p className="hero-proof-copy">
              The Josh Assistant opens as a translucent full-screen layer on first
              visit, stays scoped to portfolio data, and is rate limited for abuse
              protection.
            </p>
          </div>

          <StackIconsShowcase />
        </div>
      </section>

      <section id="snapshot" className="page-fade stagger-2 section-block space-y-8">
        <div className="section-heading">
          <p className="section-kicker">Snapshot</p>
          <h2 className="section-title">Recruiter Snapshot</h2>
          <p className="section-copy max-w-3xl">
            The fastest overview of what I am building, what I am looking for,
            and where I can contribute immediately.
          </p>
        </div>

        <div className="snapshot-grid">
          <article className="snapshot-card">
            <p className="snapshot-label">Current role</p>
            <p className="snapshot-value">
              {primaryExperience?.role || "Software Developer"}
            </p>
            <p className="snapshot-note">
              {primaryExperience?.company || "Currently active in product delivery work"}
            </p>
          </article>

          <article className="snapshot-card">
            <p className="snapshot-label">Open to</p>
            <p className="snapshot-value">Junior and support roles</p>
            <p className="snapshot-note">{profile.availability}</p>
          </article>

          <article className="snapshot-card">
            <p className="snapshot-label">Education</p>
            <p className="snapshot-value">
              {primaryEducation?.program || "Computer Science"}
            </p>
            <p className="snapshot-note">
              {primaryEducation
                ? `${primaryEducation.institution} • ${formatDateLabel(primaryEducation.endDate)}`
                : "Queensland University of Technology"}
            </p>
          </article>

          <article className="snapshot-card">
            <p className="snapshot-label">Core stack</p>
            <p className="snapshot-value">Next.js, React Native, Node.js</p>
            <p className="snapshot-note">Web, mobile, APIs, and deployment workflows</p>
          </article>
        </div>

        <div className="snapshot-panel-grid">
          <article className="snapshot-panel">
            <p className="snapshot-label">Target roles</p>
            <ul className="snapshot-list">
              {profile.targetRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </article>

          <article className="snapshot-panel">
            <p className="snapshot-label">What I bring</p>
            <ul className="snapshot-list">
              {profile.focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="projects" className="page-fade stagger-2 section-block space-y-8">
        <div className="section-heading">
          <p className="section-kicker">Projects</p>
          <h2 className="section-title">Selected Projects</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link href="/projects" className="link-inline text-sm font-semibold">
          View full archive
        </Link>
      </section>

      <section id="experience" className="page-fade stagger-2 section-block space-y-8">
        <div className="section-heading">
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">Experience</h2>
        </div>

        {primaryExperience ? (
          <article className="experience-focus">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {formatDateLabel(primaryExperience.startDate)} - {formatDateLabel(primaryExperience.endDate)}
              </p>
              <h3 className="font-display text-3xl font-semibold text-[var(--text-strong)]">
                Moonward Internship
              </h3>
              <p className="text-lg font-medium text-[var(--text-primary)]">{primaryExperience.role}</p>
            </div>

            <p className="max-w-3xl text-sm leading-8 text-[var(--text-muted)]">
              {primaryExperience.summary}
            </p>

            <ul className="space-y-2 text-sm leading-7 text-[var(--text-muted)]">
              {primaryExperience.achievements.slice(0, 3).map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </article>
        ) : null}

        <Link href="/experience" className="link-inline text-sm font-semibold">
          View full experience
        </Link>
      </section>

      <section id="contact" className="page-fade stagger-3 section-block space-y-8">
        <div className="section-heading">
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="contact-grid">
          <div className="space-y-5">
            <p className="section-copy max-w-xl">
              Email is the fastest way to reach me for junior software engineering,
              IT support, or internship-related opportunities.
            </p>

            <a href={`mailto:${profile.email}`} className="contact-email">
              {profile.email}
            </a>

            <div className="flex flex-wrap gap-3">
              <CopyEmailButton email={profile.email} />
              <a
                href="/Joshua_Kim_CV_final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                View CV
              </a>
            </div>
          </div>

          <div className="contact-rail">
            <div className="contact-row">
              <span className="contact-row-label">Location</span>
              <span className="contact-row-value">{profile.location}</span>
            </div>
            <div className="contact-row">
              <span className="contact-row-label">Availability</span>
              <span className="contact-row-value">{profile.availability}</span>
            </div>
            {socialLinks.map((item) => (
              <div key={item.label} className="contact-row">
                <span className="contact-row-label">{item.label}</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row-link"
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
