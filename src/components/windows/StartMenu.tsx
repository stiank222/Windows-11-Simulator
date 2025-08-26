import { useState } from "react";
import { Search, Power, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (windowData: { title: string; component: string }) => void;
}

export const StartMenu = ({ onClose, onOpenWindow }: StartMenuProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const pinnedApps = [
    { name: "Microsoft Edge", icon: "🌐", component: "Browser" },
    { name: "Word", icon: "📝", component: "Word" },
    { name: "Excel", icon: "📊", component: "Excel" },
    { name: "PowerPoint", icon: "📽️", component: "PowerPoint" },
    { name: "Outlook", icon: "📧", component: "Outlook" },
    { name: "Teams", icon: "👥", component: "Teams" },
    { name: "OneDrive", icon: "☁️", component: "OneDrive" },
    { name: "Photos", icon: "🖼️", component: "Photos" },
    { name: "Calculator", icon: "🧮", component: "Calculator" },
    { name: "Calendar", icon: "📅", component: "Calendar" },
    { name: "Mail", icon: "✉️", component: "Mail" },
    { name: "Store", icon: "🛍️", component: "Store" },
    { name: "Xbox", icon: "🎮", component: "Xbox" },
    { name: "Spotify", icon: "🎵", component: "Spotify" },
    { name: "Netflix", icon: "🎬", component: "Netflix" },
    { name: "WhatsApp", icon: "💬", component: "WhatsApp" }
  ];

  const recentFiles = [
    { name: "Project Presentation.pptx", app: "PowerPoint", time: "2 hours ago" },
    { name: "Budget 2024.xlsx", app: "Excel", time: "Yesterday" },
    { name: "Meeting Notes.docx", app: "Word", time: "3 days ago" }
  ];

  const filteredApps = pinnedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="fixed bottom-14 left-2 w-[600px] h-[650px] bg-gradient-acrylic backdrop-blur-xl border border-acrylic-border rounded-xl shadow-start z-50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Type here to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/60 border-border/30 rounded-lg"
            />
          </div>
        </div>

        <div className="flex h-[calc(100%-140px)]">
          {/* Left Side - Pinned Apps */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Pinned</h3>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                All apps
              </Button>
            </div>
            
            <div className="grid grid-cols-6 gap-3">
              {filteredApps.map((app) => (
                <Button
                  key={app.name}
                  variant="ghost"
                  className="h-16 w-16 p-0 flex flex-col items-center justify-center hover:bg-accent/50 rounded-lg transition-colors"
                  onClick={() => {
                    onOpenWindow({ title: app.name, component: app.component });
                    onClose();
                  }}
                >
                  <span className="text-2xl mb-1">{app.icon}</span>
                  <span className="text-xs text-foreground truncate w-full text-center">
                    {app.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Side - Recent Files */}
          <div className="w-64 bg-background/30 p-6 border-l border-border/20">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent</h3>
            
            <div className="space-y-3">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 hover:bg-accent/50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 bg-windows-blue rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">📄</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.app} • {file.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/60 border-t border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-windows-blue rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">User</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-accent/50 rounded-md transition-colors"
                onClick={() => {
                  onOpenWindow({ title: "Settings", component: "Settings" });
                  onClose();
                }}
              >
                <Settings className="w-4 h-4 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-accent/50 rounded-md transition-colors"
              >
                <Power className="w-4 h-4 text-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};