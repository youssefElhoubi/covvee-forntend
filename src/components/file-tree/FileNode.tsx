import {
  File,
  FileCode,
  FileImage,
  FileJson,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../utils/cn";
import type { FileResponse } from "../../types/project.types";

function getFileIcon(fileName: string): LucideIcon {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"].includes(extension ?? "")) {
    return FileImage;
  }

  if (["json"].includes(extension ?? "")) {
    return FileJson;
  }

  if (["tsx", "ts", "jsx", "js", "java", "go", "py", "css", "html"].includes(extension ?? "")) {
    return FileCode;
  }

  if (["md", "txt", "env", "yml", "yaml"].includes(extension ?? "")) {
    return FileText;
  }

  return File;
}

interface FileNodeProps {
  file: FileResponse;
  depth: number;
  onSelect: (file: FileResponse) => void;
  isCompact: boolean;
  isSelected: boolean;
}

export function FileNode({
  file,
  depth,
  onSelect,
  isCompact,
  isSelected,
}: FileNodeProps) {
  const Icon = getFileIcon(file.name);

  return (
    <button
      type="button"
      onClick={() => onSelect(file)}
      title={isCompact ? file.name : undefined}
      className={cn(
        "group flex w-full items-center rounded-md py-1.5 text-left text-sm transition-colors",
        "hover:bg-slate-800/50",
        isSelected ? "bg-slate-800/70 text-slate-100" : "text-slate-300",
        isCompact ? "justify-center px-2" : "px-2"
      )}
      style={isCompact ? undefined : { paddingLeft: `${depth * 14 + 10}px` }}
    >
      <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
      {!isCompact ? <span className="ml-2 truncate">{file.name}</span> : null}
    </button>
  );
}
