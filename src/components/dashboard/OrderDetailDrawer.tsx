import { useEffect, useState } from 'react'
import type { Order, OrderStatus } from '../../types'
import { formatDate } from '../../utils/format'

interface Props {
  order: Order | null
  onClose: () => void
  onSubmit: (id: string, updates: Partial<Order>) => void
}

export default function OrderDetailDrawer({ order, onClose, onSubmit }: Props) {
  const [renderedOrder, setRenderedOrder] = useState<Order | null>(order)
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<OrderStatus>('Sent')

  useEffect(() => {
    if (order) {
      setRenderedOrder(order)
      setAmount(order.amount.toFixed(2))
      setStatus(order.status)
    }
  }, [order])

  const open = Boolean(order)

  if (!renderedOrder) return null

  const isEditable = renderedOrder.status === 'Sent'

  function handleSubmit() {
    if (!renderedOrder) return
    onSubmit(renderedOrder.id, {
      status,
      amount: renderedOrder.type === 'Deposit' ? parseFloat(amount) || renderedOrder.amount : renderedOrder.amount,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50" aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-surface shadow-panel transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTransitionEnd={() => {
          if (!open) setRenderedOrder(null)
        }}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <div>
            <span className="text-xs font-medium text-ink-muted">#{renderedOrder.requestId}</span>
            <h2 className="text-base font-semibold text-ink-primary">Order details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-ink-secondary hover:text-ink-primary"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(100%-64px)] flex-col overflow-y-auto px-6 py-5">
          <h3 className="mb-3 text-sm font-semibold text-ink-primary">Customer order details</h3>
          <dl className="mb-6 grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-ink-muted">Customer name</dt>
            <dd className="text-right text-ink-primary">{renderedOrder.customerName}</dd>
            <dt className="text-ink-muted">Customer ID</dt>
            <dd className="text-right text-ink-primary">{renderedOrder.customerId}</dd>
            <dt className="text-ink-muted">Type</dt>
            <dd className="text-right text-brand">{renderedOrder.type}</dd>
            <dt className="text-ink-muted">Email</dt>
            <dd className="text-right text-ink-primary">{renderedOrder.customerEmail}</dd>
            <dt className="text-ink-muted">Date / Time</dt>
            <dd className="text-right text-ink-primary">{formatDate(renderedOrder.date)}</dd>
            <dt className="text-ink-muted">Trading account</dt>
            <dd className="text-right text-ink-primary">{renderedOrder.tradingAccountId}</dd>
          </dl>

          <label className="mb-1 block text-sm font-medium text-ink-primary">Amount</label>
          <div className="mb-4 flex items-center rounded-md border border-hairline">
            <span className="border-r border-hairline px-3 py-2 text-sm text-ink-muted">
              {renderedOrder.currency}
            </span>
            <input
              type="number"
              step="0.01"
              value={amount}
              disabled={!isEditable || renderedOrder.type !== 'Deposit'}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-sm text-ink-primary tabular-nums focus:outline-none disabled:text-ink-muted"
            />
          </div>

          <label className="mb-1 block text-sm font-medium text-ink-primary">Status</label>
          <select
            value={status}
            disabled={!isEditable}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="mb-4 h-10 w-full rounded-md border border-hairline bg-surface px-3 text-sm text-ink-primary disabled:text-ink-muted"
          >
            <option value="Sent">Sent</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>

          <label className="mb-1 block text-sm font-medium text-ink-primary">Comments</label>
          <div className="mb-6 whitespace-pre-line rounded-md border border-hairline bg-page px-3 py-2 text-sm text-ink-secondary">
            {renderedOrder.comments}
          </div>

          <div className="mt-auto pt-2">
            <button
              type="button"
              disabled={!isEditable}
              onClick={handleSubmit}
              className="w-full rounded-md bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isEditable ? 'Confirm and submit' : 'Already processed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
