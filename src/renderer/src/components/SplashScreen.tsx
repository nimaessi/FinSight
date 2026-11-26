import logo from '../assets/finsight-log-3.png';

const letters = 'FinSight'.split('');

export function SplashScreen() {
  return (
    <div
      dir="ltr"
      className="fixed inset-0 flex flex-col items-center justify-center
      bg-slate-50 text-gray-700 overflow-hidden"
    >
      <div className="flex flex-col items-center animate-[fadeIn_1s_ease-out]">
        <img src={logo} alt="FinSight" className="w-28 h-28 object-contain mb-5" />

        <h1 className="flex text-3xl font-bold tracking-wide">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-[bounceLetter_1s_ease-in-out_infinite]"
              style={{
                animationDelay: `${index * 0.12}s`
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <p className="mt-2 text-sm text-emerald-700">مدیریت و تهیه گزارش های مالی</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounceLetter {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-9px);
          }
        }
      `}</style>
    </div>
  )
}
