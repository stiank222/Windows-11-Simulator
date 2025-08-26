import { useState } from "react";
import { Folder, File, ChevronRight, Home, Download, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified: string;
  icon?: string;
}

export const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState("This PC");
  
  const sidebarItems = [
    { name: "Quick access", icon: Star, active: false },
    { name: "Desktop", icon: Home, active: false },
    { name: "Downloads", icon: Download, active: false },
    { name: "Documents", icon: File, active: false },
    { name: "Pictures", icon: Folder, active: false },
    { name: "Music", icon: Folder, active: false },
    { name: "Videos", icon: Folder, active: false },
  ];

  const files: FileItem[] = [
    { name: "Documents", type: 'folder', modified: "2 days ago" },
    { name: "Pictures", type: 'folder', modified: "1 week ago" },
    { name: "Music", type: 'folder', modified: "3 days ago" },
    { name: "Videos", type: 'folder', modified: "5 days ago" },
    { name: "Downloads", type: 'folder', modified: "Today" },
    { name: "Project.docx", type: 'file', size: "245 KB", modified: "2 hours ago", icon: "📄" },
    { name: "Budget.xlsx", type: 'file', size: "89 KB", modified: "Yesterday", icon: "📊" },
    { name: "Presentation.pptx", type: 'file', size: "1.2 MB", modified: "3 days ago", icon: "📽️" },
    { name: "Photo.jpg", type: 'file', size: "2.8 MB", modified: "1 week ago", icon: "🖼️" },
  ];

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-muted/30 border-r border-border p-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-sm"
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            This PC
          </h4>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm">
              💿 Local Disk (C:)
            </Button>
            <Button variant="ghost" className="w-full justify-start h-8 px-2 text-sm">
              💿 Local Disk (D:)
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-background border-b border-border flex items-center px-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-foreground">{currentPath}</span>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="ghost" size="sm">View</Button>
            <Button variant="ghost" size="sm">Sort</Button>
            <Button variant="ghost" size="sm">Group</Button>
          </div>
        </div>

        {/* Address Bar */}
        <div className="h-10 bg-muted/20 border-b border-border flex items-center px-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="w-4 h-4 mr-1" />
            <span>This PC</span>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center p-2 hover:bg-accent/50 rounded cursor-pointer group"
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  {file.type === 'folder' ? (
                    <Folder className="w-6 h-6 text-windows-blue" />
                  ) : (
                    <span className="text-xl">{file.icon || "📄"}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                </div>
                <div className="w-20 text-xs text-muted-foreground text-right">
                  {file.size}
                </div>
                <div className="w-24 text-xs text-muted-foreground text-right">
                  {file.modified}
                </div>
                {file.type === 'folder' && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};