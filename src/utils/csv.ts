import type { Order } from '../types'

const COLUMNS: Array<{ key: keyof Order; label: string }> = [
  { key: 'requestId', label: 'Request ID' },
  { key: 'type', label: 'Type' },
  { key: 'customerName', label: 'Customer Name' },
  { key: 'customerEmail', label: 'Customer Email' },
  { key: 'tradingAccountId', label: 'Trading Account' },
  { key: 'amount', label: 'Amount' },
  { key: 'currency', label: 'Currency' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
]

function escapeCsvValue(value: unknown): string {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function ordersToCsv(orders: Order[]): string {
  const header = COLUMNS.map((c) => escapeCsvValue(c.label)).join(',')
  const rows = orders.map((order) =>
    COLUMNS.map((c) => escapeCsvValue(order[c.key])).join(','),
  )
  return [header, ...rows].join('\n')
}

export function downloadOrdersCsv(orders: Order[], filename = 'orders-export.csv'): void {
  const csv = ordersToCsv(orders)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
