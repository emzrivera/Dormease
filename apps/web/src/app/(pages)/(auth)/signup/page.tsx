import ResponsiveContainer from '@/components/ResponsiveContainer';
import ResponsiveNavigation from '@/components/ResponsiveNavBar';

export default function dashboard() {
  return (
    <div className="min-h-screen bg-lightestGray">
      <ResponsiveNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <ResponsiveContainer>
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-figtree font-bold text-darkest mb-6">
                Check your inbox
              </h1>
              <p>
                We just sent a verification link to your email.
              </p>

              <a href="/login" className="flex justify-center items-center text-center">
                <button
                    type="button"
                    className="group border border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                >
                    Back to Login
                </button>
                </a>
            </div>
          </ResponsiveContainer>
        </section>



      </main>
    </div>
  );
}