/**
 * FigPM — code.js (OAuth version)
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the plugin's main thread. It runs inside Figma's sandbox and has
 * access to the Figma Plugin API (figma.*). It cannot make network requests
 * or access the DOM — all UI work happens in ui.html via postMessage.
 *
 * Responsibilities:
 *  1. Open the plugin UI panel
 *  2. Read saved credentials from clientStorage (persists across sessions)
 *  3. Send file info + saved credentials to the UI on startup
 *  4. Listen for messages from the UI (oauth callback, clear creds, close)
 * ─────────────────────────────────────────────────────────────────────────────
 */


// ── OPEN UI ──────────────────────────────────────────────────────────────────
// Show the plugin panel at 280×520px.
// __html__ is a special Figma constant that injects the contents of ui.html.
figma.showUI(__html__, { width: 280, height: 520 });


// ── INITIALISE ───────────────────────────────────────────────────────────────
// Runs immediately on plugin open.
// Reads any saved credentials from clientStorage, then sends everything
// the UI needs to decide whether to show OAuth button or auto-connect.
async function init() {

  // Attempt to load previously saved credentials.
  // Returns null if the user has never connected, or after a disconnect.
  const saved = await figma.clientStorage.getAsync('figpm_creds');

  // Send init message to ui.html with:
  //  - fileKey:      the key of the currently open Figma file (null on free plan team projects)
  //  - fileName:     the human-readable name of the current file
  //  - savedToken:   the user's Figma OAuth access token (if previously saved)
  //
  // NOTE: We only save the token — not the file key.
  // The file key always comes from the current Figma context (figma.fileKey),
  // so the plugin works correctly across different files automatically.
  figma.ui.postMessage({
    type:       'init',
    fileKey:    figma.fileKey || null,
    fileName:   figma.root.name || '',
    savedToken: saved ? saved.token : null,
  });
}

init();


// ── MESSAGE HANDLER ───────────────────────────────────────────────────────────
// Listens for messages sent from ui.html via parent.postMessage().
// Three message types are handled:
//
//  'save-oauth-token' — user completed OAuth flow; persist token to clientStorage
//  'clear-creds'      — user clicked Disconnect; wipe stored credentials
//  'close'            — close the plugin panel entirely
figma.ui.onmessage = async (msg) => {

  // Persist the user's Figma OAuth access token locally on their machine.
  // clientStorage is scoped to this plugin + this user — no one else can read it.
  // IMPORTANT: The token never leaves the user's machine. We do not send it
  // to any FigPM server. It is only used to call Figma's API directly from the plugin.
  if (msg.type === 'save-oauth-token') {
    await figma.clientStorage.setAsync('figpm_creds', {
      token: msg.token,
    });
    // Confirm save back to UI so it knows storage succeeded
    figma.ui.postMessage({ type: 'creds-saved' });
  }

  // Wipe saved credentials. Next plugin open will show the OAuth button.
  if (msg.type === 'clear-creds') {
    await figma.clientStorage.deleteAsync('figpm_creds');
  }

  // Close the plugin panel.
  if (msg.type === 'close') {
    figma.closePlugin();
  }

};