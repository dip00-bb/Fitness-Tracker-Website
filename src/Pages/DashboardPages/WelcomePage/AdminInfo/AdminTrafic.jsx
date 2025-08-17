
import { Facebook, Linkedin, Search, Twitter } from "lucide-react";

export default function TrafficSources() {
  const sources = [
    {
      name: "Facebook",
      percent: "42%",
      users: "12.4k",
      icon: Facebook,
      bg: "from-blue-600/20 to-blue-900/40",
      iconColor: "text-blue-400",
    },
    {
      name: "Google",
      percent: "36%",
      users: "10.8k",
      icon: Search,
      bg: "from-emerald-600/20 to-emerald-900/40",
      iconColor: "text-emerald-400",
    },
    {
      name: "LinkedIn",
      percent: "12%",
      users: "3.5k",
      icon: Linkedin,
      bg: "from-sky-600/20 to-sky-900/40",
      iconColor: "text-sky-400",
    },
    {
      name: "X (Twitter)",
      percent: "10%",
      users: "2.9k",
      icon: Twitter,
      bg: "from-slate-600/20 to-slate-900/40",
      iconColor: "text-slate-300",
    },
  ];

  return (
    <section className="p-6 bg-black rounded-2xl border border-white/10 shadow-lg">
      <h2 className="text-3xl md:text-5xl font-semibold text-gray-200 mb-6">
        Visitors by Social Media
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sources.map((src, i) => (
          <div
            key={i}
            className={`relative p-5 rounded-xl bg-gradient-to-br ${src.bg} shadow-md border border-white/10`}
          >
            {/* Icon */}
            <div className={`absolute top-4 right-4 ${src.iconColor}`}>
              <src.icon size={28} />
            </div>

            {/* Content */}
            <div className="text-gray-400 text-sm">{src.name}</div>
            <div className="text-2xl font-bold text-white">{src.percent}</div>
            <div className="text-sm text-gray-300 mt-1">{src.users} users</div>
          </div>
        ))}
        
      </div>
    </section>
  );
}
