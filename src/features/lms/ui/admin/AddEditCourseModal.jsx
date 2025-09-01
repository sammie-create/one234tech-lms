import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabaseClient";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddEditCourseModal({ onClose, course }) {
  const isEditing = Boolean(course?.id);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    cover_image: "",
    total_modules: 0,
    duration: "",
  });

  // Pre-fill when editing
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        slug: course.slug || "",
        cover_image: course.cover_image || "",
        total_modules: course.total_modules || 0,
        duration: course.duration || "",
      });
    }
  }, [course]);

  // ---- Mutations ----
  const addMutation = useMutation({
    mutationFn: async (newCourse) => {
      const { data, error } = await supabase.from("courses").insert(newCourse);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Course added successfully");
      queryClient.invalidateQueries(["courses"]);
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedCourse) => {
      const { data, error } = await supabase
        .from("courses")
        .update(updatedCourse)
        .eq("id", course.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully");
      queryClient.invalidateQueries(["courses"]);
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", course.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course deleted");
      queryClient.invalidateQueries(["courses"]);
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  // ---- Handlers ----
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.slug) {
      toast.error("Title and slug are required");
      return;
    }

    if (isEditing) {
      updateMutation.mutate(formData);
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    deleteMutation.mutate();
  };

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="fixed z-60 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4">{isEditing ? "Edit Course" : "Add New Course"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full rounded border border-gray-400 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full rounded border border-gray-400 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
          />
          {/* <input
            type="text"
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm"
          /> */}
          <input
            type="text"
            placeholder="Cover Image URL"
            value={formData.cover_image}
            onChange={(e) =>
              setFormData({ ...formData, cover_image: e.target.value })
            }
            className="w-full rounded border border-gray-400 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Total Modules"
            value={formData.total_modules}
            onChange={(e) =>
              setFormData({ ...formData, total_modules: e.target.value })
            }
            className="w-full rounded border border-gray-400 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Duration (e.g. 6 weeks)"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            className="w-full rounded border border-gray-400 px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-400 focus:outline-none"
          />

          <div className="flex justify-between pt-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            )}
            <div className="ml-auto flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addMutation.isLoading || updateMutation.isLoading}
                className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {isEditing
                  ? updateMutation.isLoading
                    ? "Updating..."
                    : "Update"
                  : addMutation.isLoading
                    ? "Adding..."
                    : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// function AddEditCourseModal({ onClose }) {
//   return (
//     <div className="fixed top-0 right-0 flex h-[600px] w-[500px] justify-between bg-amber-400 p-3">
//       Add COURSE
//       <button className="h-fit" onClick={() => onClose()}>
//         X
//       </button>
//     </div>
//   );
// }

// export default AddEditCourseModal;
