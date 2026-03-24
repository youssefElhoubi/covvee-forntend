import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { FolderResponse } from '../../types/FolderResponse';
import { createFile } from '../../services/fileservice';
import { useParams } from 'react-router-dom';

export interface CreateFileFormInputs {
    fileName: string;
    folderId: string;
}

interface CreateFileFormProps {
    folder: FolderResponse | null;
    close: () => void;
}

export const CreateFileForm: React.FC<CreateFileFormProps> = ({ folder, close }) => {
    const submite: SubmitHandler<CreateFileFormInputs> = async ({ fileName, folderId }) => {
        const { id } = useParams();
        try {
            const body = {
                name: fileName,
                parentFolderId: folderId,
                projectid: id
            }
            await createFile(body);
            close();
        } catch (error) {
            console.error("Error creating file:", error);
        }

    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateFileFormInputs>({
        // Initialize the hidden field with the passed folder's ID
        defaultValues: {
            folderId: folder?.id || ''
        }
    });

    useEffect(() => {
        if (folder) {
            reset({ folderId: folder.id, fileName: '' });
        }
    }, [folder, reset]);


    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">

            {/* Dynamic Title based on the folder prop */}
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-gray-100">
                Create New File {folder && <span className="font-normal text-gray-500 dark:text-gray-400">in {folder.name}</span>}
            </h2>

            <form onSubmit={handleSubmit(submite)} className="space-y-5">

                {/* Hidden input to pass the folder ID to the submit handler silently */}
                <input type="hidden" {...register('folderId', { required: 'Folder context is missing' })} />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="fileName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        File Name
                    </label>
                    <input
                        id="fileName"
                        type="text"
                        className={`px-3 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors
                            ${errors.fileName ? 'border-red-500 focus:ring-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        `}
                        placeholder="Enter file name..."
                        autoComplete="off"
                        {...register('fileName', {
                            required: 'File name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                    />
                    {errors.fileName && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.fileName.message}
                        </span>
                    )}
                    {/* Failsafe error display if the hidden folder ID somehow goes missing */}
                    {errors.folderId && (
                        <span className="text-red-500 text-xs font-medium">
                            {errors.folderId.message}
                        </span>
                    )}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Create File
                    </button>
                </div>
            </form>
        </div>
    );
};