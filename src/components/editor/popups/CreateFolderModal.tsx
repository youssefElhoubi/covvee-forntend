import { ContextActionModal } from "./ContextActionModal";

type CreateFolderModalProps = {
    isOpen: boolean;
    folderName: string;
    onClose: () => void;
};

export function CreateFolderModal({ isOpen, folderName, onClose }: CreateFolderModalProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Create Folder"
            description={`Create a nested folder inside \"${folderName}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
