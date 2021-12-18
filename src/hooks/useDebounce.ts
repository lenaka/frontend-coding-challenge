import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, timeout: number | undefined = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [timeout, value]);

  return debouncedValue;
};

export default useDebounce;
