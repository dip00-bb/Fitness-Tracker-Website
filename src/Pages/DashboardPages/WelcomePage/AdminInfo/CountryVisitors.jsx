import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CountryVisitors() {
  const data = [
    { name: "Bangladesh", value: 5200 },
    { name: "England", value: 3100 },
    { name: "Switzerland", value: 1500 },
    { name: "China", value: 2400 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#ef4444"]; 
  // green, blue, yellow, red (looks nice on black bg)

  return (
    <section className="p-6 bg-black rounded-2xl border border-white/10 shadow-lg">
      <h2 className="font-semibold text-gray-200 mb-6 text-3xl md:text-5xl">
        Visitors by Country
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
              outerRadius={120}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
