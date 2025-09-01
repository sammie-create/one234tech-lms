import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";
import toast from "react-hot-toast";

function AddEditModuleModal({ courseId, module, onClose }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: module?.title || "",
      description: module?.description || "",
      order_index: module?.order_index || "", // default to 1 if not set
    },
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      const payload = {
        title: values.title,
        description: values.description,
        order_index: Number(values.order_index), // ensure number
        course_id: courseId,
      };

      if (module) {
        // Update existing module
        const { error } = await supabase
          .from("modules")
          .update(payload)
          .eq("id", module.id);
        if (error) throw error;
        return "Module updated successfully";
      } else {
        // Insert new module
        const { error } = await supabase.from("modules").insert([payload]);
        if (error) throw error;
        return "Module added successfully";
      }
    },
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries(["modules", courseId]);
      onClose();
    },
    onError: () => toast.error("Something went wrong"),
  });

  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {module ? "Edit Module" : "Add Module"}
        </h2>

        <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          {/* Title */}
          <div className="mb-4">
            <label className="mb-2 block font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter module title"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter module description"
            />
          </div>

          {/* Order Index */}
          <div className="mb-4">
            <label className="mb-2 block font-medium">Order Index</label>
            <input
              type="number"
              {...register("order_index", {
                required: true,
                valueAsNumber: true,
              })}
              className="w-full rounded border px-3 py-2"
              placeholder="e.g. 1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : module ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditModuleModal;
