

import React, { use } from "react";
import { BookOpenCheck, BarChart3, Clock } from "lucide-react";
import { AuthContext } from "../../../../Context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../../hooks/useAxiosPublic";


const UserCards = () => {
  const { user } = use(AuthContext);


  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user-details-dashboard/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // fetch only if email exists
  });

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }




  const { stasDetails } = data.result.activityTracking|| {};


  const cards = [
    {
      title: "Total Classes",
      value: stasDetails?.totalClass || 0,
      change: "+1.2%", // example change
      icon: BookOpenCheck,
      bg: "from-green-500/20 to-green-900/40",
      iconColor: "text-green-400",
      chartColor: "stroke-green-400",
    },
    {
      title: "Attendance",
      value: stasDetails?.attendance || "0%",
      change: "-0.5%", // example change
      icon: BarChart3,
      bg: "from-blue-500/20 to-blue-900/40",
      iconColor: "text-blue-400",
      chartColor: "stroke-blue-400",
    },
    {
      title: "Total in Month",
      value: `${stasDetails?.monthlyActive || 0} Hours`,
      change: "+3.4%", // example change
      icon: Clock,
      bg: "from-purple-500/20 to-purple-900/40",
      iconColor: "text-purple-400",
      chartColor: "stroke-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 md:mb-20">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative p-6 rounded-2xl bg-gradient-to-br ${card.bg} shadow-lg border border-white/10 transform transition hover:scale-105`}
        >
          <div className={`${card.iconColor}`}>
            <card.icon size={26} />
          </div>

          <div className="text-gray-200 text-sm">{card.title}</div>
          <div className="text-2xl md:text-3xl font-bold text-white">{card.value}</div>
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

export default UserCards;
