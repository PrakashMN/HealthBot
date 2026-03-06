import React from 'react';
import { ShieldCheck, Stethoscope, Syringe, HeartPulse, Activity, BellRing, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: ShieldCheck, title: "Multilingual Support", desc: "Native support for English, Hindi, Bengali, Kannada, and Odia with seamless switching." },
  { icon: Stethoscope, title: "Disease Symptom Checker", desc: "AI-powered analysis to provide preliminary health assessments and recommendations." },
  { icon: Syringe, title: "Vaccination Tracker", desc: "Personalized vaccination reminders for children and adults based on government schedules." },
  { icon: HeartPulse, title: "Preventive Care", desc: "Daily health tips and seasonal disease prevention advice tailored to regional challenges." },
  { icon: BellRing, title: "Outbreak Alerts", desc: "Real-time notifications about disease outbreaks and location-specific advisories." },
  { icon: PhoneCall, title: "Emergency Integration", desc: "Quick access to emergency services and nearby healthcare facilities." },
];

export function Features() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 dark:text-white">Empowering Healthcare Accessibility</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">DrBuddy brings intelligent, AI-driven healthcare assistance to underserved communities through a modern, accessible interface.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            key={i} 
            className="glass-card hover:-translate-y-2 transition-transform duration-300 p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-medical/5 rounded-bl-full -z-10 group-hover:bg-brand-medical/10 transition-colors"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-teal to-brand-blue"></div>
            
            <feature.icon className="w-10 h-10 text-brand-teal mb-5" />
            <h3 className="text-xl font-semibold text-brand-navy mb-3 dark:text-white">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
