export default function debounce(func: any, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => { func() }, timeout);
  };
}