import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import Logo from "../Logo";

const cols = {
  Product: ["Features", "Pricing", "Roadmap"],
  Resources: ["Documentation", "Blog", "Support"],
  Company: ["About Us", "Careers", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo dark />
          <p className="mt-3 max-w-xs text-sm">Simple project management for modern teams. Build better, together.</p>
          <div className="mt-4 flex gap-4">
            {[FaTwitter, FaLinkedin, FaGithub, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social link" className="hover:text-white"><Icon size={18} /></a>
            ))}
          </div>
        </div>
        {Object.entries(cols).map(([title, items]) => (
          <div key={title}>
            <h4 className="mb-3 text-sm font-semibold text-white">{title}</h4>
            <ul className="space-y-2 text-sm">
              {items.map((i) => <li key={i}><a href="#" className="hover:text-white">{i}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-xs sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 sm:flex-row">
          <p>© 2026 TaskFlow. All rights reserved.</p>
          <p className="flex gap-4"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
}