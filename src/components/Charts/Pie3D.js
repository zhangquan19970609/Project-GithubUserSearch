// 将 STEP 4 去除，代以：
// const ChartComponent = () => {
//   return <ReactFC {...chartConfigs} />
// }




// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
  // ReactFC 正式调用出表格，
  // 第二个参数决定输出 chart，(Default 中 import 为 Column2D，但实际上 Column2D 是在 Config 的 type 中决定的)
  // 第三个输出 FusionTheme
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);
  

// STEP 2 - Chart Data 各个柱的 Label 和 Value
  // 为了使 data 作为 dynamic 的值，在计算出来后才注入 chart，
  // 因此在 Repos 中注入，after data being calculated right.
  // 这个 chartData, 应连同 chartConfig 放入 Repos.

// const chartData = [
//   {
//     label: "SCSS",
//     value: "2"
//   },
//   {
//     label: "HTML",
//     value: "14"
//   },
//   {
//     label: "JavaScript",
//     value: "36"
//   },
//   {
//     label: "CSS",
//     value: "45"
//   }
// ];

// STEP 3 - Creating the JSON object to store the chart configurations
  // 该步骤对表格的格式做出硬性规定。
  // chartConfigs 包括了将要予以展示的 data，
  // 为了确保 chartComponent 的 props 运行正常，
  // 将 chartConfigs 放入 chartComponent.

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return (<ReactFC {...chartConfigs} />);
//   }
// }

// 将 STEP 4 去除，代以：
  // chartComponent 接收一个 data props，由 Repos 中的 data 计算结果决定。
  // 最终，本 chart.js 文件输出一个 chartComponent！
const Pie3D = ({data}) => {

  const chartConfigs = { // 这些 Configuration 可以参照 FusionCharts Documentation 来改进！
    type: "pie3d", // The chart type
    // width: "400", // Width of the chart
    // height: "400", // Height of the chart  
    // 不止需要在这里设置 chart 尺寸，，也需要 Repo 中的 CSS !important 设置，
      // 来确保 chart 使用百分比设置大小，不至于显示不全，或使用 absolute value
      // Reponsiveness 就是使用 % ，根据窗口大小决定 div 大小！
    width: '100%',
    height: '400',
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Languages",
        theme: "fusion",
        // 亦可用 decimals 设置 不显示小数:
        decimals: 0,
        // 设置 pie 的直径:
        pieRadius: '45%',
        palette: 2, // 或也可采用 list of palette colors 来设置：
        // paletteColors: "#5d62b5, #afafaf, #f2726, #ffc533, #62b58f, #afafaf"


        // //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        // //Set the x-axis name
        // xAxisName: "Country",
        // //Set the y-axis name
        // yAxisName: "Reserves (MMbbl)",
        // numberSuffix: "K",
        // // Set the theme for your chart
      },
      // Chart Data
      // data: chartData, 或 data = data. 仅写一个 data 是 short-hand. 
      data,
    }
  };
  return <ReactFC {...chartConfigs} />
}

export default Pie3D;
