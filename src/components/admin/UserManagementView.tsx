import { useMemo, useState } from "react";
import UserManagementHeader from "./user-management/UserManagementHeader";
import UsersPagination from "./user-management/UsersPagination";
import UsersTable from "./user-management/UsersTable";
import { mockUsersPage, PAGE_SIZE } from "./user-management/mockData";
import type { PaginatedUsersDto } from "./user-management/types";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/adminService";

export default function UserManagementView() {
  const {data} = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => getUsers()
  });
  const [usersPage, setUsersPage] = useState<PaginatedUsersDto>(mockUsersPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return usersPage.content;
    }

    return usersPage.content.filter((user) => {
      return (
        user.username.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized) ||
        user.id.toLowerCase().includes(normalized)
      );
    });
  }, [searchTerm, usersPage.content]);

  const totalVisiblePages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const pagedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredUsers]);

  const handleToggleBan = (userId: string) => {
    setUsersPage((current) => ({
      ...current,
      content: current.content.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          isBanned: !user.isBanned,
        };
      }),
    }));
  };

  const handleDeleteProject = (userId: string, projectId: string) => {
    setUsersPage((current) => ({
      ...current,
      content: current.content.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        const nextProjects = user.projects.filter((project) => project.id !== projectId);

        return {
          ...user,
          projects: nextProjects,
          projectCount: nextProjects.length,
        };
      }),
    }));
  };

  const handlePrevPage = () => {
    setCurrentPage((current) => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((current) => Math.min(totalVisiblePages, current + 1));
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-black/20 md:p-6">
      <UserManagementHeader
        searchTerm={searchTerm}
        onChangeSearch={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      <UsersTable
        users={data ? data.content : pagedUsers}
        expandedUserId={expandedUserId}
        onToggleExpand={(userId) => setExpandedUserId((current) => (current === userId ? null : userId))}
        onToggleBan={handleToggleBan}
        onDeleteProject={handleDeleteProject}
      />

      <UsersPagination
        currentPage={currentPage}
        totalVisiblePages={data?.totalPages ?? totalVisiblePages}
        totalApiPages={data?.totalPages ?? usersPage.totalPages}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </section>
  );
}
