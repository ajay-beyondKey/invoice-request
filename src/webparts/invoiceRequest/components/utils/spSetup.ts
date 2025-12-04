// spSetup.ts
import { spfi, SPFx } from "@pnp/sp/presets/all";

let _sp: ReturnType<typeof spfi> | null = null;

/**
 * Call this from the web part onInit() with the web part context.
 */
export function setupPnp(context: any) {
  // create the sp instance bound to SPFx
  _sp = spfi().using(SPFx(context));
}

/**
 * Returns the initialized sp instance. Throws if not initialized.
 */
export function getSp() {
  if (!_sp) {
    throw new Error("PnPjs sp not initialized. Call setupPnp(context) in the webpart onInit().");
  }
  return _sp;
}
