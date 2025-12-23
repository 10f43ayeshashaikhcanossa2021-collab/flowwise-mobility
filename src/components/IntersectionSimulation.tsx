import { useEffect, useRef, useState } from 'react';

interface Vehicle {
  id: number;
  x: number;
  y: number;
  direction: 'N' | 'S' | 'E' | 'W';
  speed: number;
  waiting: boolean;
  color: string;
}

export const IntersectionSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const vehiclesRef = useRef<Vehicle[]>([]);
  const [stats, setStats] = useState({ throughput: 0, avgWait: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const center = size / 2;
    const roadWidth = 60;
    const laneWidth = roadWidth / 2;

    // Initialize vehicles
    const spawnVehicle = (): Vehicle => {
      const directions: ('N' | 'S' | 'E' | 'W')[] = ['N', 'S', 'E', 'W'];
      const dir = directions[Math.floor(Math.random() * 4)];
      const colors = ['#00d4ff', '#22c55e', '#f59e0b', '#8b5cf6'];
      
      let x, y;
      switch (dir) {
        case 'N':
          x = center + laneWidth / 2;
          y = size + 20;
          break;
        case 'S':
          x = center - laneWidth / 2;
          y = -20;
          break;
        case 'E':
          x = -20;
          y = center + laneWidth / 2;
          break;
        case 'W':
          x = size + 20;
          y = center - laneWidth / 2;
          break;
      }

      return {
        id: Math.random(),
        x,
        y,
        direction: dir,
        speed: 2 + Math.random() * 1.5,
        waiting: false,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Spawn initial vehicles
    for (let i = 0; i < 8; i++) {
      vehiclesRef.current.push(spawnVehicle());
    }

    let throughputCount = 0;
    let lastThroughputUpdate = Date.now();

    const animate = () => {
      ctx.fillStyle = 'hsl(222, 47%, 6%)';
      ctx.fillRect(0, 0, size, size);

      // Draw grid overlay
      ctx.strokeStyle = 'hsla(222, 30%, 18%, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < size; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }

      // Draw roads
      ctx.fillStyle = 'hsl(222, 30%, 12%)';
      // Vertical road
      ctx.fillRect(center - roadWidth / 2, 0, roadWidth, size);
      // Horizontal road
      ctx.fillRect(0, center - roadWidth / 2, size, roadWidth);

      // Draw lane markings
      ctx.strokeStyle = 'hsla(186, 100%, 50%, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([15, 10]);
      
      // Vertical center line
      ctx.beginPath();
      ctx.moveTo(center, 0);
      ctx.lineTo(center, center - roadWidth / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(center, center + roadWidth / 2);
      ctx.lineTo(center, size);
      ctx.stroke();
      
      // Horizontal center line
      ctx.beginPath();
      ctx.moveTo(0, center);
      ctx.lineTo(center - roadWidth / 2, center);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(center + roadWidth / 2, center);
      ctx.lineTo(size, center);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw intersection zone with glow
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, roadWidth);
      gradient.addColorStop(0, 'hsla(160, 84%, 45%, 0.15)');
      gradient.addColorStop(1, 'hsla(160, 84%, 45%, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(center - roadWidth / 2, center - roadWidth / 2, roadWidth, roadWidth);

      // Draw intersection border
      ctx.strokeStyle = 'hsla(160, 84%, 45%, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(center - roadWidth / 2, center - roadWidth / 2, roadWidth, roadWidth);

      // Update and draw vehicles
      const intersectionZone = {
        x1: center - roadWidth / 2 - 30,
        x2: center + roadWidth / 2 + 30,
        y1: center - roadWidth / 2 - 30,
        y2: center + roadWidth / 2 + 30,
      };

      vehiclesRef.current.forEach((vehicle, index) => {
        // Check for collision avoidance
        let shouldWait = false;
        vehiclesRef.current.forEach((other, otherIndex) => {
          if (index === otherIndex) return;
          const dx = other.x - vehicle.x;
          const dy = other.y - vehicle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // If another vehicle is close and in the intersection
          if (dist < 40 && dist > 0) {
            const inIntersection = 
              other.x > intersectionZone.x1 && other.x < intersectionZone.x2 &&
              other.y > intersectionZone.y1 && other.y < intersectionZone.y2;
            
            if (inIntersection) {
              // Priority based on direction
              const priority = { N: 1, E: 2, S: 3, W: 4 };
              if (priority[vehicle.direction] > priority[other.direction]) {
                shouldWait = true;
              }
            }
          }
        });

        vehicle.waiting = shouldWait;
        const speed = shouldWait ? 0 : vehicle.speed;

        // Move vehicle
        switch (vehicle.direction) {
          case 'N':
            vehicle.y -= speed;
            break;
          case 'S':
            vehicle.y += speed;
            break;
          case 'E':
            vehicle.x += speed;
            break;
          case 'W':
            vehicle.x -= speed;
            break;
        }

        // Draw vehicle
        ctx.save();
        ctx.translate(vehicle.x, vehicle.y);
        
        // Vehicle glow
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
        glowGradient.addColorStop(0, vehicle.color + '40');
        glowGradient.addColorStop(1, vehicle.color + '00');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(-20, -20, 40, 40);

        // Vehicle body
        ctx.fillStyle = vehicle.color;
        ctx.beginPath();
        ctx.roundRect(-8, -12, 16, 24, 4);
        ctx.fill();

        // Communication indicator when waiting
        if (vehicle.waiting) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, -18, 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();

        // Remove and respawn vehicle if out of bounds
        if (vehicle.x < -30 || vehicle.x > size + 30 || vehicle.y < -30 || vehicle.y > size + 30) {
          vehiclesRef.current[index] = spawnVehicle();
          throughputCount++;
        }
      });

      // Update stats every second
      if (Date.now() - lastThroughputUpdate > 1000) {
        setStats({
          throughput: throughputCount,
          avgWait: vehiclesRef.current.filter(v => v.waiting).length,
        });
        throughputCount = 0;
        lastThroughputUpdate = Date.now();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <div className="glass-panel px-3 py-2 text-xs font-mono">
          <span className="text-muted-foreground">THROUGHPUT: </span>
          <span className="text-primary">{stats.throughput}/s</span>
        </div>
        <div className="glass-panel px-3 py-2 text-xs font-mono">
          <span className="text-muted-foreground">WAITING: </span>
          <span className="text-accent">{stats.avgWait}</span>
        </div>
      </div>
    </div>
  );
};
