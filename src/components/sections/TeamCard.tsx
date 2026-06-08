import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const { t } = useTranslation();
  const isCyanGlow = member.glow === "var(--cyan)";

  return (
    <motion.article
      className={`team-card ${isCyanGlow ? "glow-cyan" : "glow-lime"}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}`}
    >
      {/* Photo with 4:5 aspect ratio */}
      <div className="team-card-image-wrap">
        <img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          className="team-card-image"
          loading="lazy"
        />
      </div>

      {/* Info Section */}
      <div className="team-card-info">
        <span className="team-card-role-badge">
          {member.role}
        </span>

        <h3 className="team-card-name">{member.name}</h3>

        <div className="team-card-divider" />

        <p className="team-card-bio">
          {t(`team.members.${member.name}.bio`, member.bio)}
        </p>

        {/* Social Links */}
        <div className="team-card-socials">
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-social-icon"
              aria-label={`${member.name} GitHub Profile`}
            >
              <Github size={16} aria-hidden="true" />
            </a>
          )}
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-social-icon"
              aria-label={`${member.name} LinkedIn Profile`}
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
