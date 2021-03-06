import debounce from 'lodash/debounce';
import { useRef, useEffect, useCallback } from 'react';

type CallbackFunc = (...args: any) => any;

export default function useDebounce(
  cb: CallbackFunc,
  delay = 50,
  leading = false
) {
  // ...
  const inputsRef = useRef({ cb, delay }); // mutable ref like with useThrottle
  useEffect(() => {
    inputsRef.current = { cb, delay };
  });
  // NOTE
  // Only disabling temporarily due to Shopify application being due in less than 24h
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    debounce(
      (...args) => {
        // Debounce is an async callback. Cancel it, if in the meanwhile
        // (1) component has been unmounted (see isMounted in snippet)
        // (2) delay has changed
        if (inputsRef.current.delay === delay) {
          inputsRef.current.cb(...args);
        }
      },
      delay,
      { leading }
    ),
    [delay, debounce]
  );
}
