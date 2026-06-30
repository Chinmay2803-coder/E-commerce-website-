import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
"https://bdxlkoohnfcrwvcbclrz.supabase.co";

const supabaseKey =
"sb_publishable_9Ga5Rj_pcjJlb4Yr3gPP-w_i9tBdnM7"

export const supabase =
createClient(supabaseUrl,supabaseKey);