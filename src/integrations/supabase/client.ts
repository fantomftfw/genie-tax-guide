// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ziaykakkhdrpdgghyamr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppYXlrYWtraGRycGRnZ2h5YW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjU1NTAsImV4cCI6MjA1OTQ0MTU1MH0.bifDdTCt-OHH5xccO4M7Gx9toNE4ybJ0eUDw4xXhPaU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);