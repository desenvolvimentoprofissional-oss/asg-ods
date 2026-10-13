import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../constants/footer';
import { FooterContactBar } from './FooterContactBar';
import { FooterAddress } from './FooterAddress';
import {
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from './TopBarSocial';

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const SOCIAL_ITEMS = [
  { href: 'https://youtube.com/crasp', label: 'YouTube do CRA-SP', Icon: YouTubeIcon },
  { href: 'https://facebook.com/crasp', label: 'Facebook do CRA-SP', Icon: FacebookIcon },
  { href: 'https://instagram.com/crasp', label: 'Instagram do CRA-SP', Icon: InstagramIcon },
  { href: 'https://linkedin.com/company/crasp', label: 'LinkedIn do CRA-SP', Icon: LinkedinIcon },
  { href: 'https://twitter.com/crasp', label: 'X do CRA-SP', Icon: XIcon },
];

function FooterLinkItem({ link }: { link: { name: string; href: string } }) {
  if (link.href.startsWith('http')) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#dbeafe] hover:text-white transition-colors"
      >
        {link.name}
      </a>
    );
  }
  return (
    <Link to={link.href} className="text-sm text-[#dbeafe] hover:text-white transition-colors">
      {link.name}
    </Link>
  );
}

function LinksColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
      <div className="flex flex-col space-y-3">
        {links.map((link, idx) => (
          <FooterLinkItem key={idx} link={link} />
        ))}
      </div>
    </div>
  );
}

function FooterSocialIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SOCIAL_ITEMS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="footer-social-btn"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

function SocialAndInfoRow() {
  return (
    <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
      <FooterSocialIcons />
      <a
        href="https://crasp.gov.br/crasp/site/informacao-publica"
        target="_blank"
        rel="noopener noreferrer"
        className={
          'footer-info-btn inline-flex items-center gap-2 rounded-full bg-yellow-500 ' +
          'px-3 py-2 text-sm font-semibold text-black transition ' +
          'hover:bg-yellow-400 self-start sm:self-auto shadow-sm'
        }
      >
        <InfoIcon />
        <span>Acesso à informação</span>
      </a>
    </div>
  );
}

export const Footer: React.FC = () => {
  return (
    <>
      <FooterContactBar />
      <footer className="w-full">
        <div className="w-full bg-[#1e3a8a]">
          <div className="crasp-page-container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <FooterAddress />
              <LinksColumn title="Chancela Institucional" links={footerLinks.chancela} />
              <LinksColumn title="Metodologia Dinâmica" links={footerLinks.metodologia} />
              <LinksColumn title="Área do Docente" links={footerLinks.espacoDocente} />
            </div>
            <SocialAndInfoRow />
            <div className="mt-8 pt-6 border-t border-white/10 text-left">
              <p className="text-sm text-[#dbeafe]">
                Todos direitos reservados © Conselho Regional de Administração de São Paulo.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
