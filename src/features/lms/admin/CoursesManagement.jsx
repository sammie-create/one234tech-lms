import { useState } from "react";
import { useAllCourses } from "@/hooks/useAllCourses";
import AddOrEditCourseDrawer from "./AddOrEditCourseDrawer";

export default function AdminManageCourses() {
  const { data: courses = [], isLoading } = useAllCourses();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Courses</h1>
        <button
          onClick={() => {
            setEditCourse(null);
            setOpenDrawer(true);
          }}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          + Add New Course
        </button>
      </div>

      {isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Cover</th>
                <th className="p-2">Title</th>
                <th className="p-2">Slug</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Modules</th>
                <th className="p-2">Created</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {course.cover_image ? (
                      <img
                        src={course.cover_image}
                        alt="cover"
                        className="h-10 w-16 rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-2">{course.title}</td>
                  <td className="p-2 text-gray-600">{course.slug}</td>
                  <td className="p-2">{course.duration || "-"}</td>
                  <td className="p-2 text-center">
                    {course.module_count || 0}
                  </td>
                  <td className="p-2 text-gray-500">
                    {new Date(course.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => {
                        setEditCourse(course);
                        setOpenDrawer(true);
                      }}
                      className="mr-2 text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    {/* Future: Add delete logic */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddOrEditCourseDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
        initialData={editCourse}
      />
    </section>
  );
}
