// exo 8 util method
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
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", readyStateChange);

  function readyStateChange() {
    if (this.readyState === 4) {
      if (this.status !== code) {
        return alert(issueMessage);
      } else {
        widgetApi.getDataSource().refreshQuery();
        return true;
      }
    }
  }

  xhr.open("POST", url);
  xhr.setRequestHeader("Authorization", `Basic ${credentialsBase64}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(JSON.stringify(object));
};

export const createWhatIf = {
  key: "create-what-if-branch",
  createProperties(parameters, activeUI) {
    return {
      isAvailable({ actionSituation, widgetApi, context }) {
        // 8.1 make sure the plugin is only available if it's on a dock and mdx is used
        // ...
        return true;
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

        // 8.1 TODO: create a modal.confirm() which will let you enter a name for the new branch and create it using a datastore query
        // you should pass an onChange callback to get the branchName and update the onOk() method to create the branch
        // you should use the sendRequestToAP with this url http://localhost:9090/pivot/rest/v5/datastore/branches/ and POST method
        // you need to add authorization with 'admin:admin'
        // update a whatIfObj {parent: 'master', name: branchName};
        // you can use  widgetApi.getDataSource().refreshQuery() to refresh the query after branch creation
        // ...
      },
    };
  },
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
        // ...
        return true;
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
        // ...
      },
    };
  },
};
