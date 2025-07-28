import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiCamera, HiPencil, HiTrash, HiUpload, HiUser } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSignedStorageUrl } from "../../hooks/useSignedStorageUrl";
import { updatePasswordHelper } from "../../helpers/updatePasswordHelper";
import { uploadFileHelper } from "../../helpers/uploadFileHelper";
import { removeFileHelper } from "../../helpers/removeFileHelper";

export default function SettingsPage() {
  const { user } = useAuthContext();
  const { profile, profileLoading, refetchProfile } = useUserProfile(user?.id);
  const { data: signedAvatarUrl, isLoading: avatarLoading } =
    useSignedStorageUrl("profile-images", profile?.profile_picture_url);

  const { register, handleSubmit, reset } = useForm();
  // const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [setUploading] = useState(false);

  console.log(user);

  //   async function handleUpdateName({ name }) {
  //     const { error } = await supabase
  //       .from("profiles")
  //       .update({ name })
  //       .eq("id", user.id);

  //     if (error) toast.error("Failed to update name");
  //     else {
  //       toast.success("Name updated");
  //       setEditingName(false);
  //       refetchProfile();
  //     }
  //   }

  async function updatePassword({ password }) {
    await updatePasswordHelper({
      password,
      onSuccess: () => {
        setEditingPassword(false);
        reset();
      },
    });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    if (!file || !user?.id) return;
    try {
      setUploading(true);

      await uploadFileHelper({
        file,
        userId: user.id,
        bucket: "profile-images",
        dbUpdate: {
          table: "profiles",
          key: "id",
          pathField: "profile_picture_url",
        },
      });
      setShowImageOptions(false);
      refetchProfile();
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveImage() {
    if (!profile?.profile_picture_url) return;

    try {
      await removeFileHelper({
        bucket: "profile-images",
        filePath: profile.profile_picture_url,
        dbUpdate: {
          table: "profiles",
          key: "id",
          keyValue: user.id,
          pathField: "profile_picture_url",
        },
        confirmFn: () =>
          Promise.resolve(
            window.confirm("Are you sure you want to remove this image"),
          ),
      });

      // await supabase.storage
      //   .from("profile-images")
      //   .remove([profile.profile_picture_url]);
      // await supabase
      //   .from("profiles")
      //   .update({ profile_picture_url: null })
      //   .eq("id", user.id);
      // toast.success("Profile picture removed");
      setShowImageOptions(false);
      refetchProfile();
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Failed to remove image");
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg bg-white p-6">
      <h1 className="self-center text-2xl">Settings</h1>

      {/* Profile Picture Section */}

      <div className="group relative w-fit self-center">
        {profileLoading || avatarLoading ? (
          <div className="flex h-30 w-30 items-center justify-center">
            <ImSpinner2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        ) : (
          <img
            src={signedAvatarUrl || "/user.png"}
            alt="Profile Image"
            loading="eager"
            className={`h-30 w-30 rounded-full border border-gray-300 object-cover ${!signedAvatarUrl && "p-4"}`}
          />
        )}
        <button
          onClick={() => setShowImageOptions((prev) => !prev)}
          className="absolute right-0 bottom-0 rounded-full bg-emerald-400 p-1.5 text-white transition-all hover:bg-emerald-700"
        >
          <HiCamera className="h-5 w-5" />
        </button>

        {showImageOptions && (
          <div className="absolute top-full -right-30 z-10 mt-2 w-40 rounded border border-gray-300 bg-white shadow">
            <label className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
              <HiUpload className="text-emerald-600" />
              Change Picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <button
              onClick={handleRemoveImage}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
            >
              <HiTrash /> Remove Picture
            </button>
          </div>
        )}
      </div>

      {/* Display Name Section */}
      <form className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium lg:text-base">Name</label>
          <input
            type="text"
            value={profile?.name || ""}
            readOnly
            className="input input-bordered w-60 cursor-not-allowed rounded-sm border border-gray-200 bg-inherit p-2 text-xs outline-none focus:ring-1 focus:ring-emerald-300 lg:text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium lg:text-base">
            Email Address
          </label>
          <input
            type="email"
            value={profile?.email || ""}
            readOnly
            className="input input-bordered w-60 cursor-not-allowed rounded-sm border border-gray-200 bg-inherit p-2 text-xs outline-none focus:ring-1 focus:ring-emerald-300 lg:text-sm"
          />
        </div>
      </form>

      {/* Password Change */}
      <form onSubmit={handleSubmit(updatePassword)} className="space-y-2">
        <div className="relative w-fit space-y-1">
          <label className="block text-sm font-medium">Change Password</label>
          <button
            type="button"
            className="absolute top-1/2 right-1"
            onClick={() => setEditingPassword(!editingPassword)}
          >
            {editingPassword ? (
              <MdCancel className="h-6 w-6 text-gray-500" />
            ) : (
              <HiPencil className="h-6 w-6 text-gray-500" />
            )}
          </button>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter new password"
            disabled={!editingPassword}
            className="input input-bordered w-60 cursor-not-allowed rounded-sm border border-gray-200 bg-inherit p-2 text-xs outline-none focus:ring-1 focus:ring-emerald-300 lg:text-sm"
          />
        </div>
        {editingPassword && (
          <button
            type="submit"
            className="btn mt-1 bg-emerald-400 p-2 text-white md:text-xs"
          >
            Update Password
          </button>
        )}
      </form>
    </div>
  );
}
