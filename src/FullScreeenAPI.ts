interface IFullScreenAPI {
    prefixed: boolean
    [key: string]: any
}

const fullscreenAPI: IFullScreenAPI = {
    prefixed: true,
}

const apiMap = [
    [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror',
        'fullscreen',
    ],
    [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
        '-webkit-full-screen',
    ],
    [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror',
        '-moz-full-screen',
    ],
    [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError',
        '-ms-fullscreen',
    ],
]

const specApi = apiMap[0]
let browserApi

for (let i = 0; i < apiMap.length; i++) {
    if (apiMap[i][1] in document) {
        browserApi = apiMap[i]
        break
    }
}

if (browserApi) {
    for (let i = 0; i < browserApi.length; i++) {
        fullscreenAPI[specApi[i]] = browserApi[i]
    }

    fullscreenAPI.prefixed = browserApi[0] !== specApi[0]
}

export default fullscreenAPI
