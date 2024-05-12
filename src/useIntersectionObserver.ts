import { RefObject, useEffect, useState } from "react";

interface UserArgs extends IntersectionObserverInit {
    freeOnceVisible?: boolean;
}

export const useIntersectionObserver = (elementRef: RefObject<Element>,
    { root = null, threshold = 0, rootMargin = '0%', freeOnceVisible = false }: UserArgs
): IntersectionObserverEntry | undefined => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    }

    useEffect(() => {
        const node = elementRef?.current;
        const hasIoSupport = IntersectionObserver; //判断当前功能是否可用caniuse

        if(!node || !hasIoSupport || frozen) {
            return;
        }

        const observerParams = {
            threshold,
            root,
            rootMargin
        }

        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect()

    }, [elementRef?.current, threshold, root, rootMargin, frozen])

    return entry;
}