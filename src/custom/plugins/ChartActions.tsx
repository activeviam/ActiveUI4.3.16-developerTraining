import {
  ActionPlugin,
  ActiveUI,
  ChartHandlerActionPayload, WidgetApi,
} from "@activeviam/activeui-sdk";
import _ from "lodash";

const currencyMember = "[Currency].[Currency].[Currency]";
const currencyHierarchy = "[Currency].[Currency]";


export const filterOnClickPlugin: ActionPlugin = {
  key: "filter-on-click",
  createProperties(parameters: any, activeUI: ActiveUI) {
    return {
      execute(event, actionPayload: ChartHandlerActionPayload) {
        // 5.6.3 TODO:
        // 1. get selected currency from chart widgetApi
        // 2. get sibling pivot table from widgetApi
        // 3. loop through each sibling, get dataSource and apply transformation using mdx api from ActiveUI
        // 4. apply filter in transformDataSource function
        // refer to showcase example > Miscellaneous > MDX Filtering
        // https://activeviam.com/activeui/documentation/4.3.16/dev/guides/mdx-manipulation.html#filters
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxapi.html
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxfiltersapi.html

        const { widgetApi, datum } = actionPayload;
        const { mdx: mdxApi } = activeUI;
        const { filters: filterApi } = mdxApi;


      },
      isAvailable(actionPayload: ChartHandlerActionPayload) {
        const { actionSituation, widgetApi, datum } = actionPayload;
        // 5.6.2 TODO: return true only when
        // 1. actionSituation is "chart-handler"
        const isChartHandlerAction = false;
        // 2. currency is available in the chart (you can derive members of the charts from the headers returned from widgetApi.getData())
        const isCurrencyAvailable = false;
        // 3. a cell is clicked (check datum)
        const isCellClicked = false;
        // 4. there exists at least 1 sibling widget that is a pivot table (you can use widgetApi to getSibling() or to be more precise,
        const hasAtLeastOnePivotSibling = false
        // you can use getNonEmptySiblings() to get all the siblings.
        // However you are only interested if the container key of the sibling is "pivot-table")
        // Refer to
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.chartapi.html
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.containerapi.html


        return (
            isChartHandlerAction && isCurrencyAvailable && isCellClicked && hasAtLeastOnePivotSibling
        )
      },
    };
  },
};
