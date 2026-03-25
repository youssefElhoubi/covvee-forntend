import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
// Ensure this path points to your actual file types
import type { FileResponse } from '../../types/project.types'; 
// Ensure this imports the rename fetch function we built earlier
import { renameFile } from '../../services/fileservice'; 
import { useParams } from 'react-router-dom';

export interface RenameFileFormInputs {
    newName: string;
    fileId: string;
}

interface RenameFileFormProps {
    file: FileResponse | null;
    close: () => void;
}

export const RenameFileForm: React.FC<RenameFileFormProps> = ({ file, close }) => {
    // Grabs the projectId from the URL, just like in CreateFileForm
    const { id } = useParams(); 
    
    const submit: SubmitHandler<RenameFileFormInputs> = async ({ newName, fileId }) => {
        try {
            if (!id) {
                console.error("Project ID is missing from the URL params.");
                return;
            }

            const body = {
                fileId: fileId,
                newName: newName,
                projectId: id
            };
            
            await renameFile(body);
            close();
        } catch (error) {
            console.log("Error renaming file:", error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RenameFileFormInputs>({
        defaultValues: {
            fileId: file?.id || '',
            newName: file?.name || ''
        }
    });

    // When the modal opens or the selected file changes, reset the form values
    useEffect(() => {
        if (file) {
            reset({ fileId: file.id, newName: file.name });
        }
    }, [file, reset]);

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">

            {/* Dynamic Title */}
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                Rename File
            </h2>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">

                {/* Hidden input to pass the file ID to the submit handler silently */}
                <input type="hidden" {...register('fileId', { required: 'File context is missing' })} />

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
                        placeholder="Enter new file name..."
                        autoComplete="off"
                        {...register('newName', {
                            required: 'A new file name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                    />
                    {errors.newName && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.newName.message}
                        </span>
                    )}
                    {/* Failsafe error display if the hidden file ID goes missing */}
                    {errors.fileId && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.fileId.message}
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