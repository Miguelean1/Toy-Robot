import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-120px)] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-orange-400">
        CONTROL THE R.O.V.E.R.
      </p>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Toy-Robot 
      </h1>
      <p className="mb-6 max-w-xl text-sm text-slate-300">
        Our mission was clear: take a game with almost finished mechanics and shape it with our own design. After some time—and a lot of caffeine—here we are.</p>
      <Link
        to="/game"
        className="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600"
      >
        Deploy R.O.V.E.R.
      </Link>
    </section>
  )
}
