"use client";
import { signOut } from "next-auth/react";

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
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  MousePointer,
  Eye,
  Users,
  Target,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

const ClientDashboard = ({ clientData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // EXPECTED DATA STRUCTURE FROM PROPS:
  // clientData = {
  //   clientName: "Client Name",
  //   performanceData: [
  //     { date: 'Week 1', impressions: 45000, clicks: 2400, conversions: 180, spend: 1200 },
  //     // ... more weekly/daily data points
  //   ],
  //   deviceData: [
  //     { name: 'Mobile', value: 45 },
  //     { name: 'Desktop', value: 38 },
  //     { name: 'Tablet', value: 17 },
  //   ],
  //   topCampaigns: [
  //     { name: 'Campaign Name', conversions: 450, roas: 4.2, status: 'active' },
  //     // ... more campaigns
  //   ],
  //   metrics: {
  //     totalSpend: 8480,
  //     spendChange: 12.5,
  //     totalClicks: 18200,
  //     clicksChange: 18.3,
  //     totalImpressions: 331000,
  //     impressionsChange: 24.1,
  //     totalConversions: 1455,
  //     conversionsChange: 31.2,
  //   },
  //   stats: {
  //     avgCpc: 0.47,
  //     ctr: 5.5,
  //     conversionRate: 8.0,
  //     avgRoas: 4.8,
  //   }
  // }

  // Default sample data for demonstration
  const defaultData = {
    clientName: "Demo Client",
    performanceData: [
      {
        date: "Week 1",
        impressions: 45000,
        clicks: 2400,
        conversions: 180,
        spend: 1200,
      },
      {
        date: "Week 2",
        impressions: 52000,
        clicks: 2800,
        conversions: 220,
        spend: 1350,
      },
      {
        date: "Week 3",
        impressions: 48000,
        clicks: 2600,
        conversions: 195,
        spend: 1280,
      },
      {
        date: "Week 4",
        impressions: 61000,
        clicks: 3400,
        conversions: 280,
        spend: 1520,
      },
      {
        date: "Week 5",
        impressions: 58000,
        clicks: 3200,
        conversions: 260,
        spend: 1450,
      },
      {
        date: "Week 6",
        impressions: 67000,
        clicks: 3800,
        conversions: 320,
        spend: 1680,
      },
    ],
    deviceData: [
      { name: "Mobile", value: 45 },
      { name: "Desktop", value: 38 },
      { name: "Tablet", value: 17 },
    ],
    topCampaigns: [
      {
        name: "Summer Sale 2024",
        conversions: 450,
        roas: 4.2,
        status: "active",
      },
      {
        name: "Brand Awareness",
        conversions: 320,
        roas: 3.8,
        status: "active",
      },
      { name: "Product Launch", conversions: 280, roas: 5.1, status: "active" },
      { name: "Retargeting", conversions: 195, roas: 6.3, status: "active" },
    ],
    metrics: {
      totalSpend: 8480,
      spendChange: 12.5,
      totalClicks: 18200,
      clicksChange: 18.3,
      totalImpressions: 331000,
      impressionsChange: 24.1,
      totalConversions: 1455,
      conversionsChange: 31.2,
    },
    stats: {
      avgCpc: 0.47,
      ctr: 5.5,
      conversionRate: 8.0,
      avgRoas: 4.8,
    },
  };

  const data = clientData || defaultData;

  const deviceColors = ["#3b82f6", "#60a5fa", "#93c5fd"];
  const deviceDataWithColors = data.deviceData.map((item, idx) => ({
    ...item,
    color: deviceColors[idx],
  }));

  const metrics = [
    {
      title: "Total Spend",
      value: `$${data.metrics.totalSpend.toLocaleString()}`,
      change: `${data.metrics.spendChange > 0 ? "+" : ""}${
        data.metrics.spendChange
      }%`,
      positive: data.metrics.spendChange > 0,
      icon: DollarSign,
    },
    {
      title: "Total Clicks",
      value: data.metrics.totalClicks.toLocaleString(),
      change: `${data.metrics.clicksChange > 0 ? "+" : ""}${
        data.metrics.clicksChange
      }%`,
      positive: data.metrics.clicksChange > 0,
      icon: MousePointer,
    },
    {
      title: "Impressions",
      value: `${(data.metrics.totalImpressions / 1000).toFixed(0)}K`,
      change: `${data.metrics.impressionsChange > 0 ? "+" : ""}${
        data.metrics.impressionsChange
      }%`,
      positive: data.metrics.impressionsChange > 0,
      icon: Eye,
    },
    {
      title: "Conversions",
      value: data.metrics.totalConversions.toLocaleString(),
      change: `${data.metrics.conversionsChange > 0 ? "+" : ""}${
        data.metrics.conversionsChange
      }%`,
      positive: data.metrics.conversionsChange > 0,
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
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
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-white mb-2">
                {data.clientName} - Campaign Performance
              </h1>
              <p className="text-blue-300">
                Real-time insights into your advertising success
              </p>
            </div>
            <div className="flex gap-2">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-white/10 text-blue-200 hover:bg-white/20"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-blue-700 opacity-10"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-linear-to-br from-blue-500 to-blue-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                          metric.positive
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {metric.positive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Performance Overview
              </h2>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-blue-300">Clicks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-blue-300">Conversions</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.performanceData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorConversions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#93c5fd" />
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
                  dataKey="clicks"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="#60a5fa"
                  fillOpacity={1}
                  fill="url(#colorConversions)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Device Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={deviceDataWithColors}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceDataWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
              {deviceDataWithColors.map((device, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    ></div>
                    <span className="text-blue-200">{device.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {device.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Spend vs Impressions
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 41, 59, 0.95)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="spend" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar
                  dataKey="impressions"
                  fill="#60a5fa"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Top Performing Campaigns
            </h2>
            <div className="space-y-4">
              {data.topCampaigns.map((campaign, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold">
                        {campaign.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-blue-300 text-sm">
                          {campaign.conversions} conversions
                        </span>
                        <span className="text-green-400 text-sm font-semibold">
                          ROAS: {campaign.roas}x
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">
                      {campaign.status}
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(campaign.conversions / 500) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-linear-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-blue-300 text-sm mb-1">Avg. CPC</p>
              <p className="text-3xl font-bold text-white">
                ${data.stats.avgCpc}
              </p>
            </div>
            <div>
              <p className="text-blue-300 text-sm mb-1">CTR</p>
              <p className="text-3xl font-bold text-white">{data.stats.ctr}%</p>
            </div>
            <div>
              <p className="text-blue-300 text-sm mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">
                {data.stats.conversionRate}%
              </p>
            </div>
            <div>
              <p className="text-blue-300 text-sm mb-1">Avg. ROAS</p>
              <p className="text-3xl font-bold text-white">
                {data.stats.avgRoas}x
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </div>
  );
};

export default ClientDashboard;
