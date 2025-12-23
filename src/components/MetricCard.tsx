import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'primary' | 'accent' | 'warning';
  animate?: boolean;
}

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'primary',
  animate = true,
}: MetricCardProps) => {
  const [displayValue, setDisplayValue] = useState<string | number>(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number' && animate) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animate]);

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    warning: 'text-warning',
  };

  const glowClasses = {
    primary: 'shadow-primary/20',
    accent: 'shadow-accent/20',
    warning: 'shadow-warning/20',
  };

  const bgClasses = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    warning: 'bg-warning/10',
  };

  return (
    <div className={`glass-panel p-6 hover:shadow-lg ${glowClasses[color]} transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgClasses[color]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className={`metric-value ${colorClasses[color]}`} style={{ 
          background: color === 'accent' 
            ? 'linear-gradient(135deg, hsl(160, 84%, 45%), hsl(186, 100%, 50%))' 
            : color === 'warning'
            ? 'linear-gradient(135deg, hsl(38, 92%, 50%), hsl(45, 100%, 60%))'
            : 'linear-gradient(135deg, hsl(186, 100%, 50%), hsl(160, 84%, 45%))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {displayValue}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
