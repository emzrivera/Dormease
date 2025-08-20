import ResponsiveContainer from '@/components/ResponsiveContainer';
import ResponsiveNavigation from '@/components/ResponsiveNavBar';
import { signup } from '../../actions';

async function institutionSignup(formData: FormData) {
  'use server'
  await signup(formData, 'institution')
}

export default function Login() {
  return (
    <div className='min-h-screen bg-white'>
        <ResponsiveNavigation />

        <main>
          <section className="min-h-screen flex justify-center pt-5 sm:pt-10">
            <ResponsiveContainer maxWidth="sm">
              <div className="border border-t-8 rounded-lg border-dark w-full max-w-xs sm:max-w-md mx-auto py-10 px-10 relative overflow-hidden">
                {/* Background Images */}
                <div className="absolute left-0 top-8">
                  <img 
                    src="/owner-login-left.svg" 
                    alt="Background decoration" 
                    className="w-16 h-auto object-cover"
                  />
                </div>
                <div className="absolute right-0 top-12">
                  <img 
                    src="/owner-login-right.svg" 
                    alt="Background decoration" 
                    className="w-14 h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h1 className="text-3xl sm:text-5xl font-montserrat font-semibold text-center mb-4 text-dark">
                    Sign Up
                  </h1>
                  <p className="text-sm sm:text-base text-center font-figtree text-dark mb-0">
                    Welcome to Dormease Institution!
                  </p>
                  <p className="text-sm sm:text-base text-center font-figtree text-dark">
                    Let's make dorm life easier, together.
                  </p>

                  {/* Sign up Form */}
                  <form action={institutionSignup} className="mt-8 space-y-4">
                    

                    {/* Institution Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-figtree text-labelGray">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-2 py-1 border border-fieldBorder rounded-md focus:ring-1 focus:ring-light focus:border-light transition-colors"
                      />
                    </div>

                    {/* Address Field */}
                    <div>
                      <label htmlFor="address" className="block text-xs font-figtree text-labelGray">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
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

                    {/* Divider
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-lightBorder"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white font-figtree text-labelGray">or</span>
                      </div>
                    </div>

                    Google Signup Button
                    <button
                      type="button"
                      className="group w-full border-2 border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-1 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                    >
                      <img 
                        src="/google-logo.svg" 
                        alt="Google Logo" 
                        className="w-6 h-6 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                      />
                      <span>Sign Up with GOOGLE</span>
                    </button> */}
                  </form>

                  {/* Sign Up Link */}
                  <div className="mt-10 text-center">
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