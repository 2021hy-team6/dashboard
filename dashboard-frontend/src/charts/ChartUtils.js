import axios from 'axios';

const fetchChart = async (url, setter, ChartObj) => {
  return axios.get(url)
    .then((response) => {
        setter(new ChartObj(response.data));
    }).catch((e) => {
        setter(new ChartObj());
        console.error(e);
    });
};

const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export { fetchChart, hexToRGB }
