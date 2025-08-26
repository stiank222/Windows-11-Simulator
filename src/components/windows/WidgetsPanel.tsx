import { Calendar, Cloud, TrendingUp, Clock, MapPin, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WidgetsPanelProps {
  onClose: () => void;
}

export const WidgetsPanel = ({ onClose }: WidgetsPanelProps) => {
  const currentDate = new Date();
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Widgets Panel */}
      <div className="fixed bottom-14 left-16 w-96 h-[600px] bg-gradient-acrylic backdrop-blur-xl border border-acrylic-border rounded-xl shadow-start z-50 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Widgets</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Widgets Content */}
        <div className="p-4 space-y-4 h-[calc(100%-80px)] overflow-y-auto">
          {/* Weather Widget */}
          <Card className="p-4 bg-gradient-windows text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">New York, NY</span>
                </div>
                <div className="text-3xl font-bold">22°C</div>
                <div className="text-sm opacity-90">Partly Cloudy</div>
              </div>
              <Cloud className="w-12 h-12 opacity-80" />
            </div>
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3" />
                <span>18°/25°</span>
              </div>
              <div>Humidity: 65%</div>
            </div>
          </Card>

          {/* Calendar Widget */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-windows-blue" />
              <h3 className="font-semibold text-foreground">Today</h3>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-3 h-3 text-windows-blue" />
                <span className="text-foreground">Team Meeting - 2:00 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-3 h-3 text-windows-blue" />
                <span className="text-foreground">Project Review - 4:30 PM</span>
              </div>
            </div>
          </Card>

          {/* News Widget */}
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-windows-blue" />
              <h3 className="font-semibold text-foreground">News</h3>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-windows-blue pl-3">
                <h4 className="text-sm font-medium text-foreground">
                  Microsoft announces new features for Windows 11
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Enhanced productivity tools coming this fall
                </p>
              </div>
              <div className="border-l-2 border-gray-300 pl-3">
                <h4 className="text-sm font-medium text-foreground">
                  Tech industry sees record growth
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Market analysis shows positive trends
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                📷 Screenshot
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                🎵 Music
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                📝 Note
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                🔊 Volume
              </Button>
            </div>
          </Card>

          {/* System Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">System</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU Usage</span>
                <span className="text-foreground">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Memory</span>
                <span className="text-foreground">8.2 GB / 16 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span className="text-foreground">245 GB / 512 GB</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};