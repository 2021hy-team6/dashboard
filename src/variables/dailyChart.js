const dailyChartSampleData = {
  "label": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  "Total": [14, 41, 9, 29, 13, 10, 20, 17, 18, 22, 18, 26, 32, 25, 13, 15, 18, 21, 16, 5, 39, 11, 29, 17],
  "Cvhirw fg": [3, 8, 0, 1, 3, 0, 2, 2, 0, 5, 1, 3, 1, 2, 0, 2, 2, 5, 3, 2, 1, 1, 2, 1],
  "Cxc rknwcgc": [0, 4, 2, 2, 2, 0, 2, 1, 3, 2, 2, 2, 3, 5, 0, 1, 1, 1, 1, 0, 1, 3, 2, 2],
  "Eispxb g": [0, 4, 1, 3, 1, 1, 3, 1, 0, 2, 4, 2, 7, 1, 2, 0, 0, 0, 4, 0, 2, 1, 2, 1],
  "Litter": [2, 1, 0, 0, 0, 1, 0, 3, 0, 0, 2, 2, 1, 3, 2, 3, 2, 2, 1, 1, 4, 1, 1, 1],
  "Lujwuj zph": [3, 5, 1, 4, 0, 0, 0, 4, 1, 2, 0, 1, 2, 3, 4, 1, 2, 2, 0, 1, 9, 2, 3, 4],
  "Luybs kri": [0, 2, 0, 1, 0, 0, 1, 2, 2, 1, 0, 2, 3, 0, 0, 1, 1, 2, 1, 0, 2, 1, 1, 1],
  "Ndua yxnx": [2, 2, 2, 4, 1, 1, 2, 1, 1, 1, 3, 3, 7, 4, 1, 3, 3, 0, 1, 0, 4, 1, 5, 3],
  "Nnkdtb gdm": [0, 5, 1, 4, 2, 2, 3, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 3, 1, 0, 3, 0, 1, 0],
  "Qwft absc": [0, 6, 0, 5, 1, 3, 3, 0, 5, 3, 2, 5, 2, 3, 1, 1, 3, 0, 1, 1, 1, 0, 4, 1],
  "Qynxr fpy": [2, 3, 2, 1, 1, 0, 2, 0, 3, 1, 2, 3, 3, 1, 0, 1, 3, 3, 1, 0, 5, 0, 2, 2],
  "Uncategorized": [0, 1, 0, 2, 2, 1, 0, 1, 3, 2, 2, 2, 3, 2, 2, 1, 0, 2, 0, 0, 3, 1, 4, 0],
  "Wqqqq ng": [2, 0, 0, 2, 0, 1, 2, 1, 0, 2, 0, 1, 0, 0, 0, 0, 1, 1, 2, 0, 4, 0, 2, 1],
};

const dailyChartTemplate = {
  data: (canvas) => {
    const ctx = canvas.getContext("2d");
    var chartColor = "#FFFFFF";
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);
    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");

    return {
      labels: [],   // FIXME
      datasets: [ 
        {
          label: "Data",
          borderColor: chartColor,
          pointBorderColor: chartColor,
          pointBackgroundColor: "#2c2c2c",
          pointHoverBackgroundColor: "#2c2c2c",
          pointHoverBorderColor: chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          tension: 0.4,
          data: [], // FIXME
        },
      ],
    };
  },
  options: {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#fff",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 10,
        },
        grid: {
          drawTicks: true,
          drawBorder: false,
          display: true,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent",
        },
      },
      x: {
        grid: {
          display: false,
          color: "rgba(255,255,255,0.1)",
        },
        ticks: {
          padding: 10,
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold",
        },
      },
    },
  },
};

module.exports = {
  dailyChartTemplate,
  dailyChartSampleData
};