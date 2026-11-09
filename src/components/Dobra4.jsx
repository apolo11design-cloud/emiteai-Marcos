import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const YOUTUBE_EMBED =
  "https://www.youtube.com/embed/gAjR4_CbPpQ?si=0dO9phmD1clr07L4&enablejsapi=1&rel=0&modestbranding=1&playsinline=1"

const CARDS = [
  {
    id: 1,
    tabLabel: "UMA PESSOA",
    label: "UMA PESSOA",
    title: "O Capitão de um time de Futebol",
    body: "Como o próprio nome já deixa claro, Emiteaí descomplica e traduz toda a burocracia ajudando as empresas. Se fosse uma pessoa, seria um capitão de futebol, aquele encarregado de liderar e acalmar os parceiros tensos enquanto transmite confiança e força.",
    image: "/dobra4/pessoa.png",
    imageOpen: "/dobra4/pessoa-aberto.png",
    type: "image",
  },
  {
    id: 2,
    tabLabel: "UM LUGAR",
    label: "UM LUGAR",
    title: "Um Pit Stop de Fórmula 1",
    body: "Vejo a Emiteaí como um box de corrida altamente competitiva. O carro entra na maior velocidade e dezenas de sensores avaliam instantaneamente, ajustes críticos acontecem em segundos e o carro volta para a pista sem perder posições.",
    image: "/dobra4/lugar.png",
    imageOpen: "/dobra4/lugar-aberto.png",
    type: "image",
  },
  {
    id: 3,
    tabLabel: "UMA MÚSICA",
    label: "UMA MÚSICA",
    title: "Harder, Better, Faster, Stronger",
    body: (
      <>
        Uma música eletrônica, com ar futurista e robótico, que transmite uma sensação de ritmo constante,
        somado a letra que diz:{" "}
        <em className="text-white/90">
          Trabalhe mais duro, faça melhor, faça mais rápido, nos faça mais fortes, mais que nunca, hora após
          hora.
        </em>
      </>
    ),
    image: "/dobra4/musica.png",
    type: "youtube",
  },
]

const layoutSpring = { type: "spring", stiffness: 320, damping: 36, mass: 0.9 }
const CLOSED_MEDIA = "h-[108px]"
const OPEN_MEDIA = "h-[218px] lg:h-[228px]"
const CARD_TEXT_PAD = "p-5 lg:p-6"

function pauseYoutube(iframe) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
    "*",
  )
}

function ClosedCardImage({ src, compact = false }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${compact ? "h-[108px] w-[108px]" : `w-full ${CLOSED_MEDIA}`}`}
    >
      <img src={src} alt="" className="h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#0D0D1E]/60" />
    </div>
  )
}

function OpenMediaSlot({ children, className = "" }) {
  return (
    <div className={`relative w-full shrink-0 overflow-hidden ${OPEN_MEDIA} ${className}`}>
      {children}
    </div>
  )
}

function OpenCardBanner({ src }) {
  return (
    <OpenMediaSlot>
      <img src={src} alt="" className="h-full w-full object-cover object-top" />
    </OpenMediaSlot>
  )
}

function YoutubePlayer({ isActive }) {
  const iframeRef = useRef(null)
  const origin = typeof window !== "undefined" ? window.location.origin : ""

  useEffect(() => {
    if (!isActive) pauseYoutube(iframeRef.current)
  }, [isActive])

  if (!isActive) return null

  const embedSrc = origin ? `${YOUTUBE_EMBED}&origin=${encodeURIComponent(origin)}` : YOUTUBE_EMBED

  return (
    <OpenMediaSlot className="bg-black">
      <iframe
        ref={iframeRef}
        title="YouTube video player"
        className="block h-full w-full border-0"
        src={embedSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </OpenMediaSlot>
  )
}

function OpenCardCopy({ card }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-left"
    >
      <p className="text-[10px] font-bold tracking-[0.2em] text-white/90">{card.label}</p>
      <h3 className="mt-2 text-[19px] font-bold leading-tight text-white lg:text-[21px]">{card.title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/72 lg:text-[14px]">{card.body}</p>
    </motion.div>
  )
}

function AccordionCard({ card, isActive, onActivate, isMobile }) {
  return (
    <motion.article
      layout
      transition={{ layout: layoutSpring }}
      role="button"
      aria-expanded={isActive}
      tabIndex={0}
      onMouseEnter={isMobile ? undefined : onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onActivate()
        }
      }}
      className={`touch-manipulation flex w-full cursor-pointer overflow-hidden rounded-[28px] bg-[#2B2B48] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
        isMobile
          ? isActive
            ? "flex-col"
            : "min-h-[116px] flex-row items-stretch"
          : `h-full flex-col ${isActive ? "min-w-0 flex-[2.85]" : "min-w-[88px] flex-[0.48]"}`
      }`}
    >
      {isActive ? (
        <>
          <motion.div layout="position" className="relative w-full shrink-0 overflow-hidden">
            {card.imageOpen && <OpenCardBanner src={card.imageOpen} />}
            {card.type === "youtube" && <YoutubePlayer isActive={isActive} />}
          </motion.div>
          <motion.div
            layout
            className={`relative flex flex-col bg-[#2B2B48] ${CARD_TEXT_PAD} max-lg:pb-6`}
          >
            <OpenCardCopy card={card} />
          </motion.div>
        </>
      ) : isMobile ? (
        <>
          <ClosedCardImage src={card.image} compact />
          <div className={`flex flex-1 items-center bg-[#2B2B48] ${CARD_TEXT_PAD}`}>
            <p className="text-[18px] font-extrabold leading-tight tracking-[0.06em] text-white">
              {card.tabLabel}
            </p>
          </div>
        </>
      ) : (
        <>
          <ClosedCardImage src={card.image} />
          <motion.div
            layout
            className="relative flex min-h-0 flex-1 flex-col items-center justify-center bg-[#2B2B48] px-2"
          >
            <p className="select-none whitespace-nowrap text-[20px] font-extrabold leading-none tracking-[0.08em] text-white lg:text-[22px] [transform:rotate(-90deg)]">
              {card.tabLabel}
            </p>
          </motion.div>
        </>
      )}
    </motion.article>
  )
}

export default function Dobra4() {
  const [activeCard, setActiveCard] = useState(1)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches,
  )

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const apply = () => setIsMobile(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="relative flex min-h-screen flex-col overflow-x-hidden rounded-t-[60px] bg-[#131328] pb-0 pt-16 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.35)] lg:pt-20"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-6 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#E94E77]">
            ALÉM DO CÓDIGO: A PERSONALIDADE DA MARCA
          </p>
          <h2 className="mt-4 max-w-[720px] text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            Se a Emiteaí saísse da tela, como ela seria?
          </h2>
        </motion.div>

        <motion.div
          layout
          className="mb-14 mt-10 flex h-auto flex-col gap-3 lg:mb-20 lg:mt-12 lg:h-[450px] lg:flex-row lg:gap-3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
        >
          {CARDS.map((card) => (
            <AccordionCard
              key={card.id}
              card={card}
              isActive={activeCard === card.id}
              isMobile={isMobile}
              onActivate={() => setActiveCard(card.id)}
            />
          ))}
        </motion.div>
      </div>

      <footer className="mt-auto w-full border-t border-white/[0.06] bg-gradient-to-r from-[#1E1B3A]/90 via-[#131328] to-[#131328] pt-2">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-14">
          <img
            src="/logo-emiteai.png"
            alt="Emiteaí"
            className="h-[30px] w-auto max-w-[min(100%,200px)] object-contain object-left"
            width={200}
            height={30}
            decoding="async"
          />
          <p className="text-[12px] text-white/55 sm:text-[13px]">
            Desenvolvido por <span className="font-semibold text-white/80">Marcos Sena</span>
            <span className="text-white/35"> · </span>
            Diretor de Arte &amp; Designer Sênior.
          </p>
        </div>
      </footer>
    </motion.section>
  )
}
