/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/

import { pluginContainerTabularView } from "@activeviam/activeui-sdk";
import _ from "lodash";

const tabularViewStaticProperties = pluginContainerTabularView.staticProperties;
const tabularViewDefaultConfiguration =
  tabularViewStaticProperties.initialValue;

/**
 * An enhanced version of the tabular widget
 */
let handlersContextMenu = [
  {
    key: "sub-menu",
    args: {
      iconSrcKey: "menuItem.icon.calculate",
      caption: {
        textPath: "compute",
      },
      menuItems: [
        "compute-difference",
        "compute-avg",
        "compute-sum",
        "day-to-day",
      ],
    },
  },
  "negative-values-render",
  "stats-menu",
  "remove-others",
  "separator",
];

// Add the core handlers context menu
handlersContextMenu = (handlersContextMenu as any[]).concat([
  {
    args: {
      direction: "ASC",
    },
    key: "tabular-sort",
  },
  {
    args: {
      direction: "DESC",
    },
    key: "tabular-sort",
  },
  {
    key: "tabular-clear-sort",
  },
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
  "tabular-collapse-level",
  "tabular-expand-level",
  "open-drillthrough",
  "separator",
  {
    args: {
      caption: {
        textPath: "tabular.contextMenu.actOnCalculatedMeasure",
      },
      iconSrcKey: "other.fx",
      menuItems: [
        {
          key: "edit-calculated-measure",
        },
        {
          key: "publish-calculated-measure",
        },
      ],
    },
    key: "sub-menu",
  },
  "conditional-formatting",
]);

// Only add the KPI action if we have ActiveMonitor enabled
if (window.env.serverUrls.activeMonitor) {
  handlersContextMenu.push("edit-kpi");
}

// Add the rest of the core handlers context menu
handlersContextMenu = (handlersContextMenu as any[]).concat([
  "watch-measure",
  "separator",
  "tabular-column-difference",
  "tabular-header-style",
  "tabular-freeze-header",
  "tabular-show-sparklines",
  "tabular-sparkline-add-colors",
  "tabular-remove-header",
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
]);
const enhancedTabularHandlersContextMenu = handlersContextMenu;

const enhancedTabular = {
  category: tabularViewStaticProperties.getCategory
    ? tabularViewStaticProperties.getCategory()
    : "data",
  name: "Tabular View",
  type: tabularViewDefaultConfiguration.containerKey,
  description: "Columnar representation of data",
  value: _.merge({}, tabularViewDefaultConfiguration, {
    // Uncomment below to use predefined bookmark state rather then default settings
    // 'tabular-view.handlers.contextmenu': enhancedTabularHandlersContextMenu,
    body: { configuration: { tabular: { hideAddButton: true } } },
  }),
};

export { enhancedTabularHandlersContextMenu, enhancedTabular };
