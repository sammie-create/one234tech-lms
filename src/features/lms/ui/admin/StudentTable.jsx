import { useMemo } from "react";
import { useEnrolledStudentsList } from "@/hooks/useEnrolledStudentsList";
import Table from "@/ui/Table";
import { HiEye } from "react-icons/hi";

function StudentTable({ onViewStudent }) {
  const { data: students = [], isLoading } = useEnrolledStudentsList();

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "profiles.name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "profiles.email",
        cell: (info) => info.getValue(),
      },
      {
        header: "Course",
        accessorKey: "courses.title",
        cell: (info) => info.getValue(),
      },
      {
        header: "Progress",
        accessorKey: "progress",
        cell: (info) => `${info.getValue() || 0}%`,
      },
      {
        header: "Date",
        accessorKey: "enrolled_at",
        cell: (info) =>
          new Date(info.getValue()).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const profile = row.original.profiles;
          return (
            <button
              onClick={() =>
                onViewStudent({
                  id: profile.id,
                  name: profile.name,
                  email: profile.email,
                  overall_progress: profile.overall_progress,
                })
              }
              className="flex cursor-pointer items-center gap-1 rounded-full bg-green-900 px-2 py-1 text-emerald-50 transition-all duration-300 hover:bg-emerald-50 hover:text-green-900 lg:text-sm"
            >
              <HiEye />
              <span>View</span>
            </button>
          );
        },
      },
    ],
    [onViewStudent],
  );

  return (
    <Table
      columns={columns}
      data={students}
      maxHeight="400px"
      isLoading={isLoading}
    />
  );
}

export default StudentTable;
