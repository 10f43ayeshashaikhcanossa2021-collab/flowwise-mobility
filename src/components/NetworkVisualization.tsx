import { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'vehicle' | 'intersection';
}

interface Connection {
  from: number;
  to: number;
  active: boolean;
}

export const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const initialNodes: Node[] = [];
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Create intersection nodes (fixed positions)
    for (let i = 0; i < 5; i++) {
      initialNodes.push({
        id: i,
        x: 100 + (width - 200) * (i / 4),
        y: height / 2 + Math.sin(i * 0.8) * 80,
        vx: 0,
        vy: 0,
        type: 'intersection',
      });
    }

    // Create vehicle nodes (moving)
    for (let i = 5; i < 25; i++) {
      initialNodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: 'vehicle',
      });
    }

    setNodes(initialNodes);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update vehicle positions
      initialNodes.forEach((node) => {
        if (node.type === 'vehicle') {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 20 || node.x > canvas.offsetWidth - 20) node.vx *= -1;
          if (node.y < 20 || node.y > canvas.offsetHeight - 20) node.vy *= -1;

          // Keep in bounds
          node.x = Math.max(20, Math.min(canvas.offsetWidth - 20, node.x));
          node.y = Math.max(20, Math.min(canvas.offsetHeight - 20, node.y));
        }
      });

      // Draw connections
      initialNodes.forEach((node1) => {
        initialNodes.forEach((node2) => {
          if (node1.id >= node2.id) return;
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.6;
            const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
            
            if (node1.type === 'intersection' || node2.type === 'intersection') {
              gradient.addColorStop(0, `hsla(186, 100%, 50%, ${opacity})`);
              gradient.addColorStop(1, `hsla(160, 84%, 45%, ${opacity})`);
            } else {
              gradient.addColorStop(0, `hsla(186, 100%, 50%, ${opacity * 0.5})`);
              gradient.addColorStop(1, `hsla(186, 100%, 50%, ${opacity * 0.5})`);
            }

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = node1.type === 'intersection' || node2.type === 'intersection' ? 2 : 1;
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();

            // Animated data packets
            if (dist < 100 && (node1.type === 'intersection' || node2.type === 'intersection')) {
              const packetPos = ((time * 2) % 1);
              const px = node1.x + dx * packetPos;
              const py = node1.y + dy * packetPos;

              ctx.beginPath();
              ctx.fillStyle = 'hsla(186, 100%, 60%, 0.9)';
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Draw nodes
      initialNodes.forEach((node) => {
        ctx.beginPath();
        
        if (node.type === 'intersection') {
          // Intersection - larger, pulsing glow
          const pulseScale = 1 + Math.sin(time * 3 + node.id) * 0.15;
          const radius = 12 * pulseScale;
          
          // Outer glow
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 3);
          gradient.addColorStop(0, 'hsla(160, 84%, 45%, 0.4)');
          gradient.addColorStop(1, 'hsla(160, 84%, 45%, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.fillStyle = 'hsl(160, 84%, 45%)';
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Inner highlight
          ctx.beginPath();
          ctx.fillStyle = 'hsla(160, 84%, 70%, 0.8)';
          ctx.arc(node.x - 3, node.y - 3, radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Vehicle - smaller, cyan
          const radius = 5;
          
          // Glow
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
          gradient.addColorStop(0, 'hsla(186, 100%, 50%, 0.6)');
          gradient.addColorStop(1, 'hsla(186, 100%, 50%, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.fillStyle = 'hsl(186, 100%, 50%)';
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};
