import { useEffect, useRef, useState } from "react";

/**
 * 组件加载时的hook
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

/**
 * 对Array操作的封装hook
 */
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => setValue([...value].splice(index, 1)),
  };
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
