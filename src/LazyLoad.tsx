import React, { CSSProperties, ComponentType, ReactNode, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver'
interface LazyLoadProps {
    children: ReactNode;
    style?: CSSProperties;
    tag?: ComponentType | keyof JSX.IntrinsicElements;
    // lazy load props
    root?: null;
    rootMargin?: string;
    threshold?: number | number[];
    // extra props
    freeOnceVisible?: boolean
}
const LazyLoad = ({ children, style, tag = 'div', root = null, threshold = 0, rootMargin = '0%', freeOnceVisible = false }: LazyLoadProps) => {
    const Tag: any = tag;
    const ref = useRef<HTMLDivElement | null>(null);
     
    // new InterSectionObserver()
    const entry = useIntersectionObserver(ref, {
        root,
        rootMargin,
        threshold,
        freeOnceVisible
    })

    const isVisible: boolean = Boolean(entry?.isIntersecting);

    return <Tag style={style} ref={ref}>
        { isVisible && children }
    </Tag>
}
export default LazyLoad;