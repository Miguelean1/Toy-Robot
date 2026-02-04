import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";

function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">
            Toy Robot Game
          </span>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:text-orange-400">
              Home
            </a>
            <a href="/game" className="hover:text-orange-400">
              Game
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-800 py-3 text-center text-s text-slate-500">
        Developed by{" "}
        <a
          href="https://github.com/Miguelean1"
          target="_blank"
          rel="noopener noreferrer"
          className="
      text-orange-400
      text-shadow-neon
      transition
      hover:text-orange-300
    "
        >
          MIKE
        </a>
      </footer>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Home />
      </RootLayout>
    ),
  },
  {
    path: "/game",
    element: (
      <RootLayout>
        <Game />
      </RootLayout>
    ),
  },
]);
