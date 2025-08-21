"use client"

import ResponsiveNavigation from '@/components/ResponsiveNavBar'
import ResponsiveContainer from '@/components/ResponsiveContainer'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <ResponsiveNavigation />
      
      <main className="pt-20">
        <ResponsiveContainer maxWidth="lg">
          <div className="text-center">
            <h1 className="text-4xl font-montserrat font-semibold text-dark mb-6">
              Admin Dashboard
            </h1>
            <p className="text-lg text-labelDarkGray mb-8">
              Welcome to your admin dashboard! Here you can manage the entire system, 
              users, and monitor platform performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Cards */}
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">User Management</h3>
                <p className="text-labelGray mb-4">Manage all users, roles, and permissions</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  Manage Users
                </button>
              </div>
              
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">System Settings</h3>
                <p className="text-labelGray mb-4">Configure platform settings and policies</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  System Settings
                </button>
              </div>
              
              <div className="bg-white border border-lightBorder rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-dark mb-3">Analytics</h3>
                <p className="text-labelGray mb-4">View platform-wide analytics and reports</p>
                <button className="bg-dark text-white px-4 py-2 rounded-md hover:bg-darkest transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </div>
  )
}
