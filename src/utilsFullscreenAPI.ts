interface IFsDocumentRequest extends HTMLElement {
    webkitRequestFullscreen?: () => void
    mozRequestFullScreen?: () => void
    msRequestFullscreen?: () => void
}

interface IFsDocumentEnabled extends HTMLDocument {
    webkitFullscreenEnabled?: boolean
    mozFullScreenEnabled?: boolean
    msFullscreenEnabled?: boolean
}

interface IFsDocumentElement extends HTMLDocument {
    webkitFullscreenElement?: Element
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
}

interface IFsDocumentExit extends HTMLDocument {
    webkitExitFullscreen?: () => void
    mozCancelFullScreen?: () => void
    msExitFullscreen?: () => void
}

class Fullscreen {
    request(elm: IFsDocumentRequest = document.documentElement) {
        if (elm.requestFullscreen) {
            elm.requestFullscreen()
        } else if (elm.webkitRequestFullscreen) {
            elm.webkitRequestFullscreen()
        } else if (elm.mozRequestFullScreen) {
            elm.mozRequestFullScreen()
        } else if (elm.msRequestFullscreen) {
            elm.msRequestFullscreen()
        }
    }

    exit() {
        const docs = document as IFsDocumentExit
        if (docs.exitFullscreen) {
            docs.exitFullscreen()
        } else if (docs.webkitExitFullscreen) {
            docs.webkitExitFullscreen()
        } else if (docs.mozCancelFullScreen) {
            docs.mozCancelFullScreen()
        } else if (docs.msExitFullscreen) {
            docs.msExitFullscreen()
        }
    }

    get isFullscreen() {
        const docs = document as IFsDocumentElement
        return Boolean(
            docs.fullscreenElement ||
                docs.webkitFullscreenElement ||
                docs.mozFullScreenElement ||
                docs.msFullscreenElement,
        )
    }

    get enabled() {
        const docs = document as IFsDocumentEnabled
        return (
            docs.fullscreenEnabled ||
            docs.webkitFullscreenEnabled ||
            docs.mozFullScreenEnabled ||
            docs.msFullscreenEnabled
        )
    }

    addEventListener(handler: EventListener) {
        document.addEventListener('fullscreenchange', handler)
        document.addEventListener('webkitfullscreenchange', handler)
        document.addEventListener('mozfullscreenchange', handler)
        document.addEventListener('MSFullscreenChange', handler)
    }

    removeEventListener(handler: EventListener) {
        document.removeEventListener('fullscreenchange', handler)
        document.removeEventListener('webkitfullscreenchange', handler)
        document.removeEventListener('mozfullscreenchange', handler)
        document.removeEventListener('MSFullscreenChange', handler)
    }
}

const fullscreenAPI = new Fullscreen()

export default fullscreenAPI
