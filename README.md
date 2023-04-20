# Website Text Extractor - Rewrite with GPT

This Chrome extension allows you to extract highlighted text from a webpage and rephrase it using GPT. The extension supports multiple languages including English and Danish.

## Installation
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the downloaded repository folder.

## Usage
1. Highlight the text you want to rephrase on any webpage.
2. Click on the extension icon in the Chrome toolbar.
3. Select the desired output language from the dropdown menu.
4. Click the "Rephrase text" button to generate the rephrased text.
5. Click the "Copy to clipboard" button to copy the rephrased text.

## API
- The extension communicates with the ChatGPT API provided by fruity-ai.com to generate summaries.
- The API is hosted at https://gpt-summarizer-5oxqvewo.ew.gateway.dev/summary/.

## API Key
- The extension requires an API key to communicate with the ChatGPT API. To obtain an API key, please contact the developers at fruity-ai.com.
- Replace the placeholder `--API-KEY-GOES-HERE--` in `popup.js` with your API key.

## Support
- For any issues or questions, please contact the developers at fruity-ai.com.
