import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { supabase } from "@/integrations/supabaseClient";
import { useAddCourse } from "@/hooks/useAddCourse";
import { useUpdateCourse } from "@/hooks/useUpdateCourse";

export default function AddOrEditCourseDrawer({
  isOpen,
  onClose,
  initialData,
}) {
  const isEdit = !!initialData;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      duration: "",
      module_count: 0,
      cover_image: null,
    },
  });

  const { mutateAsync: addCourse } = useAddCourse();
  const { mutateAsync: updateCourse } = useUpdateCourse();

  const title = watch("title");

  useEffect(() => {
    if (title && !isEdit) {
      setValue("slug", title.toLowerCase().replace(/\s+/g, "-").slice(0, 50));
    }
  }, [title, isEdit, setValue]);

  useEffect(() => {
    if (isEdit) {
      reset(initialData);
    } else {
      reset();
    }
  }, [initialData, isEdit, reset]);

  const onSubmit = async (values) => {
    const toastId = toast.loading(
      isEdit ? "Updating course..." : "Creating course...",
    );

    try {
      let coverImageUrl = initialData?.cover_image || null;

      if (values.cover_image && values.cover_image[0]) {
        const file = values.cover_image[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("course-covers")
          .upload(fileName, file);
        if (error) throw new Error("Image upload failed");
        coverImageUrl = supabase.storage
          .from("course-covers")
          .getPublicUrl(fileName).data.publicUrl;
      }

      const payload = {
        title: values.title,
        slug: values.slug,
        description: values.description,
        duration: values.duration,
        module_count: Number(values.module_count),
        cover_image: coverImageUrl,
      };

      if (isEdit) {
        await updateCourse({ id: initialData.id, updates: payload });
        toast.success("Course updated successfully", { id: toastId });
      } else {
        await addCourse(payload);
        toast.success("Course created successfully", { id: toastId });
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 z-50 h-full w-[400px] overflow-y-auto bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">
        {isEdit ? "Edit Course" : "Add New Course"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full rounded border p-2"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm">Slug</label>
          <input
            type="text"
            {...register("slug", { required: "Slug is required" })}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Duration</label>
          <input
            type="text"
            {...register("duration")}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Module Count</label>
          <input
            type="number"
            {...register("module_count", { valueAsNumber: true })}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("cover_image")}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-emerald-600 py-2 text-white hover:bg-emerald-700"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Course"
              : "Create Course"}
        </button>
      </form>
    </div>
  );
}
