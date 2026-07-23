import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-white">
          DevSphere
        </h1>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-slate-300 transition hover:text-white"
          >
            About
          </a>

          <Link to="/login">
            <Button variant="outline">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}