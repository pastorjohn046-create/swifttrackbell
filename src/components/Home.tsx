import { Link } from 'react-router-dom';
import { Package, ArrowRight, ShieldCheck, Clock, Globe, CheckCircle2, Plane, Truck, Bus, Ship, Star, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-24 py-6 sm:py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          initial={{ x: -100, y: '10%', opacity: 0 }}
          animate={{ x: '120vw', y: '15%', opacity: [0, 0.1, 0.1, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute text-primary/10"
        >
          <Plane className="w-16 h-16 rotate-12" />
        </motion.div>
        <motion.div
          initial={{ x: '110vw', y: '40%', opacity: 0 }}
          animate={{ x: -100, y: '45%', opacity: [0, 0.05, 0.05, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute text-secondary/10"
        >
          <Truck className="w-12 h-12" />
        </motion.div>
        <motion.div
          initial={{ x: -100, y: '70%', opacity: 0 }}
          animate={{ x: '120vw', y: '65%', opacity: [0, 0.08, 0.08, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute text-accent/10"
        >
          <Bus className="w-14 h-14" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 min-h-[60vh] sm:min-h-[70vh] relative">
        <div className="flex-1 flex flex-col gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Global Express Tracking
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-text"
          >
            Secure <span className="text-primary">Logistics</span> for the Modern World.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed"
          >
            SwiftTrack provides professional-grade tracking and management for your high-value consignments. Real-time updates, secure storage, and global reach.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-2 sm:mt-4"
          >
            <Link 
              to="/track" 
              className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
            >
              Track Shipment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
            >
              Get Started
            </Link>
          </motion.div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-2 sm:mt-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              <span>Global Network</span>
            </div>
          </div>
        </div>

        <div className="flex-1 relative block w-full lg:w-auto mt-12 lg:mt-0">
          {/* Moving Airplane */}
          <motion.div
            initial={{ x: -50, y: -30, opacity: 0 }}
            animate={{ x: [0, 150, 300], y: [-30, -60, -90], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -left-10 text-primary/20 pointer-events-none z-0"
          >
            <Plane className="w-16 h-16 sm:w-24 sm:h-24 rotate-45" />
          </motion.div>

          {/* Moving Truck/Bus */}
          <motion.div
            initial={{ x: 300, y: 150, opacity: 0 }}
            animate={{ x: [300, 50, -150], y: [150, 160, 170], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-0 -right-10 text-secondary/20 pointer-events-none z-0"
          >
            <Bus className="w-14 h-14 sm:w-20 sm:h-20" />
          </motion.div>

          <div className="relative z-10 card-modern p-6 sm:p-8 bg-white/50 backdrop-blur-xl border-white/20 shadow-2xl rotate-2 lg:rotate-3 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto lg:max-w-none">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Shipment #ST8291</h4>
                    <p className="text-sm text-muted">In Transit - London, UK</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase">Priority</span>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg rounded-xl border border-border">
                  <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">Origin</p>
                  <p className="font-bold">New York, US</p>
                </div>
                <div className="p-4 bg-bg rounded-xl border border-border">
                  <p className="text-xs text-muted uppercase font-bold tracking-widest mb-1">Destination</p>
                  <p className="font-bold">Tokyo, JP</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Quick Track Section */}
      <section className="flex flex-col gap-8 py-12 bg-bg/50 rounded-[3rem] border border-border p-8 sm:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-text">Quick <span className="text-primary">Track</span></h2>
          <p className="text-lg text-muted font-medium">Instantly check the status of your consignment without logging in.</p>
        </div>
        <div className="max-w-xl mx-auto w-full">
          <Link 
            to="/track" 
            className="group flex items-center justify-between p-6 bg-white rounded-3xl border-2 border-primary/10 hover:border-primary transition-all shadow-xl shadow-primary/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-text">Enter Tracking ID</span>
                <span className="text-xs text-muted font-bold uppercase tracking-widest">Real-time GPS Monitoring</span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16 py-12">
        <div className="flex-1 relative">
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="aspect-square bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20"
            >
              <Globe className="w-16 h-16 text-primary animate-pulse" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-square bg-secondary/10 rounded-3xl flex items-center justify-center border border-secondary/20 mt-8"
            >
              <ShieldCheck className="w-16 h-16 text-secondary" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="aspect-square bg-accent/10 rounded-3xl flex items-center justify-center border border-accent/20 -mt-8"
            >
              <Clock className="w-16 h-16 text-accent" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-square bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/10"
            >
              <Package className="w-16 h-16 text-primary/40" />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text">About <span className="text-primary">SwiftTrack</span></h2>
            <p className="text-xl text-muted leading-relaxed font-medium">
              Founded in 2010, SwiftTrack has grown from a local courier service to a global logistics powerhouse. We specialize in high-value, time-sensitive consignments that require more than just a delivery—they require a promise of security and precision.
            </p>
            <Link to="/about" className="btn-secondary self-start mt-4">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Our Mission</h4>
                <p className="text-muted text-sm">To provide the world's most secure and transparent logistics infrastructure for high-value goods.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Our Vision</h4>
                <p className="text-muted text-sm">A world where global trade is seamless, secure, and accessible to everyone, everywhere.</p>
              </div>
            </div>
          </div>
          <motion.div 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-border shadow-xl shadow-primary/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">Certified Global Partner</p>
              <p className="text-xs text-muted font-medium uppercase tracking-widest">ISO 9001:2015 & TAPA Certified</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-6 p-8 card-modern hover:-translate-y-2 transition-transform">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Secure Storage</h3>
          <p className="text-muted leading-relaxed">Your consignments are stored in high-security facilities with 24/7 monitoring and insurance coverage.</p>
        </div>
        <div className="flex flex-col gap-6 p-8 card-modern hover:-translate-y-2 transition-transform">
          <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Real-time Updates</h3>
          <p className="text-muted leading-relaxed">Get instant notifications and detailed logs of every movement in your shipment's journey.</p>
        </div>
        <div className="flex flex-col gap-6 p-8 card-modern hover:-translate-y-2 transition-transform">
          <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Global Network</h3>
          <p className="text-muted leading-relaxed">Our logistics network spans 150+ countries, ensuring your items reach their destination safely.</p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text">How it <span className="text-primary">Works</span></h2>
          <p className="text-xl text-muted">A simple, transparent process for all your logistics needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Book", desc: "Create a shipment request through our intuitive dashboard." },
            { step: "02", title: "Pickup", desc: "Our couriers collect your package from your preferred location." },
            { step: "03", title: "Transit", desc: "Monitor your package in real-time as it moves through our hubs." },
            { step: "04", title: "Deliver", desc: "Safe and secure delivery to the final destination." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 bg-bg rounded-3xl border border-border">
              <span className="text-4xl font-black text-primary/20">{item.step}</span>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-sm text-muted font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col gap-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text">Global <span className="text-secondary">Presence</span></h2>
          <p className="text-xl text-muted leading-relaxed">
            With major hubs in New York, London, Tokyo, and Dubai, we provide seamless logistics solutions across all continents. Our strategic partnerships allow us to navigate complex customs and local regulations with ease.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-text">150+</span>
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Countries Covered</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-text">24/7</span>
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Support Availability</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-text">99.9%</span>
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Delivery Success Rate</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-text">1M+</span>
              <span className="text-xs font-bold text-muted uppercase tracking-widest">Packages Delivered</span>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-[400px] bg-bg rounded-[3rem] border border-border relative overflow-hidden flex items-center justify-center">
          <Globe className="w-48 h-48 text-primary/10 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Decorative dots representing cities */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-secondary rounded-full animate-ping delay-700"></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full animate-ping delay-1000"></div>
              <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-primary rounded-full animate-ping delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="flex flex-col gap-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-text">Trusted by <span className="text-primary">Thousands</span></h2>
            <p className="text-xl text-muted">Don't just take our word for it. Here's what our global partners and clients have to say.</p>
          </div>
          <Link to="/reviews" className="btn-secondary">
            View All 15 Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Robert Chen", role: "Logistics Director", text: "SwiftTrack has revolutionized how we manage our high-value electronics shipments. The real-time visibility is unmatched.", rating: 5 },
            { name: "Sarah Jenkins", role: "E-commerce Founder", text: "The most reliable logistics partner we've ever worked with. Their customer support is proactive and extremely helpful.", rating: 5 },
            { name: "Marcus Thorne", role: "Global Operations", text: "Security was our main concern for luxury goods. SwiftTrack's secure storage and tracking gave us complete peace of mind.", rating: 5 },
            { name: "Elena Rodriguez", role: "Supply Chain Manager", text: "The dashboard is incredibly intuitive. I can manage hundreds of shipments across continents with just a few clicks.", rating: 5 },
            { name: "David Kim", role: "Tech CEO", text: "Fast, secure, and professional. SwiftTrack is our go-to for all international hardware deliveries.", rating: 5 },
            { name: "Aisha Al-Fayed", role: "Import/Export Specialist", text: "Navigating customs used to be a nightmare. With SwiftTrack, it's handled automatically. Truly a game-changer.", rating: 5 },
            { name: "Thomas Müller", role: "Manufacturing Lead", text: "Precision is key in our industry. SwiftTrack's time-sensitive delivery has never let us down.", rating: 5 },
            { name: "Linda Wu", role: "Retail Chain Owner", text: "The cost-to-value ratio is excellent. We've seen a significant drop in lost consignments since switching.", rating: 5 },
            { name: "James Wilson", role: "Art Gallery Curator", text: "Shipping priceless art requires extreme care. SwiftTrack's specialized handling is the best in the business.", rating: 5 },
            { name: "Sofia Conti", role: "Fashion Designer", text: "Getting our collections to global runways on time is critical. SwiftTrack is our most trusted partner.", rating: 5 },
            { name: "Kevin O'Brien", role: "Pharma Logistics", text: "Temperature-controlled and secure. They handle our sensitive medical supplies with the utmost professionalism.", rating: 5 },
            { name: "Yuki Tanaka", role: "Automotive Parts Dist.", text: "The tracking updates are so detailed, we always know exactly where our parts are in the supply chain.", rating: 5 },
            { name: "Isabella Silva", role: "Wine Exporter", text: "Fragile goods are safe in their hands. We've shipped thousands of cases with zero breakage.", rating: 5 },
            { name: "Ahmed Hassan", role: "Tech Distributor", text: "Their global network is truly impressive. Even the most remote locations are reachable with SwiftTrack.", rating: 5 },
            { name: "Chloe Bennett", role: "Jewelry Designer", text: "The insurance and security protocols they have in place are top-notch. I wouldn't trust anyone else with my pieces.", rating: 5 }
          ].map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              className="card-modern p-8 bg-white flex flex-col gap-6 hover:shadow-2xl hover:shadow-primary/10 transition-all group"
            >
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                ))}
              </div>
              <p className="text-lg font-medium text-text leading-relaxed italic">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
                  {review.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text">{review.name}</span>
                  <span className="text-xs text-muted font-bold uppercase tracking-widest">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-16 flex flex-col items-center text-center gap-6 sm:gap-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white leading-tight max-w-3xl">
            Ready to ship with confidence?
          </h2>
          <p className="text-white/80 text-lg sm:text-xl max-w-xl">
            Join thousands of businesses worldwide who trust SwiftTrack for their high-value logistics.
          </p>
          <Link 
            to="/login" 
            className="bg-white text-primary px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl hover:bg-bg transition-colors shadow-xl w-full sm:w-auto"
          >
            Create Your Account
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </section>
    </div>

  );
}
