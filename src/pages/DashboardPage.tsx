import { useMemo, useState } from 'react'
import type { Order, OrderStatus } from '../types'
import { generateMockOrders } from '../data/mockOrders'
import Toolbar, { type Filters } from '../components/dashboard/Toolbar'
import OrdersTable from '../components/dashboard/OrdersTable'
import Pagination from '../components/dashboard/Pagination'
import OrderDetailDrawer from '../components/dashboard/OrderDetailDrawer'
import { downloadOrdersCsv } from '../utils/csv'
import { formatCurrency } from '../utils/format'

const PAGE_SIZE = 20
const ACCOUNT_BALANCE = 100000

const emptyFilters: Filters = { search: '', status: 'All', dateFrom: '', dateTo: '' }

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>(() => generateMockOrders())
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)

  const filteredOrders = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    return orders.filter((order) => {
      if (filters.status !== 'All' && order.status !== filters.status) return false
      if (
        search &&
        !order.requestId.toLowerCase().includes(search) &&
        !order.customerName.toLowerCase().includes(search) &&
        !order.customerEmail.toLowerCase().includes(search)
      ) {
        return false
      }
      const orderDate = order.date.slice(0, 10)
      if (filters.dateFrom && orderDate < filters.dateFrom) return false
      if (filters.dateTo && orderDate > filters.dateTo) return false
      return true
    })
  }, [orders, filters])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageOrders = filteredOrders.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function updateFilters(next: Filters) {
    setFilters(next)
    setPage(1)
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    setSelectedIds((prev) => {
      const allSelected = pageOrders.every((o) => prev.has(o.id))
      const next = new Set(prev)
      pageOrders.forEach((o) => (allSelected ? next.delete(o.id) : next.add(o.id)))
      return next
    })
  }

  function applyUpdate(id: string, updates: Partial<Order>) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  function bulkStatus(status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (selectedIds.has(o.id) ? { ...o, status } : o)))
    setSelectedIds(new Set())
  }

  function bulkExport() {
    downloadOrdersCsv(
      orders.filter((o) => selectedIds.has(o.id)),
      'orders-selection.csv',
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-primary">Payment Agent Dashboard</h1>
          <p className="text-sm text-ink-secondary">Review, approve, and track deposit &amp; payout requests.</p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-hairline bg-surface px-4 py-2.5">
          <div>
            <div className="text-xs text-ink-muted">Available</div>
            <div className="text-sm font-semibold tabular-nums text-ink-primary">
              {formatCurrency(ACCOUNT_BALANCE)}
            </div>
          </div>
          <button
            type="button"
            className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Add funds
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
        <Toolbar
          filters={filters}
          onChange={updateFilters}
          onExport={() => downloadOrdersCsv(filteredOrders)}
          onRefresh={() => updateFilters(emptyFilters)}
        />
        <OrdersTable
          orders={pageOrders}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          onOpenDetail={setActiveOrder}
          onBulkStatus={bulkStatus}
          onBulkExport={bulkExport}
          onClearSelection={() => setSelectedIds(new Set())}
        />
        <Pagination page={safePage} pageSize={PAGE_SIZE} total={filteredOrders.length} onPageChange={setPage} />
      </div>

      <OrderDetailDrawer order={activeOrder} onClose={() => setActiveOrder(null)} onSubmit={applyUpdate} />
    </main>
  )
}
