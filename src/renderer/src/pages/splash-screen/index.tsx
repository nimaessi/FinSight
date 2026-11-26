import { useEffect, useRef, useState } from "react";
import logoSrc from "@renderer/assets/finsight-log-3.svg";

type Easing = (t: number) => number;

const easeInOutPower2: Easing = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const easeOutCubic: Easing = (t) => 1 - Math.pow(1 - t, 3);

function elasticOut(t: number, amplitude = 1, period = 0.4): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const s = period / 4;
  return (
    amplitude *
      Math.pow(2, -10 * t) *
      Math.sin((t - s) * ((2 * Math.PI) / period)) +
    1
  );
}

interface TweenOpts {
  duration: number; // ثانیه
  from: number;
  to: number;
  onUpdate: (v: number) => void;
  ease?: Easing;
  delay?: number; // ثانیه
  cancelled: { current: boolean };
}

function tween({
  duration,
  from,
  to,
  onUpdate,
  ease = easeInOutPower2,
  delay = 0,
  cancelled,
}: TweenOpts): Promise<void> {
  return new Promise((resolve) => {
    let start: number | null = null;
    const delayMs = delay * 1000;
    const durMs = Math.max(duration * 1000, 1);

    const step = (ts: number) => {
      if (cancelled.current) {
        resolve();
        return;
      }
      if (start === null) start = ts;
      const elapsed = ts - start - delayMs;

      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }
      const p = Math.min(elapsed / durMs, 1);
      const v = from + (to - from) * ease(p);
      onUpdate(v);

      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

function stagger(
  count: number,
  staggerTime: number,
  factory: (i: number) => Promise<void>
): Promise<void[]> {
  return Promise.all(
    Array.from({ length: count }, (_, i) => factory(i)).map(
      (p, i) =>
        new Promise<void>((resolve) => {
          setTimeout(() => p.then(resolve), i * staggerTime * 1000);
        })
    )
  );
}

interface SplashScreenProps {
  holdDuration?: number;
  fadeOutDuration?: number;
  onComplete?: () => void;
  logo?: React.ReactNode;
}

export default function SplashScreen({
  holdDuration = 600,
  fadeOutDuration = 0.6,
  onComplete,
  logo,
}: SplashScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) return;

    const cancelled = { current: false };
    const shapes = Array.from(
      logoRef.current?.querySelectorAll<SVGElement>(
        "path, line, polyline, circle, ellipse, rect, polygon"
      ) ?? []
    );

    const rafCleanups: number[] = [];

    (async () => {
      if (shapes.length > 0) {
        shapes.forEach((el) => {
          el.setAttribute("pathLength", "1");
          el.style.strokeDasharray = "1";
          el.style.strokeDashoffset = "1";
          el.style.fillOpacity = "0";
          el.style.transition = "none";
        });

        await stagger(
          shapes.length,
          0.15,
          (i) =>
            tween({
              duration: 1.6,
              from: 1,
              to: 0,
              cancelled,
              ease: easeInOutPower2,
              onUpdate: (v) => {
                if (!cancelled.current)
                  shapes[i].style.strokeDashoffset = String(v);
              },
            })
        );

        await stagger(
          shapes.length,
          0.08,
          (i) =>
            tween({
              duration: 0.5,
              from: 0,
              to: 1,
              cancelled,
              ease: easeOutCubic,
              onUpdate: (v) => {
                if (!cancelled.current)
                  shapes[i].style.fillOpacity = String(v);
              },
            })
        );
      }

      const node = logoRef.current;
      if (node && !cancelled.current) {
        await tween({
          duration: 0.5,
          from: 1,
          to: 1.08,
          cancelled,
          ease: (t) => elasticOut(t, 1, 0.4),
          onUpdate: (v) => {
            if (!cancelled.current)
              node.style.transform = `scale(${v})`;
          },
        });
        await tween({
          duration: 0.45,
          from: 1.08,
          to: 1,
          cancelled,
          ease: easeInOutPower2,
          onUpdate: (v) => {
            if (!cancelled.current)
              node.style.transform = `scale(${v})`;
          },
        });
      }

      await new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, holdDuration);
        rafCleanups.push(id);
      });

      const root = rootRef.current;
      if (root && !cancelled.current) {
        await tween({
          duration: fadeOutDuration,
          from: 1,
          to: 0,
          cancelled,
          ease: easeInOutPower2,
          onUpdate: (v) => {
            if (!cancelled.current) root.style.opacity = String(v);
          },
        });
      }

      if (!cancelled.current) {
        setHidden(true);
        onComplete?.();
      }
    })();

    return () => {
      cancelled.current = true;
      rafCleanups.forEach((id) => clearTimeout(id));
    };
  }, [holdDuration, fadeOutDuration, onComplete, hidden]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-emerald-50 via-green-50 to-teal-100"
      style={{ willChange: "opacity" }}
      aria-label="Splash screen"
      role="status"
    >
      <div className="absolute h-72 w-72 rounded-full bg-emerald-300/50 blur-3xl" />

      <div
        ref={logoRef}
        className="relative h-64 w-64 origin-center"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {logo ?? <img src={logoSrc} alt="" className="h-full w-full object-contain" />}
      </div>
      <p className="mt-2 text-sm text-center text-emerald-700">
        مدیریت و تهیه گزارش های مالی
      </p>
    </div>
  );
}