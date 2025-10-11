import { useEffect, useRef, useCallback } from "react";

export function useCancelableApi<T extends (...args: any[]) => Promise<any>>(apiFn: T) {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      console.log("Component unmounted")
      // cancel on unmount
      controllerRef.current?.abort();
    };
  }, []);

  const wrappedFn = useCallback(
    async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
      controllerRef.current?.abort(); // cancel old one if running
      const controller = new AbortController();
      controllerRef.current = controller;

      // inject signal if supported
      const lastArg = args[args.length - 1];
      const hasConfig = typeof lastArg === "object" && lastArg !== null && "signal" in lastArg;

      if (hasConfig) {
        (lastArg as any).signal = controller.signal;
        return apiFn(...args);
      } else {
        return apiFn(...[...args, { signal: controller.signal }] as any);
      }
    },
    [apiFn]
  );

  return wrappedFn;
}
