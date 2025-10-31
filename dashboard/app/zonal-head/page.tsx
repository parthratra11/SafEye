"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  Construction,
  Trash2,
  Lightbulb,
  Users,
  TrendingUp,
  MapPin,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Worker {
  id: number;
  name: string;
  type: "pothole" | "trash" | "streetlight";
  vehicleNumber: string;
  assignedReports: {
    id: string;
    status: string;
    location: string;
    reportedOn: string;
  }[];
  historicalData: {
    totalResolved: number;
    avgResolutionTime: string;
    monthlyEfficiency: string;
  };
}

const mockWorkers: Worker[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    type: "pothole",
    vehicleNumber: "DL-12-AB1234",
    assignedReports: [
      {
        id: "PTH-001",
        status: "pending",
        location: "Karol Bagh",
        reportedOn: "2024-01-10 14:45",
      },
      {
        id: "PTH-002",
        status: "resolved",
        location: "Connaught Place",
        reportedOn: "2024-01-09 11:30",
      },
      {
        id: "PTH-003",
        status: "pending",
        location: "Chandni Chowk",
        reportedOn: "2024-01-10 09:15",
      },
    ],
    historicalData: {
      totalResolved: 156,
      avgResolutionTime: "2.5 hours",
      monthlyEfficiency: "94%",
    },
  },
  {
    id: 2,
    name: "Pratap Singh",
    type: "trash",
    vehicleNumber: "DL-12-CD5678",
    assignedReports: [
      {
        id: "TRS-006",
        status: "resolved",
        location: "Janakpuri",
        reportedOn: "2024-01-10 13:20",
      },
      {
        id: "TRS-007",
        status: "pending",
        location: "Dwarka",
        reportedOn: "2024-01-10 10:45",
      },
    ],
    historicalData: {
      totalResolved: 189,
      avgResolutionTime: "2.1 hours",
      monthlyEfficiency: "96%",
    },
  },
  {
    id: 3,
    name: "Mohammed Ali",
    type: "streetlight",
    vehicleNumber: "DL-12-EF9012",
    assignedReports: [
      {
        id: "STL-011",
        status: "pending",
        location: "Okhla",
        reportedOn: "2024-01-10 15:30",
      },
      {
        id: "STL-012",
        status: "resolved",
        location: "Kalkaji",
        reportedOn: "2024-01-10 16:00",
      },
      {
        id: "STL-013",
        status: "pending",
        location: "Saket",
        reportedOn: "2024-01-10 14:15",
      },
    ],
    historicalData: {
      totalResolved: 134,
      avgResolutionTime: "2.8 hours",
      monthlyEfficiency: "92%",
    },
  },
  {
    id: 4,
    name: "Suresh Patel",
    type: "pothole",
    vehicleNumber: "DL-12-JK7890",
    assignedReports: [
      {
        id: "PTH-021",
        status: "pending",
        location: "Pitampura",
        reportedOn: "2024-01-10 11:00",
      },
      {
        id: "PTH-022",
        status: "resolved",
        location: "Rohini",
        reportedOn: "2024-01-10 13:45",
      },
    ],
    historicalData: {
      totalResolved: 145,
      avgResolutionTime: "2.6 hours",
      monthlyEfficiency: "93%",
    },
  },
  {
    id: 5,
    name: "Amit Sharma",
    type: "streetlight",
    vehicleNumber: "DL-12-MN2468",
    assignedReports: [
      {
        id: "STL-026",
        status: "pending",
        location: "Sarita Vihar",
        reportedOn: "2024-01-10 10:30",
      },
      {
        id: "STL-027",
        status: "resolved",
        location: "Narela",
        reportedOn: "2024-01-10 12:00",
      },
    ],
    historicalData: {
      totalResolved: 178,
      avgResolutionTime: "2.2 hours",
      monthlyEfficiency: "97%",
    },
  },
  {
    id: 6,
    name: "Ravi Gupta",
    type: "trash",
    vehicleNumber: "DL-12-PQ1234",
    assignedReports: [
      {
        id: "TRS-031",
        status: "pending",
        location: "Nehru Place",
        reportedOn: "2024-01-10 14:45",
      },
      {
        id: "TRS-032",
        status: "resolved",
        location: "Saket",
        reportedOn: "2024-01-09 11:30",
      },
    ],
    historicalData: {
      totalResolved: 156,
      avgResolutionTime: "2.5 hours",
      monthlyEfficiency: "94%",
    },
  },
];

const mockReports = [
  {
    id: "PTH-001",
    location: "Lajpat Nagar, Delhi-110024",
    type: "pothole",
    timestamp: "2024-01-10 14:45",
    status: "Pending",
    reportingMode: "Mobile App",
    priority: "High",
    coordinates: { lat: 28.6519, lng: 77.2315 },
    assignedWorker: "Rajesh Kumar",
    description: "Large pothole blocking traffic flow",
  },
  {
    id: "TRS-002",
    location: "Timarpur, Delhi-110007",
    type: "trash",
    timestamp: "2024-01-09 11:30",
    status: "Resolved",
    reportingMode: "Web Portal",
    priority: "Medium",
    coordinates: { lat: 28.6753, lng: 77.235 },
    assignedWorker: "Pratap Singh",
    description: "Overflowing garbage bins near market",
  },
  {
    id: "STL-003",
    location: "Vijay Nagar, Delhi-110009",
    type: "streetlight",
    timestamp: "2024-01-10 09:15",
    status: "Pending",
    reportingMode: "Phone Call",
    priority: "Medium",
    coordinates: { lat: 28.6842, lng: 77.1845 },
    assignedWorker: "Mohammed Ali",
    description: "Street light not working since 3 days",
  },
  {
    id: "PTH-004",
    location: "Karol Bagh, Delhi-110005",
    type: "pothole",
    timestamp: "2024-01-08 16:20",
    status: "Resolved",
    reportingMode: "Mobile App",
    priority: "Low",
    coordinates: { lat: 28.6519, lng: 77.1906 },
    assignedWorker: "Rajesh Kumar",
    description: "Small pothole near metro station",
  },
  {
    id: "TRS-005",
    location: "Dwarka, Delhi-110075",
    type: "trash",
    timestamp: "2024-01-10 12:30",
    status: "In Progress",
    reportingMode: "Mobile App",
    priority: "High",
    coordinates: { lat: 28.5921, lng: 77.046 },
    assignedWorker: "Ravi Gupta",
    description: "Illegal dumping in residential area",
  },
  {
    id: "STL-006",
    location: "Connaught Place, Delhi-110001",
    type: "streetlight",
    timestamp: "2024-01-07 20:45",
    status: "Resolved",
    reportingMode: "Web Portal",
    priority: "High",
    coordinates: { lat: 28.6304, lng: 77.2177 },
    assignedWorker: "Amit Sharma",
    description: "Multiple street lights flickering",
  },
  {
    id: "PTH-007",
    location: "Rohini, Delhi-110085",
    type: "pothole",
    timestamp: "2024-01-09 08:15",
    status: "Pending",
    reportingMode: "Phone Call",
    priority: "Medium",
    coordinates: { lat: 28.7041, lng: 77.1025 },
    assignedWorker: "Suresh Patel",
    description: "Deep pothole causing vehicle damage",
  },
  {
    id: "TRS-008",
    location: "Janakpuri, Delhi-110058",
    type: "trash",
    timestamp: "2024-01-06 14:00",
    status: "Resolved",
    reportingMode: "Mobile App",
    priority: "Low",
    coordinates: { lat: 28.6219, lng: 77.0757 },
    assignedWorker: "Pratap Singh",
    description: "Scattered waste near bus stop",
  },
  {
    id: "STL-009",
    location: "Saket, Delhi-110017",
    type: "streetlight",
    timestamp: "2024-01-10 18:30",
    status: "In Progress",
    reportingMode: "Web Portal",
    priority: "Medium",
    coordinates: { lat: 28.5244, lng: 77.2066 },
    assignedWorker: "Mohammed Ali",
    description: "LED bulb replacement needed",
  },
  {
    id: "PTH-010",
    location: "Pitampura, Delhi-110034",
    type: "pothole",
    timestamp: "2024-01-05 11:45",
    status: "Resolved",
    reportingMode: "Mobile App",
    priority: "High",
    coordinates: { lat: 28.6943, lng: 77.132 },
    assignedWorker: "Rajesh Kumar",
    description: "Large pothole repaired successfully",
  },
  {
    id: "TRS-011",
    location: "Nehru Place, Delhi-110019",
    type: "trash",
    timestamp: "2024-01-08 09:20",
    status: "Pending",
    reportingMode: "Phone Call",
    priority: "High",
    coordinates: { lat: 28.5478, lng: 77.2517 },
    assignedWorker: "Ravi Gupta",
    description: "Construction debris blocking road",
  },
  {
    id: "STL-012",
    location: "Laxmi Nagar, Delhi-110092",
    type: "streetlight",
    timestamp: "2024-01-09 19:15",
    status: "Pending",
    reportingMode: "Mobile App",
    priority: "Low",
    coordinates: { lat: 28.6345, lng: 77.2767 },
    assignedWorker: "Amit Sharma",
    description: "Dim street light needs maintenance",
  },
];

export default function ZonalHeadDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [workerTypeFilter, setWorkerTypeFilter] = useState<string>("all");
  const [expandedWorkers, setExpandedWorkers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<
    "reports" | "workers" | "analytics"
  >("reports");

  // Report filters
  const [reportTypeFilter, setReportTypeFilter] = useState<string>("all");
  const [reportStatusFilter, setReportStatusFilter] = useState<string>("all");
  const [reportPriorityFilter, setReportPriorityFilter] =
    useState<string>("all");

  // Analytics filter
  const [analyticsTypeFilter, setAnalyticsTypeFilter] = useState<string>("all");

  const filteredWorkers = mockWorkers.filter((worker) => {
    const matchesSearch = worker.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      workerTypeFilter === "all" || worker.type === workerTypeFilter;
    return matchesSearch && matchesType;
  });

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.assignedWorker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      reportTypeFilter === "all" || report.type === reportTypeFilter;
    const matchesStatus =
      reportStatusFilter === "all" || report.status === reportStatusFilter;
    const matchesPriority =
      reportPriorityFilter === "all" ||
      report.priority === reportPriorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
      case "pending":
        return "bg-red-50 text-red-900 border border-red-200";
      case "Resolved":
      case "resolved":
        return "bg-green-50 text-green-900 border border-green-200";
      case "In Progress":
        return "bg-yellow-50 text-yellow-900 border border-yellow-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getWorkerTypeInfo = (type: string) => {
    switch (type) {
      case "pothole":
        return {
          icon: Construction,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          label: "Pothole",
        };
      case "trash":
        return {
          icon: Trash2,
          color: "text-green-600",
          bgColor: "bg-green-100",
          label: "Trash",
        };
      case "streetlight":
        return {
          icon: Lightbulb,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          label: "Street Light",
        };
      default:
        return {
          icon: Users,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          label: "All",
        };
    }
  };

  const toggleWorkerExpansion = (workerId: number) => {
    setExpandedWorkers((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  // Calculate statistics
  const getFilteredAnalyticsData = () => {
    const filtered =
      analyticsTypeFilter === "all"
        ? mockReports
        : mockReports.filter((r) => r.type === analyticsTypeFilter);

    return {
      total: filtered.length,
      resolved: filtered.filter((r) => r.status === "Resolved").length,
      pending: filtered.filter((r) => r.status === "Pending").length,
      inProgress: filtered.filter((r) => r.status === "In Progress").length,
      high: filtered.filter((r) => r.priority === "High").length,
      medium: filtered.filter((r) => r.priority === "Medium").length,
      low: filtered.filter((r) => r.priority === "Low").length,
    };
  };

  const analyticsData = getFilteredAnalyticsData();
  const totalWorkers = mockWorkers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-slate-700">सफ़Eye</span>
            <span className="ml-4 text-lg text-gray-600">
              Zonal Head Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "reports"
                  ? "bg-[#2e7d32] text-white"
                  : "text-gray-700 hover:text-[#2e7d32]"
              }`}
            >
              <MapPin className="h-5 w-5" />
              <span>Reports</span>
            </button>
            <button
              onClick={() => setActiveTab("workers")}
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "workers"
                  ? "bg-[#2e7d32] text-white"
                  : "text-gray-700 hover:text-[#2e7d32]"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Workers</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "analytics"
                  ? "bg-[#2e7d32] text-white"
                  : "text-gray-700 hover:text-[#2e7d32]"
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analytics</span>
            </button>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Reports Dashboard
            </h1>

            {/* Search and Filters */}
            <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search reports by location, ID, or worker..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                {/* Type Filter */}
                <select
                  value={reportTypeFilter}
                  onChange={(e) => setReportTypeFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                >
                  <option value="all">All Types</option>
                  <option value="pothole">Pothole</option>
                  <option value="trash">Trash</option>
                  <option value="streetlight">Street Light</option>
                </select>

                {/* Status Filter */}
                <select
                  value={reportStatusFilter}
                  onChange={(e) => setReportStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                {/* Priority Filter */}
                <select
                  value={reportPriorityFilter}
                  onChange={(e) => setReportPriorityFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Filter summary */}
              <div className="mt-3 text-sm text-gray-600">
                Showing {filteredReports.length} of {mockReports.length} reports
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Worker
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Priority
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => {
                      const typeInfo = getWorkerTypeInfo(report.type);
                      const TypeIcon = typeInfo.icon;

                      return (
                        <tr
                          key={report.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                            {report.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <TypeIcon
                                className={`w-4 h-4 ${typeInfo.color}`}
                              />
                              <span className="text-sm capitalize">
                                {typeInfo.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`https://www.google.com/maps?q=${report.coordinates.lat},${report.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2 text-sm"
                            >
                              {report.location}
                              <MapPin className="h-3 w-3" />
                            </a>
                          </td>
                          <td className="px-6 py-4 text-gray-700 text-sm">
                            {report.assignedWorker}
                          </td>
                          <td className="px-6 py-4 text-gray-700 text-sm">
                            {report.timestamp}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                report.priority
                              )}`}
                            >
                              {report.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                                report.status
                              )}`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium gap-2 border border-blue-200">
                              <Eye className="h-3 w-3" />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === "workers" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Worker Management Dashboard
            </h1>

            {/* Search and Filter */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search workers by name..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex gap-2">
                {[
                  {
                    key: "all",
                    label: "All Workers",
                    icon: Users,
                  },
                  {
                    key: "pothole",
                    label: "Pothole",
                    icon: Construction,
                  },
                  {
                    key: "trash",
                    label: "Trash",
                    icon: Trash2,
                  },
                  {
                    key: "streetlight",
                    label: "Street Light",
                    icon: Lightbulb,
                  },
                ].map(({ key, label, icon: Icon }) => {
                  const typeInfo = getWorkerTypeInfo(key);
                  return (
                    <button
                      key={key}
                      onClick={() => setWorkerTypeFilter(key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        workerTypeFilter === key
                          ? `${typeInfo.bgColor} ${typeInfo.color} border-current`
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Worker Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredWorkers.map((worker) => {
                const typeInfo = getWorkerTypeInfo(worker.type);
                const TypeIcon = typeInfo.icon;

                return (
                  <div
                    key={worker.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Worker Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full ${typeInfo.bgColor} flex items-center justify-center`}
                        >
                          <TypeIcon className={`w-6 h-6 ${typeInfo.color}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">
                            {worker.name}
                          </h2>
                          <p className="text-gray-600">
                            ID: {worker.id} | {typeInfo.label} Worker
                          </p>
                          <p className="text-gray-600">
                            Vehicle: {worker.vehicleNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                          <span className="text-blue-900 text-sm">
                            Total Resolved
                          </span>
                        </div>
                        <span className="text-blue-600 font-semibold">
                          {worker.historicalData.totalResolved}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-green-900 text-sm">
                            Efficiency
                          </span>
                        </div>
                        <span className="text-green-600 font-semibold">
                          {worker.historicalData.monthlyEfficiency}
                        </span>
                      </div>
                    </div>

                    {/* Current Assignments */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Current Assignments
                      </h3>
                      <div className="space-y-3">
                        {(expandedWorkers.includes(worker.id)
                          ? worker.assignedReports
                          : worker.assignedReports.slice(0, 2)
                        ).map((report) => (
                          <div
                            key={report.id}
                            className="flex justify-between bg-gray-50 items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-100 shadow-sm"
                          >
                            <div>
                              <p className="text-gray-700 font-medium">
                                {report.location}
                              </p>
                              <p className="text-sm text-gray-600">
                                {report.reportedOn}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
                                report.status
                              )}`}
                            >
                              {report.status}
                            </span>
                          </div>
                        ))}
                        {worker.assignedReports.length > 2 && (
                          <button
                            onClick={() => toggleWorkerExpansion(worker.id)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            {expandedWorkers.includes(worker.id)
                              ? "Show less"
                              : `Show ${
                                  worker.assignedReports.length - 2
                                } more reports...`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Analytics Dashboard
              </h1>

              {/* Analytics Type Filter */}
              <select
                value={analyticsTypeFilter}
                onChange={(e) => setAnalyticsTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
              >
                <option value="all">All Types</option>
                <option value="pothole">Pothole Reports</option>
                <option value="trash">Trash Reports</option>
                <option value="streetlight">Street Light Reports</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Worker Performance Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Worker Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#E5E5E5] rounded-lg text-md font-bold text-gray-600 border border-gray-200 shadow-sm">
                    <span>Worker Name</span>
                    <span>Pending Reports</span>
                  </div>
                  {[...mockWorkers]
                    .sort(
                      (a, b) =>
                        b.assignedReports.filter(
                          (report) => report.status === "pending"
                        ).length -
                        a.assignedReports.filter(
                          (report) => report.status === "pending"
                        ).length
                    )
                    .slice(0, 5)
                    .map((worker) => {
                      const typeInfo = getWorkerTypeInfo(worker.type);
                      const TypeIcon = typeInfo.icon;

                      return (
                        <div
                          key={worker.id}
                          className="flex justify-between bg-gray-50 items-center p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-100 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <TypeIcon className={`w-4 h-4 ${typeInfo.color}`} />
                            <span className="text-gray-700 font-medium">
                              {worker.name}
                            </span>
                          </div>
                          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                            {
                              worker.assignedReports.filter(
                                (report) => report.status === "pending"
                              ).length
                            }
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Statistics Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {analyticsTypeFilter === "all"
                    ? "All Reports"
                    : getWorkerTypeInfo(analyticsTypeFilter).label +
                      " Reports"}{" "}
                  Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                      <span className="text-blue-900 font-semibold">
                        Total Reports
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold text-lg">
                      {analyticsData.total}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-900 font-semibold">
                        Resolved
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-lg">
                      {analyticsData.resolved}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-900 font-semibold">
                        In Progress
                      </span>
                    </div>
                    <span className="text-yellow-600 font-semibold text-lg">
                      {analyticsData.inProgress}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-900 font-semibold">
                        Pending
                      </span>
                    </div>
                    <span className="text-red-600 font-semibold text-lg">
                      {analyticsData.pending}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-900 font-semibold">
                        Active Workers
                      </span>
                    </div>
                    <span className="text-purple-600 font-semibold text-lg">
                      {totalWorkers}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Priority Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-900 font-medium">
                      High Priority
                    </span>
                    <span className="text-red-600 font-bold">
                      {analyticsData.high}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-900 font-medium">
                      Medium Priority
                    </span>
                    <span className="text-yellow-600 font-bold">
                      {analyticsData.medium}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-900 font-medium">
                      Low Priority
                    </span>
                    <span className="text-green-600 font-bold">
                      {analyticsData.low}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resolution Rate */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Resolution Rate
                </h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {analyticsData.total > 0
                      ? Math.round(
                          (analyticsData.resolved / analyticsData.total) * 100
                        )
                      : 0}
                    %
                  </div>
                  <p className="text-gray-600">Reports Resolved</p>
                  <div className="mt-4 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          analyticsData.total > 0
                            ? (analyticsData.resolved / analyticsData.total) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Average Response Time */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Avg Response Time
                </h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    2.4h
                  </div>
                  <p className="text-gray-600">Average Time to Resolution</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      24/7 Monitoring
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Report Density Map
                  {analyticsTypeFilter !== "all" && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({getWorkerTypeInfo(analyticsTypeFilter).label} Reports)
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <span className="text-sm text-gray-600">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <span className="text-sm text-gray-600">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    <span className="text-sm text-gray-600">Low</span>
                  </div>
                </div>
              </div>
              <div className="h-[500px] bg-gray-50 rounded-xl overflow-hidden">
                <iframe
                  src="/Maps/heatMap.html"
                  title="Heat Map"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
