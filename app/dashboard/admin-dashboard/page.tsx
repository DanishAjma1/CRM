"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Target,
  Search,
  Filter,
  Calendar,
  Download,
  MoreVertical,
  RefreshCcw,
} from "lucide-react";
import { signOut } from "next-auth/react";

const AdminDashboard = ({ adminData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");

  // EXPECTED DATA STRUCTURE FROM PROPS:
  // adminData = {
  //   totalMetrics: {
  //     totalSpend: 125000,
  //     spendChange: 15.3,
  //     totalClients: 24,
  //     clientsChange: 8.5,
  //     totalImpressions: 4500000,
  //     impressionsChange: 22.1,
  //     totalConversions: 12450,
  //     conversionsChange: 18.7,
  //   },
  //   overallPerformance: [
  //     { month: 'Jan', spend: 18000, conversions: 1200, revenue: 89000 },
  //     // ... more months
  //   ],
  //   clientsList: [
  //     {
  //       id: 1,
  //       name: 'Client Name',
  //       spend: 8500,
  //       conversions: 450,
  //       roas: 4.2,
  //       status: 'active',
  //       campaigns: 5,
  //       lastUpdated: '2 hours ago'
  //     },
  //     // ... more clients
  //   ],
  //   topPerformers: [
  //     { name: 'Client A', roas: 6.8, spend: 12000 },
  //     // ... more top performers
  //   ],
  //   industryBreakdown: [
  //     { name: 'E-commerce', value: 35, clients: 8 },
  //     { name: 'SaaS', value: 28, clients: 6 },
  //     { name: 'Healthcare', value: 22, clients: 5 },
  //     { name: 'Finance', value: 15, clients: 5 },
  //   ],
  //   recentActivity: [
  //     { client: 'Client Name', action: 'Campaign launched', time: '5 min ago' },
  //     // ... more activities
  //   ]
  // }

  // Default sample data
  const defaultData = {
    totalMetrics: {
      totalSpend: 125000,
      spendChange: 15.3,
      totalClients: 24,
      clientsChange: 8.5,
      totalImpressions: 4500000,
      impressionsChange: 22.1,
      totalConversions: 12450,
      conversionsChange: 18.7,
    },
    overallPerformance: [
      { month: "Jan", spend: 18000, conversions: 1200, revenue: 89000 },
      { month: "Feb", spend: 21000, conversions: 1450, revenue: 98000 },
      { month: "Mar", spend: 19500, conversions: 1380, revenue: 94000 },
      { month: "Apr", spend: 23000, conversions: 1620, revenue: 112000 },
      { month: "May", spend: 22000, conversions: 1580, revenue: 108000 },
      { month: "Jun", spend: 21500, conversions: 1620, revenue: 115000 },
    ],
    clientsList: [
      {
        id: 1,
        name: "Acme Corporation",
        spend: 12500,
        conversions: 850,
        roas: 5.2,
        status: "active",
        campaigns: 8,
        lastUpdated: "2 hours ago",
      },
      {
        id: 2,
        name: "TechStart Inc",
        spend: 9800,
        conversions: 620,
        roas: 4.8,
        status: "active",
        campaigns: 5,
        lastUpdated: "1 hour ago",
      },
      {
        id: 3,
        name: "Global Solutions",
        spend: 15200,
        conversions: 1120,
        roas: 6.1,
        status: "active",
        campaigns: 12,
        lastUpdated: "30 min ago",
      },
      {
        id: 4,
        name: "Innovate Labs",
        spend: 8300,
        conversions: 480,
        roas: 3.9,
        status: "active",
        campaigns: 4,
        lastUpdated: "3 hours ago",
      },
      {
        id: 5,
        name: "Digital Dynamics",
        spend: 11000,
        conversions: 720,
        roas: 4.5,
        status: "active",
        campaigns: 7,
        lastUpdated: "1 hour ago",
      },
      {
        id: 6,
        name: "Prime Retail",
        spend: 7600,
        conversions: 380,
        roas: 3.2,
        status: "paused",
        campaigns: 3,
        lastUpdated: "5 hours ago",
      },
    ],
    topPerformers: [
      { name: "Global Solutions", roas: 6.1, spend: 15200 },
      { name: "Acme Corporation", roas: 5.2, spend: 12500 },
      { name: "TechStart Inc", roas: 4.8, spend: 9800 },
      { name: "Digital Dynamics", roas: 4.5, spend: 11000 },
    ],
    industryBreakdown: [
      { name: "E-commerce", value: 35, clients: 8 },
      { name: "SaaS", value: 28, clients: 6 },
      { name: "Healthcare", value: 22, clients: 5 },
      { name: "Finance", value: 15, clients: 5 },
    ],
    recentActivity: [
      {
        client: "Acme Corporation",
        action: "New campaign launched",
        time: "5 min ago",
      },
      {
        client: "TechStart Inc",
        action: "Budget increased by 20%",
        time: "15 min ago",
      },
      {
        client: "Global Solutions",
        action: "Achieved 100 conversions today",
        time: "1 hour ago",
      },
      {
        client: "Digital Dynamics",
        action: "Campaign paused for review",
        time: "2 hours ago",
      },
    ],
  };

  const data = adminData || defaultData;

  const industryColors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  const metrics = [
    {
      title: "Total Ad Spend",
      value: `$${(data.totalMetrics.totalSpend / 1000).toFixed(0)}K`,
      change: `+${data.totalMetrics.spendChange}%`,
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Active Clients",
      value: data.totalMetrics.totalClients,
      change: `+${data.totalMetrics.clientsChange}%`,
      positive: true,
      icon: Users,
    },
    {
      title: "Total Impressions",
      value: `${(data.totalMetrics.totalImpressions / 1000000).toFixed(1)}M`,
      change: `+${data.totalMetrics.impressionsChange}%`,
      positive: true,
      icon: Eye,
    },
    {
      title: "Total Conversions",
      value: data.totalMetrics.totalConversions.toLocaleString(),
      change: `+${data.totalMetrics.conversionsChange}%`,
      positive: true,
      icon: Target,
    },
  ];

  const filteredClients = data.clientsList.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-[#22336d] to-[#091549] p-6">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-right {
          animation: slideRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-blue-300">
                Manage all client campaigns from one place
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-linear-to-b from-[#22336d] to-[#091549] text-blue-200 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="flex gap-2">
                {["7d", "30d", "90d", "1y"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedPeriod === period
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "bg-linear-to-b from-[#22336d] to-[#091549] text-blue-200 hover:bg-white/20"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <button
                className="px-4 py-2 bg-red-500/80 text-blue-200 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex justify-end items-center mb-4">
            <button className="px-4 py-2 bg-linear-to-b from-[#22336d] to-[#091549] text-blue-200 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 p-6 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-700 opacity-10"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-linear-to-br from-blue-500 to-blue-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <p className="text-blue-300 text-sm mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-white">
                      {metric.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Overall Performance */}
          <div className="lg:col-span-2 bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Overall Performance
              </h2>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-blue-300">Spend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-blue-300">Revenue</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.overallPerformance}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorSpend)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#60a5fa"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Industry Breakdown */}
          <div className="bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Industry Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.industryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.industryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={industryColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {data.industryBreakdown.map((industry, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: industryColors[idx] }}
                    ></div>
                    <span className="text-blue-200 text-sm">
                      {industry.name}
                    </span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {industry.clients} clients
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Performers */}
          <div className="bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-right">
            <h2 className="text-2xl font-bold text-white mb-6">
              Top Performers
            </h2>
            <div className="space-y-4">
              {data.topPerformers.map((client, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-linear-to-b from-[#22336d] to-[#091549] transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">{client.name}</h3>
                    <span className="text-green-400 font-bold text-lg">
                      {client.roas}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-300">Total Spend</span>
                    <span className="text-white font-semibold">
                      ${client.spend.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-linear-to-b from-[#22336d] to-[#091549] rounded-full h-2 mt-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(client.roas / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className="bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-right"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {data.recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.client}</p>
                    <p className="text-blue-300 text-sm">{activity.action}</p>
                    <p className="text-blue-400 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-linear-to-b from-[#22336d] to-[#091549] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Clients</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-linear-to-b from-[#22336d] to-[#091549] text-blue-200 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Spend
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Conversions
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    ROAS
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Campaigns
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Last Updated
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, idx) => (
                  <tr
                    key={client.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <span className="text-white font-medium">
                          {client.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white font-semibold">
                      ${client.spend.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-white">
                      {client.conversions}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-green-400 font-bold">
                        {client.roas}x
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white">{client.campaigns}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          client.status === "active"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-blue-300 text-sm">
                      {client.lastUpdated}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-linear-to-b from-[#22336d] to-[#091549] rounded-lg transition-all duration-300">
                        <MoreVertical className="w-4 h-4 text-blue-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
