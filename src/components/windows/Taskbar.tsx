import { useState } from "react";
import { Search, Wifi, Volume2, Battery, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskbarProps {
  onStartClick: () => void;
  onWidgetsClick: () => void;
  openWindows: Array<{
    id: string;
    title: string;
    isMinimized: boolean;
  }>;
  onWindowRestore: (id: string) => void;
  onOpenWindow: (windowData: { title: string; component: string }) => void;
  isStartMenuOpen: boolean;
  isWidgetsOpen: boolean;
}

export const Taskbar = ({
  onStartClick,
  onWidgetsClick,
  openWindows,
  onWindowRestore,
  onOpenWindow,
  isStartMenuOpen,
  isWidgetsOpen
}: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const pinnedApps = [
    { name: "File Explorer", icon: "📁", component: "FileExplorer" },
    { name: "Microsoft Edge", icon: "🌐", component: "Browser" },
    { name: "Calculator", icon: "🧮", component: "Calculator" },
    { name: "Settings", icon: "⚙️", component: "Settings" },
    { name: "Store", icon: "🛍️", component: "Store" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-taskbar backdrop-blur-xl border-t border-white/10 shadow-taskbar z-50">
      <div className="flex items-center h-full px-2">
        {/* Start Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-10 w-12 p-0 text-white hover:bg-taskbar-hover rounded-lg transition-colors ${
            isStartMenuOpen ? 'bg-taskbar-hover' : ''
          }`}
          onClick={onStartClick}
        >
          <div className="w-6 h-6 bg-gradient-windows rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">⊞</span>
          </div>
        </Button>

        {/* Search */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-3 text-white hover:bg-taskbar-hover rounded-lg ml-1 transition-colors flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm hidden sm:block">Type here to search</span>
        </Button>

        {/* Task View */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 text-white hover:bg-taskbar-hover rounded-lg ml-1 transition-colors"
        >
          <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
            <div className="bg-white rounded-sm"></div>
          </div>
        </Button>

        {/* Widgets */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-10 w-10 p-0 text-white hover:bg-taskbar-hover rounded-lg ml-1 transition-colors ${
            isWidgetsOpen ? 'bg-taskbar-hover' : ''
          }`}
          onClick={onWidgetsClick}
        >
          <div className="w-4 h-4 bg-gradient-windows rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">W</span>
          </div>
        </Button>

        {/* Pinned Apps */}
        <div className="flex ml-2 space-x-1">
          {pinnedApps.map((app) => (
            <Button
              key={app.name}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-white hover:bg-taskbar-hover rounded-lg transition-colors"
              onClick={() => onOpenWindow({ title: app.name, component: app.component })}
            >
              <span className="text-lg">{app.icon}</span>
            </Button>
          ))}
        </div>

        {/* Open Windows */}
        <div className="flex ml-2 space-x-1">
          {openWindows.map((window) => (
            <Button
              key={window.id}
              variant="ghost"
              size="sm"
              className={`h-10 px-3 text-white hover:bg-taskbar-hover rounded-lg transition-colors flex items-center ${
                window.isMinimized ? 'bg-taskbar-hover/50' : 'bg-taskbar-hover'
              }`}
              onClick={() => onWindowRestore(window.id)}
            >
              <span className="text-sm truncate max-w-[120px]">{window.title}</span>
            </Button>
          ))}
        </div>

        {/* Right Side - System Icons */}
        <div className="ml-auto flex items-center space-x-1">
          {/* Teams Chat */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-white hover:bg-taskbar-hover rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>

          {/* System Icons */}
          <div className="flex items-center space-x-2 text-white px-2">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>

          {/* Date and Time */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-2 text-white hover:bg-taskbar-hover rounded-lg transition-colors text-right"
          >
            <div className="flex flex-col text-xs leading-tight">
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </Button>

          {/* Notification Center */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-white hover:bg-taskbar-hover rounded-lg transition-colors"
          >
            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};