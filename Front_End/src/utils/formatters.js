import { C } from "../theme/colors";

export const fmt = (n) => 
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR", 
    maximumFractionDigits: 0
  }).format(n);

export const AVATAR_COLORS = [
  "#C8F04A", "#3b82f6", "#f59e0b", "#ef4444", "#22c55e", "#a855f7", "#ec4899"
];

export const avatarColor = (str) => 
  AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length];

export const statusColor = (s) => 
  ({
    Active: C.success,
    Paid: C.success,
    Completed: C.success,
    Done: C.success,
    Approved: C.success,
    Inactive: C.danger,
    Overdue: C.danger,
    "On Hold": C.danger,
    Pending: C.warning,
    "In Progress": C.info,
    Planning: C.info,
    Prospect: C.warning,
    Draft: C.textMuted,
    "On Leave": C.warning,
    Todo: C.textMuted
  }[s] || C.textMuted);
