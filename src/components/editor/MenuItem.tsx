import type React from "react";

const MenuItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-100"
        >
            {label}
        </button>
    );
}
export default MenuItem;
