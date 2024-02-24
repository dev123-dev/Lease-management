import Chart from "react-apexcharts";

export default function PieChart({ series, labels, colors, title }) {
  const plotOptions = {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total",
            fontSize: 16,
            fontWeight: 500,

            color: "inherit",
          },
        },
      },
    },
  };

  return (
    <Chart
      type="donut"
      height={300}
      width={550}
      series={series}
      options={{
        chart: {
          fontFamily: "inherit",
        },
        title: {
          text: title,
          style: {
            fontSize: "16px",
            color: "inherit",
            fontWeight: 500,
          },
        },
        labels,
        colors,
        plotOptions,
        stroke: {
          width: 0,
        },
        legend: {
          width: 250,
          markers: {
            offsetY: 2,
          },
          formatter: (seriesName, opts) => {
            return [
              seriesName,
              " - ",
              Number(opts.w.globals.series[opts.seriesIndex]).toFixed(2),
            ];
          },
        },
      }}
    />
  );
}
