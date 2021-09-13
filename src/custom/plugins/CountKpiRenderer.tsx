import React from "react";

// 5.4.1 TODO: create a cell-renderer plugin that returns sets color as follows:
// cell value < 20 : Red
// cell value > 40 : Green
// Otherwise: Orange
// refer to:
// showcase example > Cell Renderer
// https://activeviam.com/activeui/documentation/4.3.11/dev/reference/plugins.html#implement-a-custom-cell-renderer-plugin
export const countKpi = {
  key: "count-kpi",
  createProperties(parameters, activeUI) {
    return {
      isAvailable({ columnProps }) {
        return true;
      },
      getCellStyle(rowIdx, columnProps) {
        let color = "black";
        if (
          columnProps.data.content[rowIdx][columnProps.colIdx] !== null &&
          columnProps.data.content[rowIdx][columnProps.colIdx] !== undefined
        ) {
          const cellValue =
            columnProps.data.content[rowIdx][columnProps.colIdx].value;
          if (cellValue < 20) {
            color = "red";
          } else if (cellValue > 20 && cellValue <= 40) {
            color = "orange";
          } else {
            color = "green";
          }
          return { color };
        }
      },
      renderCell(props) {
        return <activeUI.widgets.tableCells.CaptionCellRenderer {...props} />;
      },
    };
  },
};
