import type { Order, OrderStatus, OrderType } from '../types'

// Deterministic PRNG (mulberry32) so the mock dataset is stable across renders.
function mulberry32(seed: number) {
  let a = seed
  return function random(): number {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIRST_NAMES = [
  'Lena', 'Marco', 'Priya', 'Tomasz', 'Amara', 'Diego', 'Sofia', 'Kenji',
  'Fatou', 'Noah', 'Ines', 'Ravi', 'Elin', 'Yusuf', 'Camila', 'Aiden',
  'Nadia', 'Owen', 'Zoe', 'Hassan', 'Mia', 'Leo', 'Anya', 'Jamal',
]

const LAST_NAMES = [
  'Reyes', 'Kowalski', 'Nakamura', 'Ferreira', 'Odom', 'Haddad', 'Lindqvist',
  'Osei', 'Bianchi', 'Novak', 'Santos', 'Meyer', 'Okafor', 'Petrov', 'Diallo',
  'Chen', 'Alvarez', 'Larsen', 'Abara', 'Fischer',
]

const CURRENCIES = ['USD', 'EUR', 'GBP']

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, '0')
}

function randomRequestId(rand: () => number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i++) out += chars[Math.floor(rand() * chars.length)]
  return out
}

function randomComment(type: OrderType, rand: () => number): string {
  if (type === 'Payout') {
    return [
      'I would like to request a payout to the following account details:',
      'Account holder name: (on file)',
      `Account number: ${pad(Math.floor(rand() * 100000000), 8)}`,
    ].join('\n')
  }
  return 'Proof of payment attached. Please confirm once funds are received.'
}

export function generateMockOrders(count = 88, seed = 42): Order[] {
  const rand = mulberry32(seed)
  const now = new Date('2026-07-28T18:00:00Z').getTime()
  const orders: Order[] = []

  for (let i = 0; i < count; i++) {
    const type: OrderType = rand() > 0.55 ? 'Deposit' : 'Payout'
    const first = pick(FIRST_NAMES, rand)
    const last = pick(LAST_NAMES, rand)
    const customerName = `${first} ${last}`
    const customerEmail = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`
    const statusRoll = rand()
    const status: OrderStatus = statusRoll < 0.15 ? 'Sent' : statusRoll < 0.85 ? 'Success' : 'Failed'
    const amount = Math.round((50 + rand() * 4950) * 100) / 100
    const daysAgo = Math.floor(rand() * 30)
    const msAgo = daysAgo * 24 * 60 * 60 * 1000 + Math.floor(rand() * 24 * 60 * 60 * 1000)
    const date = new Date(now - msAgo).toISOString()

    orders.push({
      id: `ord_${pad(i + 1, 4)}`,
      requestId: randomRequestId(rand),
      type,
      customerName,
      customerEmail,
      customerId: pad(Math.floor(rand() * 1_000_000_000), 10),
      tradingAccountId: `US51-Live_${pad(6010000 + Math.floor(rand() * 9000), 7)}`,
      amount,
      currency: pick(CURRENCIES, rand),
      status,
      date,
      comments: randomComment(type, rand),
      isPriority: rand() > 0.9,
    })
  }

  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
