import React from 'react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Clock, Package, CheckCircle2, Plane, Truck, Bus } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 animate-fade-in py-8">
      {/* Hero Section */}
      <section className="text-center flex flex-col gap-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-7xl font-black tracking-tight text-text"
        >
          Our Story. Our <span className="text-primary">Mission</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-muted leading-relaxed"
        >
          SwiftTrack was founded with a single goal: to bring transparency and security to the global logistics industry. Today, we handle thousands of high-value consignments daily across 150+ countries.
        </motion.p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Founded", value: "2010" },
          { label: "Global Hubs", value: "24" },
          { label: "Countries", value: "150+" },
          { label: "Packages", value: "1M+" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="card-modern p-6 text-center flex flex-col gap-1"
          >
            <span className="text-3xl font-black text-primary">{stat.value}</span>
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Detailed Content */}
      <section className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-text">Why <span className="text-secondary">SwiftTrack</span>?</h2>
            <p className="text-lg text-muted leading-relaxed">
              In an era of global uncertainty, the security of your high-value items is paramount. We don't just move boxes; we manage assets. Our infrastructure is built on 256-bit encryption, 24/7 physical monitoring, and a network of certified global partners.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold">TAPA Certified</h4>
                <p className="text-xs text-muted">Highest security standards in the industry.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm">
              <Globe className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-bold">Global Reach</h4>
                <p className="text-xs text-muted">Seamless delivery to even the most remote locations.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="aspect-video bg-bg rounded-[2rem] border border-border relative overflow-hidden flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-primary/10"
            >
              <Globe className="w-48 h-48" />
            </motion.div>
            {/* Moving Elements */}
            <motion.div
              initial={{ x: -100, y: -50 }}
              animate={{ x: 100, y: 50 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute text-primary"
            >
              <Plane className="w-12 h-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="flex flex-col gap-12">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-center">Our Core <span className="text-accent">Values</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck />, title: "Integrity", desc: "We operate with absolute transparency in every transaction." },
            { icon: <Clock />, title: "Precision", desc: "Every second counts. We optimize for speed without compromising safety." },
            { icon: <Package />, title: "Care", desc: "We treat every consignment as if it were our own." }
          ].map((value, i) => (
            <div key={i} className="card-modern p-8 flex flex-col gap-4 text-center items-center">
              <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center text-primary">
                {React.cloneElement(value.icon as React.ReactElement, { className: "w-8 h-8" })}
              </div>
              <h4 className="text-xl font-bold">{value.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
