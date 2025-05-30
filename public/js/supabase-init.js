import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://puepbelvlxfdnmwaeobi.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZXBiZWx2bHhmZG5td2Flb2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mjg1NzcsImV4cCI6MjA2NDEwNDU3N30.p5sapsBh2375AuZD3LxMUZ-9aeINT9fsWkh6CpkcyK8";
export const supabase = createClient(supabaseUrl, supabaseKey);
