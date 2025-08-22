"use client"
import ResponsiveContainer from '@/components/ResponsiveContainer';
import ResponsiveNavigation from '@/components/ResponsiveNavBar';
import { resendEmailVerification } from '../actions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function dashboard() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'dormer' | 'dorm-owner' | 'institution'>('dormer')
  const [isAutoResendAvailable, setIsAutoResendAvailable] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  // Auto-populate email and userType from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('email')
    const userTypeParam = searchParams.get('userType') as 'dormer' | 'dorm-owner' | 'institution'
    
    if (emailParam && userTypeParam) {
      setEmail(emailParam)
      setUserType(userTypeParam)
      setIsAutoResendAvailable(true)
    }
  }, [searchParams])

  const handleResend = async () => {
    if (!email || !userType) return
    
    const result = await resendEmailVerification(email, userType)
    setResendMessage(result.message)
  }

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
              <p className="text-lg text-labelGray mb-4">
                We just sent a verification link to your email.
              </p>
              <p className="text-sm text-labelGray mb-6">
                Please check your inbox and click the verification link to complete your signup.
              </p>

              <Link href="/login" className="flex justify-center items-center text-center">
                <button
                    type="button"
                    className="group border border-dark text-dark hover:bg-dark hover:text-white font-figtree font-semibold px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-light focus:ring-offset-2 flex items-center justify-center space-x-3"
                >
                    Back to Login
                </button>
              </Link>

              {/* Resend Email Section */}
              {isAutoResendAvailable && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    className="px-6 py-2 bg-dark text-white text-sm font-figtree rounded-md hover:bg-darkest transition-colors"
                  >
                    Resend email
                  </button>
                  {resendMessage && (
                    <p className={`text-sm font-figtree mt-2 ${
                      resendMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {resendMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
          </ResponsiveContainer>
        </section>



      </main>
    </div>
  );
}