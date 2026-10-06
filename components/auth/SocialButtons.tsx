import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Non-functional placeholders (social login is not required by the assessment)
export default function SocialButtons() {
  const cls = "flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50";
  return (
    <>
      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />or continue with<span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className={cls}><FcGoogle size={18} /> Google</button>
        <button type="button" className={cls}><FaGithub size={18} /> GitHub</button>
      </div>
    </>
  );
}