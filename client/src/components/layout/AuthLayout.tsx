interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
  }
  
  export default function AuthLayout({
    title,
    subtitle,
    children,
  }: AuthLayoutProps) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              {title}
            </h1>
  
            <p className="mt-2 text-slate-400">
              {subtitle}
            </p>
          </div>
  
          {children}
        </div>
      </div>
    );
  }