// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// const data = [
//   { month: "Feb", students: 400, new: 120, visits: 800, revenue: 2400 },
//   { month: "Mar", students: 500, new: 150, visits: 1100, revenue: 2800 },
//   { month: "Apr", students: 600, new: 180, visits: 1200, revenue: 3000 },
//   { month: "May", students: 750, new: 200, visits: 1400, revenue: 3500 },
//   { month: "Jun", students: 900, new: 250, visits: 1700, revenue: 4200 },
//   { month: "Jul", students: 1100, new: 300, visits: 1900, revenue: 4800 },
//   { month: "Aug", students: 1300, new: 350, visits: 2100, revenue: 5200 },
// ];

// export default function TrainerBarChart() {
//   return (
//     <Card
//       sx={{
//         background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
//         borderRadius: 3,
//         p: 2,
//         color: "#fff",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Last 7 Months Overview
//         </Typography>

//         <Box sx={{ height: 300 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} barGap={6}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//               <XAxis dataKey="month" stroke="#888" />
//               <YAxis stroke="#888" />
//               <Tooltip
//                 contentStyle={{ backgroundColor: "#111", borderRadius: "8px" }}
//                 labelStyle={{ color: "#fff" }}
//               />
//               {/* Bars with same colors as cards */}
//               <Bar dataKey="students" fill="#60a5fa" name="Total Students" />
//               <Bar dataKey="new" fill="#c084fc" name="New Students" />
//               <Bar dataKey="visits" fill="#facc15" name="Profile Visits" />
//               <Bar dataKey="revenue" fill="#f87171" name="Revenue" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTrainerDetails from "../../DashHook/useTrainerDetails";

export default function TrainerBarChart() {
  const { data: trainerData = {}, isLoading } = useTrainerDetails();

  if (isLoading) return <p className="text-white">Loading chart...</p>;

  // suppose trainerData has monthlyStats array
  const data = trainerData.trainerDetails.overview || [];


  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #0f0f0f, #1a1a1a)",
        borderRadius: 3,
        p: 2,
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Last 7 Months Overview
        </Typography>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", borderRadius: "8px" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="students" fill="#60a5fa" name="Total Students" />
              <Bar dataKey="new" fill="#c084fc" name="New Students" />
              <Bar dataKey="visits" fill="#facc15" name="Profile Visits" />
              <Bar dataKey="revenue" fill="#f87171" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
