import throttle from 'lodash/throttle';
import { useCallback, useEffect, useRef } from 'react';

type CallbackFunc = (...args: any) => any;

export default function useThrottle(cb: CallbackFunc, delay = 50) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
}
