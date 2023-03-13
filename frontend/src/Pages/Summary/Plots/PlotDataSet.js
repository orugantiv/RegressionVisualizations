import Plot from 'react-plotly.js';
import React, { useState } from "react";

export default function PlotDataSet(props){
    const dict = props.items.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj[key]);
        });
        return acc;
      }, {});
    
      const [binSize, setBinSize] = useState(1); // initial bin size is 1
      const [hoverData, setHoverData] = useState(null); // to track hover data for categorical variables
    
      const handleBinSizeChange = (event) => {
        setBinSize(parseInt(event.target.value));
      };
    
      const handleHover = (event) => {
        const { x, y } = event.points[0];
        setHoverData({ x, y });
      };
    
      return (
        <div>
          {Object.keys(dict).map((key) => {
            const values = dict[key];
    
            // Check if the key is a categorical variable
            const isCategorical = [...new Set(values)].length < 10;
    
            // Specify the binning function based on whether the variable is categorical or continuous
            const binningFunction = isCategorical
              ? (start, stop) => ({ size: 1 })
              : (start, stop, size) => ({ start, end: stop, size });
    
            return (
              <div key={key}>
                <h3>{key}</h3>
                <Plot
                  data={[
                    {
                      x: values,
                      type: "histogram",
                      xbins: binningFunction(Math.min(...values), Math.max(...values), binSize),
                    },
                  ]}
                  layout={{
                    hovermode: "closest",
                    barmode: "overlay",
                    bargap: 0.1,
                    xaxis: {
                      title: key,
                    },
                    yaxis: {
                      title: "Count",
                    },
                    annotations: [
                      {
                        showarrow: false,
                        text: `Bin size: ${binSize}`,
                        xanchor: "right",
                        x: 1,
                        y: 1,
                        yanchor: "top",
                        font: {
                          size: 14,
                        },
                      },
                    ],
                  }}
                  onHover={isCategorical ? handleHover : undefined}
                />
              </div>
            );
          })}
        </div>
      );
}



