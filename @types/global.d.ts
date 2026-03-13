declare module '*.scss';


declare const __DEV__: boolean;
declare const __MODULE_TITLE__: string;
const __MODULE_ID__ = "easy-macro-execution";
declare const __MODULE_VERSION__: string;



declare global {
  interface SettingConfig {
    "easy-macro-execution.addToListItem": boolean;
    "easy-macro-execution.addToContextMenu": boolean;
  }
}