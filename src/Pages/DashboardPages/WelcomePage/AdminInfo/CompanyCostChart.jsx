import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function CompanyCostChart() {
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    // Dummy data: Salary + Maintenance per month
    const salaryData = [50, 52, 55, 53, 56, 58, 60, 62, 61, 63, 65, 67]; // in thousands
    const maintenanceData = [20, 18, 22, 21, 19, 23, 25, 24, 26, 28, 27, 29];

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return (
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg w-full">
            <h2 className="text-white text-3xl md:text-5xl font-semibold mb-4">
                Company Cost (Current Year)
            </h2>

            <BarChart
                xAxis={[
                    {
                        scaleType: "band",
                        data: months,
                        tickLabelStyle: { fill: "#fff" }, // <-- X-axis text white
                    },
                ]}
                yAxis={[
                    {
                        tickLabelStyle: { fill: "#fff" }, // <-- Y-axis text white
                    },
                ]}
                height={isMobile ? 300 : isTablet ? 400 : 450}
                series={[
                    {
                        data: salaryData,
                        label: "Employee Salary",
                        color: theme.palette.primary.main,
                    },
                    {
                        data: maintenanceData,
                        label: "Maintenance",
                        color: theme.palette.secondary.main,
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
