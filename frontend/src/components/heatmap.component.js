// import React from 'react';
// import { Group } from '@visx/group';
// import genBins, { Bin, Bins } from '@visx/mock-data/lib/generators/genBins';
// import { scaleLinear } from '@visx/scale';
// import { HeatmapCircle, HeatmapRect } from '@visx/heatmap';
// import { getSeededRandom } from '@visx/mock-data';
//
// const hot1 = '#77312f';
// const hot2 = '#f33d15';
// const cool1 = '#122549';
// const cool2 = '#b4fbde';
// export const background = '#28272c';
//
// const seededRandom = getSeededRandom(0.41);
//
// const binData = genBins(
//     /* length = */ 16,
//     /* height = */ 16,
//     /** binFunc */ (idx) => 150 * idx,
//     /** countFunc */ (i, number) => 25 * (number - i) * seededRandom(),
// );
//
// // accessors
// const bins = (d: Bins) => d.bins;
// const count = (d: Bin) => d.count;
//
// const colorMax = max(binData, (d) => max(bins(d), count));
// const bucketSizeMax = max(binData, (d) => bins(d).length);
//
// // scales
// const xScale = scaleLinear<number>({
//     domain: [0, binData.length],
// });
// const yScale = scaleLinear<number>({
//     domain: [0, bucketSizeMax],
// });
// const circleColorScale = scaleLinear<string>({
//     range: [hot1, hot2],
//     domain: [0, colorMax],
// });
//
// const opacityScale = scaleLinear<number>({
//     range: [0.1, 1],
//     domain: [0, colorMax],
// });
//
// export type HeatmapProps = {
//     width: number;
// height: number;
// margin?: { top: number; right: number; bottom: number; left: number };
// separation?: number;
// events?: boolean;
// };
//
// const defaultMargin = { top: 10, left: 20, right: 20, bottom: 110 };
//
// const Example = ({
//                      width,
//                      height,
//                      events = false,
//                      margin = defaultMargin,
//                      separation = 20,
//                  }: HeatmapProps) => {
//     // bounds
//     const size =
//         width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
//     const xMax = size / 2;
//     const yMax = height - margin.bottom - margin.top;
//
//     const binWidth = xMax / binData.length;
//     const binHeight = yMax / bucketSizeMax;
//     const radius = min([binWidth, binHeight], (d) => d) / 2;
//
//     xScale.range([0, xMax]);
//     yScale.range([yMax, 0]);
//
//
//
// export default Example;