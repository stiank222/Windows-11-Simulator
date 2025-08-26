import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Home, Star, MoreHorizontal, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Browser = () => {
  const [url, setUrl] = useState("https://www.microsoft.com");
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const bookmarks = [
    "Microsoft",
    "Office 365", 
    "Outlook",
    "Teams",
    "Azure"
  ];

  const quickAccess = [
    { name: "Microsoft", url: "microsoft.com", color: "bg-blue-500" },
    { name: "Office", url: "office.com", color: "bg-orange-500" },
    { name: "Outlook", url: "outlook.com", color: "bg-blue-600" },
    { name: "Teams", url: "teams.microsoft.com", color: "bg-purple-500" },
    { name: "OneDrive", url: "onedrive.com", color: "bg-blue-400" },
    { name: "LinkedIn", url: "linkedin.com", color: "bg-blue-700" },
    { name: "GitHub", url: "github.com", color: "bg-gray-800" },
    { name: "YouTube", url: "youtube.com", color: "bg-red-500" },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tab Bar */}
      <div className="h-10 bg-muted/30 border-b border-border flex items-center px-2">
        <div className="bg-background border border-border rounded-t-lg px-4 py-1 flex items-center space-x-2 max-w-xs">
          <div className="w-4 h-4 bg-windows-blue rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">M</span>
          </div>
          <span className="text-sm truncate">Microsoft - Official Home Page</span>
          <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-auto">
            ×
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
          +
        </Button>
      </div>

      {/* Navigation Bar */}
      <div className="h-12 bg-background border-b border-border flex items-center px-3 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={!canGoBack}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={!canGoForward}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Home className="w-4 h-4" />
        </Button>

        {/* Address Bar */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <Lock className="w-3 h-3 text-green-600" />
            <Shield className="w-3 h-3 text-muted-foreground" />
          </div>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 pr-10 bg-muted/50"
            placeholder="Search or enter web address"
          />
          <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0">
            <Star className="w-3 h-3" />
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-8 bg-muted/20 border-b border-border flex items-center px-3 space-x-4">
        {bookmarks.map((bookmark) => (
          <Button key={bookmark} variant="ghost" size="sm" className="h-6 text-xs">
            {bookmark}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-windows rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl font-bold">M</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Welcome to Microsoft Edge
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              The browser built for the modern web
            </p>
          </div>

          {/* Quick Access */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Access</h2>
            <div className="grid grid-cols-4 gap-4">
              {quickAccess.map((site) => (
                <div
                  key={site.name}
                  className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${site.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <span className="text-white font-bold text-lg">
                      {site.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground">{site.name}</h3>
                  <p className="text-sm text-muted-foreground">{site.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* News Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Top Stories</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  title: "Microsoft announces new Windows 11 features",
                  description: "Enhanced productivity and gaming capabilities coming soon",
                  time: "2 hours ago"
                },
                {
                  title: "Microsoft Teams gets new collaboration tools",
                  description: "Improved video calling and file sharing features",
                  time: "4 hours ago"
                },
                {
                  title: "Azure cloud services expand globally",
                  description: "New data centers opening in multiple regions",
                  time: "6 hours ago"
                }
              ].map((article, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-full h-32 bg-gradient-windows rounded-lg mb-3"></div>
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {article.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{article.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};