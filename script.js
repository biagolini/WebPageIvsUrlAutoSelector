// URLs for video streams
const streamUrls = [
  'https://example.com/stream1.m3u8',
  'https://example.com/stream2.m3u8'
]

// Initial health status of URLs (all assumed healthy at start)
let urlHealth = [true, true]

// Interval in seconds for health checks
const healthCheckIntervalSeconds = 10

// Index of the current stream URL in use
let currentStreamIndex = 0

/**
 * Checks the health of all URLs.
 * Updates the urlHealth array with the status of each URL.
 * Logs the health status of each URL to the console.
 */
async function checkUrlHealth() {
  console.log('Checking URL health...')
  for (let i = 0; i < streamUrls.length; i++) {
    try {
      const response = await fetch(streamUrls[i], { method: 'HEAD' })
      urlHealth[i] = response.ok
    } catch (error) {
      urlHealth[i] = false
    }
    console.log(
      `URL ${streamUrls[i]} is ${urlHealth[i] ? 'healthy' : 'unhealthy'}`
    )
  }
}

/**
 * Checks the health of the current URL.
 * If the URL is unhealthy, triggers a health check for all URLs and switches to a healthy one.
 * Logs the status of the current URL to the console.
 */
async function checkCurrentUrlHealth() {
  try {
    const response = await fetch(streamUrls[currentStreamIndex], {
      method: 'HEAD'
    })
    if (!response.ok) {
      throw new Error('URL unhealthy')
    } else {
      console.log(`URL ${streamUrls[currentStreamIndex]} is healthy`)
    }
  } catch (error) {
    console.log(
      `URL ${streamUrls[currentStreamIndex]} is unhealthy. Switching...`
    )
    checkUrlHealth().then(() => switchToHealthyUrl())
  }
}

/**
 * Switches to the first healthy URL in the list.
 * Updates the currentStreamIndex and loads the new stream.
 */
function switchToHealthyUrl() {
  for (let i = 0; i < streamUrls.length; i++) {
    if (urlHealth[i]) {
      currentStreamIndex = i
      loadStream(currentStreamIndex)
      break
    }
  }
}

/**
 * Loads the stream based on the provided index.
 * Sets the source of the player and starts playback.
 */
function loadStream(index) {
  player.src({ src: streamUrls[index], type: 'application/x-mpegURL' })
  player.play()
}

/**
 * Sets up the video player with the Amazon IVS technology.
 * Loads the initial stream and registers quality plugins.
 */
function setupPlayer() {
  registerIVSTech(videojs)
  player = videojs(
    'amazon-ivs-videojs',
    { techOrder: ['AmazonIVS'] },
    function () {
      console.log('Player is ready to use!')
      loadStream(currentStreamIndex)
    }
  )
  // Ref. https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/player-videojs.html#videojs-plugins
  registerIVSQualityPlugin(videojs)
  player.enableIVSQualityPlugin()
}

// Initializes the player after the DOM is fully loaded and starts the health check interval
document.addEventListener('DOMContentLoaded', function () {
  setupPlayer()
  setInterval(checkCurrentUrlHealth, healthCheckIntervalSeconds * 1000)
})
