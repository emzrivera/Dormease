import ResponsiveContainer from '@/components/ResponsiveContainer';
// import ResponsiveNavigation from '../../../../components/ResponsiveNavBar';

export default function Login() {
  return (
    <div className='min-h-screen bg-white'>
        {/* <ResponsiveNavigation /> */}

        <main>
          <section className="min-h-screen flex justify-center items-center">
            <ResponsiveContainer maxWidth="sm">
              <div className="border border-t-8 rounded-lg border-dark w-full max-w-xs sm:max-w-md mx-auto py-10 px-10 relative overflow-hidden">
                {/* Content */}
                <div className="relative z-10">
                  {/* <h1 className="text-3xl sm:text-5xl font-montserrat font-semibold text-center mb-4 text-dark">
                    Login
                  </h1> */}
                  <p className="text-sm sm:text-lg text-center font-figtree font-semibold text-dark mb-0">
                    Welcome back, Admin!
                  </p>
                  <p className="text-sm sm:text-base text-center font-figtree text-dark">
                    Aren't you tired yet?
                  </p>

                  {/* Login Form */}
                  <form className="mt-8 space-y-4">
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

                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full bg-dark hover:bg-darkest text-white font-figtree font-semibold px-4 py-1 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2"
                    >
                      Login
                    </button>

                  </form>
                </div>
              </div>
            </ResponsiveContainer>
          </section>
        </main>
    </div>
  );
}