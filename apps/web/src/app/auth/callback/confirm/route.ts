import { type EmailOtpType } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const supabase = await createClient()

  // Support both token_hash/type and the newer code param
  if (code) {
    const { error: verifyError } = await supabase.auth.exchangeCodeForSession(code)
    if (!verifyError) {
      // After successful verification, ensure the user exists and create profile based on metadata
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const role = (user.user_metadata?.role as string) ?? null
        const firstName = (user.user_metadata?.first_name as string) ?? null
        const lastName = (user.user_metadata?.last_name as string) ?? null
        const phoneNumber = (user.user_metadata?.phone_number as string) ?? null
        const name = (user.user_metadata?.name as string) ?? null
        const address = (user.user_metadata?.address as string) ?? null

        // Upsert into users table if not present
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .maybeSingle()

        if (!existingUser) {
          const { error: insertUserError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              role,
            })
          if (insertUserError) {
            // If we cannot create user record, send to error
            redirect('/error')
          }
        }

        // Create role-specific profile if not present
        if (role === 'dormer') {
          const { data: existingDormer } = await supabase
            .from('dormers')
            .select('dormer_id')
            .eq('dormer_id', user.id)
            .maybeSingle()

          if (!existingDormer) {
            await supabase.from('dormers').insert({
              dormer_id: user.id,
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
            })
          }
        } else if (role === 'dorm-owner') {
          const { data: existingOwner } = await supabase
            .from('dorm_owners')
            .select('owner_id')
            .eq('owner_id', user.id)
            .maybeSingle()

          if (!existingOwner) {
            await supabase.from('dorm_owners').insert({
              owner_id: user.id,
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
            })
          }
        } else if (role === 'institution') {
          const { data: existingInstitution } = await supabase
            .from('institutions')
            .select('institution_id')
            .eq('institution_id', user.id)
            .maybeSingle()

          if (!existingInstitution) {
            await supabase.from('institutions').insert({
              institution_id: user.id,
              name: name,
              address: address,
              phone_number: phoneNumber,
            })
          }
        }
      }

      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  } else if (token_hash && type) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    })
    if (!verifyError) {
      const { data: { user } } = await supabase.auth.getUser()
      // If needed, you could reuse the same creation logic here for legacy links
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error')
}