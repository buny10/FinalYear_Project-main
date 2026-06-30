import React from 'react';
import StatCard from '../../components/ui/StatCard';
import PageHeader from '../../components/ui/PageHeader';
import { C } from '../../theme/colors';
import { fmt } from '../../utils/formatters';
import FinanceChart from './FinanceChart';
import InvoicesList from './InvoicesList';
import ExpensesList from './ExpensesList';

export default function FinancePage({ data }) {
  // Compute YTD metrics from revenueData
  const totalRevenue = data.revenueData.reduce((a, b) => a + b.revenue, 0);
  const totalExpenses = data.revenueData.reduce((a, b) => a + b.expenses, 0);
  const netProfit = data.revenueData.reduce((a, b) => a + b.profit, 0);

  // Pending invoices Total
  const pendingInvoicesAmt = data.invoices
    .filter(i => i.status === "Pending" || i.status === "Overdue")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="page-content" style={{ padding: "28px 28px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column" }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", color: C.text, margin: "0 0 8px 0" }}>Finance</h1>
              <p style={{ color: C.textMuted, margin: "0 0 24px 1", fontSize: "1rem" }}>Track revenue, expenses, and manage your invoices.</p>
     
      {/* <PageHeader
        title="Finance"
        subtitle="Track revenue, expenses, and manage your invoices."
      /> */}

      {/* Top Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Revenue (YTD)" value={fmt(totalRevenue)} change="+12.4%" icon="rupee" color={C.accent} />
        <StatCard label="Total Expenses (YTD)" value={fmt(totalExpenses)} change="-3.2%" icon="rupee" color={C.danger} />
        <StatCard label="Net Profit (YTD)" value={fmt(netProfit)} change="+15.8%" icon="rupee" color={C.info} />
        <StatCard label="Pending Invoices" value= {fmt(pendingInvoicesAmt)} change="-2.1%" icon="rupee" color={C.warning} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <FinanceChart data={data.revenueData} />

        {/* Quick Actions / Summary could go here, or we can use another widget. */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 24, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 16px 0", color: C.text }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ padding: 14, background: C.accentDim, color: C.accent, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, textAlign: "left", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(200,240,74,0.18)"} onMouseOut={e => e.currentTarget.style.background = C.accentDim}>+ Create New Invoice</button>
            <button style={{ padding: 14, background: "rgba(239, 68, 68, 0.1)", color: C.danger, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, textAlign: "left", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"} onMouseOut={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}>+ Record Expense</button>
            {/* <button style={{ padding: 14, background: "rgba(59, 130, 246, 0.1)", color: C.info, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, textAlign: "left", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)"} onMouseOut={e => e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)"}>Download Financial Report</button>
            <button style={{ padding: 14, background: "rgba(255, 255, 255, 0.05)", color: C.text, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, textAlign: "left", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"} onMouseOut={e => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}>Manage Taxes</button> */}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1, minHeight: 300 }}>
        <InvoicesList invoices={data.invoices} />
        <ExpensesList expenses={data.expenses} />
      </div>
    </div>
  );
}
