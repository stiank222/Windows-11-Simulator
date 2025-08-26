import { useState } from "react";
import wallpaper from "@/assets/windows11-wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { WidgetsPanel } from "./WidgetsPanel";
import { WindowManager } from "./WindowManager";

export const Desktop = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<Array<{
    id: string;
    title: string;
    component: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    isMaximized: boolean;
  }>>([]);

  const openWindow = (windowData: {
    title: string;
    component: string;
  }) => {
    const newWindow = {
      id: Date.now().toString(),
      ...windowData,
      position: { x: 100 + openWindows.length * 50, y: 100 + openWindows.length * 50 },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
    };
    setOpenWindows([...openWindows, newWindow]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(window => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(openWindows.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const maximizeWindow = (id: string) => {
    setOpenWindows(openWindows.map(window => 
      window.id === id ? { ...window, isMaximized: !window.isMaximized } : window
    ));
  };

  const restoreWindow = (id: string) => {
    setOpenWindows(openWindows.map(window => 
      window.id === id ? { ...window, isMinimized: false } : window
    ));
  };

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        {/* Recycle Bin */}
        <div className="flex flex-col items-center space-y-1 p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-windows-blue rounded-md flex items-center justify-center">
            <span className="text-white text-xs">🗑️</span>
          </div>
          <span className="text-white text-xs font-medium">Recycle Bin</span>
        </div>
      </div>

      {/* Window Manager */}
      <WindowManager
        windows={openWindows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        onRestore={restoreWindow}
      />

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu 
          onClose={() => setIsStartMenuOpen(false)}
          onOpenWindow={openWindow}
        />
      )}

      {/* Widgets Panel */}
      {isWidgetsOpen && (
        <WidgetsPanel onClose={() => setIsWidgetsOpen(false)} />
      )}

      {/* Taskbar */}
      <Taskbar
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWidgetsClick={() => setIsWidgetsOpen(!isWidgetsOpen)}
        openWindows={openWindows}
        onWindowRestore={restoreWindow}
        onOpenWindow={openWindow}
        isStartMenuOpen={isStartMenuOpen}
        isWidgetsOpen={isWidgetsOpen}
      />
    </div>
  );
};