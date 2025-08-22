import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Skip middleware for static assets and image files
  const pathname = req.nextUrl.pathname
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/)) {
    return res
  }
  
  // CRITICAL: Skip middleware for email verification routes
  if (pathname.startsWith('/auth/confirm') || pathname.startsWith('/auth/callback')) {
    return res
  }
  
  try {
    // Create Supabase client using the new SSR package
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // If no user, allow access to public routes only
    if (!user) {
      // Allow access to public routes
      if (req.nextUrl.pathname.startsWith('/home') || 
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs') ||
          req.nextUrl.pathname.startsWith('/login') ||
          req.nextUrl.pathname.startsWith('/signup') ||
          req.nextUrl.pathname === '/') {
        return res
      }
      
      // Redirect to login for protected routes (but not if already going to login)
      if (!req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      return res
    }

    // User is authenticated, check role-based access
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // If there's an error fetching user data, allow access to public routes
    if (userError || !userData) {
      console.error('Error fetching user role:', userError)
      // Allow access to public routes even if we can't verify their role
      if (req.nextUrl.pathname.startsWith('/home') || 
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs') ||
          req.nextUrl.pathname.startsWith('/login') ||
          req.nextUrl.pathname.startsWith('/signup')) {
        return res
      }
      // Redirect to login for protected routes
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const userRole = userData.role

    // Role-based access control
    if (userRole === 'dormer') {
      // Dormers can only access dormer-specific routes
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // Redirect dormers away from other user type routes
      if (req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/home', req.url))
      }
    }

    if (userRole === 'dorm-owner') {
      // Dorm owners can access owner routes and public routes
      if (req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // Redirect owners away from other user type routes
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/host/dashboard', req.url))
      }
    }

    if (userRole === 'institution') {
      // Institutions can access institution routes and public routes
      if (req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // Redirect institutions away from other user type routes
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/institution/dashboard', req.url))
      }
    }

    if (userRole === 'admin') {
      // Admins can access all routes
      return res
    }

    // Default: allow access to public routes only
    if (req.nextUrl.pathname.startsWith('/home') || 
        req.nextUrl.pathname.startsWith('/discover') ||
        req.nextUrl.pathname.startsWith('/about') ||
        req.nextUrl.pathname.startsWith('/how-it-works') ||
        req.nextUrl.pathname.startsWith('/faqs') ||
        req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/signup')) {
      return res
    }

    // Redirect to home for unknown routes
    return NextResponse.redirect(new URL('/home', req.url))
    
  } catch (error) {
    // If there's any error with Supabase or role checking, allow the request through
    // This prevents the middleware from breaking the entire app
    console.error('Middleware error:', error)
    return res
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}