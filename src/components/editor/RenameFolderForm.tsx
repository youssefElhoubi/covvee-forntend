import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { FolderResponse } from '../../types/project.types'; 
// Make sure you create this function in your folderservice!
import { renameFolder } from '../../services/FolderService';
import { useParams } from 'react-router-dom';

export interface RenameFolderFormInputs {
    newName: string;
    folderId: string;
}

interface RenameFolderFormProps {
    folder: FolderResponse | null;
    close: () => void;
}

export const RenameFolderForm: React.FC<RenameFolderFormProps> = ({ folder, close }) => {
    // Grabs the projectId from the URL
    const { id } = useParams(); 
    
    const submit: SubmitHandler<RenameFolderFormInputs> = async ({ newName, folderId }) => {
        try {
            if (!id) {
                console.error("Project ID is missing from the URL params.");
                return;
            }

            const body = {
                folderId: folderId,
                newName: newName,
                projectId: id
            };
            
            await renameFolder(body);
            close();
        } catch (error) {
            console.error("Error renaming folder:", error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RenameFolderFormInputs>({
        // Initialize with the passed folder's ID and current name
        defaultValues: {
            folderId: folder?.id || '',
            newName: folder?.name || ''
        }
    });

    // When the modal opens or the selected folder changes, reset the form values
    useEffect(() => {
        if (folder) {
            reset({ folderId: folder.id, newName: folder.name });
        }
    }, [folder, reset]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">

            {/* Dynamic Title */}
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                Rename Folder
            </h2>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">

                {/* Hidden input to pass the folder ID to the submit handler silently */}
                <input type="hidden" {...register('folderId', { required: 'Folder context is missing' })} />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="newName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Name
                    </label>
                    <input
                        id="newName"
                        type="text"
                        className={`px-3 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors
                            ${errors.newName ? 'border-red-500 focus:ring-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        `}
                        placeholder="Enter new folder name..."
                        autoComplete="off"
                        {...register('newName', {
                            required: 'A new folder name is required',
                            minLength: { value: 1, message: 'Name must be at least 1 character' }
                        })}
                    />
                    {errors.newName && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.newName.message}
                        </span>
                    )}
                    {/* Failsafe error display if the hidden folder ID goes missing */}
                    {errors.folderId && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.folderId.message}
                        </span>
                    )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={close}
                        className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Rename
                    </button>
                </div>
            </form>
        </div>
    );
};