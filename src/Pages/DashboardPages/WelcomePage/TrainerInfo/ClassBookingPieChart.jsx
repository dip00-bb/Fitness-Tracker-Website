// import * as React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// export default function ClassBookingPieChart() {
//   const data = [
//     { label: "Zen Flex Yoga", value: 35 },
//     { label: "Iron Core Strength", value: 20 },
//     { label: "Sweat Sprint Cardio", value: 15 },
//     { label: "Rhythm & Sweat", value: 10 },
//     { label: "HIIT & Rip", value: 12 },
//     { label: "Warrior Conditioning", value: 8 },
//   ];

//   return (
//     <Card
//       sx={{
//         maxWidth: 500,
//         mx: "auto",
//         p: 2,
//         boxShadow: 3,
//         borderRadius: 2,
//         bgcolor: "#243144", // dark background
//         color: "#fff",      // white text
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" align="center" gutterBottom sx={{ color: "#fff" }}>
//           Class Bookings Distribution
//         </Typography>
//         <PieChart
//           series={[
//             {
//               data: data.map((item, index) => ({
//                 id: index,
//                 value: item.value,
//                 label: item.label,
//               })),
//               highlightScope: { faded: "global", highlighted: "item" },
//               faded: { innerRadius: 30, additionalRadius: -30, color: "#fff" },
//             },
//           ]}
//           width={400}
//           height={300}
//           slotProps={{
//             legend: {
//               labelStyle: {
//                 fill: "#fff", // legend text color
//               },
//             },
//           }}
//           sx={{
//             "& .MuiChartsAxis-label, & .MuiChartsLegend-root, & text": {
//               fill: "#fff", // force all chart labels white
//             },
//             background: "transparent", 
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// }
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useTrainerDetails from "../../DashHook/useTrainerDetails";


export default function ClassBookingPieChart() {
  const { data: trainerData = {}, isLoading } = useTrainerDetails();

  if (isLoading) return <p className="text-white">Loading chart...</p>;

  // suppose trainerData has classBookings array like:
  // [{ label: "Zen Flex Yoga", value: 35 }, ...]
  const data = trainerData.trainerDetails.bookingsDistribution || [];


  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#243144",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#fff" }}>
          Class Bookings Distribution
        </Typography>
        <PieChart
          series={[
            {
              data: data.map((item, index) => ({
                id: index,
                value: item.value,
                label: item.label,
              })),
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "#fff" },
            },
          ]}
          width={400}
          height={300}
          slotProps={{
            legend: { labelStyle: { fill: "#fff" } },
          }}
          sx={{
            "& .MuiChartsAxis-label, & .MuiChartsLegend-root, & text": {
              fill: "#fff",
            },
            background: "transparent",
          }}
        />
      </CardContent>
    </Card>
  );
}
