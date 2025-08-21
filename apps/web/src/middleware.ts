import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // skip middleware for static assets and image files
  const pathname = req.nextUrl.pathname
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp)$/)) {
    return res
  }
  
  try {
    // create Supabase client using the new SSR package
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

    // if not logged in, allow access to public routes only
    if (!user) {
      // public routes
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
      
      // redirect to login for protected routes
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // check user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // if there's an error fetching user data, allow access to public routes
    if (userError || !userData) {
      console.error('Error fetching user role:', userError)
      // allow access to public routes even if we can't verify their role
      if (req.nextUrl.pathname.startsWith('/home') || 
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs') ||
          req.nextUrl.pathname.startsWith('/login') ||
          req.nextUrl.pathname.startsWith('/signup')) {
        return res
      }
      // redirect to login for protected routes
      return NextResponse.redirect(new URL('/login', req.url))
    }

    const userRole = userData.role

    // role-based access control
    if (userRole === 'dormer') {
      // ROUTES FOR DORMERS
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // redirect dormers away from other user types
      if (req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/home', req.url))
      }
    }

    if (userRole === 'dorm-owner') {
      // ROUTES FOR DORM OWNERS
      if (req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // redirect owners away from other user types
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/host/dashboard', req.url))
      }
    }

    if (userRole === 'institution') {
      // ROUTES FOR INSTITUTIONS
      if (req.nextUrl.pathname.startsWith('/institution/') ||
          req.nextUrl.pathname.startsWith('/home') ||
          req.nextUrl.pathname.startsWith('/discover') ||
          req.nextUrl.pathname.startsWith('/about') ||
          req.nextUrl.pathname.startsWith('/how-it-works') ||
          req.nextUrl.pathname.startsWith('/faqs')) {
        return res
      }
      
      // redirect institutions away from other user types
      if (req.nextUrl.pathname.startsWith('/dormer/') ||
          req.nextUrl.pathname.startsWith('/host/') ||
          req.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/institution/dashboard', req.url))
      }
    }

    if (userRole === 'admin') {
      // admins can access all routes
      return res
    }

    // default: allow access to public routes only
    if (req.nextUrl.pathname.startsWith('/home') || 
        req.nextUrl.pathname.startsWith('/discover') ||
        req.nextUrl.pathname.startsWith('/about') ||
        req.nextUrl.pathname.startsWith('/how-it-works') ||
        req.nextUrl.pathname.startsWith('/faqs') ||
        req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/signup') ||
        req.nextUrl.pathname.startsWith('/auth')) {
      return res
    }

    // redirect to home for unknown routes
    return NextResponse.redirect(new URL('/home', req.url))
    
  } catch (error) {
    // if there's any error with Supabase or role checking, allow the request through
    // this prevents the middleware from breaking the entire app
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