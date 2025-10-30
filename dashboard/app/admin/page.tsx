"use client";

import {
  MapPin,
  ChevronRight,
  Bell,
  Search,
  Construction,
  Trash2,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const reports = [
    {
      id: 1,
      location: "Lajpat Nagar, Delhi-110024",
      highlighted: false,
      type: "pothole",
      icon: Construction,
      color: "text-orange-600",
    },
    {
      id: 2,
      location: "Timarpur, Delhi-110007",
      highlighted: true,
      type: "trash",
      icon: Trash2,
      color: "text-green-600",
    },
    {
      id: 3,
      location: "Vijay Nagar, Delhi-110009",
      highlighted: false,
      type: "streetlight",
      icon: Lightbulb,
      color: "text-yellow-600",
    },
    {
      id: 4,
      location: "Kalyan Vihar, Delhi-110009",
      highlighted: true,
      type: "pothole",
      icon: Construction,
      color: "text-orange-600",
    },
    {
      id: 5,
      location: "Dwarka, Delhi-110075",
      highlighted: false,
      type: "trash",
      icon: Trash2,
      color: "text-green-600",
    },
    {
      id: 6,
      location: "Rohini, Delhi-110037",
      highlighted: true,
      type: "streetlight",
      icon: Lightbulb,
      color: "text-yellow-600",
    },
    {
      id: 7,
      location: "Central Secretariat, Delhi-110069",
      highlighted: false,
      type: "pothole",
      icon: Construction,
      color: "text-orange-600",
    },
  ];

  // Dummy report statistics
  const reportStats = {
    total: 147,
    invalid: 12,
    resolved: 89,
    pending: 46,
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "pothole":
        return "Pothole";
      case "trash":
        return "Trash";
      case "streetlight":
        return "Street Light";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-slate-700">सफ़Eye</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6 text-gray-700" />
            </button>
            <button className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Reports */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <div className="text-lg font-medium">
                  Total Reports: {reportStats.total}
                </div>
              </div>
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <div className="text-lg font-medium">
                  Invalid Reports: {reportStats.invalid}
                </div>
              </div>
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <div className="text-lg font-medium">
                  Resolved Reports: {reportStats.resolved}
                </div>
              </div>
              <div className="bg-green-600 rounded-2xl p-6 text-white">
                <div className="text-lg font-medium">
                  Pending Reports: {reportStats.pending}
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-2xl font-semibold">
                <span>Reports</span>
                <ChevronRight className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                {reports.map((report) => {
                  const IconComponent = report.icon;
                  return (
                    <div
                      key={report.id}
                      className={`${
                        report.highlighted ? "bg-green-100" : "bg-white"
                      } rounded-xl p-2 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent
                            className={`w-4 h-4 ${report.color}`}
                          />
                          <span
                            className={`text-xs font-medium ${report.color}`}
                          >
                            {getTypeLabel(report.type)}
                          </span>
                        </div>
                        <span className="text-gray-800 font-medium">
                          {report.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                          <span>Details</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Maps and Analytics */}
          <div className="space-y-6">
            {/* Hotspot Areas */}
            <div>
              <div className="space-y-4">
                {/* Map View 1 - Location Map */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm h-60">
                  <iframe
                    src="/Maps/locationMap.html"
                    className="w-full h-full border-0"
                    title="Location Map"
                  />
                </div>

                {/* Map View 2 - Heat Map */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm h-60">
                  <iframe
                    src="/Maps/heatMap.html"
                    className="w-full h-full border-0"
                    title="Heat Map"
                  />
                </div>
              </div>
            </div>

            {/* District Analytics */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg font-semibold transition-colors">
              District Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
