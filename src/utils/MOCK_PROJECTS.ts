import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";

export const MOCK_PROJECTS: ProjectDetailResponse[] = [
    {
        id: 'proj_001',
        name: 'E-Commerce Microservices',
        language: 'JAVA',
        rootFiles: [
            { id: 'f1', name: 'pom.xml', language: 'xml', content: '', parentId: null },
            { id: 'f2', name: 'Dockerfile', language: 'docker', content: '', parentId: null },
        ],
        rootFolders: [
            {
                id: 'd1',
                name: 'src',
                parentId: null,
                files: [],
                children: [
                    {
                        id: 'd2',
                        name: 'main',
                        parentId: 'd1',
                        files: [],
                        children: [
                            {
                                id: 'd3',
                                name: 'java',
                                parentId: 'd2',
                                files: [],
                                children: [
                                    {
                                        id: 'd4',
                                        name: 'com',
                                        parentId: 'd3',
                                        files: [],
                                        children: [
                                            {
                                                id: 'd5',
                                                name: 'example',
                                                parentId: 'd4',
                                                files: [],
                                                children: [
                                                    {
                                                        id: 'd6',
                                                        name: 'ecommerce',
                                                        parentId: 'd5',
                                                        files: [
                                                            { id: 'f3', name: 'Application.java', language: 'java', content: '', parentId: 'd6' },
                                                            { id: 'f4', name: 'Config.java', language: 'java', content: '', parentId: 'd6' },
                                                        ],
                                                        children: [
                                                            {
                                                                id: 'd7',
                                                                name: 'controller',
                                                                parentId: 'd6',
                                                                files: [
                                                                    { id: 'f5', name: 'OrderController.java', language: 'java', content: '', parentId: 'd7' },
                                                                    { id: 'f6', name: 'ProductController.java', language: 'java', content: '', parentId: 'd7' },
                                                                ],
                                                                children: []
                                                            },
                                                            {
                                                                id: 'd8',
                                                                name: 'service',
                                                                parentId: 'd6',
                                                                files: [
                                                                    { id: 'f7', name: 'OrderService.java', language: 'java', content: '', parentId: 'd8' },
                                                                ],
                                                                children: []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'd9',
                                name: 'resources',
                                parentId: 'd2',
                                files: [
                                    { id: 'f8', name: 'application.properties', language: 'properties', content: '', parentId: 'd9' },
                                ],
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: 'd10',
                name: 'test',
                parentId: null,
                files: [],
                children: [
                    {
                        id: 'd11',
                        name: 'java',
                        parentId: 'd10',
                        files: [],
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'proj_002',
        name: 'React Dashboard',
        language: 'TYPESCRIPT',
        rootFiles: [
            { id: 'f9', name: 'package.json', language: 'json', content: '', parentId: null },
            { id: 'f10', name: 'tsconfig.json', language: 'json', content: '', parentId: null },
            { id: 'f11', name: 'vite.config.ts', language: 'ts', content: '', parentId: null },
        ],
        rootFolders: [
            {
                id: 'd12',
                name: 'src',
                parentId: null,
                files: [
                    { id: 'f12', name: 'main.tsx', language: 'tsx', content: '', parentId: 'd12' },
                    { id: 'f13', name: 'App.tsx', language: 'tsx', content: '', parentId: 'd12' },
                ],
                children: [
                    {
                        id: 'd13',
                        name: 'components',
                        parentId: 'd12',
                        files: [
                            { id: 'f14', name: 'Button.tsx', language: 'tsx', content: '', parentId: 'd13' },
                            { id: 'f15', name: 'Card.tsx', language: 'tsx', content: '', parentId: 'd13' },
                        ],
                        children: [
                            {
                                id: 'd14',
                                name: 'ui',
                                parentId: 'd13',
                                files: [
                                    { id: 'f16', name: 'Input.tsx', language: 'tsx', content: '', parentId: 'd14' },
                                ],
                                children: []
                            }
                        ]
                    },
                    {
                        id: 'd15',
                        name: 'hooks',
                        parentId: 'd12',
                        files: [
                            { id: 'f17', name: 'useAuth.ts', language: 'ts', content: '', parentId: 'd15' },
                        ],
                        children: []
                    }
                ]
            },
            {
                id: 'd16',
                name: 'public',
                parentId: null,
                files: [
                    { id: 'f18', name: 'favicon.ico', language: 'ico', content: '', parentId: 'd16' },
                ],
                children: []
            }
        ]
    }
];