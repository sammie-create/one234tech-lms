import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { supabase } from "@/integrations/supabaseClient";

export default function AddEditLessonModal({ onClose, lesson, moduleId }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: lesson || {
      title: "",
      video_url: "",
      resource_urls: [],
      order_index: 1,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      if (lesson) {
        // Update existing lesson
        const { error } = await supabase
          .from("lessons")
          .update(values)
          .eq("id", lesson.id);
        if (error) throw error;
        return "Lesson updated successfully";
      } else {
        // Insert new lesson
        const { error } = await supabase.from("lessons").insert([
          {
            ...values,
            module_id: moduleId,
          },
        ]);
        if (error) throw error;
        return "Lesson added successfully";
      }
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries(["lessons", moduleId]);
      onClose();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const onSubmit = (data) => mutation.mutate(data);

  //   if (!isOpen) return null;

  return (
    <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          {lesson ? "Edit Lesson" : "Add Lesson"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full rounded border px-3 py-2"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full rounded border px-3 py-2"
              rows={3}
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium">
              YouTube Video URL
            </label>
            <input
              type="url"
              {...register("video_url")}
              placeholder="https://youtube.com/..."
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Resource Link (Google Drive, PDF, etc.)
            </label>
            <input
              type="url"
              {...register(["resource_urls"])}
              placeholder="https://drive.google.com/..."
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Order Index</label>
            <input
              type="number"
              {...register("order_index", { valueAsNumber: true })}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {mutation.isLoading ? "Saving..." : lesson ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
