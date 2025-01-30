declare const _globalThis: {
  [key: string]: any;
  Zotero: _ZoteroTypes.Zotero;
  ztoolkit: ZToolkit;
  addon: typeof addon;
};

declare type ZToolkit = ReturnType<
  typeof import("../src/utils/ztoolkit").createZToolkit
>;

declare const ztoolkit: ZToolkit;

declare const rootURI: string;

declare const addon: import("../src/addon").default;

declare const __env__: "production" | "development";

declare interface nsIFilePicker {
  init(parent: mozIParentNode | null, title: string, mode: number): void;
  open(callback: (rv: number) => void): void;
  file: string;
}

declare interface mozIParentNode {
  document?: Document;
}

declare const Ci: {
  nsIFilePicker: nsIFilePicker & {
    modeGetFolder: number;
    returnOK: number;
  };
};
