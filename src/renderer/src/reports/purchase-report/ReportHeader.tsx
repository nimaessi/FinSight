import { FileSpreadsheet } from 'lucide-react';
import { PrintButton } from './PrintButton';

interface Props {
  title: string
  fileName: string
}

export function ReportHeader({ title, fileName }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <FileSpreadsheet className="text-emerald-600" size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>

            <p className="text-sm text-slate-400 mt-1">گزارش استخراج‌شده از {fileName}</p>
          </div>
        </div>
      </div>

     <PrintButton />
    </div>
  )
}
