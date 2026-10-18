import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Check,
  Filter,
  ExternalLink,
  Activity,
  Inbox,
  Vote,
  Clock,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import { MOCK_IC_NOTIFICATIONS, NotificationItem } from "../../data/mockData";

export const ICNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_IC_NOTIFICATIONS);
  const [filterType, setFilterType] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (filterType === "all") return true;
    if (filterType === "unread") return !n.read;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "report":
        return <Inbox className="w-4 h-4 text-[#DDA162]" />;
      case "pattern":
        return <Activity className="w-4 h-4 text-[#EBBA4A]" />;
      case "vote":
        return <Vote className="w-4 h-4 text-[#EBBA4A]" />;
      case "deadline":
        return <Clock className="w-4 h-4 text-[#EBBA4A]" />;
      case "training":
        return <GraduationCap className="w-4 h-4 text-[#DDA162]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#DDA162]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262E5F]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold">
            Alerts & Statutory Messages
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB] mt-1">
            Notification Centre
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-1">
            Critical updates across statutory deadlines, incoming reports, and member votes.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="px-4 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#EBBA4A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { key: "all", label: "All Alerts" },
          { key: "unread", label: "Unread" },
          { key: "report", label: "Reports" },
          { key: "pattern", label: "Patterns" },
          { key: "vote", label: "Pending Votes" },
          { key: "deadline", label: "Deadlines" },
          { key: "training", label: "Training" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilterType(tab.key)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              filterType === tab.key
                ? "bg-[#262E5F] border-[#DDA162] text-[#DDA162]"
                : "bg-[#0E1438] border-[#262E5F] text-[#A87C56] hover:bg-[#262E5F] hover:text-[#F4F1EB]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl divide-y divide-[#262E5F]/60 shadow-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#A87C56]">
            No notifications found under the selected filter.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !item.read ? "bg-[#11173D]" : "hover:bg-[#262E5F]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-[#0E1438] border border-[#262E5F] rounded-xl shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs text-[#F4F1EB]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#EBBA4A]" />
                    )}
                  </div>
                  <p className="text-xs text-[#A87C56] mt-1 leading-relaxed max-w-2xl">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-[#A87C56] mt-1.5 block font-mono">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <Link
                to={item.link}
                className="px-3.5 py-1.5 bg-[#0E1438] border border-[#262E5F] text-xs font-semibold text-[#DDA162] hover:bg-[#262E5F] hover:border-[#DDA162] rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
