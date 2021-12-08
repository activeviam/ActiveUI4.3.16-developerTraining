// TODO: 5.1.1 create and export an action plugin with the below values:
// isAvailable: to return true
// getCaption: to return translation mapping showSingleValue
// getIconSrcKey: choose a suitable icon key from showcase > Built-in Widgets > Icons
// execute: use console.log to print out the object actionPayload
// set debugger in each property step before the function return
// refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/plugins.html#implement-a-custom-action-plugin
import {ActionPayload, ActiveUI} from "@activeviam/activeui-sdk";

const cityHierarchy = "[Geography].[City]";
const currencyHierarchy = "[Currency].[Currency]";

const getCityCurrencyFromPayload = (payload: any, activeUI: ActiveUI) => {

    // refer to showcase for location information extraction : https://activeviam.jfrog.io/activeviam/activeui-generic-release/4.3.16/activeui-sdk-showcase-4.3.16.zip!/index.html#/Extract%20Locations%20Information%20from%20Pivot%20Table
    const location = activeUI.data.getLocationsInfoFromPayload(payload, "all")[0];
    if(location === undefined) {
        return undefined;
    } else {
        const {captions :cityCaption } = location.members[cityHierarchy] || {};
        const {captions: currencyCaption} = location.members[currencyHierarchy] || {};
        if (cityCaption === undefined || currencyCaption === undefined) {
            return undefined;
        } else {
            return {cityCaption, currencyCaption};
        }
    }
}

export const showSingleValue = {
    key: "show-single-value",
    createProperties(parameters: any, activeUI: ActiveUI) {
        return {
        isAvailable(actionPayload: ActionPayload) {
            //TODO: 5.2 destructure the actionPayload to extract actionSituation, widgetApi and context
            // assert if the action situation is "tabular-handler"
            // check if the widgetApi datasource uses mdx
            // check that the context is defined
            // check that currency and city are available in the payload

            //TODO: 5.1 Make the action always available
          return false;
        },

        getCaption( actionPayload : ActionPayload) {
          return { textPath: "custom action" };
        },
        getIconSrcKey(actionPayload: ActionPayload) {
          return 'menuItem.icon.dockInLegend';
        },
        execute(event: React.SyntheticEvent, actionPayload: ActionPayload) {

            //TODO: 5.1 : log the payload in the console
        }
      };
    },
};