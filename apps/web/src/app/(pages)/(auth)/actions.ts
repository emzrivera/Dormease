'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type UserType = 'dormer' | 'dorm-owner' | 'institution' | 'admin'

interface LoginData {
  email: string
  password: string
}

interface SignupData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  name?: string
  address?: string
}

export async function login(formData: FormData, userType?: UserType) {
  const supabase = await createClient()

  const data: LoginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: authData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // You can redirect to different error pages based on userType if needed
    redirect('/error')
  }

  // After successful login, determine role from auth user metadata to avoid RLS issues in the same request
  if (authData.user) {
    const role = (authData.user.user_metadata?.role as UserType | undefined)

    // Verify the user is using the correct portal if provided
    if (userType && role && role !== userType) {
      redirect('/error')
    }

    // Redirect based on role (fallback to userType if metadata missing)
    const effectiveRole = role ?? userType
    switch (effectiveRole) {
      case 'admin':
        redirect('/admin/dashboard')
      case 'dorm-owner':
        redirect('/host/dashboard')
      case 'institution':
        redirect('/institution/dashboard')
      case 'dormer':
        redirect('/home')
      default:
        redirect('/')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData, userType: UserType) {
  const supabase = await createClient()

  // Build signup data based on user type
  const data: SignupData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Add type-specific fields
  switch (userType) {
    case 'dormer':
    case 'dorm-owner':
      data.firstName = formData.get('firstName') as string
      data.lastName = formData.get('lastName') as string
      data.phoneNumber = formData.get('phoneNumber') as string
      break
    case 'institution':
      data.name = formData.get('name') as string
      data.phoneNumber = formData.get('phoneNumber') as string
      data.address = formData.get('address') as string
      break
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  const redirectPath = userType === 'dormer'
    ? '/login/dormer'
    : userType === 'dorm-owner'
    ? '/login/dorm-owner'
    : userType === 'institution'
    ? '/login/institution'
    : '/'

  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${baseUrl}/auth/confirm?next=${redirectPath}`,
      data: {
        role: userType,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        name: data.name,
        address: data.address,
      },
    },
  })

  if (error) {
    redirect('/error')
  }

  // After successful signup, do not create DB records yet.
  // Records will be created after email confirmation in /auth/confirm.
  // This ensures only verified emails produce DB rows.

  revalidatePath('/', 'layout')
  redirect('/signup')
}

// Helper function to get current user's role
export async function getCurrentUserRole() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  try {
    // Query your users table to get the user's role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    
    return userData?.role || null
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}

// Helper function to check if user has specific role
export async function hasRole(requiredRole: UserType) {
  const userRole = await getCurrentUserRole()
  return userRole === requiredRole
}

// Helper function to get user profile data from specific table
export async function getUserProfile(userType: UserType) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  try {
    let profileData = null
    
         switch (userType) {
       case 'dormer':
         const { data: dormerData } = await supabase
           .from('dormers')
           .select('*')
           .eq('dormer_id', user.id)
           .single()
         profileData = dormerData
         break
         
       case 'dorm-owner':
         const { data: ownerData } = await supabase
           .from('dorm_owners')
           .select('*')
           .eq('owner_id', user.id)
           .single()
         profileData = ownerData
         break
         
       case 'institution':
         const { data: institutionData } = await supabase
           .from('institutions')
           .select('*')
           .eq('institution_id', user.id)
           .single()
         profileData = institutionData
         break
        
      case 'admin':
        // Admins might not have additional profile data
        profileData = null
        break
    }
    
    return profileData
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Google OAuth sign-in function for signup (redirects to login page)
export async function signUpWithGoogle(userType: UserType) {
  const supabase = await createClient()
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const redirectPath = userType === 'dormer'
    ? '/login/dormer'
    : userType === 'dorm-owner'
    ? '/login/dorm-owner'
    : userType === 'institution'
    ? '/login/institution'
    : '/'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback?next=${redirectPath}&mode=signup`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('Google OAuth error:', error)
    redirect('/error')
  }

  // Return the OAuth URL for client-side redirect
  if (data?.url) {
    console.log('OAuth URL generated:', data.url)
    return data.url
  }

  console.log('No OAuth URL generated')
  return null
}

// Google OAuth sign-in function for login (redirects to home/dashboard)
export async function signInWithGoogle(userType: UserType) {
  const supabase = await createClient()
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const redirectPath = userType === 'dormer'
    ? '/home'
    : userType === 'dorm-owner'
    ? '/host/dashboard'
    : userType === 'institution'
    ? '/institution/dashboard'
    : '/'

  console.log('Starting Google OAuth login with redirectTo:', `${baseUrl}/auth/callback?next=${redirectPath}&mode=login`)
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${baseUrl}/auth/callback?next=${redirectPath}&mode=login`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('Google OAuth error:', error)
    redirect('/error')
  }

  // Return the OAuth URL for client-side redirect
  if (data?.url) {
    console.log('OAuth URL generated:', data.url)
    return data.url
  }

  console.log('No OAuth URL generated')
  return null
}