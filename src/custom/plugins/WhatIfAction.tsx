// exo 8 util method
import {Input, InputNumber} from "antd";
import Modal from "antd/lib/modal";
import React from "react";
import axios from "axios";

/**
 * Send a rest request to activepivot
 * @param {String} url
 * @param {Object} object
 * @param {Object} widgetApi
 * @param {Number} code
 * @param {String} issueMessage
 * @return {Any} return true if the request succeeds or an alert if there is an issue
 */
const sendRequestToAP = (url, object, widgetApi, code, issueMessage) => {
  // create a xhr request with POST method, url, stringify object, authorization/content-type/accept headers
  // add a readyStateChange method handling the case of an error
  const credentialsBase64 = window.btoa("admin:admin");

  axios.post(url,object, {
    headers: {
      'Authorization': `Basic ${credentialsBase64}`
    }
  }).then(res=>{
    console.log(`got response ${res.status} `, res.data)
    widgetApi.getDataSource().refreshQuery();
  }).catch(error=>{
    alert(issueMessage)
  })
};

const EnterBranchNamePopup = (props) => {
  const { branchName } = props;
  const [branch, setBranch] = React.useState(branchName);
  const onChange = props.onChange;

  React.useEffect(() => {
    onChange(branch);
  }, [branch, onChange]); //only rerun effect if selected or onChange changes

  function handleChange(event) {
    console.log("changed", event.target.value);
    setBranch(event.target.value);
  }

  return (
      <div>
        <div>Choose the name of the branch</div>
        <Input
            style={{ width: "100%", marginBottom: 8 }}
            defaultValue={branchName}
            onChange={handleChange}
            placeholder="New branch name"
        />
      </div>
  );
};


export const createWhatIf = {
  key: "create-what-if-branch",
  createProperties(parameters, activeUI) {
    return {
      isAvailable({ actionSituation, widgetApi, context }) {
        // 8.1 make sure the plugin is only available if it's on a dock and mdx is used
        return (
            actionSituation === "dock-action" &&
            widgetApi.getDataSource().usesMdx()
        );
      },
      getCaption({ widgetApi }) {
        return { textPath: "createWhatIfCaption" };
      },
      getIconSrcKey() {
        return "common.add";
      },
      execute(event, { widgetApi, context }) {
        // set a default branch name
        let branchName = "new_branch";
        console.log("adding new branch");

        // 8.1 TODO: create a modal.confirm() which will let you enter a name for the new branch and create it using a datastore query
        // you should pass an onChange callback to get the branchName and update the onOk() method to create the branch
        // you should use the sendRequestToAP with this url http://localhost:9090/pivot/rest/v4/datastore/branches/ and POST method
        // you need to add authorization with 'admin:admin'
        // update a whatIfObj {parent: 'master', name: branchName};
        // you can use  widgetApi.getDataSource().refreshQuery() to refresh the query after branch creation
        // ...
        Modal.confirm({
          title: "New what-if creation",
          getContainer: () => document.getElementById("popup"),
          okText: "Create branch",
          content: (
              //TODO: use the EnterBranchNamePopup component
              <p>Hello world</p>
          ),
          async onOk() {
            const whatIfObj = {
              parent: "master",
              name: branchName,
            };
            sendRequestToAP(
                "http://localhost:9090/pivot/rest/v4/datastore/branches",
                whatIfObj,
                widgetApi,
                201,
                "Issue while creating the new branch"
            )
          }
        })
      },
    };
  },
};

const UpdateForexRatePopup = (props) => {
  const { rate: defaultRate, currency } = props;

  const [rate, setRate] = React.useState(defaultRate);
  const onChange = props.onChange;

  React.useEffect(() => {
    onChange(rate);
  }, [rate, onChange]); //only rerun effect if selected or onChange changes

  function handleChange(value) {
    console.log("changed", value);
    setRate(value);
  }

  return (
      <div>
        <div>Choose the new forex rate for {currency}</div>
        <InputNumber
            min={0}
            style={{ width: "100%", marginBottom: 8 }}
            defaultValue={rate}
            onChange={handleChange}
            placeholder="new forex rate"
        />
      </div>
  );
};


export const updateBranchRowAction = {
  key: "update-branch-row-action",
  createProperties(parameters, activeUI) {
    return {
      getIconKey() {
        return "button.details";
      },
      getIconTitle() {
        return { text: "Update latest branch data" };
      },
      isDisabled({ columnProps }) {
        // 8.2 TODO: make this action available only if there is at least one whatif branch (check headers of data)
        return true
      },
      onClick(e, { columnProps, rowIndex }) {
        // 8.2 TODO: get lastbranch, name and currency caption from headers and content of columnProps data
        // ...
          // use a random default rate
          let rate = 1.236;

          // 8.2 TODO: create a modal.confirm() which will let you enter a rate for the new branch and update it in the datastore
          // you should pass an onChange callback to get the rate and update the onOk() method to update the branch
          // you should use the sendRequestToAP with this url http://localhost:9090/pivot/rest/v5/datastore/data/branches/(branchName) and POST method
          // update a whatIfUpdateObj {actions: [{action: 'UPDATE',basestore: "Forex",where: {Currency: currency},updateProcedure: {Rate: rate}}]};

      },
    };
  },
};
