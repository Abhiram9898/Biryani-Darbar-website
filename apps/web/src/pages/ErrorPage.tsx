import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string } | undefined;
  return <section className="grid min-h-screen place-items-center px-6 text-center"><div><p className="text-sm uppercase tracking-[0.25em] text-[#D4AF37]">404 / Page error</p><h1 className="font-display mt-4 text-6xl">This Table Is Empty</h1><p className="mx-auto mt-4 max-w-xl text-zinc-400">{error?.statusText ?? error?.message ?? 'The page you requested could not be found.'}</p><Link to="/" className="mt-7 inline-block rounded-full bg-[#D4AF37] px-7 py-3 font-semibold text-black">Return Home</Link></div></section>;
}
