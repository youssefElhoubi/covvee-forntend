import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { FolderResponse } from '../../types/FolderResponse';
// Make sure you have this service created in your project!
import { createFolder } from '../../services/FolderService';
import { useParams } from 'react-router-dom';

export interface CreateFolderFormInputs {
    folderName: string;
    parentFolderId: string;
}

interface CreateFolderFormProps {
    folder: FolderResponse | null; // The parent folder where this new folder will live
    close: () => void;
}

export const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ folder, close }) => {
    const { id } = useParams();

    const submit: SubmitHandler<CreateFolderFormInputs> = async ({ folderName, parentFolderId }) => {
        try {
            const body = {
                name: folderName,
                parentFolderId: parentFolderId || null,
                projectId: id
            };
            console.log(body);
            

            await createFolder(body);
            close();
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateFolderFormInputs>({
        // Initialize the hidden field with the passed parent folder's ID
        defaultValues: {
            parentFolderId: folder?.id || ''
        }
    });

    useEffect(() => {
        if (folder) {
            reset({ parentFolderId: folder.id, folderName: '' });
        }
    }, [folder, reset]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">

            {/* Dynamic Title based on the folder prop */}
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                Create New Folder {folder && <span className="font-normal text-gray-500 dark:text-gray-400">in {folder.name}</span>}
            </h2>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">

                {/* Hidden input to pass the parent folder ID to the submit handler silently */}
                <input type="hidden" {...register('parentFolderId')} />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="folderName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Folder Name
                    </label>
                    <input
                        id="folderName"
                        type="text"
                        className={`px-3 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors
                            ${errors.folderName ? 'border-red-500 focus:ring-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        `}
                        placeholder="Enter folder name..."
                        autoComplete="off"
                        {...register('folderName', {
                            required: 'Folder name is required',
                            minLength: { value: 1, message: 'Name must be at least 1 character' }
                        })}
                    />
                    {errors.folderName && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.folderName.message}
                        </span>
                    )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Create Folder
                    </button>
                    <button
                        onClick={() => close()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        close
                    </button>
                </div>
            </form>
        </div>
    );
};