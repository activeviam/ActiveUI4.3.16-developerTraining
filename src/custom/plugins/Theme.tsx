/*******************************************************************************
 * (C) ActiveViam 2019
 * ALL RIGHTS RESERVED. This material is the CONFIDENTIAL and PROPRIETARY
 * property of ActiveViam. Any unauthorized use,
 * reproduction or transfer of this material is strictly prohibited
 *******************************************************************************/

const themePlugin = {
  key: "erste",
  // returns an object of type ThemeImplementationProperties
  createProperties(parameters: any, activeUI: any) {
    // 2.1 TODO: Ex-2 Define your own theme.
    // Refer to https://activeviam.com/activeui/documentation/4.3.16/dev/reference/plugins.html#theme
    // for the available options
    return {
      isDark: false,
      palette: {
        primaryColor: "#ff0000",
        errorColor: "#F06292",
        successColor: "#CDDC39",
        warningColor: "#FF9800",
      },
    };
  },
};

export default themePlugin;
