import { ContextActionModal } from "./ContextActionModal";

type DeleteFolderWarningProps = {
    isOpen: boolean;
    folderName: string;
    onClose: () => void;
};

export function DeleteFolderWarning({
    isOpen,
    folderName,
    onClose,
}: DeleteFolderWarningProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Delete Folder"
            description={`You are about to delete \"${folderName}\". This action may remove all nested files and folders.`}
            confirmLabel="Delete"
            destructive
            onClose={onClose}
        />
    );
}
