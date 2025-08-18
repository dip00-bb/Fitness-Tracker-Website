
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { use } from "react";
import { AuthContext } from "../../../../Context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../../hooks/useAxiosPublic";


export default function DashBoardChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const { user } = use(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard-chart", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user-details-dashboard/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p className="text-white">Loading...</p>;
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyExercise = data?.result.activityTracking?.weeklyExercise || [];

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg w-full">
      <h2 className="text-white text-3xl md:text-5xl font-semibold mb-4">
        Weekly Exercise (Hours)
      </h2>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: days,
            tickLabelStyle: { fill: "#fff" },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fill: "#fff" },
          },
        ]}
        height={isMobile ? 300 : isTablet ? 400 : 450}
        series={[
          {
            data: weeklyExercise,
            label: "Exercise Hours",
            color: theme.palette.success.main,
          },
        ]}
        margin={{
          top: 30,
          bottom: isMobile ? 40 : 50,
          left: isMobile ? 30 : 50,
          right: 20,
        }}
        slotProps={{
          legend: {
            labelStyle: { fill: "#fff" },
          },
        }}
      />
    </div>
  );
}
