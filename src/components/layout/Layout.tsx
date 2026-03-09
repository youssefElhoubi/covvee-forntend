import {  useState, type ReactNode } from "react";
import { GripVertical, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type {
  ProjectDetailResponse,
  SidebarMode,
} from "../../types/project.types";
import { TopNavbar } from "./TopNavbar";
import { MultiProjectSidebar } from "./MultiProjectSidebar";

export interface AuthenticatedLayoutProps {
  children: ReactNode;
  projectData?: ProjectDetailResponse[];

}

export default function AuthenticatedLayout({
  children,
  projectData,
}: AuthenticatedLayoutProps) {
  
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("expanded");

  const cycleSidebarMode = () => {
    setSidebarMode((current) => {
      if (current === "expanded") {
        return "compact";
      }
      if (current === "compact") {
        return "hidden";
      }
      return "expanded";
    });
  };



  if (projectData?.length === 0) {
    return (
      <div className="h-screen overflow-hidden bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">No project data available</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <TopNavbar/>

      <div className="flex h-[calc(100vh-4rem)]">
        <MultiProjectSidebar
          projects={projectData}
          sidebarMode={sidebarMode}
          
        />

        <div className="flex min-w-0 flex-1 flex-col bg-[#0B1120]">
          <div className="flex h-10 items-center justify-between border-b border-white/10 px-3">
            <button
              type="button"
              onClick={cycleSidebarMode}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-800/60"
              title="Toggle sidebar mode"
            >
              {sidebarMode === "hidden" ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : sidebarMode === "expanded" ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <GripVertical className="h-4 w-4" />
              )}
              Explorer
            </button>
          </div>

          <main className="min-h-0 flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

