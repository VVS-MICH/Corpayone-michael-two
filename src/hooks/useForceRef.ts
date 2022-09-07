import React, {useCallback, useRef} from 'react'

/**
 * useForceRef hook allows us to have ref/container for the state
 * across async operations
 */
export const useForceRef = <T extends any>(
  defaultValue: T
): [() => React.MutableRefObject<T>, (value: T) => void] => {
  const ref = useRef<T>(defaultValue)

  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback((value: T) => {
    ref.current = value
    updateState({})
  }, [])

  const getRef = useCallback(() => {
    return ref
  }, [ref.current]) // eslint-disable-line react-hooks/exhaustive-deps

  return [getRef, forceUpdate]
}
