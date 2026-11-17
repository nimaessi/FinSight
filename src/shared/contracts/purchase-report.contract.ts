export interface PurchaseReport {
  period: {
    title: string
    startDate: string
    endDate: string
  }

  purchases: {
    taxBreakdown: {
      rate: number
      net: number
      tax: number
      gross: number
    }[]
    totalNet: number
    totalTax: number
    totalGross: number
  }

  settlement: {
    type: string
    amount: number
    percentage: number
  }[]

  taxBalance: {
    title: string
    amount: number
  }[]

  summary: {
    title: string
    value: number
  }[]

  referencedPeriods: {
    title: string
    date: string
  }[]

  invoices: {
    unpaid: {
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
    count: number
    gross: number
    tax: number
  }
}
