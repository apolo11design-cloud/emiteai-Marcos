import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, Check, X, Zap } from "lucide-react"

const cardsViewport = {
  once: false,
  // Dispara ao entrar no último quarto inferior da tela (abaixo de 75vh).
  margin: "-75% 0px 0px 0px",
  amount: 0,
}

const fadeUpCards = (delay = 0, isMobile = false) => ({
  initial: { opacity: 0, y: 70 },
  whileInView: { opacity: 1, y: 0 },
  viewport: isMobile
    ? { once: true, margin: "-40px", amount: 0.2 }
    : cardsViewport,
  transition: { duration: 0.8, ease: "easeOut", delay },
})

const headerMotion = (visible, delay = 0) => ({
  animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 },
  transition: { duration: 0.8, ease: "easeOut", delay: visible ? delay : 0 },
})

const WITHOUT_ITEMS = [
  "Digitação repetitiva e erro humano à espreita.",
  "Caos de siglas desconectadas: CT-e, MDF-e, CIOT, Seguros, Vale-Pedágio.",
  "Risco constante de multas na ANTT e bloqueios na SEFAZ.",
]

const WITH_ITEMS = [
  "Conexão direta entre ERPs, WMS, TMS e gigantes do e-commerce.",
  "Emissão, averbação e validação fiscal sem toque humano.",
  "Conformidade automática com as regras mais rígidas do setor (Piso Mínimo, CIOT).",
]

function TogglePill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-full px-5 py-2.5 text-[13px] font-semibold transition-colors ${
        active ? "text-white" : "text-[#64748B] hover:text-[#94A3B8]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="dobra2-toggle-pill"
          className="absolute inset-0 rounded-full bg-[#E94E77] shadow-[0_8px_24px_rgba(233,78,119,0.35)]"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function Dobra2() {
  const [mode, setMode] = useState("com")
  const [isMobile, setIsMobile] = useState(false)
  const withEmiteai = mode === "com"
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, {
    once: false,
    amount: 0,
    margin: "-25% 0px 0px 0px",
  })
  const sectionInView = useInView(sectionRef, { once: false, amount: 0 })

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const apply = () => setIsMobile(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  const headerVisible = isMobile ? headerInView : sectionInView

  return (
  <section
    ref={sectionRef}
    className="relative min-h-screen overflow-hidden rounded-t-[60px] bg-[#070B14] pb-20 text-white"
  >
      <div
        ref={headerRef}
        className="sticky top-0 z-20 rounded-t-[60px] bg-[#070B14] px-6 pb-8 pt-16 sm:px-8 lg:px-14 lg:pt-20"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mx-auto max-w-[720px] text-center">
            <motion.div {...headerMotion(headerVisible, 0)}>
              <p className="text-[11px] font-bold tracking-[0.22em] text-[#E94E77]">
                A TENSÃO OPERACIONAL
              </p>
            </motion.div>

            <motion.div className="mt-4" {...headerMotion(headerVisible, 0.1)}>
              <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
                O gargalo invisível que custa milhões.
              </h2>
            </motion.div>

            <motion.div className="mt-8 flex justify-center" {...headerMotion(headerVisible, 0.2)}>
              <div
                className="inline-flex rounded-full bg-[#12151C] p-1 ring-1 ring-white/[0.06]"
                role="tablist"
                aria-label="Comparar operação"
              >
                <TogglePill active={!withEmiteai} onClick={() => setMode("sem")}>
                  Sem Emiteaí
                </TogglePill>
                <TogglePill active={withEmiteai} onClick={() => setMode("com")}>
                  Com Emiteaí
                </TogglePill>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-14">
        <div className="mt-6 grid items-start gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-8">
          <motion.div {...fadeUpCards(0.1, isMobile)}>
            <motion.div
              className="rounded-[24px] bg-[#1A1D23] p-8 sm:p-9 lg:p-10"
              animate={{
                opacity: withEmiteai ? 0.5 : 1,
                scale: withEmiteai ? 0.985 : 1,
                boxShadow: withEmiteai
                  ? "0 0 0 0px transparent"
                  : "0 0 0 1px rgba(239,68,68,0.35), 0 20px 50px rgba(239,68,68,0.08)",
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2A1518] text-[#F87171]">
                  <AlertTriangle size={22} strokeWidth={2.2} />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#E94E77]">O PESO DO PAPEL</p>
                  <h3 className="mt-2 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
                    O Pátio Travado
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-left text-[15px] leading-relaxed text-[#94A3B8]">
                Enquanto caminhões aguardam a burocracia no pátio, a operação sangra. Cada emissão
                manual é um ponto de falha: caminhoneiro ou digitador digitando dados que deveriam fluir
                sozinhos.
              </p>

              <ul className="mt-8 space-y-5">
                {WITHOUT_ITEMS.map((item) => (
                  <li key={item} className="flex gap-3 text-left text-[14.5px] leading-snug text-[#CBD5E1]">
                    <X
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-[#EF4444]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/[0.08] pt-4">
                <p className="text-left text-[14px] text-[#94A3B8]">
                  Tempo médio:{" "}
                  <span className="font-semibold text-[#EF4444]">Horas de atrito operacional.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUpCards(0.25, isMobile)}>
            <motion.div
              className="relative rounded-[24px] p-8 sm:p-9 lg:p-10"
              animate={{
                opacity: withEmiteai ? 1 : 0.5,
                scale: withEmiteai ? 1 : 0.985,
                background: withEmiteai
                  ? "linear-gradient(135deg, #161B2E 0%, #0A0F1C 100%)"
                  : "#1A1D23",
                borderColor: withEmiteai ? "rgba(233, 78, 119, 0.45)" : "rgba(255,255,255,0.06)",
                boxShadow: withEmiteai
                  ? "0 0 0 1px rgba(233,78,119,0.12), 0 24px 60px rgba(233,78,119,0.12)"
                  : "0 0 0 0px transparent",
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ borderWidth: 1, borderStyle: "solid" }}
            >
              {withEmiteai && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-[#E94E77]/20"
                />
              )}

              <div className="relative flex items-start gap-4">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    withEmiteai ? "bg-[#E94E77]/15 text-[#E94E77]" : "bg-[#252830] text-[#64748B]"
                  }`}
                >
                  <Zap
                    size={22}
                    strokeWidth={2.2}
                    className={withEmiteai ? "fill-[#E94E77]" : ""}
                  />
                </span>
                <div className="text-left">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#E94E77]">A VIA EXPRESSA</p>
                  <h3 className="mt-2 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
                    A automação Invisível
                  </h3>
                </div>
              </div>

              <p className="relative mt-6 text-left text-[15px] leading-relaxed text-[#94A3B8]">
                A Emiteaí elimina o atrito no exato milissegundo em que ele nasce. Via API e
                Inteligência Artificial, seu ERP comanda o motor fiscal e operacional sem intervenção
                manual.
              </p>

              <ul className="relative mt-8 space-y-5">
                {WITH_ITEMS.map((item) => (
                  <li key={item} className="flex gap-3 text-left text-[14.5px] leading-snug text-[#E2E8F0]">
                    <span
                      className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
                        withEmiteai ? "bg-[#E94E77]/20" : "bg-white/[0.06]"
                      }`}
                    >
                      <Check
                        size={12}
                        strokeWidth={3}
                        className={withEmiteai ? "text-[#E94E77]" : "text-[#64748B]"}
                        aria-hidden
                      />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 border-t border-white/[0.1] pt-4">
                <p className="text-left text-[14px] text-[#94A3B8]">
                  Tempo médio:{" "}
                  <span
                    className={`font-semibold ${withEmiteai ? "text-[#E94E77]" : "text-[#64748B]"}`}
                  >
                    &lt; 60 segundos.
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
