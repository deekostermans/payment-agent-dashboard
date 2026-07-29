export type OrderType = 'Deposit' | 'Payout'
export type OrderStatus = 'Sent' | 'Success' | 'Failed'

export interface Order {
  id: string
  requestId: string
  type: OrderType
  customerName: string
  customerEmail: string
  customerId: string
  tradingAccountId: string
  amount: number
  currency: string
  status: OrderStatus
  date: string
  comments: string
  isPriority: boolean
}
