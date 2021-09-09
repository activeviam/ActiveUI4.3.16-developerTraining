// 5.1.1 create and export an action plugin with the below values:
// isAvailable: to return true
// getCaption: to return translation mapping showSingleValue
// getIconSrcKey: choose a suitable icon key from showcase > Built-in Widgets > Icons
// execute: use console.log to print out the object actionPayload
// set debugger in each property step before the function return
// refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/plugins.html#implement-a-custom-action-plugin
import {ActionPayload} from "@activeviam/activeui-sdk";

export const showSingleValue = {
    key: 'show-diff-between-desks-value',
    createProperties(parameters: any, activeUI: any) {
      return {
        isAvailable(actionPayload: ActionPayload) {
          debugger;
          return true;
        },
        isDisabled(actionPayload: ActionPayload) {
          return false;
        },

        getCaption( actionPayload : ActionPayload) {
          debugger;
          return { textPath: "showPnLDiffBetweenDesks" };
        },
        getIconSrcKey(actionPayload: ActionPayload) {
          debugger;
          return 'menuItem.icon.dockInLegend';
        },
        execute(event: React.SyntheticEvent, actionPayload: ActionPayload) {
          debugger;
          console.log("actionPayload", actionPayload);
        }
      };
    }
};
