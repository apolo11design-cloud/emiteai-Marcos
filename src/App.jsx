import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import Hero from './components/Hero'
import Dobra2 from './components/Dobra2'
import Dobra3 from './components/Dobra3'
import Dobra4 from './components/Dobra4'

const LG_BREAKPOINT = '(min-width: 1024px)'

function Dobra3Dobra4Track() {
  const trackRef = useRef(null)
  const dobra3Ref = useRef(null)
  const [isLargeScreen, setIsLargeScreen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(LG_BREAKPOINT).matches,
  )

  const { scrollYProgress: trackScrollProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: dobra3ScrollProgress } = useScroll({
    target: dobra3Ref,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const mq = window.matchMedia(LG_BREAKPOINT)
    const onChange = () => setIsLargeScreen(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const scrollProgress = isLargeScreen ? trackScrollProgress : dobra3ScrollProgress

  return (
    <div ref={trackRef} className="relative z-10">
      <div ref={dobra3Ref} className="max-lg:static lg:sticky lg:top-0 lg:z-0">
        <Dobra3 scrollProgress={scrollProgress} />
      </div>

      <div className="relative z-10 overflow-hidden rounded-t-[60px] shadow-2xl max-lg:-mt-14">
        <Dobra4 />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="relative bg-[#24243F] text-white">
      {/* A Hero fica fixa no fundo e não rola */}
      <div className="sticky top-0 z-0 min-h-screen lg:h-screen">
        <Hero />
      </div>

      {/* A Dobra 2 (e as próximas) rola por cima da Hero */}
      <div className="relative z-10 overflow-hidden rounded-t-[60px] shadow-2xl">
        <Dobra2 />
      </div>

      {/* A Dobra 3 fica fixa no fundo; a Dobra 4 rola por cima */}
      <Dobra3Dobra4Track />
    </div>
  )
}
