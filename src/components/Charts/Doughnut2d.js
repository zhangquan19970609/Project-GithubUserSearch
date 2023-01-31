import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy"; // 注入 candy

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2D = ({data}) => {

  const chartConfigs = { 
    type: "doughnut2d", 
    width: '100%',
    height: '400',
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Stars Per Language",
        theme: "candy", 
        decimals: 0,
        doughnutRadius: '45%',
        showPercentValues: 0 // 不显示 % value，代以实际数字
      },
      data,
    }
  };
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2D;
