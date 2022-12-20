import { useCallback, useRef, useState } from "react";

type Debounce = (fn: () => void) => void;

export const useDebounce = (timeout: number): Debounce => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounce: Debounce = useCallback(
    (fn) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn();
      }, timeout);
    },
    [timeout]
  );
  return debounce;
};

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const isClose = !isOpen;

  return { onToggle, onOpen, onClose, isOpen, isClose };
};
