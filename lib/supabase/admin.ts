import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Note: This client should ONLY be used in Server Components or Server Actions
// where the SUPABASE_SERVICE_ROLE_KEY is available and secure.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
