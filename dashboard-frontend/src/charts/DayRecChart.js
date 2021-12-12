import { hexToRGB } from "charts/ChartUtils.js";

export default class DayRecChart {
  constructor(param = {}){
    this.xLabels = param['label'];
    
    this.yLabel = 'Recyclable Rate';
    this.yValues = param['value'];
    
    this.options = this.getOptions();
  }

  getGradientFill = (canvas) => {
    var ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#18ce0f");
    gradientStroke.addColorStop(1, "#FFFFFF");
    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB("#18ce0f", 0.4));
  }

  data = (canvas) => {
    return {
      labels: this.xLabels,
      datasets: [
        {
          label: this.yLabel,
          backgroundColor: this.getGradientFill(canvas),
          data: this.yValues,
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          tension: 0.4,
        }
      ]
    }
  }

  getOptions = () => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
      },
      responsive: 1,
      scales: {
        y: {
          grid: {
            zeroLineColor: "transparent",
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
        x: {
          display: 0,
          ticks: {
            display: false,
          },
          grid: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 },
      },
    }
  }
}
