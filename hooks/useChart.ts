import React, { RefObject } from "react";
import {Chart, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartType, DefaultDataPoint} from "chart.js";
import 'chart.js/auto';

export type ChartOptions = ChartConfiguration<ChartType, DefaultDataPoint<ChartType>, unknown> | ChartConfigurationCustomTypesPerDataset<ChartType, DefaultDataPoint<ChartType>, unknown>

const useChart = (nodeRef: RefObject<HTMLCanvasElement>, options: ChartOptions) => {
  React.useEffect(() => {
    const chart = new Chart(nodeRef.current || '', options);
    return () => {
        chart?.destroy();
      }
  }, [nodeRef, options]);
};

export default useChart;
