import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"; // 注入 candy

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Column3D = ({data}) => {

  const chartConfigs = { 
    type: "column3d", 
    width: '100%',
    height: '400',
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Most Popular",
        xAxisName: "Repos",
        yAxisName: "Stars",
        xAxisNameFontSize: "16px",
        yAxisNameFontSize: "16px",        
      },
      data,
    }
  };
  return <ReactFC {...chartConfigs} />
}

export default Column3D;
