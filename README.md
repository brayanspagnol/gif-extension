# GIF Search Extension

This extension lets you search for GIFs and drag them straight from your browser into any app that accepts images.

## How to Install the Extension

1. Open Google Chrome and go to `chrome://extensions/`
   - You can also reach this page from the Chrome menu (three vertical dots) > More tools > Extensions

2. Turn on "Developer mode"
   - In the top right corner of the extensions page, you'll see a "Developer mode" toggle
   - Make sure it's on (the toggle should be blue)

3. Install the extension
   - Click the "Load unpacked" button at the top of the page
   - Go to the folder where you downloaded/cloned this project
   - Select the project's main folder (the one containing `manifest.json`, `popup.html`, etc.)
   - Click "Select Folder"

4. Done!
   - The extension should appear in your list of extensions
   - An extension icon will be added to the Chrome toolbar

## How to Use

1. Click the extension icon in the Chrome toolbar
2. Type your search term in the search box
3. Press Enter or click the search button
4. Drag any GIF straight into your app or document

## Notes

- The extension needs "Developer mode" because it's a local/development version
- If you update the extension's files, you'll need to click the "Update" button on the extensions page
- To remove the extension, just click "Remove" on the extensions page

## Troubleshooting

If the extension doesn't appear:
- Check that all the files are in the right folder
- Make sure `manifest.json` is present and correct
- Try reloading the extensions page
- Turn "Developer mode" off and back on
