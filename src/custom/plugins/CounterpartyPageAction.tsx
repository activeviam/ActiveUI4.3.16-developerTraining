// 6.1.3 TODO: import the ctpyPage from 6.1.2
// ...

import {DashboardApi} from "@activeviam/activeui-sdk";
import {ctpyPage} from "../components/dashboards/CounterpartyPage";

const counterPartyHierarchy = "[CounterParty].[CounterParty]";

// 6.1.1 TODO: reuse / refactor your code to create a function for both 
// isAvailable and execute to get the value of City and Currency
// make use of activeUI.data.getLocationsInfoFromPayload
// refer to showcase example > Extract Locations Information
const getCounterpartyFromPayload = (payload, activeUI) => {
    const location = activeUI.data.getLocationsInfoFromPayload(payload)[0];
    if (location === undefined) {
        return undefined;
    } else {
        const {captions: ctpyCaption} =
        location.members[counterPartyHierarchy] || {};
        if (ctpyCaption === undefined) {
            return undefined;
        }
        return ctpyCaption;
    }
};

// 6.1.1 
export const ctpyPageAction = {
    key: 'ctpy-page-action',
    createProperties(parameters, activeUI) {
        return {
            isAvailable(actionPayload) {
                const { actionSituation, context } = actionPayload;

                return true;
            },
            getCaption({ widgetApi }) {
                return { textPath: "ctpyPage" };
            },
            getIconSrcKey(actionPayload) {
                return 'menuItem.icon.dockInLegend';
            },
            execute(event, actionPayload) {
                const {widgetApi} = actionPayload;
                const counterParty = getCounterpartyFromPayload(actionPayload, activeUI);
                
                // 6.1.3 TODO: get the counterparty page definition by passing in the selected counterparty value
                // Refer to Showcase example > Story Telling with Dashboard Pages
                // Get the parent dashboard in order to trigger addPage(<new page definition>)
                // Pay attention that this action is triggered within a custom container. 
                // the parent dashboard is the parent of the container where this widget resides in
                // ...
                const newPage = ctpyPage(counterParty);
                // pay attention that this action is triggered within a custom container.
                // the parent dashboard is the parent of the container where this widget resides in
                const widgetParent: any = widgetApi.getParent();
                const parentDashboard: DashboardApi = widgetParent.getParentDashboard();
                parentDashboard.addPage(newPage);
            }
        };
    }
};