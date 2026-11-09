import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

const DISPLAY_MAX = 47
const ANIMATION_SECONDS = 3

const STEPS = [
  { label: "CT-e, MDF-e, CIOT e VPO em massa", at: 8 },
  { label: "EDI com vários embarcadores", at: 21 },
  { label: "GNRE pré e pós-paga", at: 35 },
  { label: "Monitoramento da SEFAZ", at: 47 },
]

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.12 + index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function ReleasePanel() {
  const [phase, setPhase] = useState("idle")
  const [elapsed, setElapsed] = useState(0)
  const [runId, setRunId] = useState(0)

  useEffect(() => {
    if (phase !== "running") return

    const origin = performance.now()
    const timer = window.setInterval(() => {
      const realSeconds = (performance.now() - origin) / 1000
      if (realSeconds >= ANIMATION_SECONDS) {
        setElapsed(DISPLAY_MAX)
        setPhase("done")
      } else {
        setElapsed((realSeconds / ANIMATION_SECONDS) * DISPLAY_MAX)
      }
    }, 40)

    return () => window.clearInterval(timer)
  }, [phase, runId])

  const seconds = Math.min(DISPLAY_MAX, Math.floor(elapsed))
  const clock = String(seconds).padStart(2, "0")
  const status =
    phase === "running" ? "PROCESSANDO" : phase === "done" ? "CONCLUÍDO" : "AGUARDANDO"

  function release() {
    if (phase === "running") return
    setElapsed(0)
    setRunId((id) => id + 1)
    setPhase("running")
  }

  return (
    <motion.aside
      className="w-full max-w-[430px] shrink-0 self-center rounded-[28px] bg-[#E8E8EC] px-6 pb-6 pt-5 text-[#3A3A42] shadow-[0_28px_70px_rgba(6,4,24,0.38)] sm:px-7 lg:self-auto"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#A3A2A8]">
          PAINEL DA LIBERAÇÃO
        </p>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#A3A2A8]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#FF65A3]"
            animate={phase === "running" ? { opacity: [1, 0.35, 1] } : { opacity: 1 }}
            transition={phase === "running" ? { duration: 1.1, repeat: Infinity } : { duration: 0.2 }}
          />
          {status}
        </p>
      </div>

      <div className="mt-3 flex items-end justify-center leading-none lg:justify-start">
        <span className="text-[clamp(56px,18vw,84px)] font-extrabold tracking-[-0.05em] text-[#333336]">
          00
        </span>
        <span className="mb-2 px-1 text-[clamp(40px,12vw,58px)] font-medium text-[#C6C6CE]">:</span>
        <span className="text-[clamp(56px,18vw,84px)] font-extrabold tracking-[-0.05em] text-[#FF65A3] tabular-nums">
          {clock}
        </span>
        <span className="mb-2 ml-0.5 text-[clamp(20px,5vw,26px)] font-bold text-[#FF65A3]">s</span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {STEPS.map((step) => {
          const checked = seconds >= step.at
          return (
            <li key={step.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 ${
                    checked ? "border-[#FF65A3]" : "border-[#C4C4CC]"
                  }`}
                >
                  {checked && (
                    <motion.span
                      key={`${runId}-${step.at}`}
                      className="h-2 w-2 rounded-full bg-[#FF65A3]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    />
                  )}
                </span>
                <span className="truncate text-[14.5px] font-medium text-[#A3A2A8]">{step.label}</span>
              </div>
              <span className="text-[13px] font-medium tabular-nums text-[#B5B5BC]">
                {String(step.at).padStart(2, "0")}s
              </span>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={release}
        disabled={phase === "running"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF65A3] py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_24px_rgba(255,101,163,0.35)] transition hover:brightness-105 disabled:cursor-default disabled:hover:brightness-100"
      >
        <Zap size={16} strokeWidth={2.4} className="fill-white" />
        {phase === "done" ? "Disparar novamente" : "Disparar Liberação de Carga"}
      </button>
    </motion.aside>
  )
}

export default function Hero() {
  return (
    <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#0B0B2F] text-white lg:h-full lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 min-h-full overflow-hidden" aria-hidden>
        <video
          className="absolute left-0 right-0 top-0 h-[118%] min-h-full w-full object-cover object-center max-lg:top-0 max-lg:h-[112%] max-lg:scale-[1.06] max-lg:object-[50%_64%] lg:relative lg:inset-auto lg:h-full lg:scale-[1.02]"
          src="/banner.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07071c]/55 via-[#07071c]/22 to-[#07071c]/45 max-lg:via-[#07071c]/18 max-lg:to-transparent lg:bg-gradient-to-r lg:from-[#07071c]/65 lg:via-[#07071c]/15 lg:to-[#07071c]/35" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07071c]/85 to-transparent max-lg:h-36 max-lg:from-[#07071c]/55" />
      </div>

      <header className="relative z-20 flex h-[72px] items-center justify-center bg-transparent lg:bg-[#0B0B2F]">
        <img
          src="/logo-emiteai.png"
          alt="Emiteaí"
          className="h-[34px] w-auto max-w-[min(100%,220px)] object-contain object-center"
          width={220}
          height={34}
          decoding="async"
        />
      </header>

      <section className="relative z-10 min-h-[calc(100vh-72px)] pb-6 lg:pb-0">
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-8 px-6 py-8 sm:px-8 max-lg:gap-6 max-lg:py-6 max-lg:pb-0 lg:min-h-[calc(100vh-72px)] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-12">
          <div className="w-full max-w-[620px] shrink-0">
            <motion.p
              className="text-[12px] font-semibold tracking-[0.22em] text-white/75"
              variants={rise}
              custom={0}
              initial="hidden"
              animate="show"
            >
              DESAFIO CRIATIVO
              <span className="mx-2 text-white/45">•</span>
              MARCOS SENA DESIGNER
            </motion.p>

            <h1 className="mt-5 text-[clamp(40px,4.7vw,62px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              <motion.span
                className="block"
                variants={rise}
                custom={1}
                initial="hidden"
                animate="show"
              >
                Burocracia não
              </motion.span>
              <motion.span
                className="block"
                variants={rise}
                custom={2}
                initial="hidden"
                animate="show"
              >
                paga o frete.
              </motion.span>
              <motion.span
                className="mt-1 block italic text-[#FF65A3]"
                variants={rise}
                custom={3}
                initial="hidden"
                animate="show"
              >
                Velocidade, sim.
              </motion.span>
            </h1>
          </div>

          <ReleasePanel />

          <div
            className="pointer-events-none w-full max-lg:min-h-[clamp(72px,20vw,112px)] max-lg:shrink-0 lg:hidden"
            aria-hidden
          />
        </div>
      </section>
    </div>
  )
}
