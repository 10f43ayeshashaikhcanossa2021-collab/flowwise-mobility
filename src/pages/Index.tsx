import { Activity, Car, Clock, Network, Shield, TrendingDown, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { NetworkVisualization } from '@/components/NetworkVisualization';
import { MetricCard } from '@/components/MetricCard';
import { IntersectionSimulation } from '@/components/IntersectionSimulation';
import { StatusFeed } from '@/components/StatusFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute inset-0 data-grid opacity-30" />
        
        {/* Network visualization */}
        <div className="absolute inset-0">
          <NetworkVisualization />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Decentralized Traffic Management</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-gradient-primary">Intelligent</span>
            <br />
            <span className="text-foreground">Mobility Network</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Autonomous vehicles communicating in real-time to eliminate congestion, 
            reduce commute times by 30%, and maintain zero-accident protocols.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl">
              <Zap className="w-5 h-5" />
              Launch Control Center
            </Button>
            <Button variant="outline" size="xl">
              View Documentation
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-Time <span className="text-gradient-primary">Network Status</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Live metrics from our decentralized autonomous vehicle network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Active Vehicles"
              value={2847}
              subtitle="Connected to network"
              icon={Car}
              trend="up"
              trendValue="+12%"
              color="primary"
            />
            <MetricCard
              title="Commute Reduction"
              value="32%"
              subtitle="vs. traditional traffic"
              icon={TrendingDown}
              trend="up"
              trendValue="+2.1%"
              color="accent"
            />
            <MetricCard
              title="Safety Score"
              value="100%"
              subtitle="Zero accidents recorded"
              icon={Shield}
              color="accent"
            />
            <MetricCard
              title="Avg. Wait Time"
              value="4.2s"
              subtitle="At managed intersections"
              icon={Clock}
              trend="down"
              trendValue="-18%"
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Network className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Live Simulation</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Decentralized <span className="text-gradient-primary">Intersection Control</span>
              </h2>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Watch autonomous vehicles coordinate in real-time without traffic lights. 
                Each vehicle communicates its position, velocity, and intended path to 
                negotiate passage through intersections—eliminating unnecessary stops 
                while maintaining strict safety protocols.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">V2V Communication</p>
                    <p className="text-sm text-muted-foreground">Vehicle-to-vehicle mesh network</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Collision Avoidance</p>
                    <p className="text-sm text-muted-foreground">Multi-layer safety protocols</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Pedestrian Detection</p>
                    <p className="text-sm text-muted-foreground">AI-powered behavior prediction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <IntersectionSimulation />
            </div>
          </div>
        </div>
      </section>

      {/* Status Feed Section */}
      <section className="relative py-20 bg-gradient-to-t from-background to-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                System <span className="text-gradient-primary">Activity Feed</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Real-time events from the decentralized traffic management network. 
                Every decision, optimization, and safety check is logged and analyzed.
              </p>
              
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Live Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-mono text-muted-foreground">STREAMING</span>
                  </div>
                </div>
                <StatusFeed />
              </div>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-6">Key Challenge</h3>
              <div className="p-6 rounded-xl bg-warning/5 border border-warning/20 mb-6">
                <p className="text-lg italic text-foreground/90">
                  "Scalability to thousands of simultaneous agents and handling 
                  unpredictable pedestrian behavior."
                </p>
              </div>
              
              <h4 className="font-semibold mb-4 text-accent">Our Solution</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground text-sm">
                    Hierarchical agent architecture with local clusters and regional coordinators
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground text-sm">
                    Predictive AI models trained on millions of pedestrian behavior patterns
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground text-sm">
                    Edge computing nodes for sub-millisecond decision making
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground text-sm">
                    Graceful degradation protocols for network partition scenarios
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">NEXUS</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              DECENTRALIZED TRAFFIC CONTROL SYSTEM v2.4.1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
