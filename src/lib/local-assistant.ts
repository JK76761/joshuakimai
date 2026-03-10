import { education, experience, featuredProjects, profile, projects } from "@/lib/data";
import { buildContext } from "@/lib/embeddings";
import { getDisplayName } from "@/lib/format";
import type { ChatHistoryMessage, Experience, Project } from "@/lib/types";

type CreateLocalAssistantAnswerInput = {
  question: string;
  history: ChatHistoryMessage[];
};

const displayName = getDisplayName(profile.name);

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function includesAny(value: string, patterns: string[]): boolean {
  return patterns.some((pattern) => value.includes(pattern));
}

function findProject(question: string): Project | undefined {
  const normalizedQuestion = normalize(question);

  return projects.find((project) => {
    const normalizedName = normalize(project.name);
    return (
      normalizedQuestion.includes(normalizedName) ||
      normalizedName
        .split(" ")
        .filter((token) => token.length > 3)
        .every((token) => normalizedQuestion.includes(token))
    );
  });
}

function findExperience(question: string): Experience | undefined {
  const normalizedQuestion = normalize(question);

  return experience.find((item) => {
    const company = normalize(item.company);
    const role = normalize(item.role);
    return normalizedQuestion.includes(company) || normalizedQuestion.includes(role);
  });
}

function formatProjectAnswer(project: Project): string {
  const parts = [
    `${project.name} (${project.year}) is one of Joshua Kim's portfolio projects.`,
    project.description,
    `Stack: ${project.stack.join(", ")}.`,
    `Impact: ${project.impact}`,
  ];

  return parts.join(" ");
}

function formatExperienceAnswer(item: Experience): string {
  const topAchievements = item.achievements.slice(0, 3).join(" ");

  return [
    `${item.role} at ${item.company} (${item.startDate} - ${item.endDate}) in ${item.location}.`,
    item.summary,
    topAchievements,
    `Technologies: ${item.technologies.join(", ")}.`,
  ].join(" ");
}

function answerAboutAssistant(): string {
  return [
    "This site uses a local portfolio assistant instead of a paid external model.",
    "It answers from structured portfolio data stored in JSON files covering projects, experience, education, contact details, and technical skills.",
    "That keeps it fast, free to run, and reliable on Vercel.",
  ].join(" ");
}

function answerAboutProfile(): string {
  return [
    `${displayName} is a ${profile.headline}.`,
    profile.bio,
    `Availability: ${profile.availability}`,
  ].join(" ");
}

function answerAboutContact(): string {
  return [
    `The best contact email is ${profile.email}.`,
    `Joshua is based in ${profile.location}.`,
    `GitHub: ${profile.socials.github}. LinkedIn: ${profile.socials.linkedin}.`,
  ].join(" ");
}

function answerAboutSkills(): string {
  const topSkills = profile.skills.slice(0, 10).join(", ");
  return [
    `${displayName}'s main stack includes ${topSkills}.`,
    "The strongest practical areas are Next.js, React Native, TypeScript, Node.js, REST APIs, troubleshooting, and production support workflows.",
  ].join(" ");
}

function answerAboutProjects(question: string): string {
  if (includesAny(normalize(question), ["first", "best", "featured", "review"])) {
    const recommended = featuredProjects[0] ?? projects[0];

    if (recommended) {
      return [
        `A strong project to review first is ${recommended.name}.`,
        recommended.summary,
        `It shows ${recommended.impact.toLowerCase()}`,
      ].join(" ");
    }
  }

  const list = projects
    .map((project) => `${project.name} (${project.year})`)
    .join(", ");

  return [
    `${displayName} currently highlights these projects: ${list}.`,
    "You can ask about a specific project name for a more detailed answer.",
  ].join(" ");
}

function answerAboutExperience(question: string): string {
  if (includesAny(normalize(question), ["internship", "moonward"])) {
    const moonward = experience.find((item) => item.id === "moonward");
    if (moonward) {
      return formatExperienceAnswer(moonward);
    }
  }

  const latest = experience[0];

  if (!latest) {
    return "Experience data is available on the portfolio, but no role is currently loaded.";
  }

  return [
    `${displayName}'s most relevant recent experience is ${latest.role} at ${latest.company}.`,
    latest.summary,
    `Recent focus: ${latest.technologies.slice(0, 6).join(", ")}.`,
  ].join(" ");
}

function answerAboutEducation(): string {
  const currentEducation = education[0];

  if (!currentEducation) {
    return "Education details are not currently available in the portfolio data.";
  }

  return [
    `${displayName} is studying ${currentEducation.program} at ${currentEducation.institution}.`,
    `Timeline: ${currentEducation.startDate} to ${currentEducation.endDate}.`,
  ].join(" ");
}

function answerFromContext(question: string): string {
  const context = buildContext(question)
    .split("\n\n")
    .slice(0, 2)
    .join("\n\n");

  return [
    "Here is the most relevant information from the portfolio data:",
    context,
  ].join("\n\n");
}

export function createLocalAssistantAnswer({
  question,
  history,
}: CreateLocalAssistantAnswerInput): string {
  const normalizedQuestion = normalize(question);
  const previousMessages = history.map((item) => normalize(item.content)).join(" ");
  const combinedQuestion = `${normalizedQuestion} ${previousMessages}`.trim();

  const matchedProject = findProject(question);
  if (matchedProject) {
    return formatProjectAnswer(matchedProject);
  }

  const matchedExperience = findExperience(question);
  if (matchedExperience) {
    return formatExperienceAnswer(matchedExperience);
  }

  if (includesAny(combinedQuestion, ["contact", "email", "linkedin", "github", "reach"])) {
    return answerAboutContact();
  }

  if (
    includesAny(combinedQuestion, [
      "looking",
      "role",
      "available",
      "availability",
      "opportunity",
      "job",
    ])
  ) {
    return `${displayName} is currently ${profile.availability.toLowerCase()}`;
  }

  if (includesAny(combinedQuestion, ["location", "based", "brisbane", "where"])) {
    return `${displayName} is based in ${profile.location}.`;
  }

  if (
    includesAny(combinedQuestion, [
      "stack",
      "skill",
      "technology",
      "technologies",
      "tech",
      "typescript",
      "react",
      "next",
      "node",
    ])
  ) {
    return answerAboutSkills();
  }

  if (
    includesAny(combinedQuestion, [
      "project",
      "projects",
      "portfolio",
      "build",
      "built",
      "ship",
      "shipped",
    ])
  ) {
    return answerAboutProjects(question);
  }

  if (
    includesAny(combinedQuestion, [
      "experience",
      "internship",
      "moonward",
      "work",
      "worked",
      "capstone",
    ])
  ) {
    return answerAboutExperience(question);
  }

  if (
    includesAny(combinedQuestion, [
      "education",
      "study",
      "university",
      "degree",
      "qut",
      "computer science",
    ])
  ) {
    return answerAboutEducation();
  }

  if (
    includesAny(combinedQuestion, [
      "assistant",
      "chatbot",
      "chat",
      "website",
      "site",
      "how does",
      "how do",
    ])
  ) {
    return answerAboutAssistant();
  }

  if (
    includesAny(combinedQuestion, [
      "who is",
      "who are",
      "tell me about",
      "introduce",
      "summary",
      "overview",
    ])
  ) {
    return answerAboutProfile();
  }

  return answerFromContext(question);
}
