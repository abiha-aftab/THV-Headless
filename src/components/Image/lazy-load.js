import React, { useEffect, useRef, useState } from 'react'

const LazyImg = ({ datasrc, alt }) => {
  const [inView, setInView] = useState(false)
  const placeholderRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      }
    }, {})
    observer.observe(placeholderRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return inView ? (
    <img ref={placeholderRef} src={datasrc} alt={alt || ''} />
  ) : (
    <>
      <img ref={placeholderRef} />
    </>
  )
}
export default LazyImg
