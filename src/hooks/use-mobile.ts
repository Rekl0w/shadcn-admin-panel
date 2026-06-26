import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}

  const mql = window.matchMedia(MOBILE_MEDIA_QUERY)
  mql.addEventListener("change", callback)

  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  if (typeof window === "undefined") return false

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
