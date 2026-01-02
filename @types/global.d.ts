declare module '*.scss';


declare const __DEV__: boolean;
declare const __MODULE_TITLE__: string;
const __MODULE_ID__ = "macro-executor";
declare const __MODULE_VERSION__: string;




interface SettingConfig {
  [__MODULE_ID__]: {
    addToListItem: boolean;
    addToContextMenu: boolean;
  }
}