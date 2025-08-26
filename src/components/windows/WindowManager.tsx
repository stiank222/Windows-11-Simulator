import { useState, useRef } from "react";
import { Minimize2, Maximize2, X, Minus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "./apps/FileExplorer";
import { Calculator } from "./apps/Calculator";
import { Settings } from "./apps/Settings";
import { Browser } from "./apps/Browser";

interface Window {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowManagerProps {
  windows: Window[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onRestore: (id: string) => void;
}

export const WindowManager = ({ windows, onClose, onMinimize, onMaximize }: WindowManagerProps) => {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    windowId: string | null;
    offset: { x: number; y: number };
  }>({ isDragging: false, windowId: null, offset: { x: 0, y: 0 } });

  const windowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseDown = (e: React.MouseEvent, windowId: string, window: Window) => {
    if (window.isMaximized || window.isMinimized) return;
    
    const rect = windowRefs.current[windowId]?.getBoundingClientRect();
    if (!rect) return;

    setDragState({
      isDragging: true,
      windowId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.windowId) return;

    const windowElement = windowRefs.current[dragState.windowId];
    if (!windowElement) return;

    const newX = e.clientX - dragState.offset.x;
    const newY = Math.max(0, e.clientY - dragState.offset.y);

    windowElement.style.left = `${newX}px`;
    windowElement.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    setDragState({ isDragging: false, windowId: null, offset: { x: 0, y: 0 } });
  };

  // Add global event listeners
  useState(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const renderWindowContent = (component: string) => {
    switch (component) {
      case 'FileExplorer':
        return <FileExplorer />;
      case 'Calculator':
        return <Calculator />;
      case 'Settings':
        return <Settings />;
      case 'Browser':
        return <Browser />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">App content for {component}</p>
          </div>
        );
    }
  };

  return (
    <>
      {windows.map((window) => {
        if (window.isMinimized) return null;

        return (
          <div
            key={window.id}
            ref={(el) => (windowRefs.current[window.id] = el)}
            className={`fixed bg-background border border-border rounded-lg shadow-window overflow-hidden z-30 ${
              window.isMaximized ? 'inset-0' : ''
            }`}
            style={
              window.isMaximized
                ? {}
                : {
                    left: window.position.x,
                    top: window.position.y,
                    width: window.size.width,
                    height: window.size.height,
                  }
            }
          >
            {/* Title Bar */}
            <div
              className="h-8 bg-background border-b border-border flex items-center justify-between px-3 cursor-move"
              onMouseDown={(e) => handleMouseDown(e, window.id, window)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground truncate">
                  {window.title}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => onMinimize(window.id)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => onMaximize(window.id)}
                >
                  {window.isMaximized ? (
                    <Minimize2 className="w-3 h-3" />
                  ) : (
                    <Square className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onClose(window.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Window Content */}
            <div className="h-[calc(100%-32px)] overflow-auto">
              {renderWindowContent(window.component)}
            </div>
          </div>
        );
      })}
    </>
  );
};