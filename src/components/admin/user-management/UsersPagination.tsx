import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersPaginationProps {
    currentPage: number;
    totalVisiblePages: number;
    totalApiPages: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function UsersPagination({
    currentPage,
    totalVisiblePages,
    totalApiPages,
    onPrev,
    onNext,
}: UsersPaginationProps) {
    return (
        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
                Page {currentPage} of {totalVisiblePages} (API total pages: {totalApiPages})
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Prev
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    disabled={currentPage === totalVisiblePages}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
