import { useEffect, useState } from "react";

export const InfiniteScroll = ({
  root = null,
  threshold = 0.4,
  rootMargin = "0px",
  onIntersect,
}) => {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect, root, rootMargin, target, threshold]);
  return [setTarget];
};
