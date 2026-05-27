import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import { Table, TD } from '../../components/ui/Table';
import SearchBar from '../../components/ui/SearchBar';
import AvatarBubble from '../../components/ui/AvatarBubble';
import Badge from '../../components/ui/Badge';
import Btn from '../../components/ui/Btn';
import EmployeeModal from './EmployeeModal';
import { fmt, statusColor } from '../../utils/formatters';
import { C } from '../../theme/colors';

export default function EmployeesPage({ data, setData }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("All");

  const depts = ["All", ...new Set(data.employees.map(e => e.dept))];
  const filtered = data.employees.filter(e => 
    (filter === "All" || e.dept === filter) && 
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd = () => { 
    setForm({
      name: "", 
      role: "", 
      dept: "Engineering", 
      salary: "", 
      status: "Active", 
      email: "", 
      phone: "", 
      joined: new Date().toISOString().split("T")[0], 
      avatar: ""
    }); 
    setModal("add"); 
  };
  
  const openEdit = (emp) => { 
    setForm({ ...emp }); 
    setModal("edit"); 
  };
  
  const save = () => {
    if (modal === "add") {
      setData(d => ({
        ...d, 
        employees: [
          ...d.employees, 
          { 
            ...form, 
            id: Date.now(), 
            avatar: form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(), 
            salary: Number(form.salary) 
          }
        ]
      }));
    } else {
      setData(d => ({
        ...d, 
        employees: d.employees.map(e => e.id === form.id ? { ...form, salary: Number(form.salary) } : e)
      }));
    }
    setModal(null);
  };
  
  const remove = (id) => setData(d => ({ ...d, employees: d.employees.filter(e => e.id !== id) }));

  return (
    <div className="page-content" style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
      <PageHeader 
        title="Employees" 
        subtitle={`${data.employees.length} total team members`} 
        action={<Btn label="Add Employee" icon="plus" onClick={openAdd}/>}
      />
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          ["Total", data.employees.length, C.accent],
          ["Active", data.employees.filter(e => e.status === "Active").length, C.success],
          ["On Leave", data.employees.filter(e => e.status === "On Leave").length, C.warning],
          ["Avg Salary", fmt(data.employees.reduce((a, b) => a + b.salary, 0) / data.employees.length || 0), C.info]
        ].map(([l, v, c], i) => (
          <Card key={i}>
            <p style={{ fontSize: "0.75rem", color: C.textMuted, marginBottom: 6 }}>{l}</p>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: c }}>{v}</p>
          </Card>
        ))}
      </div>
      
      <Card>
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search employees..."/>
          <div style={{ display: "flex", gap: 6 }}>
            {depts.map(d => (
              <button 
                key={d} 
                onClick={() => setFilter(d)} 
                style={{
                  padding: "6px 12px", 
                  borderRadius: 20, 
                  border: `1px solid ${filter === d ? C.accent : C.cardBorder}`, 
                  background: filter === d ? C.accentDim : "transparent", 
                  color: filter === d ? C.accent : C.textMuted, 
                  fontSize: "0.78rem", 
                  cursor: "pointer", 
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        
        <Table 
          columns={["Employee", "Department", "Role", "Salary", "Status", "Actions"]} 
          data={filtered} 
          renderRow={emp => (
            <>
              <TD>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <AvatarBubble initials={emp.avatar} size={34}/>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.88rem" }}>{emp.name}</p>
                    <p style={{ fontSize: "0.74rem", color: C.textMuted }}>{emp.email}</p>
                  </div>
                </div>
              </TD>
              <TD><span style={{ background: "#ffffff10", padding: "3px 10px", borderRadius: 20, fontSize: "0.78rem" }}>{emp.dept}</span></TD>
              <TD style={{ color: C.textMuted }}>{emp.role}</TD>
              <TD style={{ fontWeight: 600 }}>{fmt(emp.salary)}</TD>
              <TD><Badge label={emp.status} color={statusColor(emp.status)}/></TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn label="Edit" icon="edit" variant="ghost" size="sm" onClick={() => openEdit(emp)}/>
                  <Btn label="" icon="trash" variant="danger" size="sm" onClick={() => remove(emp.id)}/>
                </div>
              </TD>
            </>
          )}
        />
      </Card>

      {modal && (
        <EmployeeModal 
          modal={modal} 
          onClose={() => setModal(null)} 
          form={form} 
          setForm={setForm} 
          save={save} 
        />
      )}
    </div>
  );
}
