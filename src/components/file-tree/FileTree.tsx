import type { MouseEvent } from "react";
import type { FileResponse, ProjectDetailResponse } from "../../types/project.types";
import { FolderNode } from "./FolderNode";
import { FileNode } from "./FileNode";
import type { FolderResponse } from "../../types/project.types";

interface FileTreeProps {
  projectData: ProjectDetailResponse;
  compact: boolean;
  onSelectFile: (file: FileResponse, path: string[]) => void;
  onFolderContextMenu: (
    event: MouseEvent<HTMLButtonElement>,
    folder: FolderResponse,
    path: string[]
  ) => void;
  selectedFileId: string | null;
}

export function FileTree({
  projectData,
  compact,
  onSelectFile,
  onFolderContextMenu,
  selectedFileId,
}: FileTreeProps) {
  return (
    <div className="space-y-1">
      {projectData.rootFolders.map((folder) => (
        <FolderNode
          key={folder.id}
          folder={folder}
          depth={0}
          compact={compact}
          folderPath={[]}
          onSelectFile={onSelectFile}
          onFolderContextMenu={onFolderContextMenu}
          onFolderToggle={() => undefined}
          selectedFileId={selectedFileId}
        />
      ))}

      {projectData.rootFiles.map((file) => (
        <FileNode
          key={file.id}
          file={file}
          depth={0}
          onSelect={() => onSelectFile(file, [])}
          isCompact={compact}
          isSelected={selectedFileId === file.id}
        />
      ))}
    </div>
  );
}
