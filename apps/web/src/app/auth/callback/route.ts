import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const mode = searchParams.get('mode') ?? 'login'

  if (code) {
    const supabase = await createClient()
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the user data
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if user already exists in our database
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle()

        if (!existingUser) {
          // Determine role from the next URL path for new users
          let role = 'dormer' // default
          if (next.includes('/login/dormer')) {
            role = 'dormer'
          } else if (next.includes('/login/dorm-owner')) {
            role = 'dorm-owner'
          } else if (next.includes('/login/institution')) {
            role = 'institution'
          }
          
          const { error: insertUserError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              role: role,
            })

          if (!insertUserError) {
            // Create profile based on role
            if (role === 'dormer') {
              await supabase.from('dormers').insert({
                dormer_id: user.id,
                first_name: user.user_metadata?.first_name ?? user.user_metadata?.name?.split(' ')[0] ?? '',
                last_name: user.user_metadata?.last_name ?? user.user_metadata?.name?.split(' ').slice(1).join(' ') ?? '',
                phone_number: user.user_metadata?.phone_number ?? '',
              })
            } else if (role === 'dorm-owner') {
              await supabase.from('dorm_owners').insert({
                owner_id: user.id,
                first_name: user.user_metadata?.first_name ?? user.user_metadata?.name?.split(' ')[0] ?? '',
                last_name: user.user_metadata?.last_name ?? user.user_metadata?.name?.split(' ').slice(1).join(' ') ?? '',
                phone_number: user.user_metadata?.phone_number ?? '',
              })
            } else if (role === 'institution') {
              await supabase.from('institutions').insert({
                institution_id: user.id,
                name: user.user_metadata?.name ?? user.user_metadata?.institution_name ?? '',
                address: user.user_metadata?.address ?? '',
                phone_number: user.user_metadata?.phone_number ?? '',
              })
            }
          }
        }
      }
      
      // Redirect to the appropriate page
      redirect(next)
    }
  }

  // If something went wrong, redirect to error page
  redirect('/error')
}
