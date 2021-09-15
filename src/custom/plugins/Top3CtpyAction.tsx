// 6.1.4 TODO: create an action plugin that opens a modal popup.
// The modal popup contains a “featured-values” container
// The featured value widget should display the top 3 counterparties with the highest pnl.SUM value
//      - To get the mdx, you can apply the featured value widget from the GUI and formulate the resultant mdx
//        using the wizard.
// Filters from the source widget should be applied to the featured-values container.
//      - To do so, as per exercise 5.6, you need to extract the filters from the source widget using activeUI.mdx.filters.selectFilters
//      - Refer to https://activeviam.com/activeui/documentation/4.3.11/dev/reference/sdk-api/activeui-sdk.mdxfiltersapi.selectfilters.html#mdxfiltersapiselectfilters-property
//          >> Use activeUI.mdx.parsing.parseExpression to derive your statement
//          >> Use widgetApi.getDataSource() to obtain the discovery and cubeName that is required to generate your statement.
//          >> https://activeviam.com/activeui/documentation/4.3.11/dev/reference/sdk-api/activeui-sdk.mdxparsingapi.parseexpression.html#mdxparsingapiparseexpression-property
//      - Refer to showcase example > MDX Filtering on how to parse the featured value's mdx into a node before applying new filters on the mdx.
// You should be able to use activeUI.mdx.parsing.toString to obtain the mdx string for the feature value's definition
// For validation purpose, you can set "featured-values.showWizard" to true. This way, you will be able to view the filters and mdx applied to the feature value
