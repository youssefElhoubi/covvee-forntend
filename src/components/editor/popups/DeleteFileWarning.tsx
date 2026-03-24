import { ContextActionModal } from "./ContextActionModal";

type DeleteFileWarningProps = {
    isOpen: boolean;
    fileName: string;
    onClose: () => void;
};

export function DeleteFileWarning({ isOpen, fileName, onClose }: DeleteFileWarningProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Delete File"
            description={`You are about to delete \"${fileName}\".`}
            confirmLabel="Delete"
            destructive
            onClose={onClose}
        />
    );
}
