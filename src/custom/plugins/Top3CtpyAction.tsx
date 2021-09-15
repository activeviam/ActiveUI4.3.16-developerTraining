// 6.1.4 TODO: create an action plugin that opens a modal popup.
// The modal popup contains a “featured-values” container
// The featured value widget should display the top 3 counterparties with the highest pnl.SUM value
//      - To get the mdx, you can apply the featured value widget from the GUI and formulate the resultant mdx
//        using the wizard.
// Filters from the source widget should be applied to the featured-values container.
//      - To do so, as per exercise 5.6, you need to extract the filters from the source widget using activeUI.mdx.filters.selectFilters
//      - Refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxfiltersapi.selectfilters.html#mdxfiltersapiselectfilters-property
//          >> Use activeUI.mdx.parsing.parseExpression to derive your statement
//          >> Use widgetApi.getDataSource() to obtain the discovery and cubeName that is required to generate your statement.
//          >> https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxparsingapi.parseexpression.html#mdxparsingapiparseexpression-property
//      - Refer to showcase example > MDX Filtering on how to parse the featured value's mdx into a node before applying new filters on the mdx.
// You should be able to use activeUI.mdx.parsing.toString to obtain the mdx string for the feature value's definition
// For validation purpose, you can set "featured-values.showWizard" to true. This way, you will be able to view the filters and mdx applied to the feature value

import React from "react";
import Modal from "antd/lib/modal";
import _ from "lodash";
import {
    Container,
    ActiveUIProvider,
    DockActionPayload,
    ActionPlugin,
    SelectNode,
} from "@activeviam/activeui-sdk";

const getTopValueMdx = `
        SELECT
        NON EMPTY Crossjoin(
        [CounterParty].[CounterParty].[CounterPartyGroup].Members,
        [Measures].[pnl.SUM]
        ) ON COLUMNS
        FROM (
        SELECT
        TopCount(
            Filter(
            [CounterParty].[CounterParty].Levels(
                1
            ).Members,
            NOT IsEmpty(
                [Measures].[pnl.SUM]
            )
            ),
            3,
            [Measures].[pnl.SUM]
        ) ON COLUMNS
        FROM [EquityDerivativesCube]
        )
        CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`;

const  Top3ValueContent = (props) => {
    const { mdx } = props;
    return (
        <div style={{ width: "100%", height: "310px" }}>
            <Container
                childKey="custom-top3-cpty-value"
                defaultValue={{
                    name: "Top 3 Counterparty",
                    value: {
                        "featured-values.handlers.contextmenu": [],
                        "featured-values.actions": [],
                        "featured-values.quickActions": [],
                        "featured-values.showWizard": true,
                        body: {
                            mdx,
                            updateMode: "realTime",
                        },
                        containerKey: "featured-values",
                        showTitleBar: false,
                    },
                }}
            />
        </div>
    );
}

export const showTop3Value: ActionPlugin = {
    key: "show-top3-cpty-value",
    createProperties(parameters, activeUI) {
        return {
            isAvailable(actionPayload: DockActionPayload) {
                return true;
            },
            getCaption(actionPayload: DockActionPayload) {
                return { textPath: "showTop3Ctpy" };
            },
            getIconSrcKey(actionPayload: DockActionPayload) {
                return "menuItem.icon.dockInLegend";
            },
            execute(event, actionPayload: DockActionPayload) {
                const { widgetApi } = actionPayload;
                const { mdx: mdxApi } = activeUI;
                const { filters: filterApi } = mdxApi;
                const mdx = getTopValueMdx;
                // get filter from current widget
                // refer to
                // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxfiltersapi.selectfilters.html#mdxfiltersapiselectfilters-property
                // https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.mdxparsingapi.parseexpression.html
                const pivotDs = widgetApi.getDataSource();
                const pivotMdx = pivotDs.getMdx();
                const discovery = pivotDs.getDiscovery();
                const cubeName = pivotDs.getCubeName();
                const statement = mdxApi.parsing.parseExpression(pivotMdx, discovery, {
                    cubeName,
                }) as SelectNode;

                // extract the filters applied on the pivot table to the feature value
                // we are only interested in the selectors added by users. Hence we are not using AllSelector here
                const widgetFilters = filterApi.selectFilters(
                    { statement, discovery },
                    filterApi.selectors.UserSelector.create()
                );

                // apply the filters to the mdx of the filter value.
                const newFVMdx = mdxApi.parsing.toString(
                    mdxApi.parsing.parseExpression(
                        mdxApi.transform(mdx, discovery, (snd) => {
                            let updatedSnd = _.cloneDeep(snd);
                            _.forEach(widgetFilters, (filter) => {
                                updatedSnd = mdxApi.filters.addFilter(
                                    updatedSnd,
                                    filterApi.LAST_POSITION,
                                    filter.key,
                                    filter.hierarchy,
                                    filter.value
                                );
                            });

                            return updatedSnd;
                        })
                    ),
                    { indent: true, notEmpty: () => true }
                );

                Modal.info({
                    title: "Top 3 Counterparties in Pnl.SUM",
                    content: (
                        <ActiveUIProvider activeUI={activeUI}>
                            <Top3ValueContent mdx={newFVMdx} />
                        </ActiveUIProvider>
                    ),
                    width: 600,
                });
            },
        };
    },
};
