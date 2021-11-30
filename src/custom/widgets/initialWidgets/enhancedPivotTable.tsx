/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/

import {pluginContainerPivotTable} from '@activeviam/activeui-sdk';
import _ from 'lodash';
import {showSingleValue} from "../../plugins/SingleValueAction";

const pivotTableStaticProperties = pluginContainerPivotTable.staticProperties;
const pivotTableDefaultConfiguration = pivotTableStaticProperties.initialValue;

/**
 * An enhanced version of the pivot table widget
 */
let handlersContextMenu = [
    //TODO: ex 5.1.2 Add your SingleValue Custom action key
    showSingleValue.key,
  {
    key: 'sub-menu',
    args: {
      iconSrcKey: 'menuItem.icon.calculate',
      caption: {
        textPath: 'compute',
      },
      menuItems: [
      ],
    },
  },
  'separator',
  'negative-values-render',
  'stats-menu',
  'remove-others',
  'separator',
];

// Add the core handlers context menu
handlersContextMenu = (handlersContextMenu as any[]).concat([
  {
    args: {
      direction: 'ASC',
    },
    key: 'tabular-sort',
  },
  {
    args: {
      direction: 'DESC',
    },
    key: 'tabular-sort',
  },
  {
    key: 'tabular-clear-sort',
  },
  {
    args: {
      caption: {
        textPath: 'presentations.contextMenu.filter',
      },
      iconSrcKey: 'tree.icon.filters',
      menuItems: [
        {
          args: {
            scope: 'only-current-widget',
          },
          key: 'member-filter',
        },
        {
          args: {
            scope: 'all',
          },
          key: 'member-filter',
        },
        {
          args: {
            scope: 'only-siblings',
          },
          key: 'member-filter',
        },
      ],
    },
    key: 'sub-menu',
  },
  {
    args: {
      caption: {
        textPath: 'tabular.contextMenu.expansionSubMenu',
      },
      iconSrcKey: 'menuItem.icon.expand',
      menuItems: [
        'tabular-expand-level',
        'tabular-collapse-level',
        {
          args: {
            mode: 'remember',
          },
          key: 'tabular-remember-expansion-order',
        },
        {
          args: {
            mode: 'forget',
          },
          key: 'tabular-remember-expansion-order',
        },
      ],
    },
    key: 'sub-menu',
  },
  'open-drillthrough',
  'separator',
  {
    args: {
      caption: {
        textPath: 'tabular.contextMenu.actOnCalculatedMeasure',
      },
      iconSrcKey: 'other.fx',
      menuItems: [
        {
          key: 'edit-calculated-measure',
        },
        {
          key: 'publish-calculated-measure',
        },
      ],
    },
    key: 'sub-menu',
  },
  'conditional-formatting',
]);

// Only add the KPI action if we have ActiveMonitor enabled
if (window.env.activeMonitorServerUrl) {
  handlersContextMenu.push('edit-kpi');
}

// Add the rest of the core handlers context menu
handlersContextMenu = (handlersContextMenu as any[]).concat([
  'watch-measure',
  'separator',
  'pivot-table-toggle-grand-total',
  'pivot-table-toggle-subtotals',
  'tabular-header-style',
  'tabular-freeze-header',
  'tabular-show-tree-column',
  'tabular-show-sparklines',
  'tabular-sparkline-add-colors',
  'tabular-remove-header',
  'separator',
  'refresh-query',
  {
    args: {
      caption: {
        textPath: 'tabular.contextMenu.updateMode.change',
      },
      iconSrcKey: 'docks.queryRate',
      menuItems: [
        {
          args: {
            modes: ['realTime'],
          },
          key: 'update-query-mode',
        },
        {
          args: {
            modes: ['refresh-periodically'],
            refreshInterval: 10,
          },
          key: 'update-query-mode',
        },
        {
          args: {
            modes: ['once'],
          },
          key: 'update-query-mode',
        },
      ],
    },
    key: 'sub-menu',
  },
  'separator',
  'copy-table',
  'widget-csv-export',
]);
const enhancedPivotTableHandlersContextMenu = handlersContextMenu;

const enhancedPivotTable = {
  category: pivotTableStaticProperties.getCategory
    ? pivotTableStaticProperties.getCategory()
    : 'data',
  name: 'Pivot Table',
  type: pivotTableDefaultConfiguration.containerKey,
  description: 'Enhanced Pivot Table',
  value: _.merge({}, pivotTableDefaultConfiguration, {
    // TODO 5.1.3 :
    // Uncomment below to use predefined bookmark state rather then default settings
    'pivot-table.handlers.contextmenu': enhancedPivotTableHandlersContextMenu,
    body: {configuration: {tabular: {hideAddButton: true}}},
  }),
};

export {enhancedPivotTableHandlersContextMenu, enhancedPivotTable};
