import { ContextActionModal } from "./ContextActionModal";

type CreateFileModalProps = {
    isOpen: boolean;
    folderName: string;
    onClose: () => void;
};

export function CreateFileModal({ isOpen, folderName, onClose }: CreateFileModalProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Create File"
            description={`Create a new file inside \"${folderName}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
