export default class DayTimeChart {
  constructor(param = {}){
    this.xLabels = param['label'] || [];
    
    this.yLabel = 'Detection Time';
    this.yValues = param['value'] || [];
    
    this.options = this.getOptions();
  }

  getGradientFill = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#FFFFFF");
    let gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
  }

  data = (canvas) => {
    return {
      labels: this.xLabels,
      datasets: [
        {
          label: this.yLabel,
          backgroundColor: this.getGradientFill(canvas),
          data: this.yValues,
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
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
          display: 0,
          ticks: {
            display: false,
            maxTicksLimit: 7,
          },
          grid: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
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
