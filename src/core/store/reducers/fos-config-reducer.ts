import { createReducer, on } from "@ngrx/store";
import { globalState } from "../globalState";
import {
  actionMyRequestSearchSettings,
  actionMyRequestTableDataSettings,
  actionMyRequestTableSettings,
  actionMyRequestTableUserSettings,
  actionRequestInterestedTableSettings,
  actionRequestTabViewSettings,
  actionUserSettings
} from "../actions/fos-config-actions";

/**
 * Reducer for updating the config
 */
export const myRequestConfigReducer = createReducer(
  globalState.config.myRequest,
  on(actionMyRequestTableSettings, (state, tableSettingsData) => ({
    ...state,
    tableSetting: tableSettingsData.tableSetting,

  })),
  on(actionMyRequestSearchSettings, (state, searchSettingsData) => ({
    ...state,
    searchSetting: searchSettingsData.searchSetting
  })),
  on(actionMyRequestTableDataSettings, (state, tableDataSettingsData) => ({
    ...state,
    tableDataSetting: tableDataSettingsData.tableDataSetting
  }))
)

/**
 * Reducer for updating the config
 */
export const requestConfigReducer = createReducer(
  globalState.config.request,
  on(actionRequestTabViewSettings, (state, tabViewSettings) => ({
    ...state,
    tabViewSetting: tabViewSettings.tabViewSetting
  }))
)

/**
 * Reducer for storing the user config
 */
export const userSettingReducer = createReducer(
  globalState.userConfig,
  on(actionUserSettings, (state, userConfigData) => ({
    ...state,
    userSettings: userConfigData.userConfig.userSettings
  }))
)

/**
 * Reducer for storing table settings
 */
export const myRequestTableUserSetting = createReducer(
  globalState.userConfig.userSettings.myRequests.tableSettings,
  on(actionMyRequestTableUserSettings, (state, tableSettings) => ({
    ...state,
    tableSettings: tableSettings.tableSettings
  }))
)

/**
 * Reducer for storing the interested party table settings
 */
export const requestInterestedPartySettingsReducer = createReducer(
  globalState.config.ccRequestInterestedParty,
  on(actionRequestInterestedTableSettings, (state, tableSettingsData) =>({
    ...state,
    columnConfig: tableSettingsData.tableSettings.columnConfig,
    rowsPerPageOptions: tableSettingsData.tableSettings.rowsPerPageOptions,
    rowsPerPages: tableSettingsData.tableSettings.rowsPerPages,
    sortField: tableSettingsData.tableSettings.sortField,
    sortOrder: tableSettingsData.tableSettings.sortOrder
  }))
);


