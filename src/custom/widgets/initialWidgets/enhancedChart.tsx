/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/
import { pluginContainerChart } from "@activeviam/activeui-sdk";
import _ from "lodash";

const chartDefaultConfiguration =
  pluginContainerChart.staticProperties.initialValue;

/**
 * An enhanced version of the chart widget
 */
let handlersContextMenu = [
  {
    args: {
      caption: {
        textPath: "tabular.contextMenu.actOnCalculatedMeasure",
      },
      iconSrcKey: "other.fx",
      menuItems: [
        {
          args: {},
          key: "edit-calculated-measure",
        },
        {
          args: {},
          key: "publish-calculated-measure",
        },
      ],
    },
    key: "sub-menu",
  },
];

// Add the core handlers context menu
// /!\ Be careful the filters have been removed as overridden in the previous block
handlersContextMenu = (handlersContextMenu as any[]).concat([
  {
    args: {
      caption: {
        textPath: "presentations.contextMenu.filter",
      },
      iconSrcKey: "tree.icon.filters",
      menuItems: [
        {
          args: {
            scope: "only-current-widget",
          },
          key: "member-filter",
        },
        {
          args: {
            scope: "all",
          },
          key: "member-filter",
        },
        {
          args: {
            scope: "only-siblings",
          },
          key: "member-filter",
        },
      ],
    },
    key: "sub-menu",
  },
  "open-drillthrough",
  "separator",
  "chart-show-data",
  "separator",
  "refresh-query",
  {
    args: {
      caption: {
        textPath: "tabular.contextMenu.updateMode.change",
      },
      iconSrcKey: "docks.queryRate",
      menuItems: [
        {
          args: {
            modes: ["realTime"],
          },
          key: "update-query-mode",
        },
        {
          args: {
            modes: ["refresh-periodically"],
            refreshInterval: 10,
          },
          key: "update-query-mode",
        },
        {
          args: {
            modes: ["once"],
          },
          key: "update-query-mode",
        },
      ],
    },
    key: "sub-menu",
  },
  "separator",
  "copy-table",
  "widget-csv-export",
  "chart-png-export",
]);
const enhancedChartHandlersContextMenu = handlersContextMenu;

const enhancedChart = {
  category: "data",
  name: "Chart",
  type: "chart",
  description: "enhanced Various types of charts",
  value: _.merge({}, chartDefaultConfiguration, {
    "chart.handlers.contextmenu": enhancedChartHandlersContextMenu,
  }),
};

export { enhancedChart };
