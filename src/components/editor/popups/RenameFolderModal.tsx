import { ContextActionModal } from "./ContextActionModal";

type RenameFolderModalProps = {
    isOpen: boolean;
    folderName: string;
    onClose: () => void;
};

export function RenameFolderModal({ isOpen, folderName, onClose }: RenameFolderModalProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Rename Folder"
            description={`Rename the folder \"${folderName}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
