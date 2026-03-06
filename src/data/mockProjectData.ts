import type { ProjectDetailResponse } from "../types/project.types";

export const MOCK_LAYOUT_PROJECT_DATA: ProjectDetailResponse = {
  id: "project-1",
  name: "covvee-front",
  language: "TYPESCRIPT",
  rootFiles: [
    {
      id: "f-root-1",
      name: "README.md",
      language: "MARKDOWN",
      content: "# Covvee Frontend",
      parentId: null,
    },
  ],
  rootFolders: [
    {
      id: "folder-src",
      name: "src",
      parentId: null,
      files: [
        {
          id: "f-main",
          name: "main.tsx",
          language: "TYPESCRIPT",
          content: "import React from 'react';",
          parentId: "folder-src",
        },
      ],
      children: [
        {
          id: "folder-components",
          name: "components",
          parentId: "folder-src",
          files: [
            {
              id: "f-layout",
              name: "Layout.tsx",
              language: "TYPESCRIPT",
              content: "export default function Layout() {}",
              parentId: "folder-components",
            },
          ],
          children: [
            {
              id: "folder-home",
              name: "home",
              parentId: "folder-components",
              files: [
                {
                  id: "f-hero",
                  name: "Hero.tsx",
                  language: "TYPESCRIPT",
                  content: "export const Hero = () => null;",
                  parentId: "folder-home",
                },
                {
                  id: "f-cta",
                  name: "CTA.tsx",
                  language: "TYPESCRIPT",
                  content: "export const CTA = () => null;",
                  parentId: "folder-home",
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: "folder-public",
          name: "public",
          parentId: "folder-src",
          files: [
            {
              id: "f-image",
              name: "logo.png",
              language: "IMAGE",
              content: "",
              parentId: "folder-public",
            },
          ],
          children: [],
        },
      ],
    },
  ],
};
