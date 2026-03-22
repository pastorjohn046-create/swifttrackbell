import React from 'react';
import { motion } from 'motion/react';
import { Star, Package, Globe, ShieldCheck, Clock } from 'lucide-react';

const reviews = [
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
];

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 animate-fade-in py-8">
      {/* Hero Section */}
      <section className="text-center flex flex-col gap-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-7xl font-black tracking-tight text-text"
        >
          Trusted by <span className="text-primary">Thousands</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-muted leading-relaxed"
        >
          Don't just take our word for it. Here's what our global partners and clients have to say about SwiftTrack's logistics solutions.
        </motion.p>
      </section>

      {/* Reviews Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
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
      </section>

      {/* Dynamic CTA Section */}
      <section className="bg-bg rounded-[3rem] border border-border p-8 sm:p-16 flex flex-col items-center text-center gap-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-text leading-tight max-w-3xl">
            Join our network of satisfied clients.
          </h2>
          <p className="text-muted text-lg sm:text-xl max-w-xl">
            Experience the SwiftTrack difference today. Secure, transparent, and global.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-12 py-5 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20"
          >
            Get Started Now
          </motion.button>
        </div>
        {/* Moving Elements */}
        <motion.div
          animate={{ x: [-100, 100], y: [-50, 50] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-0 right-0 text-primary/5"
        >
          <Package className="w-64 h-64" />
        </motion.div>
      </section>
    </div>
  );
}
