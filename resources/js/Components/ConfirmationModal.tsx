import { PropsWithChildren } from 'react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
    confirmText?: string;
    cancelText?: string;
    processing?: boolean;
}

export default function ConfirmationModal({
    show,
    title,
    message,
    onConfirm,
    onClose,
    confirmText = 'Delete',
    cancelText = 'Cancel',
    processing = false,
}: Props) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>
                        {cancelText}
                    </SecondaryButton>

                    <DangerButton
                        className="ms-3"
                        disabled={processing}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
