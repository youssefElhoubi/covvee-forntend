import { ContextActionModal } from "./ContextActionModal";

type RenameFileModalProps = {
    isOpen: boolean;
    fileName: string;
    onClose: () => void;
};

export function RenameFileModal({ isOpen, fileName, onClose }: RenameFileModalProps) {
    return (
        <ContextActionModal
            isOpen={isOpen}
            title="Rename File"
            description={`Rename the file \"${fileName}\".`}
            confirmLabel="Continue"
            onClose={onClose}
        />
    );
}
