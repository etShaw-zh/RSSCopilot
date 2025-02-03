import { config } from "../../package.json";
import { getString } from "../utils/locale";

export async function registerPrefsScripts(_window: Window) {
  if (!addon.data.prefs) {
    addon.data.prefs = {
      window: _window,
      columns: [],
      rows: [],
    };
  } else {
    addon.data.prefs.window = _window;
  }

  // Initialize preferences if not set
  initializePrefs();

  // Bind event listeners
  bindPrefEvents();
}

function initializePrefs() {
  const prefs = Zotero.Prefs;
  const baseKey = `extensions.zotero.${config.addonRef}`;

  // Initialize Language Model preferences
  if (!prefs.get(`${baseKey}.modelType`)) {
    prefs.set(`${baseKey}.modelType`, "model2");
  }
  if (!prefs.get(`${baseKey}.apiKey`)) {
    prefs.set(`${baseKey}.apiKey`, "");
  }

  // Initialize Relevance Thresholds
  if (!prefs.get(`${baseKey}.thresholdHigh`)) {
    prefs.set(`${baseKey}.thresholdHigh`, 90);
  }
  if (!prefs.get(`${baseKey}.thresholdMedium`)) {
    prefs.set(`${baseKey}.thresholdMedium`, 70);
  }
  if (!prefs.get(`${baseKey}.thresholdLow`)) {
    prefs.set(`${baseKey}.thresholdLow`, 50);
  }

  // Initialize Performance Settings
  if (!prefs.get(`${baseKey}.dbLocation`)) {
    prefs.set(`${baseKey}.dbLocation`, "");
  }
  if (!prefs.get(`${baseKey}.cacheSize`)) {
    prefs.set(`${baseKey}.cacheSize`, 500);
  }
  if (!prefs.get(`${baseKey}.autoCleanup`)) {
    prefs.set(`${baseKey}.autoCleanup`, true);
  }
}

function bindPrefEvents() {
  if (!addon.data.prefs?.window) return;

  const doc = addon.data.prefs.window.document;

  // Model Type Change
  doc
    .querySelector(`#zotero-prefpane-${config.addonRef}-model-type`)
    ?.addEventListener("command", async (e) => {
      const modelType = (e.target as XUL.MenuList).value;
      await updateModelType(modelType);
    });

  // API Key Change
  doc
    .querySelector(`#zotero-prefpane-${config.addonRef}-api-key`)
    ?.addEventListener("change", async (e) => {
      const apiKey = (e.target as HTMLInputElement).value;
      await updateApiKey(apiKey);
    });

  // Threshold Changes
  ["High", "Medium", "Low"].forEach((level) => {
    doc
      .querySelector(`#zotero-prefpane-${config.addonRef}-threshold-${level}`)
      ?.addEventListener("change", async (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        ztoolkit.log(level, value);
        await updateThreshold(level, value);
      });
  });

  // Cache Size Change
  doc
    .querySelector(`#zotero-prefpane-${config.addonRef}-cache-size`)
    ?.addEventListener("change", async (e) => {
      const size = parseInt((e.target as HTMLInputElement).value);
      await updateCacheSize(size);
    });

  // Auto Cleanup Change
  doc
    .querySelector(`#zotero-prefpane-${config.addonRef}-auto-cleanup`)
    ?.addEventListener("command", async (e) => {
      const enabled = (e.target as XUL.Checkbox).checked;
      await updateAutoCleanup(enabled);
    });
}

async function updateModelType(modelType: string) {
  try {
    // Validate model type
    if (!["model1", "model2"].includes(modelType)) {
      throw new Error("Invalid model type");
    }

    // Save preference
    Zotero.Prefs.set(
      `extensions.zotero.${config.addonRef}.modelType`,
      modelType,
    );

    showSuccessMessage("prefs-update-success");
  } catch (error) {
    ztoolkit.log("Error updating model type", error);
    showErrorMessage("prefs-update-error");
  }
}

async function updateApiKey(apiKey: string) {
  try {
    // Save preference
    Zotero.Prefs.set(`extensions.zotero.${config.addonRef}.apiKey`, apiKey);

    showSuccessMessage("prefs-update-success");
  } catch (error) {
    ztoolkit.log("Error updating API key", error);
    showErrorMessage("prefs-update-error");
  }
}

async function updateThreshold(level: string, value: number) {
  try {
    // Validate threshold
    if (value < 0 || value > 100) {
      throw new Error("Threshold must be between 0 and 100");
    }

    // Save preference
    Zotero.Prefs.set(
      `extensions.zotero.${config.addonRef}.threshold${level.charAt(0).toUpperCase() + level.slice(1)}`,
      value,
    );

    showSuccessMessage("prefs-update-success");
  } catch (error) {
    ztoolkit.log("Error updating threshold", error);
    showErrorMessage("prefs-update-error");
  }
}

async function updateCacheSize(size: number) {
  try {
    // Validate cache size
    if (size < 100 || size > 1000) {
      throw new Error("Cache size must be between 100MB and 1000MB");
    }

    // Save preference
    Zotero.Prefs.set(`extensions.zotero.${config.addonRef}.cacheSize`, size);

    showSuccessMessage("prefs-update-success");
  } catch (error) {
    ztoolkit.log("Error updating cache size", error);
    showErrorMessage("prefs-update-error");
  }
}

async function updateAutoCleanup(enabled: boolean) {
  try {
    // Save preference
    Zotero.Prefs.set(
      `extensions.zotero.${config.addonRef}.autoCleanup`,
      enabled,
    );

    showSuccessMessage("prefs-update-success");
  } catch (error) {
    ztoolkit.log("Error updating auto cleanup", error);
    showErrorMessage("prefs-update-error");
  }
}

export async function onPrefsEvent(type: string, data: { window: Window }) {
  switch (type) {
    case "load":
      // Initialize UI elements
      break;

    case "chooseLocation":
      await chooseDbLocation(data.window);
      break;

    case "rebuildIndex":
      await rebuildIndex();
      break;

    case "clearCache":
      await clearCache();
      break;
  }
}

async function chooseDbLocation(window: mozIParentNode) {
  try {
    const fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
    fp.init(
      window,
      getString("pref-choose-location"),
      Ci.nsIFilePicker.modeGetFolder,
    );

    const rv = await new Promise((resolve) => fp.open(resolve));
    if (rv == Ci.nsIFilePicker.returnOK) {
      const path = fp.file.path;

      // Save preference
      Zotero.Prefs.set(`extensions.zotero.${config.addonRef}.dbLocation`, path);

      // Update input field
      const input = window.document?.querySelector(
        `#zotero-prefpane-${config.addonRef}-db-location`,
      ) as HTMLInputElement;
      if (input) {
        input.value = path;
      }

      showSuccessMessage("prefs-update-success");
    }
  } catch (error) {
    ztoolkit.log("Error choosing database location", error);
    showErrorMessage("prefs-update-error");
  }
}

async function rebuildIndex() {
  try {
    // TODO: Implement index rebuilding logic
    // This should:
    // 1. Clear existing vector database
    // 2. Scan library for all papers
    // 3. Generate new vectors for each paper
    // 4. Save vectors to database

    showSuccessMessage("prefs-rebuild-index-success");
  } catch (error) {
    ztoolkit.log("Error rebuilding index", error);
    showErrorMessage("prefs-rebuild-index-error");
  }
}

async function clearCache() {
  try {
    // TODO: Implement cache clearing logic
    // This should:
    // 1. Clear vector cache
    // 2. Clear any temporary files
    // 3. Reset cache statistics

    showSuccessMessage("prefs-clear-cache-success");
  } catch (error) {
    ztoolkit.log("Error clearing cache", error);
    showErrorMessage("prefs-clear-cache-error");
  }
}

function showSuccessMessage(messageId: string) {
  new ztoolkit.ProgressWindow(config.addonName)
    .createLine({
      text: getString(messageId),
      type: "success",
    })
    .show();
}

function showErrorMessage(messageId: string) {
  new ztoolkit.ProgressWindow(config.addonName)
    .createLine({
      text: getString(messageId),
      type: "error",
    })
    .show();
}
