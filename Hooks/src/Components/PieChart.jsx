import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { useMemo } from "react";
// import { desktopOS, valueFormatter } from "./webUsageStats";
//********* */ Why we use useMemo **************
// Sometimes calculations are:
// heavy (slow)
// repeated on every render
// unnecessary if data didn’t change
// React re-renders components frequently → without useMemo, calculations run every time.
export function PieArcLabel({ expenses }) {
  const pieData = useMemo(() => {
    const result = {};
    expenses?.forEach((exp) => {
      const category = exp.category || "other";
      const amount = Number(exp.expenseAmount) || 0;
      result[category] = (result[category] || 0) + amount;
    });
    return Object.entries(result).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
  }, [expenses]);
  return (
    <PieChart
      // series={[
      //   {
      //     data: [
      //       { id: 0, value: 10, label: "Travel" },
      //       { id: 1, value: 15, label: "Groceries" },
      //       { id: 2, value: 20, label: "Food Drink" },
      //       { id: 3, value: 20, label: "Health" },
      //     ],
      //   },
      // ]}
      series={[{ data: pieData }]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
const size = {
  width: 200,
  height: 200,
};
// export function BarChart() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const myChart = echarts.init(chartRef.current);

//     const option = {
//       xAxis: {
//         type: "category",
//         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         axisLabel: {
//           interval: 0,
//         },
//       },

//       yAxis: {
//         type: "value",
//       },

//       //  horizontal scroll
//       dataZoom: [
//         {
//           type: "inside",
//           start: 0,
//           end: 50,
//         },
//         {
//           type: "slider",
//           height: 20,
//         },
//       ],

//       series: [
//         {
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: "bar",
//           barWidth: 30,
//         },
//       ],
//     };
//     myChart.setOption(option);

//     // ✅ make responsive
//     const handleResize = () => {
//       myChart.resize();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       myChart.dispose();
//     };
//   }, []);

//   return (
//     <div
//       ref={chartRef}
//       className="candalbar_container"
//       style={{ width: "100%", height: "300px" }}
//     />
//   );
// }
export function BarChart({ expenses }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    // ✅ weekly days order
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // store totals for each day
    const dayTotals = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    // ✅ group expenses by day of week
    expenses?.forEach((exp) => {
      if (!exp.date) return;

      const date = new Date(exp.date);
      const dayName = days[date.getDay()]; // get Sun/Mon/Tue...

      const amount = Number(exp.expenseAmount) || 0;
      dayTotals[dayName] += amount;
    });

    const option = {
      xAxis: {
        type: "category",
        data: days, // show weekly days
        axisLabel: { interval: 0 },
      },

      yAxis: { type: "value" },

      dataZoom: [
        { type: "inside", start: 0, end: 100 },
        { type: "slider", height: 20 },
      ],

      series: [
        {
          data: Object.values(dayTotals), // totals per day
          type: "bar",
          barWidth: 30,
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [expenses]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
}
