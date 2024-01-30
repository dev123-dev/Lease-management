import Chart from "react-apexcharts";

export default function BarChart({
  series,
  categories,
  yAxisText,
  tooltip,
  title,
  colors,
}) {
  return (
    <Chart
      type="bar"
      height={300}
      width={475}
      series={series}
      options={{
        chart: {
          fontFamily: "inherit",
          toolbar: {
            show: false,
          },
        },
        title: {
          text: title,
          style: {
            fontSize: "16px",
            color: "inherit",
            fontWeight: 500,
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
            rotateAlways: categories.length > 6 ? true : false,
          },
          categories,
        },
        yaxis: {
          title: {
            text: yAxisText,
            style: { fontSize: "1.2rem", fontWeight: "500" },
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return (tooltip || "") + val;
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val > 0 ? val : "";
          },
          offsetY: -20,
          style: {
            colors: ["#000"],
          },
        },
        colors,
      }}
    />
  );
}
