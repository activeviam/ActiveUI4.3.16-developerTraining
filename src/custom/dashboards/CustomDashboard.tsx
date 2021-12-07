/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/
import React from "react";
import {Container, ContainerFullValue} from "@activeviam/activeui-sdk";
import {ctpyPageAction} from "../plugins/CounterpartyPageAction";
import {showTop3Value} from "../plugins/Top3CtpyAction";
import {enhancedPivotTable} from "../widgets/initialWidgets/enhancedPivotTable";



// =================================================================
//  Embed dashboard into container for rendering
// =================================================================
//    TODO: Ex4.1 create a simple component that renders "Hello world"
//    TODO: Ex4.3 -
//           - create  <div> with width 50%, height 100%
//           - put myPivotTable contaienr in the first div
//    TODO: Ex4.4
//           - add container with childKey myChart, and defaultValue MyChartValue
//

const myPivotMdx = `SELECT 
                    NON EMPTY Hierarchize(Hierarchize(DrilldownLevel([CounterParty].[CounterParty].[ALL].[AllMember]))) ON ROWS, 
                    NON EMPTY Crossjoin([Measures].[pnl.SUM], [Currency].[Currency].[Currency].Members) ON COLUMNS 
                    FROM [EquityDerivativesCube] 
                    CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS`;

const MyPivotValue: ContainerFullValue = {
    name: "Pivot Table",
    type: "container",
    value: {
        // TODO: Ex6.1.2 - Add key of ctpyPageAction to the pivot's context menu (note contextmenu is an array)
        // Refer to https://activeviam.com/activeui/documentation/4.3.11/dev/reference/settings.html#pivot-tablehandlerscontextmenu
        "pivot-table.handlers.contextmenu": [],
        // TODO: Ex6.1.5 - Add key of showTop3Value to the quick Action
        // Refer to https://activeviam.com/activeui/documentation/4.3.11/dev/reference/settings.html#pivot-tablequickactions
        // Inherit the default list of actions
        // ...
        "pivot-table.quickActions": [
            "update-query-mode",
            "full-size",
        ],
        style: {},
        showTitleBar: true,
        containerKey: "pivot-table",
        body: {
            mdx: myPivotMdx,
            // NOTE: Commenting out the line below will make the pivot table use all default settings instead of our custom ones.
            configuration: enhancedPivotTable,
        },
    },
    writable: false,
};

const myChartMdx = `SELECT 
                    NON EMPTY Crossjoin(
                      [CounterParty].[CounterParty].[CounterPartyGroup].Members, 
                      [Currency].[Currency].[Currency].Members
                    ) ON ROWS, 
                    NON EMPTY [Measures].[pnl.SUM] ON COLUMNS 
                    FROM [EquityDerivativesCube]`;

const MyChartValue: ContainerFullValue = {
    type: "container",
    writable: false,
    name: "Chart",
    value: {
        showTitleBar: true,
        containerKey: "chart",
        body: {
            configuration: {
                elementStylers: ["selection-highlight"],
                // type determines the type of charts to be rendered
                // in this example, we are using the plotly "100% stacked columns" chart
                type: "plotly-100-stacked-column-chart",
                mapping: {
                    xAxis: ["[CounterParty].[CounterParty].[CounterPartyGroup]"],
                    values: ["[Measures].[pnl.SUM]"],
                    stackBy: ["[Currency].[Currency].[Currency]"],
                },
            },
            query: {
                mdx: myChartMdx,
                updateMode: "realTime",
            },
        },
    },
};


function MyDashboardComponent() {
    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                width: "100%",
                flexDirection: "row",
            }}
        >
        </div>
    );
}

// 4.1.2 TODO: define a custom plugin that uses the MyDashboardComponent defined in 4.1
// Refer to https://activeviam.com/activeui/documentation/4.3.11/dev/reference/sdk-api/activeui-sdk.reactcontainerimplementationstaticproperties.html
// for icons:  https://activeviam.jfrog.io/activeviam/activeui-generic-release/4.3.16/activeui-sdk-showcase-4.3.16.zip!/index.html#/Icons
const MyCustomDashboardPlugin = {
    staticProperties: {
        category: "custom",
        initialValue: {
            actions: [],
            containerKey: ""  // container key must match the plugin key
        }
    },
};

// 4.1.3 TODO: export the container plugin by default
