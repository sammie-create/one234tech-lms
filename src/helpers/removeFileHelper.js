import { supabase } from "../integrations/supabaseClient";
import { toast } from "react-hot-toast";

/**
 * Removes a file from Supabase Storage, optionally logs soft delete, nullifies DB reference, and supports private buckets.
 *
 * @param {Object} params
 * @param {string} params.bucket - Supabase storage bucket name.
 * @param {string} params.filePath - File path in the bucket.
 * @param {Object} [params.dbUpdate] - Optional DB field update config.
 * @param {string} params.dbUpdate.table - Table name to update.
 * @param {string} params.dbUpdate.key - Column to match (e.g., user ID).
 * @param {string} params.dbUpdate.keyValue - Value to match (e.g., the actual ID).
 * @param {string} params.dbUpdate.pathField - Column to nullify.
 * @param {boolean} [params.withToast=true] - Whether to show toast notifications.
 * @param {boolean} [params.isPrivate=false] - Whether the bucket is private (generate signed URL if needed).
 * @param {boolean} [params.logDeletion=false] - Whether to log deletions to a table.
 * @param {string} [params.logTable='deleted_files'] - Table to insert deletion logs if logging is enabled.
 * @param {Function} [params.confirmFn] - Optional confirmation function (e.g., modal or window.confirm).
 *
 * @returns {Promise<void>}
 */

async function removeFileHelper({
  bucket,
  filePath,
  dbUpdate,
  withToast = true,
  //   isPrivate = false,
  //   logDeletion = false,
  //   logTable = "deleted_files",
  confirmFn,
}) {
  if (!bucket || !filePath) throw new Error("Missing bucket or file path");

  // Optional confirmation
  if (typeof confirmFn === "function") {
    const confirmed = await confirmFn(); // e.g. modal or window.confirm
    if (!confirmed) return;
  }

  if (withToast) toast.loading("Removing...");

  // 👇 Get signed URL for soft delete logging (if private)
  //   let signedUrl = null;
  //   if (isPrivate) {
  //     const { data } = supabase.storage
  //       .from(bucket)
  //       .createSignedUrl(filePath, 60); // 1 minute preview
  //     if (data?.signedUrl) signedUrl = data.signedUrl;
  //   }

  // Remove the file from storage
  const { error: removeError } = await supabase.storage
    .from(bucket)
    .remove([filePath]);

  if (removeError) {
    toast.dismiss();
    throw removeError;
  }

  // Optional DB update to clear path
  if (dbUpdate) {
    const { table, key, keyValue, pathField } = dbUpdate;
    const { error: updateError } = await supabase
      .from(table)
      .update({ [pathField]: null })
      .eq(key, keyValue);

    if (updateError) {
      toast.dismiss();
      throw updateError;
    }
  }

  // 👇 Optional soft-delete logging i want to log actions
  //   if (logDeletion) {
  //     await supabase.from(logTable).insert({
  //       bucket,
  //       file_path: filePath,
  //       deleted_at: new Date().toISOString(),
  //       signed_url: signedUrl,
  //     });
  //   }

  if (withToast) {
    toast.dismiss();
    toast.success("File removed successfully");
  }
}

export { removeFileHelper };
