"use client"
import ResponsiveContainer from '@/components/ResponsiveContainer';
import ResponsiveNavigation from '@/components/ResponsiveNavBar';
import { signup, signUpWithGoogle } from '../../actions';

export default function Login() {
  return (
    <div className='min-h-screen bg-white'>
        <ResponsiveNavigation />

        <main>
          <section className="min-h-screen flex justify-center pt-5 sm:pt-10">
            <ResponsiveContainer maxWidth="sm">
              <div className="border border-t-8 rounded-lg border-dark w-full max-w-xs sm:max-w-md mx-auto py-10 px-10 relative overflow-hidden">
                {/* Background Images */}
                <div className="absolute bottom-0 left-5">
                  <img 
                    src="/dormer-login-bg-1.svg" 
                    alt="Background decoration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-5">
                  <img 
                    src="/dormer-login-bg-2.svg" 
                    alt="Background decoration" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h1 className="text-3xl sm:text-5xl font-montserrat font-semibold text-center mb-4 text-dark">
                    Sign Up
                  </h1>
                  <p className="text-sm sm:text-base text-center font-figtree text-dark mb-0">
                    Welcome to Dormease!
                  </p>
                  <p className="text-sm sm:text-base text-center font-figtree text-dark">
                    Let's find your dorm with ease.
                  </p>

                  {/* Sign up Form */}
                  <form 
                    action={async (formData) => {
                      await signup(formData, 'dormer')
                    }}
                    className="mt-8 space-y-4"
                  >
                    {/* First Name Field */}
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-figtree text-labelGray">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Last Name Field */}
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-figtree text-labelGray">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-figtree text-labelGray">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-figtree text-labelGray">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-xs font-figtree text-labelGray">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Signup Button */}
                    <button
                      type="submit"
                      className="w-full bg-dark hover:bg-darkest text-white font-figtree font-semibold px-4 py-1 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2"
                    >
                      Create Account
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-lightBorder"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white font-figtree text-labelGray">or</span>
                      </div>
                    </div>

                    {/* Google Signup Button */}
                    <button
                      onClick={async () => {
                        try {
                          const oauthUrl = await signUpWithGoogle('dormer')
                          if (oauthUrl) {
                            window.location.href = oauthUrl
                          }
                        } catch (error) {
                          console.error('Google OAuth error:', error)
                        }
                      }}
                      type="button"
                      className="group w-full border-2 border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-1 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                    >
                      <img 
                        src="/google-logo.svg" 
                        alt="Google Logo" 
                        className="w-6 h-6 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                      />
                      <span>Sign Up with GOOGLE</span>
                    </button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="mt-10 pb-3 text-center">
                    <p className="text-xs font-figtree text-dark">
                      Already have an account?{' '}
                      <a href="/login" className="text-light hover:text-darkest font-semibold transition-colors">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ResponsiveContainer>
          </section>
        </main>
    </div>
  );
}