import {
  ActionPayload,
  ActionPlugin, ActiveFilter,
  ActiveUI, AugmentedActiveFilter, ChartApi,
  ChartHandlerActionPayload, StatementAndDiscovery,
} from "@activeviam/activeui-sdk";
import _ from "lodash";

const currencyMember = "[Currency].[Currency].[Currency]";
const currencyHierarchy = "[Currency].[Currency]";

const siblingPivot = (widgetApi: any) =>
  _.filter(
    widgetApi.getNonEmptySiblings(),
    (sibling) => sibling.getBookmarkContainerKey() === "pivot-table"
  );

export const filterOnClickPlugin: ActionPlugin = {
  key: "filter-on-click",
  createProperties(parameters: any, activeUI: ActiveUI) {
    return {
      execute(event, actionPayload: ActionPayload) {
        // 5.6.3 TODO:
        // 1. get selected currency from chart widgetApi
        // 2. get sibling pivot table from widgetApi
        // 3. loop through each sibling, get dataSource and apply transformation using mdx api from ActiveUI
        // 4. apply filter in transformDataSource function
        // refer to showcase example > Miscellaneous > MDX Filtering
        // https://activeviam.com/activeui/documentation/4.3.16/dev/guides/mdx-manipulation.html#filters
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxapi.html
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxfiltersapi.html

        const { widgetApi, datum } = actionPayload as ChartHandlerActionPayload;
        const { mdx: mdxApi } = activeUI;
        const { filters: filterApi } = mdxApi;

        // we are unable to tell which member the data in datum belongs to
        // hence we use the column header to find the index of the member that we are interested in
        // we apply the index to datum to obtain the selected value


        // we get all the siblings which are pivot table
        const siblings = siblingPivot(widgetApi);

        // we apply the currency value as a filter in each of the sibling table
        _.forEach(siblings, (sibling) => {
          const datasource = sibling.getDataSource()
          mdxApi.transformDataSource(datasource, (snd: StatementAndDiscovery) => {
            // as we are modifying the the snd, we should clone it in order to prevent mutation of object
            return snd;

            // retrieve the list of filters used in the sibling widget


            // find the currency filter in the list of existing filter in the widget

            // if currency filter does not exists, we add new filter
            // else we replace the filter


            // else find the position of the currency filter so that we can replace it in the same position
            // replaceFilter would destroy all filters on the same hierarchy
            //console.log(mdxApi.base.parsing.toString(updatedSnd.statement));


            // we add the currency filter to the mdx

          })
        })



              // replaceFilter would destroy all filters on the same hierarchy
              //console.log(mdxApi.base.parsing.toString(updatedSnd.statement));



      },
      isAvailable(actionPayload: ActionPayload) {
        const { actionSituation, widgetApi, datum } = actionPayload as ChartHandlerActionPayload;
        // 5.6.2 TODO: return true only when
        // 1. actionSituation is "chart-handler"
        // 2. currency is available in the chart (you can derive members of the charts from the headers returned from widgetApi.getData())
        // 3. a cell is clicked (check datum)
        // 4. there exists at least 1 sibling widget that is a pivot table (you can use widgetApi to getSibling() or to be more precise,
        // you can use getNonEmptySiblings() to get all the siblings.
        // However you are only interested if the container key of the sibling is "pivot-table")
        // Refer to
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.chartapi.html
        // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.containerapi.html
        const currencyIndex = _.findIndex(
            widgetApi.getData().headers,
            (header) => header.value === currencyMember
        );

        const siblings = siblingPivot(widgetApi);

        return (
            actionSituation === "chart-handler"
            && datum != undefined
            && currencyIndex > -1
            && siblings.length > 0
        )
      },
    };
  },
};
