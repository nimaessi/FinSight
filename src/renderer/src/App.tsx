import { Sidebar } from '@renderer/components/Sidebar';
import { Header } from '@renderer/components/Header';
import { Dashboard } from '@renderer/pages/Dashboard';
import { useState } from 'react';
import { ChartNoAxesCombined } from 'lucide-react';
import  SplashScreen  from '@renderer/pages/splash-screen';


export default function App() {

    const [showSplash, setShowSplash] = useState(true);


  return (
    <div dir="rtl" className="min-h-screen flex bg-slate-50 pt-10">
      <div className="app-titlebar print:hidden">
        <div className="app-titlebar-content" dir="ltr">
          <ChartNoAxesCombined size={18} />
        </div>
      </div>
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
