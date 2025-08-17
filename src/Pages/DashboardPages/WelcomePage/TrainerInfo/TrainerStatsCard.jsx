import { Users, UserPlus, Eye, DollarSign } from "lucide-react";

export default function TrainerStatsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {/* Total Students */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 rounded-2xl shadow-lg">
        <div>
          <h3 className="text-gray-300 text-sm">Total Students</h3>
          <p className="text-2xl font-bold text-white">120</p>
        </div>
        <Users className="w-10 h-10 text-indigo-300" />
      </div>

      {/* New Students */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-800 p-6 rounded-2xl shadow-lg">
        <div>
          <h3 className="text-gray-300 text-sm">New Students</h3>
          <p className="text-2xl font-bold text-white">15</p>
        </div>
        <UserPlus className="w-10 h-10 text-green-300" />
      </div>

      {/* Profile Visits */}
      <div className="flex items-center justify-between bg-gradient-to-r from-pink-600 to-pink-800 p-6 rounded-2xl shadow-lg">
        <div>
          <h3 className="text-gray-300 text-sm">Profile Visits</h3>
          <p className="text-2xl font-bold text-white">350</p>
        </div>
        <Eye className="w-10 h-10 text-pink-300" />
      </div>

      {/* Total Revenue */}
      <div className="flex items-center justify-between bg-gradient-to-r from-yellow-600 to-yellow-800 p-6 rounded-2xl shadow-lg">
        <div>
          <h3 className="text-gray-300 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-white">$2,450</p>
        </div>
        <DollarSign className="w-10 h-10 text-yellow-300" />
      </div>
    </div>
  );
}
