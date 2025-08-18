import React from "react";
import { GraduationCap, UserPlus, Eye, DollarSign } from "lucide-react";
import useTrainerDetails from "../../DashHook/useTrainerDetails";


const AdminCards = () => {
  const { data: trainerData = {}, isLoading } = useTrainerDetails();

  if (isLoading) return <p className="text-white">Loading cards...</p>;

  const stasData= trainerData.trainerDetails

  // suppose backend sends summary data
  const cards = [
    {
      title: "Total Students",
      value: stasData.totalStudent || "0",
      change: trainerData.studentsChange || "+0%",
      icon: GraduationCap,
      bg: "from-blue-500/20 to-blue-900/40",
      iconColor: "text-blue-400",
      chartColor: "stroke-blue-400",
    },
    {
      title: "New Students",
      value: stasData.newStudent || "0",
      change: trainerData.newChange || "+0%",
      icon: UserPlus,
      bg: "from-purple-500/20 to-purple-900/40",
      iconColor: "text-purple-400",
      chartColor: "stroke-purple-400",
    },
    {
      title: "Profile Visits",
      value: stasData.profileVisit || "0",
      change: trainerData.visitsChange || "+0%",
      icon: Eye,
      bg: "from-amber-500/20 to-amber-900/40",
      iconColor: "text-amber-400",
      chartColor: "stroke-amber-400",
    },
    {
      title: "Total Revenue",
      value: `$${stasData.change || 0}`,
      change: trainerData.revenueChange || "+0%",
      icon: DollarSign,
      bg: "from-rose-500/20 to-rose-900/40",
      iconColor: "text-rose-400",
      chartColor: "stroke-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative p-6 rounded-2xl bg-gradient-to-br ${card.bg} shadow-lg border border-white/10`}
        >
          <div className={`${card.iconColor}`}>
            <card.icon size={26} />
          </div>
          <div className="text-gray-200 text-sm">{card.title}</div>
          <div className="text-2xl font-bold text-white">{card.value}</div>
          <div
            className={`text-sm mt-2 ${
              card.change.startsWith("+") ? "text-green-400" : "text-red-400"
            }`}
          >
            {card.change}
          </div>
          <svg
            className="absolute bottom-2 right-2 w-20 h-10 opacity-60"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 40 L20 25 L40 35 L60 15 L80 25 L100 10"
              className={card.chartColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default AdminCards;

