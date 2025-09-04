import { useState } from "react";
import { useAllCourses } from "@/hooks/useAllCourses";
import { supabase } from "@/integrations/supabaseClient";
import Table from "@/ui/Table";
import { toast } from "react-hot-toast";
import AddEditCourseModal from "../ui/admin/AddEditCourseModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { BsThreeDots } from "react-icons/bs";

function CoursesManagement() {
  const { data: courses, isLoading, refetch } = useAllCourses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null); // controls which row's actions are open

  // Handle delete
  async function handleDeleteCourse(courseId) {
    try {
      toast.loading("Deleting...");
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);
      toast.dismiss();
      if (error) throw error;
      toast.success("Course deleted");
      refetch();
    } catch (err) {
      toast.error(err.message || "Error deleting course");
    }
  }

  // Columns for Tanstack Table
  const columns = [
    {
      accessorKey: "title",
      header: "Course Title",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => (
        <div className="group relative">
          <span className="line-clamp-1 text-wrap">{info.getValue()}</span>

          {/* <div class="absolute bottom-full left-0 mb-2 hidden w-max max-w-xs rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-600 shadow-lg group-hover:block">
            {info.getValue()}
          </div> */}
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "total_modules",
      header: "Modules",
      cell: (info) => <span>{info.getValue() + " modes"}</span>,
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const course = row.original;
        return (
          <div className="relative flex space-x-2">
            <BsThreeDots
              className="cursor-pointer text-2xl"
              onClick={() =>
                setActiveRowId(activeRowId === course.id ? null : course.id)
              }
            />
            {activeRowId === course.id && (
              <div className="absolute top-6 right-0 z-10 flex w-24 flex-col rounded border border-gray-200 bg-white shadow-md">
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsModalOpen(true);
                    setActiveRowId(null);
                  }}
                  className="px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setDeleteModalOpen(true);
                    setActiveRowId(null);
                  }}
                  className="px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <h2>Manage Courses</h2>
        <button
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 md:text-sm"
        >
          + Add Course
        </button>
      </div>

      <Table
        columns={columns}
        data={courses || []}
        maxHeight="400px"
        isLoading={isLoading}
      />

      {isModalOpen && (
        <AddEditCourseModal
          course={selectedCourse}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      )}

      {deleteModalOpen && selectedCourse && (
        <DeleteConfirmModal
          title="Delete Course"
          message={`Are you sure you want to delete "${selectedCourse.title}"? This action cannot be undone.`}
          onConfirm={() => {
            handleDeleteCourse(selectedCourse.id);
            setDeleteModalOpen(false);
          }}
          onCancel={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default CoursesManagement;
