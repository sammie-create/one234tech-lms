import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";
import AddEditLessonModal from "../ui/admin/AddEditLessonModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CustomSelect from "../../../ui/CustomSelect";

function LessonsManagement() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [deletingLesson, setDeletingLesson] = useState(null);

  // Fetch courses
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title");
      if (error) throw error;
      return data;
    },
  });

  // Fetch modules for selected course
  const { data: modules } = useQuery({
    queryKey: ["modules", selectedCourse?.id],
    queryFn: async () => {
      if (!selectedCourse) return [];
      const { data, error } = await supabase
        .from("modules")
        .select("id, title")
        .eq("course_id", selectedCourse.id)
        .order("order_index");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedCourse,
  });

  // Fetch lessons for selected module
  const { data: lessons } = useQuery({
    queryKey: ["lessons", selectedModule?.id],
    queryFn: async () => {
      if (!selectedModule) return [];
      const { data, error } = await supabase
        .from("lessons")
        .select("id, title, order_index, video_url, resource_urls")
        .eq("module_id", selectedModule.id)
        .order("order_index");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedModule,
  });

  //   function onChange(e) {
  //     const course = courses?.find((c) => c.id === e.target.value);
  //     setSelectedCourse(course || null);
  //     setSelectedModule(null);
  //   }
  console.log(modules);
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Lesson Management</h1>
      {/* Select Course */}
      <CustomSelect
        label="Select Course"
        options={courses?.map((c) => ({ label: c.title, value: c.id })) || []}
        selected={
          selectedCourse
            ? { label: selectedCourse.title, value: selectedCourse.id }
            : null
        }
        onChange={(option) => {
          const course = courses?.find((c) => c.id === option?.value);
          setSelectedCourse(course || null);
          setSelectedModule(null);
        }}
      />

      {/* Select Module */}
      {selectedCourse && (
        <CustomSelect
          label="Select Module"
          options={modules?.map((m) => ({ label: m.title, value: m.id })) || []}
          selected={
            selectedModule
              ? { label: selectedModule.title, value: selectedModule.id }
              : null
          }
          onChange={(option) => {
            const module = modules?.find((m) => m.id === option?.value);
            setSelectedModule(module || null);
          }}
        />
      )}

      {/* Lessons Table */}
      {selectedModule && (
        <>
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold">Lessons</h2>
            <button
              onClick={() => {
                setEditingLesson(null);
                setShowLessonModal(true);
              }}
              className="rounded bg-emerald-600 px-4 py-2 text-white"
            >
              Add Lesson
            </button>
          </div>

          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Order</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Video</th>
                <th className="px-4 py-2">Resources</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons?.map((lesson) => (
                <tr key={lesson.id} className="border-t">
                  <td className="px-4 py-2">{lesson.order_index}</td>
                  <td className="px-4 py-2">{lesson.title}</td>
                  <td className="px-4 py-2">
                    {lesson.video_url ? "✅" : "❌"}
                  </td>
                  <td className="px-4 py-2">
                    {lesson.resource_urls?.length || 0}
                  </td>
                  <td className="space-x-2 px-4 py-2">
                    <button
                      onClick={() => {
                        setEditingLesson(lesson);
                        setShowLessonModal(true);
                      }}
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingLesson(lesson)}
                      className="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {lessons?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No lessons yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {/* Modals */}
      {showLessonModal && (
        <AddEditLessonModal
          moduleId={selectedModule.id}
          lesson={editingLesson}
          onClose={() => setShowLessonModal(false)}
        />
      )}
      {deletingLesson && (
        <DeleteConfirmModal
          itemName={deletingLesson.title}
          onConfirm={async () => {
            await supabase.from("lessons").delete().eq("id", deletingLesson.id);
            setDeletingLesson(null);
          }}
          onCancel={() => setDeletingLesson(null)}
        />
      )}
    </div>
  );
}

export default LessonsManagement;
