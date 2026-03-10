import { Play } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-slate-900" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/10 rounded-full blur-[100px]" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to start coding?
                </h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of developers who are shipping faster with Covvee. No credit card required to start.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                        <Play className="w-5 h-5 fill-current" />
                        Try Covvee Now
                    </button>
                    <button className="w-full sm:w-auto bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
};
