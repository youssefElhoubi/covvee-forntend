import { Code2, Cpu, Terminal } from "lucide-react";
import type { Language } from "../../../types/Langauge";
import { cn } from "../../../utils/cn";

export const LanguageBadge = ({ lang }: { lang: Language }) => {
    const styles = {
        JAVA: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        TYPESCRIPT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        JAVASCRIPT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        PYTHON: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        GO: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    };

    const icons = {
        JAVA: <Cpu size={14} />,
        TYPESCRIPT: <Code2 size={14} />,
        JAVASCRIPT: <Terminal size={14} />,
        PYTHON: <Terminal size={14} />,
        GO: <Cpu size={14} />,
    };

    return (
        <div className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
            styles[lang] || styles.JAVASCRIPT
        )}>
            {icons[lang]}
            {lang}
        </div>
    );
};