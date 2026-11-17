import { Sidebar } from '@renderer/components/Sidebar';
import { Header } from '@renderer/components/Header';
import { Dashboard } from '@renderer/pages/Dashboard';
import { useEffect, useState } from 'react';
import { SplashScreen } from '@renderer/components/SplashScreen'


export default function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowSplash(false)
    }, 8000)
    return () => window.clearTimeout(timer);
  }, [])


  return (
    <div dir="rtl" className="min-h-screen flex bg-slate-50">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Header />
            <Dashboard />
          </main>
        </>
      )}
    </div>
  )
}
