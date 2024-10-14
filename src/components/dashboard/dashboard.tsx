import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes que vamos a utilizar en las gráficas
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Datos para la gráfica de línea
const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [120, 150, 80, 200, 170, 190],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

// Datos para la gráfica de barras
const barData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Orders",
      data: [15, 30, 50, 20, 60],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Sales</h3>
          <p>$34,245</p>
        </div>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
          <h3>New Users</h3>
          <p>1,234</p>
        </div>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Orders</h3>
          <p>567</p>
        </div>
        <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
          <h3>Revenue</h3>
          <p>$98,765</p>
        </div>
      </div>

      {/* Gráfica de línea */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Sales Over Time</h3>
        <Line data={lineData} />
      </div>

      {/* Gráfica de barras */}
      <div>
        <h3>Orders This Week</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Dashboard;
