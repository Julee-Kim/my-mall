'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface ISObserverProps {
  onEnter: () => void
  onLeave?: () => void
  options?: IntersectionObserverInit
  children?: ReactNode
}

/**
 * 인터섹션 옵저버 컴포넌트
 * @param onEnter 뷰포트에 진입시 실행
 * @param onLeave 뷰포트에서 벗어나면 실행
 * @param options IntersectionObserver 옵션
 * @param children target element
 * */
const Observer = ({
  onEnter,
  onLeave,
  options = { threshold: 0.5 },
  children,
}: ISObserverProps) => {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          if (onEnter) onEnter()
        } else {
          if (onLeave) onLeave()
        }
      })
    }, options)

    if (triggerRef.current) {
      observer.observe(triggerRef.current as Element)
    }

    // onUnMounted
    return () => observer.disconnect()
  }, [onEnter]) // TODO, 의존성을 왜 이렇게 넣어야 동작하는걸까..

  return <div ref={triggerRef}>{children}</div>
}

export default Observer
