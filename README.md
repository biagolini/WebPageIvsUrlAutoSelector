# Automatic URL Selection for Video Streaming

## Overview

This project demonstrates how to set up a video streaming solution with automatic URL selection using Video.js and Amazon Interactive Video Service (IVS). The application checks the health of multiple streaming URLs and switches to a healthy one if the current URL becomes unavailable.

## Features

- Automatic URL Selection: Automatically switches to a healthy URL if the current stream becomes unavailable.
- Configurable URL List: Supports any number of streaming URLs. Just update the streamUrls and urlHealth variables to suit your needs.
- Health Check Interval: Periodically checks the health of the current stream to ensure continuous playback.
- Console Output: Logs messages to the console to provide feedback about the player's state and health checks, aiding in debugging and understanding the flow of operations.

## Project Contents

- index.html: The main HTML document containing the structure of the web page.
- styles.css: CSS file for styling the webpage, including the layout of the video player and form inputs.
- script.js: JavaScript file that handles the logic for initializing the video player, managing the streaming URLs, and checking their health.

## How It Works

The application uses Amazon IVS with Video.js to create a resilient video streaming experience. It maintains a list of streaming URLs and periodically checks the health of the current URL. If the current URL becomes unhealthy, it automatically switches to the next healthy URL in the list.

## Key Functions

- Video.js Integration: Utilizes Video.js, a popular open-source video player, to handle video playback.
- Amazon IVS Tech: Integrates Amazon IVS as the playback technology within Video.js, enabling robust streaming capabilities.
- Health Check Logic: Periodically checks the health of streaming URLs and switches to a healthy one if needed.

## Setup and Usage

To use this project:

1. Clone or download the repository to your local machine.
2. Open the index.html file in a modern web browser that supports JavaScript and HTML5.
3. Update the streamUrls and urlHealth variables in the script.js file with your streaming URLs.
4. The application will automatically start streaming from the first URL and switch to a healthy URL if the current one fails.

## Console Outputs

When using the application, the console (accessible via your web browser's developer tools) will display messages indicating the state of the player and health checks:

- "Checking URL health...": Indicates that a health check of all URLs is being performed.
- "URL [url] is healthy": Indicates that the specified URL is healthy.
- "URL [url] is unhealthy": Indicates that the specified URL is unhealthy.
- "Player is ready to use!": Confirms that the video player has been initialized and is ready for interaction.

## Testing

This project was tested using Amazon IVS with a channel configured for low-latency. This setup is intended to provide a real-time streaming experience with minimal delay, suitable for scenarios where interaction and immediacy are critical.

## Contributing

Feel free to submit issues, create pull requests, or fork the repository to help improve the project.

## License and Disclaimer

This project is open-source and available under the MIT License. You are free to copy, modify, and use the project as you wish. However, any responsibility for the use of the code is solely yours. Please use it at your own risk and discretion.
