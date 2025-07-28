import { supabase } from "../integrations/supabaseClient";
import { toast } from "react-hot-toast";

async function updatePasswordHelper({ password, onSuccess, onError }) {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    toast.error(error.message || "Password update failed");
    if (onError) onError(error);
  } else {
    toast.success("Password updated");
    if (onSuccess) onSuccess();
  }
}

export { updatePasswordHelper };
