import {useCallback, useEffect, useRef} from 'react'

export const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return function cleanup(): void {
      isMounted.current = false
    }
  }, [])
  return useCallback((): boolean => {
    return isMounted.current
  }, [])
}
