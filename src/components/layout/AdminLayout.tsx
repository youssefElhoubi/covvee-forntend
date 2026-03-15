import { useState, type ReactNode } from "react";
import NavBar from "../admin/navBar";
import Header from "../admin/Header";


interface AdminLayoutProps {
    children: ReactNode;
}




export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="flex min-h-screen">
                <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="flex min-w-0 flex-1 flex-col">
                    <Header setSidebarOpen={setSidebarOpen} isopen={sidebarOpen} />

                    <main className="flex-1 px-4 py-5 md:px-6 md:py-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
