import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Zap } from 'lucide-react';

interface StatusItem {
  id: number;
  type: 'success' | 'info' | 'warning' | 'action';
  message: string;
  timestamp: Date;
}

const statusMessages = {
  success: [
    'Vehicle AV-2847 cleared intersection safely',
    'Route optimization completed for sector 7',
    'Zero collision protocol verified',
    'Traffic flow restored in zone B4',
    'Emergency vehicle priority granted',
  ],
  info: [
    'Pedestrian detected at crosswalk 12',
    'Weather conditions updated: Clear',
    '847 autonomous vehicles connected',
    'Network latency: 12ms average',
    'New vehicle AV-3921 joined network',
  ],
  warning: [
    'High traffic density detected in zone A3',
    'Sensor calibration required for node 15',
    'Unusual pattern detected at intersection 7',
  ],
  action: [
    'Rerouting 23 vehicles to alternate path',
    'Adjusting signal timing for efficiency',
    'Initiating emergency protocol alpha',
    'Coordinating multi-vehicle maneuver',
  ],
};

export const StatusFeed = () => {
  const [items, setItems] = useState<StatusItem[]>([]);

  useEffect(() => {
    // Initialize with a few items
    const initialItems: StatusItem[] = [
      { id: 1, type: 'success', message: 'System initialized successfully', timestamp: new Date() },
      { id: 2, type: 'info', message: 'Connected to decentralized network', timestamp: new Date() },
    ];
    setItems(initialItems);

    // Add new items periodically
    const interval = setInterval(() => {
      const types: ('success' | 'info' | 'warning' | 'action')[] = ['success', 'info', 'warning', 'action'];
      const weights = [0.4, 0.35, 0.1, 0.15];
      const random = Math.random();
      let cumulative = 0;
      let selectedType: 'success' | 'info' | 'warning' | 'action' = 'info';
      
      for (let i = 0; i < weights.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
          selectedType = types[i];
          break;
        }
      }

      const messages = statusMessages[selectedType];
      const message = messages[Math.floor(Math.random() * messages.length)];

      setItems((prev) => [
        { id: Date.now(), type: selectedType, message, timestamp: new Date() },
        ...prev.slice(0, 7),
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: StatusItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-accent" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'action':
        return <Zap className="w-4 h-4 text-primary" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getBorderColor = (type: StatusItem['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-accent';
      case 'warning':
        return 'border-l-warning';
      case 'action':
        return 'border-l-primary';
      default:
        return 'border-l-muted';
    }
  };

  return (
    <div className="space-y-2 max-h-80 overflow-hidden">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`glass-panel p-3 border-l-2 ${getBorderColor(item.type)} animate-slide-in-right`}
          style={{ 
            animationDelay: `${index * 50}ms`,
            opacity: 1 - index * 0.1,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">{getIcon(item.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-tight">{item.message}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {item.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
