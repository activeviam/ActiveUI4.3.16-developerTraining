/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/

// =================================================================
//  Embed dashboard into container for rendering
// =================================================================
// 4.1.1 TODO: create a simple component that renders "Hello world"
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
// Refer to https://activeviam.com/activeui/documentation/4.3.11/dev/reference/sdk-api/activeui-sdk.reactcontainerimplementationstaticproperties.html
const MyCustomDashboardPlugin = {
    key: "myCustomContainer",
    staticProperties: {
        // ...
    },
};

// 4.1.3 TODO: export the container plugin by default