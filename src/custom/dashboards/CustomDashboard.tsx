/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/

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
            {
                //...
            }
        </div>
    );
}

// 4.1.2 TODO: define a custom plugin that uses the MyDashboardComponent defined in 4.1
// Refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/sdk-api/activeui-sdk.reactcontainerimplementationstaticproperties.html
// for icons:  https://activeviam.jfrog.io/activeviam/activeui-generic-release/4.3.16/activeui-sdk-showcase-4.3.16.zip!/index.html#/Icons
const MyCustomDashboardPlugin = {
    key: "myCustomContainer",
    staticProperties: {
        // ...
    },
};

// 4.1.3 TODO: export the container plugin by default