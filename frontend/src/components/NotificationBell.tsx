import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Check, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MOCK_IC_NOTIFICATIONS, MOCK_HR_NOTIFICATIONS, NotificationItem } from "../data/mockData";

export const NotificationBell: React.FC = () => {
  const { isIC } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    isIC ? MOCK_IC_NOTIFICATIONS : MOCK_HR_NOTIFICATIONS
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotifications(isIC ? MOCK_IC_NOTIFICATIONS : MOCK_HR_NOTIFICATIONS);
  }, [isIC]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const destinationAll = isIC ? "/ic/notifications" : "/hr/notifications";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#A87C56] hover:text-[#DDA162] transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#EBBA4A] text-[#0A0E28] text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#2C3259] border border-[#304A78] shadow-2xl z-50 text-[#F4F1EB] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#304A78] bg-[#0A0E28]">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-[#304A78] text-[#DDA162] px-1.5 py-0.5 font-mono">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-[#DDA162] hover:text-[#EBBA4A] flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Mark read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[#304A78]/50">
            {notifications.slice(0, 5).map((n) => (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => setIsOpen(false)}
                className={`block p-3 hover:bg-[#304A78]/40 transition-colors ${
                  !n.read ? "bg-[#304A78]/20" : ""
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-semibold ${!n.read ? "text-[#EBBA4A]" : "text-[#F4F1EB]"}`}>
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[#A87C56]">{n.timestamp}</span>
                </div>
                <p className="text-xs text-[#A87C56] line-clamp-2 leading-relaxed">{n.message}</p>
              </Link>
            ))}
          </div>

          <div className="px-4 py-2.5 border-t border-[#304A78] bg-[#0A0E28] text-center">
            <Link
              to={destinationAll}
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#DDA162] hover:text-[#EBBA4A] font-semibold inline-flex items-center gap-1"
            >
              View all notifications <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
