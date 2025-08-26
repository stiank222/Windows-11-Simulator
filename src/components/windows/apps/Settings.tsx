import { useState } from "react";
import { 
  Monitor, 
  Wifi, 
  Volume2, 
  Bluetooth, 
  Battery, 
  Shield, 
  Palette, 
  Bell,
  Globe,
  Gamepad2,
  Users,
  HardDrive,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

export const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState("System");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "System", icon: Monitor, items: ["Display", "Sound", "Notifications", "Power & battery"] },
    { name: "Bluetooth & devices", icon: Bluetooth, items: ["Bluetooth", "Printers & scanners", "Your phone"] },
    { name: "Network & internet", icon: Wifi, items: ["Wi-Fi", "Ethernet", "VPN", "Mobile hotspot"] },
    { name: "Personalization", icon: Palette, items: ["Background", "Colors", "Themes", "Start"] },
    { name: "Apps", icon: Gamepad2, items: ["Installed apps", "Default apps", "Startup apps"] },
    { name: "Accounts", icon: Users, items: ["Your info", "Email & accounts", "Sign-in options"] },
    { name: "Time & language", icon: Globe, items: ["Date & time", "Language & region", "Speech"] },
    { name: "Gaming", icon: Gamepad2, items: ["Xbox Game Bar", "Game Mode", "Captures"] },
    { name: "Accessibility", icon: Bell, items: ["Text", "Vision", "Hearing", "Interaction"] },
    { name: "Privacy & security", icon: Shield, items: ["Windows Security", "Find my device", "App permissions"] },
    { name: "Windows Update", icon: HardDrive, items: ["Update history", "Advanced options", "Optional updates"] },
  ];

  const selectedCat = categories.find(cat => cat.name === selectedCategory);

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Brightness</p>
              <p className="text-sm text-muted-foreground">Adjust screen brightness</p>
            </div>
            <div className="w-32 h-2 bg-muted rounded-full">
              <div className="w-20 h-2 bg-windows-blue rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Scale</p>
              <p className="text-sm text-muted-foreground">100% (Recommended)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resolution</p>
              <p className="text-sm text-muted-foreground">1920 x 1080 (Recommended)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Sound</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Master volume</p>
              <p className="text-sm text-muted-foreground">Speakers: 75%</p>
            </div>
            <Volume2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound effects</p>
              <p className="text-sm text-muted-foreground">Play Windows sounds</p>
            </div>
            <Switch checked />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Get notifications from apps and other senders</p>
            </div>
            <Switch checked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Focus assist</p>
              <p className="text-sm text-muted-foreground">Automatically hide notifications</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Power & battery</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Battery status</p>
              <p className="text-sm text-muted-foreground">85% - Charging</p>
            </div>
            <Battery className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Power mode</p>
              <p className="text-sm text-muted-foreground">Balanced</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-muted/20 border-r border-border p-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Find a setting"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "secondary" : "ghost"}
              className="w-full justify-start h-12 px-3"
              onClick={() => setSelectedCategory(category.name)}
            >
              <category.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">{selectedCategory}</h1>
            {selectedCat && (
              <div className="flex flex-wrap gap-2">
                {selectedCat.items.map((item) => (
                  <Button key={item} variant="outline" size="sm">
                    {item}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {selectedCategory === "System" && renderSystemSettings()}
          
          {selectedCategory !== "System" && (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                {selectedCat && <selectedCat.icon className="w-8 h-8 text-muted-foreground" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">{selectedCategory} Settings</h3>
              <p className="text-muted-foreground">
                {selectedCategory} settings would be displayed here in a real Windows 11 environment.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};