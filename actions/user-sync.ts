'use server'

import { currentUser } from '@clerk/nextjs/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function syncUser() {
  try {
    const user = await currentUser()
    
    if (!user) {
      console.log('SyncUser: No user found from Clerk.')
      return false
    }

    const email = user.emailAddresses[0]?.emailAddress
    
    if (!email) {
      console.error('SyncUser: User has no email address.')
      return false
    }

    console.log(`SyncUser: Attempting to sync user ${user.id} (${email})`)

    const supabase = createAdminClient()
    
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('SyncUser: Error checking existing user:', fetchError)
        return false
    }

    if (!existingUser) {
      const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || email
      
      console.log(`SyncUser: User not found in DB. Inserting...`)

      // Insert new user
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id, // Using Clerk ID as primary key
          email: email,
          name: name,
          created_at: new Date().toISOString(),
        })
        
      if (insertError) {
        console.error('SyncUser: Error inserting user to Supabase:', insertError)
        return false
      }
      
      console.log('SyncUser: User successfully inserted.')
    } else {
      console.log('SyncUser: User already exists in DB.')
    }
    
    return true
  } catch (err) {
    console.error('SyncUser: Unexpected error:', err)
    return false
  }
}
