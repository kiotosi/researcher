/**
 * Debounce execution of function
 * @param func Function that execute after timeout
 * @param timeout Amount of milliseconds
 * @returns Callback with debounce function
 */
export default function debounce(func: any, timeout = 300) { // eslint-disable-line @typescript-eslint/no-explicit-any
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
}
