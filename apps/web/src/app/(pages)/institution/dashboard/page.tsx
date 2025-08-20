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
                THIS IS INSTITUTION PAGE
              </h1>
             
            </div>
          </ResponsiveContainer>
        </section>



      </main>
    </div>
  );
}