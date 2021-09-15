// 6.1.3 TODO: add the page definition.
// 1. Take in a parameter counterparty
// 2. apply counterparty in the page filter
// 3. set counterparty as the page name
// you can copy the content and layout from the bookmark state of exercise 5.6

import {PageDescription} from '@activeviam/activeui-sdk';

// Refer to showcase example > Story Telling with Dashboard Pages#pnlByDeskPage.
export const ctpyPage: (
  counterparty: string,
) => PageDescription = counterparty => {
  return {
    content: [
      {
        key: 'ctpyChart',
        bookmark: {
          name: 'Chart',
          type: 'container',
          value: {
            style: {},
            showTitleBar: true,
            containerKey: 'chart',
            body: {
              configuration: {
                elementStylers: ['selection-highlight'],
                type: 'plotly-line-chart',
                mapping: {
                  xAxis: ['[Currency].[Currency].[Currency]'],
                  values: ['[Measures].[pnl.SUM]'],
                  splitBy: [],
                },
                switchedTo: 'plotly-pie-chart',
              },
              query: {
                serverUrl: '',
                mdx:
                  'SELECT NON EMPTY [Measures].[pnl.SUM] ON COLUMNS, NON EMPTY [Currency].[Currency].[Currency].Members ON ROWS FROM [EquityDerivativesCube]',
                updateMode: 'realTime',
              },
            },
          },
          writable: false,
        },
      },
      {
        key: 'ctpyPivot',
        bookmark: {
          name: 'Pivot Table',
          type: 'container',
          value: {
            style: {},
            showTitleBar: true,
            containerKey: 'pivot-table',
            body: {
              serverUrl: '',
              mdx:
                'SELECT NON EMPTY Hierarchize([Geography].[City].[City].Members) ON ROWS, NON EMPTY Crossjoin(DrilldownLevel([Booking].[Desk].[ALL].[AllMember]), {[Measures].[pv.SUM], [Measures].[pnl.SUM]}) ON COLUMNS FROM [EquityDerivativesCube] CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS',
              contextValues: {},
              updateMode: 'realTime',
              ranges: {
                row: {
                  chunkSize: 1000,
                  thresholdPercentage: 0.1,
                },
                column: {
                  chunkSize: 20,
                  thresholdPercentage: 0.2,
                },
              },
              configuration: {
                tabular: {
                  pinnedHeaderSelector: 'member',
                  sortingMode: 'non-breaking',
                  addButtonFilter: 'numeric',
                  statisticsShown: true,
                  columnsGroups: [
                    {
                      captionProducer: 'firstColumn',
                      cellFactory: 'kpi-status',
                      selector: 'kpi-status',
                    },
                    {
                      captionProducer: 'firstColumn',
                      cellFactory: 'lookup',
                      selector: 'lookup',
                    },
                    {
                      captionProducer: 'expiry',
                      cellFactory: 'expiry',
                      selector: 'kpi-expiry',
                    },
                    {
                      captionProducer: 'columnMerge',
                      cellFactory: {
                        args: {
                          automaticExpansion: true,
                        },
                        key: 'treeCells',
                      },
                      selector: 'member',
                    },
                  ],
                  hideAddButton: true,
                  lineNumbers: false,
                  rowStyle: ['bold-total'],
                  columnOrder: {
                    key: 'original',
                  },
                  defaultOptions: {
                    width: 100,
                  },
                  columns: [
                    {
                      key: 'c-treeCells-member',
                      width: 130,
                    },
                  ],
                },
              },
            },
          },
          writable: false,
        },
      },
    ],
    layout: {
      children: {
        '0': {
          ck: 'ctpyChart',
        },
        '1': {
          ck: 'ctpyPivot',
        },
      },
      direction: 'row',
    },
    name: `${counterparty}`,
    filters: {
      EquityDerivativesCube: [
        `[CounterParty].[CounterParty].[ALL].[AllMember].[${counterparty}]`,
      ],
    },
  };
};
