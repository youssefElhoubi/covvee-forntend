import { useMemo, useState, type ReactNode } from "react";
import { GripVertical, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type {
  BreadcrumbState,
  FileResponse,
  FolderResponse,
  ProjectDetailResponse,
  SidebarMode,
} from "../../types/project.types";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
  projectData: ProjectDetailResponse;
}

function findInitialFile(projectData: ProjectDetailResponse): BreadcrumbState {
  if (projectData.rootFiles.length > 0) {
    return { fileName: projectData.rootFiles[0].name, folderPath: [] };
  }

  const scanFolder = (folder: FolderResponse, parents: string[]): BreadcrumbState | null => {
    if (folder.files.length > 0) {
      return {
        fileName: folder.files[0].name,
        folderPath: [...parents, folder.name],
      };
    }

    for (const child of folder.children) {
      const found = scanFolder(child, [...parents, folder.name]);
      if (found) {
        return found;
      }
    }

    return null;
  };

  for (const folder of projectData.rootFolders) {
    const found = scanFolder(folder, []);
    if (found) {
      return found;
    }
  }

  return { fileName: "README.md", folderPath: [] };
}

export default function AuthenticatedLayout({
  children,
  projectData,
}: AuthenticatedLayoutProps) {
  const initialSelection = useMemo(() => findInitialFile(projectData), [projectData]);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbState>(initialSelection);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
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

  const handleSelectFile = (file: FileResponse, path: string[]) => {
    setSelectedFileId(file.id);
    setBreadcrumb({ fileName: file.name, folderPath: path });
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <TopNavbar projectName={projectData.name} breadcrumb={breadcrumb} />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          projectData={projectData}
          sidebarMode={sidebarMode}
          selectedFileId={selectedFileId}
          onSelectFile={handleSelectFile}
          onToggleSidebar={cycleSidebarMode}
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
