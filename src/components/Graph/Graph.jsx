import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from "recharts";
import "./Graph.css";

function HourlyChart({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="loading-chart">Chargement des données horaires...</div>
    );
  }

  const chartData = hourlyData.map((hour) => ({
    time: new Date(hour.time).getHours() + "h",
    temperature: hour.temp_c,
    feelsLike: hour.feelslike_c,
    humidity: hour.humidity,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{label}</p>
          <p className="tooltip-temp">Température: {payload[0].value}°C</p>
          <p className="tooltip-feels">Ressenti: {payload[1].value}°C</p>
          <p className="tooltip-humidity">Humidité: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="hourly-chart-container">
      <h5 className="chart-title">Prévisions horaires</h5>
      <div className="large-chart">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="time"
              stroke="#fff"
              tick={{ fill: "#fff", fontSize: 12 }}
            />
            <YAxis
              yAxisId="left"
              stroke="#fff"
              tick={{ fill: "#fff", fontSize: 12 }}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                fill: "#fff",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#8884d8"
              domain={[0, 100]}
              tick={{ fill: "#8884d8", fontSize: 12 }}
              label={{
                value: "Humidité %",
                angle: 90,
                position: "insideRight",
                fill: "#8884d8",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ff6b6b"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ff6b6b", stroke: "#fff", strokeWidth: 1 }}
              name="Température"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="feelsLike"
              stroke="#4ecdc4"
              strokeWidth={3}
              dot={{ r: 4, fill: "#4ecdc4", stroke: "#fff", strokeWidth: 1 }}
              name="Ressenti"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorHumidity)"
              name="Humidité"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="small-chart">
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="time"
              stroke="#fff"
              tick={{ fill: "#fff", fontSize: 10 }}
            />
            <YAxis
              yAxisId="left"
              stroke="#fff"
              tick={{ fill: "#fff", fontSize: 10 }}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                fill: "#fff",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#8884d8"
              domain={[0, 100]}
              tick={{ fill: "#8884d8", fontSize: 10 }}
              label={{
                value: "Humidité %",
                angle: 90,
                position: "insideRight",
                fill: "#8884d8",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ff6b6b"
              strokeWidth={2}
              dot={{ r: 3, fill: "#ff6b6b", stroke: "#fff", strokeWidth: 1 }}
              name="Température"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="feelsLike"
              stroke="#4ecdc4"
              strokeWidth={2}
              dot={{ r: 3, fill: "#4ecdc4", stroke: "#fff", strokeWidth: 1 }}
              name="Ressenti"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorHumidity)"
              name="Humidité"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyChart;
