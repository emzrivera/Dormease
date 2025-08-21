"use client"

import ResponsiveNavigation from '@/components/ResponsiveNavBar'
import ResponsiveContainer from '@/components/ResponsiveContainer'

export default function DormerDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNavigation />
      
      <main className="pt-20">
        <ResponsiveContainer maxWidth="lg">
          <div className="text-center">
            <h1 className="text-4xl font-montserrat font-semibold text-dark mb-6">
              Dormer Dashboard
            </h1>
            <p className="text-lg text-labelDarkGray mb-8">
              Welcome to your dormer dashboard! Here you can manage your dorm preferences, 
              view available listings, and manage your account.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Cards */}
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">My Preferences</h3>
                <p className="text-labelGray mb-4">Manage your dorm preferences and requirements</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  Manage Preferences
                </button>
              </div>
              
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">Saved Listings</h3>
                <p className="text-labelGray mb-4">View and manage your saved dorm listings</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  View Saved
                </button>
              </div>
              
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">My Profile</h3>
                <p className="text-labelGray mb-4">Update your personal information and settings</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </div>
  )
}
