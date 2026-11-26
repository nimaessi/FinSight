export interface PurchaseReport {
  period: {
    title: string
    code: string
    taxRate: number
    startDate: string
    endDate: string
    previousYear: string
    referencedPeriod: string
    referencedRecordCount: string
  }

  purchases: {
    taxBreakdown: {
      rate: number
      gross: number
      tax: number
    }[]
    total: {
      gross: number
      tax: number
    }
    settlements: {
      type: string
      gross: number
      tax: number
    }[]
  }

  taxBalance: {
    total: number
    currentPeriod: number
    previousPeriods: number
    future: number
  }

  summary: {
    items: {
      title: string
      amount: number
    }[]
  }

  referencedPeriods: {
    period: string
    lastUpdated: string
  }[]

  invoices: {
    unpaid: {
      title: string
      count: number
      gross: number
      tax: number
    }
    pending: {
      count: number
      gross: number
      tax: number
    }
    historical: {
      count: number
      gross: number
      tax: number
    }
  }

  gasInvoices: {
    rate: number
    count: number
    gross: number
    tax: number
  }[]
}
