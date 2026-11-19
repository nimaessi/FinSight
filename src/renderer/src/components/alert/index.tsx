import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, type LucideIcon } from 'lucide-react';
import { cn } from '../../../../shared/utils/cn';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'solid' | 'soft' | 'outline';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity
  variant?: AlertVariant
  message?: React.ReactNode
  icon?: React.ReactNode | false
  action?: React.ReactNode
}


const SOLID: Record<AlertSeverity, string> = {
  error: 'bg-red-600 text-white border-red-600',
  warning: 'bg-amber-500 text-white border-amber-500',
  info: 'bg-sky-600 text-white border-sky-600',
  success: 'bg-emerald-600 text-white border-emerald-600'
}

const SOFT: Record<AlertSeverity, string> = {
  error: 'bg-red-50 text-red-900 border-red-200',
  warning: 'bg-amber-50 text-amber-900 border-amber-200',
  info: 'bg-sky-50 text-sky-900 border-sky-200',
  success: 'bg-emerald-50 text-emerald-900 border-emerald-200'
}

const OUTLINE: Record<AlertSeverity, string> = {
  error: 'bg-transparent text-red-700 border-red-300',
  warning: 'bg-transparent text-amber-700 border-amber-300',
  info: 'bg-transparent text-sky-700 border-sky-300',
  success: 'bg-transparent text-emerald-700 border-emerald-300'
}

const ICON_COLOR: Record<AlertSeverity, string> = {
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-sky-500',
  success: 'text-emerald-500'
}

const ICON_COLOR_SOLID: Record<AlertSeverity, string> = {
  error: 'text-red-100',
  warning: 'text-amber-100',
  info: 'text-sky-100',
  success: 'text-emerald-100'
}

const ICON_MAP: Record<AlertSeverity, LucideIcon> = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2
}


/**
 * Alert — Tailwind CSS themed, with an `error` variant by default.
 *
 * @example
 * <Alert
 *   severity="error"
 *   variant="soft"
 *   message="Please correct the highlighted fields and try again."
 * />
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    severity = 'error',
    variant = 'soft',
    message,
    icon,
    action,
    className,
    children,
    ...rest
  },
  ref
) {
  const isSolid = variant === 'solid'

  const containerClasses = cn(
    'relative flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm',
    variant === 'solid'
      ? SOLID[severity]
      : variant === 'outline'
        ? OUTLINE[severity]
        : SOFT[severity],
    className
  )

  const iconClasses = cn(
    'mt-0.5 shrink-0',
    isSolid ? ICON_COLOR_SOLID[severity] : ICON_COLOR[severity]
  )


  const renderIcon = () => {
    if (icon === false) return null
    if (icon) return <span className={iconClasses}>{icon}</span>

    const LucideIcon = ICON_MAP[severity]
    return (
      <span className={iconClasses}>
        <LucideIcon size={20} strokeWidth={2} aria-hidden />
      </span>
    )
  }

  return (
    <div ref={ref} role="alert" className={containerClasses} {...rest}>
      {renderIcon()}

      <div className="min-w-0 flex-1">
        {message ? <div className={cn('opacity-90')}>{message}</div> : null}
        {children}
      </div>

      {action ? <div className="ml-auto flex shrink-0 items-center">{action}</div> : null}
    </div>
  )
})

export default Alert
