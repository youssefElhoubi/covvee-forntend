import { Code2, Github, Twitter } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                            <div className="w-6 h-6 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
                                <Code2 className="text-slate-950 w-4 h-4" />
                            </div>
                            Covvee
                        </div>
                        <p className="text-slate-400 max-w-sm">
                            The modern web editor for developers. Build, test, and ship code faster than ever before.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Changelog</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Covvee Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};