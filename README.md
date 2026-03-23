# FigPM

Feedback ownership and status tracking for Figma. Stop losing design feedback in comment threads.

## What is FigPM?

FigPM brings visibility to design feedback. When PMs leave comments in Figma, they disappear in threads. FigPM wraps Figma's native comments with:

- **Status tracking** — Open, In Progress, Needs Clarification, Done
- **Ownership** — see who owns each piece of feedback
- **PM dashboard** — track feedback progress without opening Figma
- **Two-way sync** — status changes in the plugin sync to the web app and back

Designers use the plugin sidebar. PMs monitor from a web dashboard. Feedback stays in Figma.

## Installation

### From Figma Community (Recommended)
1. Open Figma
2. Go to **Assets > Plugins**
3. Search for "FigPM"
4. Click **Install**

### Manual Installation (for development)
1. Clone this repo
2. In Figma, go to **Plugins > Development > New plugin**
3. Choose **Link existing plugin**
4. Point to this folder's `manifest.json`

## Getting Started

### First Time Setup

1. **Open a Figma file** with comments
2. **Run FigPM plugin** — Plugins menu > FigPM
3. **Click "Connect with Figma OAuth"**
4. **Approve** Figma's permission request
5. **Plugin loads** — you'll see all comments grouped by status

That's it. Your token is stored locally on your machine. Never sent to our servers.

### Using the Plugin

- **Filter tabs** — All / Open / Resolved comments
- **Click a comment** — expand to see full text and change status
- **Status buttons** — Open, In Progress, Clarify, Done
- **Sync button** — refresh to pull latest comments from Figma
- **Disconnect** — wipe your stored credentials

### Web Dashboard (Coming Soon)

PMs will be able to log in and see real-time feedback status across all files without opening Figma. Sign up at [figpm.com](https://figpm.com) for early access.

## Troubleshooting

### "Connection failed. Check your token has read access"

**Cause:** Your Figma account doesn't have permission to access this file, or the token expired.

**Fix:**
1. Make sure you're logged into the correct Figma account
2. Disconnect (red X button)
3. Reconnect via OAuth
4. Try again

### "Missing file key or token"

**Cause:** Plugin couldn't detect the current Figma file.

**Fix:**
1. Make sure you have a Figma file open
2. Disconnect and reconnect

### "Rate limited. Please try again in a moment"

**Cause:** Too many API calls in a short time.

**Fix:** Wait 30 seconds and try again. This is rare and usually only happens during initial setup.

### Plugin won't load

**Cause:** Figma plugin cache issue.

**Fix:**
1. Close the plugin
2. Restart Figma
3. Reopen the plugin

## Features

✅ **Comment tracking** — see all feedback in one place  
✅ **Status management** — Open, In Progress, Needs Clarification, Done  
✅ **Real-time sync** — fetch latest comments with one click  
✅ **Dark/light theme** — matches your Figma preference  
✅ **Filter tabs** — quickly find open vs resolved feedback  
🔜 **PM web dashboard** — coming soon  
🔜 **Two-way sync** — reply from web app to Figma comments  
🔜 **Slack notifications** — get alerts when feedback status changes  

## Privacy & Security

- **Your token is never stored on our servers.** It lives locally on your machine in Figma's `clientStorage`.
- **Comments are never stored by FigPM.** We fetch them from Figma's API on demand.
- **No tracking, no analytics, no data selling.**

## Support

Found a bug? Have a feature request? Email us at **figmapmplugin@gmail.com**

## License

MIT

---

Made with ❤️ by [Shrikant Naik](https://twitter.com/shr1kant)
