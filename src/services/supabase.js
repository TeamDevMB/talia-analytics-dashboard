import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://agazppbppupklfollybh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXpwcGJwcHVwa2xmb2xseWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMjU1NzksImV4cCI6MjA3NTkwMTU3OX0.MHxi_Ja6XRl3aORmwKSTSsBqdD2D5DdMRxws-qhqyRs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)