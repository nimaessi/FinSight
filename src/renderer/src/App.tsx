import { Sidebar } from '@renderer/components/Sidebar';
import { Header } from '@renderer/components/Header';
import { Dashboard } from '@renderer/pages/Dashboard';
import { useState } from 'react';
import  SplashScreen  from '@renderer/pages/splash-screen';


export default function App() {

    const [showSplash, setShowSplash] = useState(true);


  return (
    <div dir="rtl" className="min-h-screen flex bg-slate-50">
      {showSplash ? (
        <SplashScreen
          holdDuration={5000}
          fadeOutDuration={0.6}
          onComplete={() => setShowSplash(false)}
        />
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
