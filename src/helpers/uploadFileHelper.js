import { supabase } from "../integrations/supabaseClient";
import { toast } from "react-hot-toast";

/**
 * Uploads a file to Supabase Storage and optionally updates a DB record.
 *
 * @param {Object} params - Configuration object.
 * @param {File} params.file - The file to upload.
 * @param {string} params.userId - The current user's ID.
 * @param {string} params.bucket - The name of the Supabase Storage bucket.
 * @param {string} [params.filePath] - Optional custom file path. Defaults to `${userId}/${file.name}`
 * @param {Object} [params.dbUpdate] - Optional DB update config.
 * @param {string} params.dbUpdate.table - Table name to update.
 * @param {string} params.dbUpdate.key - Key field to match (e.g., "id").
 * @param {string} params.dbUpdate.pathField - The column to store the file path (e.g., "profile_picture_url").
 * @param {boolean} [params.withToast] - Whether to show toasts (default: true).
 * @param {string[]} [params.allowedTypes=[]] - Allowed MIME types (e.g., ['image/jpeg', 'video/mp4']).
 * @param {number} [params.maxSizeMB=50] - Maximum allowed file size in megabytes.
 *
 * @returns {Promise<string>} - The file path if successful.
 * @throws {Error} - Throws error if upload or database update fails.
 */

async function uploadFileHelper({
  file,
  userId,
  bucket,
  filePath,
  dbUpdate,
  withToast = true,
  allowedTypes = [], // e.g., ['video/mp4']
  maxSizeMB = 50, // default max size
  uploadOptions = {},
}) {
  if (!file || !userId || !bucket) {
    throw new Error("Missing file, userId, or bucket name");
  }

  // Type check
  if (allowedTypes.length && !allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type.");
  }

  // Size check
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`File too large. Max size is ${maxSizeMB}MB.`);
  }

  // Generate a unique file name with the original extension
  //   const extension = file.name.split(".").pop();
  //   const uniqueName =
  //     (crypto.randomUUID?.() || `file-${Date.now()}`) + `.${extension}`;
  //   const finalPath = filePath || `${userId}/${uniqueName}`;

  const finalPath = filePath || `${userId}/${file.name}`;

  if (withToast) toast.loading("Uploading...");

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(finalPath, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: "3600",
      ...uploadOptions,
    });

  if (uploadError) {
    toast.dismiss();
    throw uploadError;
  }

  //Optional database update
  if (dbUpdate) {
    const { table, key, pathField } = dbUpdate;

    const { error: updateError } = await supabase
      .from(table)
      .update({ [pathField]: finalPath })
      .eq(key, userId);

    if (updateError) throw updateError;
  }

  if (withToast) {
    toast.dismiss();
    toast.success("Upload successful");
  }

  return {
    filePath: finalPath,
    publicUrl: supabase.storage.from(bucket).getPublicUrl(finalPath).data
      ?.publicUrl,
  };
}

export { uploadFileHelper };
