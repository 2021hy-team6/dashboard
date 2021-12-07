const colorList = ["#69FF4A", "#4AFFFF", "#3266E3", "#33A3AA"];

// Daily Chart Sample
export default class DayCntChart {
  constructor(param = {}){
    this.xLabels = param['label'];
    delete param['label'];
    
    this.datasets = Object.entries(param).map((kv, index) => {
      return {
        label: kv[0],
        color: colorList[index % colorList.length],
        data: kv[1]
      }
    });
    this.options = this.getOptions();
  }

  getGradientFill = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, color);
    let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");
    return gradientFill;
  }

  data = (canvas) => {
    return {
      labels: this.xLabels,
      datasets: this.datasets.map((e) => {
        return {
          label: e.label,
          backgroundColor: this.getGradientFill(canvas, e.color),
          data: e.data,
          borderColor: e.color,
          pointBorderColor: e.color,
          pointBackgroundColor: "#2c2c2c",
          pointHoverBackgroundColor: "#2c2c2c",
          pointHoverBorderColor: e.color,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          borderWidth: 2,
          tension: 0.4,
          
        }
      })
    }
  }

  getOptions = () => {
    return {
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
    }
  }
}
