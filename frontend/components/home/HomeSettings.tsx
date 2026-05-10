import { Settings } from "lucide-react";

function HomeSettings() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
      <Settings size={48} className="opacity-50" />
      <h2 className="text-2xl font-semibold text-foreground">
        System Settings
      </h2>
      <p>Configuration options will appear here.</p>
    </div>
  );
}

export default HomeSettings;
