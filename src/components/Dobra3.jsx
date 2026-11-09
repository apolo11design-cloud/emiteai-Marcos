import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Cpu, Database, Factory, ShoppingBag, Truck } from "lucide-react"

const VIDEO_DURATION = 6

const viewport = { once: true, margin: "-100px" }

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -70 },
  whileInView: { opacity: 1, x: 0 },
  viewport,
  transition: { duration: 0.8, ease: "easeOut", delay },
})

const INPUT_CARDS = [
  {
    icon: ShoppingBag,
    label: "E-COMMERCE",
    title: "Marketplaces em pico de sazonalidade",
  },
  {
    icon: Factory,
    label: "INDÚSTRIA",
    title: "Expedição em alta frequência",
  },
  {
    icon: Database,
    label: "ERP",
    title: "O sistema que já manda no pedido",
  },
]

const STATS = [
  {
    heading: "< 1 MINUTO",
    body: "Do gatilho no sistema à carga 100% documentada, averbada e liberada para rodar.",
  },
  {
    heading: "+14 MILHÕES",
    body: "De páginas de documentos fiscais processadas todos os dias (mais de 5 bilhões por ano).",
  },
  {
    heading: "ZERO ATRITO",
    body: "Ecossistema completo: do emissor rápido para o pequeno transportador ao motor de hiperautomação para grandes embarcadores.",
  },
]

function FlowPath({ d }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#E94E77"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeDasharray="8 7"
      animate={{ strokeDashoffset: [0, -30] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
    />
  )
}

function InputCard({ icon: Icon, label, title, delay }) {
  return (
    <motion.div
      className="relative z-10 rounded-[20px] bg-white px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
      {...fadeLeft(delay)}
    >
      <Icon size={22} strokeWidth={2.2} className="text-[#E94E77]" />
      <p className="mt-3 text-[10px] font-bold tracking-[0.18em] text-[#E94E77]">{label}</p>
      <p className="mt-1.5 text-[15px] font-bold leading-snug text-[#1C1C24]">{title}</p>
    </motion.div>
  )
}

export default function Dobra3({ scrollProgress }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !scrollProgress) return

    let rafId = 0

    const getDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) return video.duration
      return VIDEO_DURATION
    }

    const syncTime = (progress) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const duration = getDuration()
        const nextTime = Math.min(duration - 0.01, Math.max(0, progress * duration))
        if (video.readyState < 1) return
        if (typeof video.fastSeek === "function") {
          video.fastSeek(nextTime)
        } else {
          video.currentTime = nextTime
        }
      })
    }

    const onMetadata = () => syncTime(scrollProgress.get())

    syncTime(scrollProgress.get())
    video.addEventListener("loadedmetadata", onMetadata)
    video.addEventListener("loadeddata", onMetadata)
    const unsubscribe = scrollProgress.on("change", syncTime)

    return () => {
      unsubscribe()
      video.removeEventListener("loadedmetadata", onMetadata)
      video.removeEventListener("loadeddata", onMetadata)
      cancelAnimationFrame(rafId)
    }
  }, [scrollProgress])

  return (
    <section className="relative overflow-hidden bg-[#24243F] px-6 pb-20 pt-16 text-white sm:px-8 lg:px-14 lg:pb-28 lg:pt-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,340px)] lg:items-start lg:gap-12">
          <div className="max-w-[640px]">
            <motion.div {...fadeLeft(0)}>
              <p className="text-[11px] font-bold tracking-[0.22em] text-[#E94E77]">DADOS & ESCALA</p>
            </motion.div>

            <motion.div className="mt-4" {...fadeLeft(0.1)}>
              <h2 className="text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                O motor silencioso por trás dos gigantes.
              </h2>
            </motion.div>

            <motion.div className="mt-6" {...fadeLeft(0.2)}>
              <p className="text-[15px] leading-relaxed text-white/88 sm:text-base">
                Para quem olha de fora, o pacote que chega rápido do Mercado Livre, Shopee, Shein ou Amazon
                parece mágica. Para quem conhece a operação, tem nome:{" "}
                <span className="font-bold text-white">escalabilidade fiscal em tempo real.</span>
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[320px] lg:ml-auto lg:max-w-none"
            {...fadeLeft(0.25)}
          >
            <video
              ref={videoRef}
              src="/engrenagem.mp4"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="h-auto w-full max-h-[280px] object-contain lg:max-h-[320px]"
            />
          </motion.div>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <FlowPath d="M 22 21 C 28 21, 32 44, 36 50" />
            <FlowPath d="M 22 50 L 36 50" />
            <FlowPath d="M 22 79 C 28 79, 32 56, 36 50" />
            <FlowPath d="M 62 50 L 80 50" />
          </svg>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,280px)] lg:items-center lg:gap-6">
            <div className="space-y-4">
              {INPUT_CARDS.map((card, index) => (
                <InputCard key={card.label} {...card} delay={0.15 + index * 0.1} />
              ))}
            </div>

            <motion.div
              className="relative z-10 mx-auto w-full max-w-[340px] rounded-[24px] bg-white px-8 py-10 text-center shadow-[0_0_30px_rgba(255,255,255,0.28)]"
              {...fadeLeft(0.5)}
            >
              <Cpu size={28} strokeWidth={2.2} className="mx-auto text-[#E94E77]" />
              <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-[#E94E77]">NÚCLEO EMITEAÍ</p>
              <p className="mt-2 text-[22px] font-extrabold tracking-tight text-[#1C1C24]">IA & APIs</p>
            </motion.div>

            <motion.div
              className="relative z-10 mx-auto w-full max-w-[300px] rounded-[24px] bg-white px-7 py-10 text-center shadow-[0_0_30px_rgba(255,255,255,0.28)]"
              {...fadeLeft(0.65)}
            >
              <Truck size={28} strokeWidth={2.2} className="mx-auto text-[#E94E77]" />
              <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-[#E94E77]">ESTRADA</p>
              <p className="mt-2 text-[17px] font-extrabold leading-snug text-[#1C1C24]">
                Carga 100% legalizada e em movimento
              </p>
            </motion.div>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full lg:hidden"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <FlowPath d="M 50 18 L 50 38" />
            <FlowPath d="M 50 38 L 50 52" />
            <FlowPath d="M 50 72 L 50 52" />
            <FlowPath d="M 50 52 L 50 88" />
          </svg>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/[0.08] pt-14 lg:mt-20 lg:grid-cols-3 lg:gap-0 lg:pt-16">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.heading}
              className={`lg:px-8 ${index > 0 ? "lg:border-l lg:border-white/[0.08]" : ""} ${index === 0 ? "lg:pl-0" : ""}`}
              {...fadeLeft(0.2 + index * 0.15)}
            >
              <motion.p
                className="bg-gradient-to-r from-[#FF7EB3] via-[#F06B9A] to-[#E94E77] bg-clip-text text-[clamp(28px,3.2vw,36px)] font-extrabold leading-none tracking-tight text-transparent"
              >
                {stat.heading}
              </motion.p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/82 sm:text-[15px]">{stat.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
