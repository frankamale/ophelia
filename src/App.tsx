import { useEffect, useState, useRef } from "react"
import "./App.css"

const snowflakes = [...Array(50)].map(() => ({
  left: Math.random() * 100,
  delay: Math.random() * 10,
  size: 0.5 + Math.random() * 1.5,
  duration: 8 + Math.random() * 4
}))

function App() {
  const [scrollY, setScrollY] = useState(0)
  const audioRef = useRef<HTMLIFrameElement>(null)
  const [audioStarted, setAudioStarted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const startAudio = () => {
      if (!audioStarted && audioRef.current) {
        audioRef.current.src =
          "https://www.youtube.com/embed/70lGbbLy-Ec?autoplay=1&mute=1&controls=0&loop=1&playlist=70lGbbLy-Ec&enablejsapi=1"

        // Unmute after user interaction
        setTimeout(() => {
          audioRef.current?.contentWindow?.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            "*"
          )
        }, 500)

        setAudioStarted(true)
      }
    }

    const events = ["click", "scroll", "keydown", "touchstart"]
    events.forEach(e =>
      document.addEventListener(e, startAudio, { once: true })
    )

    return () => {
      events.forEach(e => document.removeEventListener(e, startAudio))
    }
  }, [audioStarted])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">

      {/* Snow */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {snowflakes.map((flake, i) => (
          <div
            key={i}
            className="snowflake absolute opacity-80"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              fontSize: `${flake.size}rem`,
              animationDuration: `${flake.duration}s`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Hidden Audio */}
      <div className="hidden">
        <iframe
          ref={audioRef}
          src=""
          allow="autoplay"
          title="Background Music"
          allowFullScreen
        />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 z-20">
        <div className="relative w-full max-w-6xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/ophelia4.jpeg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-pacifico">
              Merry Christmas
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-2xl italic">
              Everything feels calmer, warmer, and more beautiful — because of you.
            </p>
          </div>
        </div>
      </section>

      {/* MESSAGE + IMAGE */}
      <section className="relative z-20 py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="/martha.jpeg" className="w-full h-full object-cover" />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent font-pacifico">
              A Christmas Thought
            </h2>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed mb-6">
              You turn simple moments into something meaningful. Even the quiet
              days feel special just knowing you’re there.
            </p>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
              This season is only a reflection of what you already bring —
              warmth, comfort, and a kind of joy that feels real.
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <section className="relative z-20 py-24 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <img src="/ophelia3.jpeg" className="w-full h-[70vh] object-cover" />
          <div className="absolute inset-0 bg-black/35 flex items-end p-8">
            <p className="text-2xl font-pacifico italic">
              Every smile feels like a gift.
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="relative z-20 py-24 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/vid1.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-center mt-6 text-lg text-purple-200 italic">
          Some moments don’t need words.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 py-20 text-center">
        <p className="text-2xl md:text-3xl font-bold mb-4 text-purple-200 font-pacifico italic">
          Merry Christmas
        </p>
        <p className="text-lg text-purple-300">
          You make this season beautiful — today and always.
        </p>
      </footer>
    </div>
  )
}

export default App
