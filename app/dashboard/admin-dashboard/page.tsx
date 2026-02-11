"use client";
import React, { useEffect, useState } from "react";
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
  Legend,
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
  MousePointer,
  Activity,
  AlertCircle,
  Wallet,
  ArrowDownNarrowWideIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { form } from "framer-motion/m";
import toast from "react-hot-toast";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: "",
    customerId: "",
  });
  const [processedData, setProcessedData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/admin-data`);

        // Process the data
        const processed = processGoogleAdsData(res.data.customers);
        setProcessedData(processed);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to process Google Ads data
  interface Metric {
    costMicros: number;
    conversionsValue: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }

  interface Campaign {
    id: string;
    name: string;
    status: string;
  }

  interface Customer {
    id: string;
  }

  interface RawDataItem {
    metrics: Metric;
    campaign: Campaign;
    customer: Customer;
    date: string;
    updatedAt: string;
  }

  interface ProcessedCampaign {
    id: string;
    customerId: string;
    name: string;
    status: string;
    impressions: number;
    clicks: number;
    conversions: number;
    conversionsValue: number;
    spend: number;
    roas: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
    costPerConversion: number;
    date: string;
    lastUpdated: string;
  }

  interface TotalMetrics {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalConversionsValue: number;
    overallRoas: number;
    overallCtr: number;
    overallConversionRate: number;
    activeCampaigns: number;
    pausedCampaigns: number;
    totalCampaigns: number;
    totalClients: number;
  }

  interface Client {
    id: string;
    name: string;
    spend: number;
    conversions: number;
    conversionsValue: number;
    roas: number;
    impressions: number;
    clicks: number;
    ctr: number;
    status: string;
    campaigns: number;
    lastUpdated: string;
  }

  interface StatusBreakdown {
    name: string;
    value: number;
    count: number;
  }

  interface PerformanceOverTime {
    date: string;
    spend: number;
    conversions: number;
    revenue: number;
    impressions: number;
  }

  interface CampaignComparison {
    name: string;
    spend: number;
    conversions: number;
    clicks: number;
    roas: number;
  }

  interface ProcessedData {
    totalMetrics: TotalMetrics;
    campaignsData: ProcessedCampaign[];
    clientsList: Client[];
    topPerformers: Client[];
    statusBreakdown: StatusBreakdown[];
    performanceOverTime: PerformanceOverTime[];
    campaignComparison: CampaignComparison[];
  }

  const processGoogleAdsData = (
    rawData: RawDataItem[],
  ): ProcessedData | null => {
    if (!rawData || rawData.length === 0) return null;

    // Convert micros to dollars
    const microsToDollars = (micros: number): number => micros / 1000000;

    // Calculate metrics for each campaign
    const campaignsData: ProcessedCampaign[] = rawData.map((item) => {
      const spend = microsToDollars(item.metrics.costMicros);
      const conversionsValue = item.metrics.conversionsValue;
      const roas = spend > 0 ? conversionsValue / spend : 0;
      const ctr =
        item.metrics.impressions > 0
          ? (item.metrics.clicks / item.metrics.impressions) * 100
          : 0;
      const cpc = item.metrics.clicks > 0 ? spend / item.metrics.clicks : 0;
      const conversionRate =
        item.metrics.clicks > 0
          ? (item.metrics.conversions / item.metrics.clicks) * 100
          : 0;
      const costPerConversion =
        item.metrics.conversions > 0 ? spend / item.metrics.conversions : 0;

      return {
        id: item.campaign.id,
        customerId: item.customer.id,
        name: item.campaign.name,
        status: item.campaign.status,
        impressions: item.metrics.impressions,
        clicks: item.metrics.clicks,
        conversions: item.metrics.conversions,
        conversionsValue: conversionsValue,
        spend: spend,
        roas: roas,
        ctr: ctr,
        cpc: cpc,
        conversionRate: conversionRate,
        costPerConversion: costPerConversion,
        date: item.date,
        lastUpdated: new Date(item.updatedAt).toLocaleString(),
      };
    });

    // Calculate total metrics
    const totalSpend = campaignsData.reduce((sum, c) => sum + c.spend, 0);
    const totalImpressions = campaignsData.reduce(
      (sum, c) => sum + c.impressions,
      0,
    );
    const totalClicks = campaignsData.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaignsData.reduce(
      (sum, c) => sum + c.conversions,
      0,
    );
    const totalConversionsValue = campaignsData.reduce(
      (sum, c) => sum + c.conversionsValue,
      0,
    );
    const overallRoas = totalSpend > 0 ? totalConversionsValue / totalSpend : 0;
    const overallCtr =
      totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const overallConversionRate =
      totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Count active vs paused campaigns
    const activeCampaigns = campaignsData.filter(
      (c) => c.status === "ENABLED",
    ).length;
    const pausedCampaigns = campaignsData.filter(
      (c) => c.status === "PAUSED",
    ).length;
    const removedCampaigns = campaignsData.filter(
      (c) => c.status === "REMOVED",
    ).length;

    // Group by customer for client metrics
    interface CustomerGroup {
      customerId: string;
      campaigns: ProcessedCampaign[];
      totalSpend: number;
      totalConversions: number;
      totalConversionsValue: number;
      totalImpressions: number;
      totalClicks: number;
    }

    const customerGroups = campaignsData.reduce<Record<string, CustomerGroup>>(
      (acc, campaign) => {
        const customerId = campaign.customerId;
        if (!acc[customerId]) {
          acc[customerId] = {
            customerId,
            campaigns: [],
            totalSpend: 0,
            totalConversions: 0,
            totalConversionsValue: 0,
            totalImpressions: 0,
            totalClicks: 0,
          };
        }
        acc[customerId].campaigns.push(campaign);
        acc[customerId].totalSpend += campaign.spend;
        acc[customerId].totalConversions += campaign.conversions;
        acc[customerId].totalConversionsValue += campaign.conversionsValue;
        acc[customerId].totalImpressions += campaign.impressions;
        acc[customerId].totalClicks += campaign.clicks;
        return acc;
      },
      {},
    );

    const clientsList: Client[] = Object.values(customerGroups).map(
      (group) => ({
        id: group.customerId,
        name: `Client ${group.customerId}`,
        spend: group.totalSpend,
        conversions: group.totalConversions,
        conversionsValue: group.totalConversionsValue,
        roas:
          group.totalSpend > 0
            ? group.totalConversionsValue / group.totalSpend
            : 0,
        impressions: group.totalImpressions,
        clicks: group.totalClicks,
        ctr:
          group.totalImpressions > 0
            ? (group.totalClicks / group.totalImpressions) * 100
            : 0,
        status: group.campaigns.some((c) => c.status === "ENABLED")
          ? "active"
          : "paused",
        campaigns: group.campaigns.length,
        lastUpdated: group.campaigns[0]?.lastUpdated || "N/A",
      }),
    );

    // Sort top performers by ROAS
    const topPerformers: Client[] = [...clientsList]
      .sort((a, b) => b.roas - a.roas)
      .slice(0, 5);

    // Campaign status breakdown
    const statusBreakdown: StatusBreakdown[] = [
      { name: "Active", value: activeCampaigns, count: activeCampaigns },
      { name: "Paused", value: pausedCampaigns, count: pausedCampaigns },
      { name: "Removed", value: removedCampaigns, count: removedCampaigns },
    ];

    // Performance over time (mock data based on current metrics)
    const performanceOverTime: PerformanceOverTime[] = [
      {
        date: "Yesterday",
        spend: totalSpend,
        conversions: Math.floor(totalConversions),
        revenue: totalConversionsValue,
        impressions: Math.floor(totalImpressions),
      },
      {
        date: "Today",
        spend: totalSpend,
        conversions: Math.floor(totalConversions),
        revenue: totalConversionsValue,
        impressions: Math.floor(totalImpressions),
      },
    ];

    // Campaign performance comparison
    const campaignComparison: CampaignComparison[] = campaignsData.map((c) => ({
      name: c.name.length > 20 ? c.name.substring(0, 20) + "..." : c.name,
      spend: c.spend,
      conversions: c.conversions,
      clicks: c.clicks,
      roas: c.roas,
    }));

    return {
      totalMetrics: {
        totalSpend,
        totalImpressions,
        totalClicks,
        totalConversions,
        totalConversionsValue,
        overallRoas,
        overallCtr,
        overallConversionRate,
        activeCampaigns,
        pausedCampaigns,
        totalCampaigns: campaignsData.length,
        totalClients: Object.keys(customerGroups).length,
      },
      campaignsData,
      clientsList,
      topPerformers,
      statusBreakdown,
      performanceOverTime,
      campaignComparison,
    };
  };

  const industryColors = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];
  const statusColors = ["#10b981", "#f59e0b", "#ef4444"];

  // Use processed data or default data
  const data = processedData;

  const metrics = data
    ? [
        {
          title: "Total Ad Spend",
          value: `PKR ${data.totalMetrics.totalSpend.toFixed(2)}`,
          subValue: `${data.totalMetrics.totalCampaigns} campaigns`,
          icon: Wallet,
          color: "blue",
        },
        {
          title: "Total Impressions",
          value: data.totalMetrics.totalImpressions.toLocaleString(),
          subValue: `CTR: ${data.totalMetrics.overallCtr.toFixed(2)}%`,
          icon: Eye,
          color: "purple",
        },
        {
          title: "Total Clicks",
          value: data.totalMetrics.totalClicks.toLocaleString(),
          subValue: `Conversion Rate: ${data.totalMetrics.overallConversionRate.toFixed(2)}%`,
          icon: MousePointer,
          color: "green",
        },
        {
          title: "Total Conversions",
          value: data.totalMetrics.totalConversions.toLocaleString(),
          subValue: `Value: PKR ${data.totalMetrics.totalConversionsValue.toFixed(2)}`,
          icon: Target,
          color: "orange",
        },
        {
          title: "Overall ROAS",
          value: `${data.totalMetrics.overallRoas.toFixed(2)}x`,
          subValue:
            data.totalMetrics.overallRoas > 1
              ? "Profitable"
              : "Needs optimization",
          icon: TrendingUp,
          color: data.totalMetrics.overallRoas > 1 ? "green" : "red",
        },
        {
          title: "Active Campaigns",
          value: data.totalMetrics.activeCampaigns,
          subValue: `${data.totalMetrics.pausedCampaigns} paused`,
          icon: Activity,
          color: "indigo",
        },
      ]
    : [];

  const seenIds = new Set();

  const filteredCampaigns =
    data?.campaignsData.filter((campaign: ProcessedCampaign) => {
      const matchesSearch = campaign.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isNewCustomer = !seenIds.has(campaign.customerId);

      if (matchesSearch && isNewCustomer) {
        seenIds.add(campaign.customerId);
        return true;
      }
      return false;
    }) || [];

  const filteredClientsAndCampaigns =
    data?.campaignsData.filter((campaign: ProcessedCampaign) => {
      return campaign.customerId && campaign.name && campaign.id;
    }) || [];

  const groupedData = filteredClientsAndCampaigns.reduce(
    (acc: any, campaign: any) => {
      const { customerId } = campaign;
      if (!acc[customerId]) {
        acc[customerId] = [];
      }
      acc[customerId].push(campaign);
      return acc;
    },
    {},
  );

  // Convert back to an array of groups for easy mapping
  const groups = Object.values(groupedData);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#22336d] to-[#091549] flex items-center justify-center gap-2">
        <div className="border-2 border-l-0 rounded-full ring-black animate-spin duration-150 h-6 w-6"></div>
        <div className="text-white text-2xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#22336d] to-[#091549] flex items-center justify-center gap-2">
        <div className="border-2 border-l-0 rounded-full ring-black animate-spin duration-150 h-6 w-6"></div>
        <div className="text-white text-2xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-[#22336d] to-[#091549] p-6">
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
      <div className="px-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="animate-fade-in">
              <span className="text-white/50 bg-black/50 px-3 py-1 rounded-full text-sm mb-2 inline-block">
                Admin Dashboard
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">
                Google Ads - Admin Dashboard
              </h1>
              <p className="text-blue-300">
                Real-time campaign performance and analytics
              </p>
            </div>
            <button
              className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-[#091549] to-[#22336d]"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-xl bg-linear-to-br from-${metric.color}-500 to-${metric.color}-600`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-blue-300 text-sm mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-white mb-1">
                      {metric.value}
                    </p>
                    <p className="text-blue-400 text-xs">{metric.subValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Campaign Comparison Chart */}
          <div className="from-[#091549] to-[#22336d] grid col-span-2 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Campaign Performance Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.campaignComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(4, 23, 100, 0.8)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="spend" fill="#3b82f6" name="Spend (PKR )" />
                <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
                <Bar dataKey="impressions" fill="#8b5cf6" name="Impressions" />
                <Bar dataKey="conversions" fill="#f59e0b" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Status Breakdown */}
          <div className="from-[#091549] to-[#22336d] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Campaign Status
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.statusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.statusBreakdown.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={statusColors[index]} />
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
              {data.statusBreakdown.map((status: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: statusColors[idx] }}
                    ></div>
                    <span className="text-blue-200 text-sm">{status.name}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">
                    {status.count} campaigns
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers & Client Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Performing Clients */}
          <div className="from-[#091549] to-[#22336d] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-right">
            <h2 className="text-2xl font-bold text-white mb-6">
              Top Performing Clients (by ROAS)
            </h2>
            <div className="space-y-4">
              {data.topPerformers.map((client: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">{client.name}</h3>
                    <span
                      className={`font-bold text-lg ${client.roas > 1 ? "text-green-400" : "text-red-400"}`}
                    >
                      {client.roas.toFixed(2)}x ROAS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Spend:</span>
                      <span className="text-white font-semibold">
                        ${client.spend.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Revenue:</span>
                      <span className="text-white font-semibold">
                        ${client.conversionsValue.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Conversions:</span>
                      <span className="text-white font-semibold">
                        {client.conversions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Campaigns:</span>
                      <span className="text-white font-semibold">
                        {client.campaigns}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((client.roas / 5) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div
            className="from-[#091549] to-[#22336d] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-slide-right"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Performance Insights
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Overall ROAS
                    </h3>
                    <p className="text-blue-200 text-sm">
                      Your campaigns are generating $
                      {data.totalMetrics.overallRoas.toFixed(2)} for every $1
                      spent
                      {data.totalMetrics.overallRoas > 2
                        ? " - Excellent performance!"
                        : data.totalMetrics.overallRoas > 1
                          ? " - Good profitability"
                          : " - Consider optimization"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Conversion Rate
                    </h3>
                    <p className="text-green-200 text-sm">
                      {data.totalMetrics.overallConversionRate.toFixed(2)}% of
                      clicks convert
                      {data.totalMetrics.overallConversionRate > 5
                        ? " - Above industry average"
                        : data.totalMetrics.overallConversionRate > 2
                          ? " - Good performance"
                          : " - Room for improvement"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Click-Through Rate
                    </h3>
                    <p className="text-purple-200 text-sm">
                      {data.totalMetrics.overallCtr.toFixed(2)}% CTR across all
                      campaigns
                      {data.totalMetrics.overallCtr > 3
                        ? " - Strong ad engagement"
                        : data.totalMetrics.overallCtr > 1
                          ? " - Average engagement"
                          : " - Ad copy needs optimization"}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${data.totalMetrics.pausedCampaigns > 0 ? "bg-yellow-500/20 border-yellow-500/50" : "bg-green-500/20 border-green-500/50"} border rounded-xl p-4`}
              >
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Campaign Status
                    </h3>
                    <p className="text-yellow-200 text-sm">
                      {data.totalMetrics.activeCampaigns} active,{" "}
                      {data.totalMetrics.pausedCampaigns} paused
                      {data.totalMetrics.pausedCampaigns > 0
                        ? " - Review paused campaigns for optimization opportunities"
                        : " - All campaigns are active"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="from-[#091549] to-[#22336d] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Campaigns</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                className="px-4 py-2 bg-white/10 text-blue-200 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                onClick={() => setIsRefreshing(true)}
              >
                <RefreshCcw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Campaign
                  </th>
                  <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    Impressions
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    Clicks
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    CTR
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    Spend
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    Conversions
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    Conv. Rate
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    ROAS
                  </th>
                  <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                    CPC
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign: any, idx: number) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#091549] via-[#22336d] to-white/50 flex items-center justify-center text-white font-bold text-sm">
                          {campaign.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-white font-medium block">
                            {campaign.name}
                          </span>
                          <span className="text-blue-400 text-xs">
                            ID: {campaign.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === "ENABLED"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-blue-300">
                      {campaign.ctr.toFixed(2)}%
                    </td>
                    <td className="py-4 px-4 text-right text-white font-semibold">
                      PKR {campaign.spend.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {campaign.conversions}
                    </td>
                    <td className="py-4 px-4 text-right text-blue-300">
                      {campaign.conversionRate.toFixed(2)}%
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-bold ${campaign.roas > 1 ? "text-green-400" : "text-red-400"}`}
                      >
                        {campaign.roas > 0
                          ? `${campaign.roas.toFixed(2)}x`
                          : "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      PKR {campaign.cpc.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-blue-300">
                No campaigns found matching your search
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 from-[#091549] to-[#22336d] text-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in mx-20">
        <div className="flex gap-5">
          <form
            className="flex flex-col w-1/2 gap-8 mt-4"
            onSubmit={async () => {
              try {
                setLoading(true);
                const res = await axios.post(`/api/admin-data`, formData);

                // Process the data
                if (res.status !== 200) {
                  throw new Error("Failed to fetch admin data");
                }
                setFormData({
                  userId: "",
                  customerId: "",
                });
                toast.success("User assigned successfully!");
              } catch (err) {
                console.error("Error fetching admin data:", err);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="flex flex-wrap flex-col gap-8 w-3/4 mx-auto justify-center items-center">
              <p>Map the Users with related Campigns on Google Ads Account </p>
              <select
                className="bg-black outline-0 border border-white/20 rounded-lg px-4 py-2 text-white w-full md:w-3/5"
                name="userId"
                value={formData.userId}
                onChange={(e) => {
                  const selectedUserId = e.target.value;
                  setFormData((prev) => ({ ...prev, userId: selectedUserId }));
                }}
              >
                <option value="#">Select User</option>
                {users.map((client: any, index: number) => (
                  <option key={index} value={client.id}>
                    {client.email}
                  </option>
                ))}
              </select>
              <ArrowDownNarrowWideIcon className="w-8 h-8 text-white" />
              <select
                className="bg-black outline-0 border border-white/20 rounded-lg px-4 py-2 text-white w-full md:w-full"
                name="customerId"
                value={formData.customerId}
                onChange={(e) => {
                  const selectedUserId = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    customerId: selectedUserId,
                  }));
                }}
              >
                <option value="#" className="text-black">
                  Select Customer
                </option>
                {filteredClientsAndCampaigns.map(
                  (customer: any, index: number) => (
                    <option key={index} value={customer.customerId}>
                      {customer.customerId}
                    </option>
                  ),
                )}
              </select>
            </div>
            <button className="px-14 py-2 text-black bg-green-500 hover:bg-green-800 rounded-2xl w-fit mx-auto">
              Assign
            </button>
          </form>

          <aside className="w-1/2">
            <div className="from-[#091549] to-[#22336d] backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Campaign Mapping
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">
                        Clients
                      </th>
                      <th className="text-right py-3 px-4 text-blue-300 font-semibold">
                        Campaigns
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group: any) =>
                      group.map((campaign: any, idx: number) => (
                        <tr
                          key={campaign.id}
                          className="border-b border-white/10 hover:bg-white/5 transition-all duration-300"
                        >
                          {/* Only render this TD for the first item in the group */}
                          {idx === 0 && (
                            <td
                              rowSpan={group.length}
                              className="py-4 px-4 align-top border-r border-white/10"
                            >
                              <div className="flex flex-col">
                                <span className="text-blue-400 font-bold text-lg">
                                  {campaign.customerId}
                                </span>
                                <span className="text-gray-400 text-xs">
                                  {group.length} Campaigns
                                </span>
                              </div>
                            </td>
                          )}

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#091549] via-[#22336d] to-white/50 flex items-center justify-center text-white font-bold text-sm">
                                {campaign.name.charAt(0)}
                              </div>
                              <div>
                                <span className="text-white font-medium block">
                                  {campaign.name}
                                </span>
                                <span className="text-blue-400 text-xs">
                                  Campaign ID: {campaign.id}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>

              {filteredCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-blue-300">
                    No campaigns found matching your search
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
