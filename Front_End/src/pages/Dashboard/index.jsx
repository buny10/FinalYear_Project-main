import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import PageHeader from '../../components/ui/PageHeader';
import RevenueChart from './RevenueChart';
import ActivityFeed from './ActivityFeed';
import LowStockAlert from './LowStockAlert';
import { C } from '../../theme/colors';
import { fmt } from '../../utils/formatters';

export default function DashboardPage({ data, setActivePage }) {
  const totalRevenue = data.revenueData.reduce((a, b) => a + b.revenue, 0);
  const activeEmployees = data.employees.filter(e => e.status === "Active").length;
  const pendingInvoices = data.invoices.filter(i => i.status === "Pending" || i.status === "Overdue").length;

  const lowStock = data.inventory.filter(i => i.stock < i.minStock);
  const recentActivity = [
    { text: "Invoice INV-004 marked as paid", time: "2h ago", type: "success" },
    { text: "New project 'Mobile App v2' started", time: "4h ago", type: "info" },
    { text: "Employee Sarah Johnson updated profile", time: "6h ago", type: "" },
    { text: "Low stock alert: Wireless Mouse", time: "8h ago", type: "warning" },
    { text: "Customer Apex Industries added", time: "1d ago", type: "" },
  ];

  return (
    <div className="page-content" style={{ padding: "28px 28px", overflowY: "auto", flex: 1 }}>
       <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", color: C.text, margin: "0 0 8px 0" }}>Dashboard</h1>
                    <p style={{ color: C.textMuted, margin: "0 0 24px 1", fontSize: "1rem" }}>Welcome back! Here's what's happening today.</p>
      {/* <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening today."/> */}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard
          label="Total Revenue (YTD)"
          value= {fmt(totalRevenue)}
          change="+12.4%"
          icon= "rupee"
          color={C.accent}
          onClick={() => setActivePage("finance")}
        />
        <StatCard
          label="Active Employees"
          value={activeEmployees}
          change="+2"
          icon="employees"
          color={C.info}
          onClick={() => setActivePage("employees")}
        />
        <StatCard
          label="Pending Invoices"
          value={pendingInvoices}
          change={pendingInvoices > 2 ? "+1" : "-1"}
          icon="rupee"
          color={C.warning}
          onClick={() => setActivePage("finance")}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <RevenueChart data={data.revenueData} />
        <Card
          onClick={() => setActivePage("finance")}
          style={{ cursor: "pointer" }}
        >
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 16 }}>Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={data.salesData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {data.salesData.map((e, i) => (
                  <Cell key={i} fill={[C.accent, C.info, C.warning, C.success][i]}/>
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 8, color: C.text, fontSize: 12 }}
                formatter={v => [`${v}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 4 }}>
            {data.salesData.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: [C.accent, C.info, C.warning, C.success][i], display: "inline-block" }}/>
                <span style={{ fontSize: "0.75rem", color: C.textMuted }}>{s.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <ActivityFeed activities={recentActivity} />

        {/* <Card style={{ cursor: "default" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 14 }}>Project Progress</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.projects.filter(p => p.status !== "Completed").slice(0, 4).map(p => (
              <div key={p.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: "0.8rem", color: C.text }}>{p.name}</span>
                  <span style={{ fontSize: "0.75rem", color: C.textMuted }}>{p.progress}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "#2a2a2a" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 3,
                      width: `${p.progress}%`,
                      background: p.progress > 75 ? C.success : p.progress > 40 ? C.accent : C.warning,
                      transition: "width 0.3s"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card> */}

        <LowStockAlert items={lowStock} onViewAll={() => setActivePage("store")} />
      </div>
    </div>
  );
}