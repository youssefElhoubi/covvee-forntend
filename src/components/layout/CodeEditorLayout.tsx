import React from 'react'
import type { AuthenticatedLayoutProps } from './Layout';
import { TopNavbar } from './TopNavbar';

const CodeEditorLayout: React.FC<AuthenticatedLayoutProps> = ({
    children,
}) => {
    return (
        <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
            <TopNavbar />
            <main className="h-[calc(100vh-4rem)] min-h-0 overflow-hidden">{children}</main>
        </div>
    );
}

export default CodeEditorLayout;