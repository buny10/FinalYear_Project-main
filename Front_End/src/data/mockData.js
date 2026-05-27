export const MOCK_USERS = [
  { 
    email: "admin@gmail.com", 
    password: "Admin@123", 
    name: "Hulash Shah", 
    role: "Admin", 
    company: "Bixcore Solutions",
    avatar: "HS" 
  }
];

export const INITIAL_DATA = {
  employees: [
    { id:1, name:"Sarah Johnson", role:"Senior Developer", dept:"Engineering", salary:85000, status:"Active", email:"sarah@bizcore.com", phone:"+1 555-0101", joined:"2021-03-15", avatar:"SJ" },
    { id:2, name:"Marcus Lee", role:"Product Manager", dept:"Product", salary:90000, status:"Active", email:"marcus@bizcore.com", phone:"+1 555-0102", joined:"2020-07-22", avatar:"ML" },
    { id:3, name:"Priya Patel", role:"UI Designer", dept:"Design", salary:72000, status:"Active", email:"priya@bizcore.com", phone:"+1 555-0103", joined:"2022-01-10", avatar:"PP" },
    { id:4, name:"James Wilson", role:"Sales Lead", dept:"Sales", salary:78000, status:"On Leave", email:"james@bizcore.com", phone:"+1 555-0104", joined:"2019-11-05", avatar:"JW" },
    { id:5, name:"Emma Davis", role:"Accountant", dept:"Finance", salary:68000, status:"Active", email:"emma@bizcore.com", phone:"+1 555-0105", joined:"2021-08-30", avatar:"ED" },
    { id:6, name:"Carlos Rivera", role:"DevOps Engineer", dept:"Engineering", salary:88000, status:"Active", email:"carlos@bizcore.com", phone:"+1 555-0106", joined:"2020-04-18", avatar:"CR" },
  ],
  customers: [
    { id:1, name:"TechNova Solutions", contact:"David Park", email:"david@technova.com", phone:"+1 555-1001", status:"Active", totalSpent:142500, joined:"2022-02-10", location:"New York, NY" },
    { id:2, name:"Meridian Group", contact:"Lisa Chen", email:"lisa@meridian.com", phone:"+1 555-1002", status:"Active", totalSpent:89000, joined:"2021-09-15", location:"San Francisco, CA" },
    { id:3, name:"Apex Industries", contact:"Tom Baker", email:"tom@apex.com", phone:"+1 555-1003", status:"Prospect", totalSpent:0, joined:"2024-01-20", location:"Chicago, IL" },
    { id:4, name:"Stellar Retail Co.", contact:"Amy Wong", email:"amy@stellar.com", phone:"+1 555-1004", status:"Active", totalSpent:56000, joined:"2023-05-08", location:"Austin, TX" },
    { id:5, name:"BluePeak Ventures", contact:"Ryan Scott", email:"ryan@bluepeak.com", phone:"+1 555-1005", status:"Inactive", totalSpent:23000, joined:"2020-11-30", location:"Seattle, WA" },
  ],
  inventory: [
    { id:1, name:"Laptop Pro 15\"", category:"Electronics", sku:"LAP-001", stock:24, minStock:10, price:1299, cost:900, supplier:"TechDistrib" },
    { id:2, name:"Office Chair Ergonomic", category:"Furniture", sku:"FUR-012", stock:8, minStock:5, price:450, cost:280, supplier:"FurnishCo" },
    { id:3, name:"Wireless Mouse", category:"Accessories", sku:"ACC-034", stock:3, minStock:15, price:45, cost:22, supplier:"TechDistrib" },
    { id:4, name:"Standing Desk", category:"Furniture", sku:"FUR-023", stock:12, minStock:5, price:850, cost:520, supplier:"FurnishCo" },
    { id:5, name:"USB-C Hub 7-Port", category:"Accessories", sku:"ACC-045", stock:47, minStock:20, price:79, cost:35, supplier:"TechDistrib" },
    { id:6, name:"Monitor 27\" 4K", category:"Electronics", sku:"MON-002", stock:15, minStock:8, price:699, cost:450, supplier:"DisplayWorld" },
  ],
  projects: [
    { id:1, name:"Website Redesign", client:"TechNova Solutions", status:"In Progress", priority:"High", deadline:"2024-06-30", progress:65, team:["SJ","PP","CR"] },
    { id:2, name:"CRM Integration", client:"Meridian Group", status:"Planning", priority:"Medium", deadline:"2024-08-15", progress:20, team:["ML","SJ"] },
    { id:3, name:"Mobile App v2", client:"Stellar Retail Co.", status:"In Progress", priority:"High", deadline:"2024-07-20", progress:45, team:["SJ","PP","JW"] },
    { id:4, name:"Data Migration", client:"Internal", status:"Completed", priority:"Low", deadline:"2024-03-01", progress:100, team:["CR","ED"] },
    { id:5, name:"API Overhaul", client:"BluePeak Ventures", status:"On Hold", priority:"Medium", deadline:"2024-09-10", progress:30, team:["CR","ML"] },
  ],
  tasks: [
    { id:1, projectId:1, title:"Design new homepage mockup", assignee:"PP", status:"Done", due:"2024-05-10", priority:"High" },
    { id:2, projectId:1, title:"Frontend implementation", assignee:"SJ", status:"In Progress", due:"2024-06-15", priority:"High" },
    { id:3, projectId:1, title:"SEO optimization", assignee:"ML", status:"Todo", due:"2024-06-28", priority:"Medium" },
    { id:4, projectId:2, title:"Requirement gathering", assignee:"ML", status:"Done", due:"2024-05-20", priority:"Medium" },
    { id:5, projectId:3, title:"UI components", assignee:"PP", status:"In Progress", due:"2024-06-30", priority:"High" },
    { id:6, projectId:3, title:"API endpoints", assignee:"SJ", status:"Todo", due:"2024-07-10", priority:"High" },
  ],
  invoices: [
    { id:"INV-001", client:"TechNova Solutions", amount:24500, status:"Paid", date:"2024-03-15", due:"2024-04-15", items:[{desc:"Web Development",qty:1,rate:24500}] },
    { id:"INV-002", client:"Meridian Group", amount:12000, status:"Pending", date:"2024-04-01", due:"2024-05-01", items:[{desc:"Consulting",qty:40,rate:300}] },
    { id:"INV-003", client:"Stellar Retail Co.", amount:8750, status:"Overdue", date:"2024-02-20", due:"2024-03-20", items:[{desc:"Design Services",qty:35,rate:250}] },
    { id:"INV-004", client:"TechNova Solutions", amount:31200, status:"Paid", date:"2024-04-10", due:"2024-05-10", items:[{desc:"App Development",qty:1,rate:31200}] },
    { id:"INV-005", client:"BluePeak Ventures", amount:5500, status:"Draft", date:"2024-05-01", due:"2024-06-01", items:[{desc:"API Integration",qty:22,rate:250}] },
  ],
  expenses: [
    { id:1, category:"Software", description:"Adobe Creative Suite", amount:600, date:"2024-04-01", status:"Approved" },
    { id:2, category:"Travel", description:"Client meeting flights", amount:1240, date:"2024-04-05", status:"Approved" },
    { id:3, category:"Office", description:"Office supplies Q2", amount:380, date:"2024-04-12", status:"Pending" },
    { id:4, category:"Marketing", description:"LinkedIn Ads Campaign", amount:2200, date:"2024-04-15", status:"Approved" },
    { id:5, category:"Software", description:"AWS Services", amount:890, date:"2024-04-30", status:"Approved" },
  ],
  revenueData: [
    {month:"Jan",revenue:42000,expenses:28000,profit:14000},
    {month:"Feb",revenue:38000,expenses:25000,profit:13000},
    {month:"Mar",revenue:55000,expenses:31000,profit:24000},
    {month:"Apr",revenue:47000,expenses:29000,profit:18000},
    {month:"May",revenue:63000,expenses:34000,profit:29000},
    {month:"Jun",revenue:58000,expenses:32000,profit:26000},
  ],
  salesData: [
    {name:"Engineering",value:45},{name:"Design",value:20},{name:"Consulting",value:25},{name:"Support",value:10}
  ],
};
