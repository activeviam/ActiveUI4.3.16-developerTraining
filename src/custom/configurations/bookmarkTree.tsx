/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/
import {serializedShareAction} from "../../components/header/file/SubMenu";


let handlersContextMenu: any[] = [];

if (window.env.reporting && window.env.reporting.enabled) {
  handlersContextMenu = [
    "pdf-export",
    "schedule-report",
    // "remote-bookmark",
    "separator"
  ];
}

// Change the context menu options according to the enableReporting setting from the env.js
handlersContextMenu = handlersContextMenu.concat([
  "rename-server",
  "delete-server",
  "separator",
  "create-folder",
  "separator",
  "load-bookmark",
  "edit-bookmark",
  serializedShareAction,
  "add-to-favorites",
  "separator",
  "open-widget-to-modify",
  "make-home-page",
  "bookmark-state-editor",
  "separator",
  "delete-bookmark"
]);

const bookmarkTreeHandlersContextMenu = handlersContextMenu;

export { bookmarkTreeHandlersContextMenu };
