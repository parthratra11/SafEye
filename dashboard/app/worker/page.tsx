"use client";
import React, { useState } from "react";
import {
  Search,
  Lightbulb,
  Construction,
  Trash2,
  MapPin,
  ExternalLink,
  Eye,
  X,
} from "lucide-react";
import Link from "next/link";

export default function WorkerDashboard() {
  // Mock worker data - this would come from auth/API in real app
  const workerData = {
    name: "Amit Singh",
    workerId: "WRK-001",
    workerType: "pothole", // streetlight, pothole, or trash
    vehicleNumber: "DL-09-U-0911",
  };

  // Mock reports data with different types
  const [reportData, setReportData] = useState([
    {
      id: "PTH-001",
      location: "Lajpat Nagar, Delhi-110024",
      type: "pothole",
      timestamp: "2024-01-10 14:45",
      status: "Pending",
      coordinates: { lat: 28.6519, lng: 77.2315 },
      description: "Large pothole blocking traffic",
      imageUrl:
        "https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Large+Pothole",
    },
    {
      id: "PTH-002",
      location: "Timarpur, Delhi-110007",
      type: "pothole",
      timestamp: "2024-01-09 11:30",
      status: "Resolved",
      coordinates: { lat: 28.6753, lng: 77.235 },
      description: "Small potholes near bus stop",
      imageUrl:
        "https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Small+Potholes",
    },
    {
      id: "PTH-003",
      location: "Vijay Nagar, Delhi-110009",
      type: "pothole",
      timestamp: "2024-01-10 09:15",
      status: "Pending",
      coordinates: { lat: 28.6842, lng: 77.1845 },
      description: "Deep pothole causing accidents",
      imageUrl:
        "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Deep+Pothole",
    },
    {
      id: "PTH-004",
      location: "Kalyan Vihar, Delhi-110009",
      type: "pothole",
      timestamp: "2024-01-10 16:30",
      status: "Invalid",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      description: "Road crack, not a pothole",
      imageUrl:
        "https://via.placeholder.com/600x400/95a5a6/ffffff?text=Road+Crack",
    },
    {
      id: "PTH-005",
      location: "Dwarka, Delhi-110075",
      type: "pothole",
      timestamp: "2024-01-10 17:00",
      status: "Pending",
      coordinates: { lat: 28.5921, lng: 77.046 },
      description: "Multiple potholes in residential area",
      imageUrl:
        "https://via.placeholder.com/600x400/f39c12/ffffff?text=Multiple+Potholes",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const totalReports = reportData.length;
  const pendingReports = reportData.filter(
    (r) => r.status === "Pending"
  ).length;
  const resolvedReports = reportData.filter(
    (r) => r.status === "Resolved"
  ).length;
  const invalidReports = reportData.filter(
    (r) => r.status === "Invalid"
  ).length;

  const handleResolveReport = (id: string) => {
    setReportData(
      reportData.map((report) => {
        if (report.id === id) {
          return {
            ...report,
            status: report.status === "Resolved" ? "Pending" : "Resolved",
          };
        }
        return report;
      })
    );
  };

  const handleInvalidReport = (id: string) => {
    setReportData(
      reportData.map((report) => {
        if (report.id === id) {
          return {
            ...report,
            status: report.status === "Invalid" ? "Pending" : "Invalid",
          };
        }
        return report;
      })
    );
  };

  const handleViewImage = (report) => {
    setSelectedImage(report);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const filteredReports = reportData.filter((report) =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-50 text-red-900 border border-red-200";
      case "Resolved":
        return "bg-green-50 text-green-900 border border-green-200";
      case "Invalid":
        return "bg-gray-50 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const getWorkerTypeInfo = (type: string) => {
    switch (type) {
      case "streetlight":
        return {
          icon: Lightbulb,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          title: "Street Light Technician",
        };
      case "pothole":
        return {
          icon: Construction,
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          title: "Road Maintenance Worker",
        };
      case "trash":
        return {
          icon: Trash2,
          color: "text-green-600",
          bgColor: "bg-green-100",
          title: "Sanitation Worker",
        };
      default:
        return {
          icon: Construction,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          title: "General Worker",
        };
    }
  };

  const workerTypeInfo = getWorkerTypeInfo(workerData.workerType);
  const TypeIcon = workerTypeInfo.icon;

  // Stats array for mapping
  const stats = [
    { label: "Total Reports", value: totalReports },
    { label: "Pending Reports", value: pendingReports },
    { label: "Resolved Reports", value: resolvedReports },
    { label: "Invalid Reports", value: invalidReports },
  ];

  // Headers array for table
  const headers = [
    "ID",
    "Type",
    "Location",
    "Timestamp",
    "Status",
    "Description",
    "View Image",
    "Mark Resolved",
    "Mark Invalid",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold text-slate-700">सफ़Eye</span>
          </Link>

          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-2 bg-[#2e7d32] text-white rounded-lg hover:bg-[#1b5e20] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Left Section - 2/3 width */}
        <div className="w-2/3 p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div
                className={`h-20 w-20 rounded-full ${workerTypeInfo.bgColor} flex items-center justify-center shadow-lg`}
              >
                <TypeIcon className={`w-10 h-10 ${workerTypeInfo.color}`} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#4b5563] drop-shadow-sm">
                  {workerData.name}
                </h1>
                <p className="text-lg text-[#4b5563] mt-1">
                  {workerTypeInfo.title}
                </p>
                <p className="text-md text-gray-600">
                  ID: {workerData.workerId} | Vehicle:{" "}
                  {workerData.vehicleNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#2e7d32] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:scale-105 transform"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {stat.label}:
                  </h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-[#1b5e20] mb-6">
                Assigned Pothole Reports Dashboard
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-4 text-left text-sm font-semibold text-gray-800"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => {
                      const typeInfo = getWorkerTypeInfo(report.type);
                      const ReportTypeIcon = typeInfo.icon;

                      return (
                        <tr
                          key={report.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4 text-gray-700 font-mono text-sm">
                            {report.id}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <ReportTypeIcon
                                className={`w-4 h-4 ${typeInfo.color}`}
                              />
                              <span className="text-sm capitalize">
                                {report.type}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <a
                              href={`https://www.google.com/maps?q=${report.coordinates.lat},${report.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2 text-sm"
                            >
                              {report.location}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                          <td className="px-4 py-4 text-gray-700 text-sm">
                            {report.timestamp}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusColor(
                                report.status
                              )}`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-gray-600 text-sm max-w-xs truncate">
                            {report.description}
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => handleViewImage(report)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={report.status === "Resolved"}
                              onChange={() => handleResolveReport(report.id)}
                              className="w-4 h-4 text-[#2e7d32] border-gray-300 rounded focus:ring-[#2e7d32]"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={report.status === "Invalid"}
                              onChange={() => handleInvalidReport(report.id)}
                              className="w-4 h-4 text-gray-500 border-gray-300 rounded focus:ring-gray-500"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="w-1/3 h-[calc(100vh-4rem)] sticky top-0">
          <div className="h-full p-4 bg-white shadow-lg rounded-lg m-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Assigned Routes
              </h3>
              <p className="text-sm text-gray-600">
                Optimized repair routes and locations
              </p>
            </div>
            <iframe
              src="/Maps/route_map.html"
              width="100%"
              height="90%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Report Image - {selectedImage.id}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedImage.location}
                </p>
              </div>
              <button
                onClick={closeImageModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.imageUrl}
                alt={`Pothole report ${selectedImage.id}`}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
              />
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> {selectedImage.description}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Reported:</strong> {selectedImage.timestamp}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      selectedImage.status
                    )}`}
                  >
                    {selectedImage.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
