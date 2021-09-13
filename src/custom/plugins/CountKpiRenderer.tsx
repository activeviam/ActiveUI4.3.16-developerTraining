import React from "react";

function isNotUndefined(obj: unknown): obj is {} {
    return obj !== undefined;
}

// 5.4.1 TODO: create a cell-renderer plugin that returns sets color as follows:
// cell value < 20 : Red
// cell value > 40 : Green
// Otherwise: Orange
// refer to:
// showcase example > Cell Renderer
// https://activeviam.com/activeui/documentation/4.3.11/dev/reference/plugins.html#implement-a-custom-cell-renderer-plugin
export const countKpi = {
    key: "count-kpi",
    createProperties(parameters: any, activeUI: any) {
        return {
            isAvailable(columnProps: any) {
                return true;
            },
            getCellStyle(rowIdx: number, columnProps:any) {
                const colorObj = {color:"black"};
                if (
                    columnProps.data.content[rowIdx][columnProps.colIdx] !== null &&
                    columnProps.data.content[rowIdx][columnProps.colIdx] !== undefined
                ) {
                    const cellValue =
                        columnProps.data.content[rowIdx][columnProps.colIdx].value;
                    if (cellValue < 20) {
                        colorObj.color = "red";
                    } else if (cellValue > 20 && cellValue <= 40) {
                        colorObj.color = "orange";
                    } else {
                        colorObj.color = "green";
                    }
                }

                return colorObj;

            },
            renderCell(props: any) {
                return <activeUI.widgets.tableCells.CaptionCellRenderer {...props} />;
            },
        };
    },
};
