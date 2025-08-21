"use client"

import ResponsiveContainer from '@/components/ResponsiveContainer';
import ResponsiveNavigation from '@/components/ResponsiveNavBar';
// import Footer from '@/components/ResponsiveFooter';

export default function Login() {
  return (
    <div className='min-h-screen bg-white'>
        <ResponsiveNavigation />

        <main>
          {/* <section className="min-h-screen flex justify-center items-center"> */}
          <section className="min-h-screen flex justify-center pt-16 sm:pt-24"> 
            <ResponsiveContainer maxWidth="sm">
              <div className="border border-t-8 rounded-lg border-dark w-full max-w-xs sm:max-w-md mx-auto py-10 px-10 relative overflow-hidden">
                {/* Background Images */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-end">
                  <img 
                    src="/dormer-login-bg-1.svg" 
                    alt="Background decoration" 
                    className="w-auto h-auto object-cover"
                  />
                  <img 
                    src="/dormer-login-bg-2.svg" 
                    alt="Background decoration" 
                    className="w-auto h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h1 className="text-4xl sm:text-5xl font-montserrat font-semibold text-center text-dark">
                    Login as
                  </h1>

                  <div className='relatives space-y-6 py-12 mb-10'>    

                      {/* Dormer Login Button */}
                      <a href="/login/dormer" className="block">
                        <button
                          type="button"
                          className="group w-full border border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                        >
                          <img 
                            src="/icon-login-dormer.svg" 
                            alt="Dormer Icon" 
                            className="w-6 h-6 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                          />
                          <span>Dormer</span>
                        </button>
                      </a>
                      
                      {/* Dorme Owner Login Button */}
                      <a href="/login/dorm-owner" className="block">
                        <button
                          type="button"
                          className="group w-full border border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                        >
                          <img 
                            src="/icon-login-owner.svg" 
                            alt="Dorm Owner Icon" 
                            className="w-6 h-6 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                          />
                          <span>Dorm Owner</span>
                        </button>
                      </a>
                      
                      {/* Institution Login Button */}
                      <a href="/login/institution" className="block">
                        <button
                          type="button"
                          className="group w-full border border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                        >
                          <img 
                            src="/icon-login-institution.svg" 
                            alt="Institution Icon" 
                            className="w-6 h-6 object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                          />
                          <span>Institution</span>
                        </button>
                      </a>
                      

                  </div>
                </div>
              </div>
              
            </ResponsiveContainer>
          </section>
        </main>
    </div>
  );
}