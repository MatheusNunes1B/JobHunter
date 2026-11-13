import { useState } from 'react';
import { Search, MapPin, ArrowUpRight, Code2, X } from 'lucide-react';

const jobs = [
  { id: 1, title: 'Estágio em Front-end', company: 'Orbit Tecnologia', location: 'São Paulo, SP', mode: 'Remoto', initials: 'or', color: 'bg-blue-50 text-blue-700' },
  { id: 2, title: 'Estágio em Desenvolvimento Web', company: 'Ponto Digital', location: 'Campinas, SP', mode: 'Híbrido', initials: 'pd', color: 'bg-violet-50 text-violet-700' },
  { id: 3, title: 'Estágio em Back-end', company: 'Nuvem Labs', location: 'Curitiba, PR', mode: 'Remoto', initials: 'nu', color: 'bg-teal-50 text-teal-700' },
  { id: 4, title: 'Estágio em Desenvolvimento Mobile', company: 'Movi Tech', location: 'São Paulo, SP', mode: 'Presencial', initials: 'mo', color: 'bg-orange-50 text-orange-700' },
  { id: 5, title: 'Estágio em Full Stack', company: 'Código Aberto', location: 'Belo Horizonte, MG', mode: 'Híbrido', initials: 'ca', color: 'bg-indigo-50 text-indigo-700' },
];
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function App() {
  const [query, setQuery] = useState('');
  const filtered = jobs.filter(job => normalize(`${job.title} ${job.company}`).includes(normalize(query.trim())));
  return <div className="min-h-screen">
    <header className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5"><img src="/logo.svg" width="40" height="40" alt="" className="rounded-xl"/><span className="text-xl font-extrabold tracking-tight">Job<span className="text-blue-600">Hunter</span></span></div>
        <span className="text-xs font-medium text-slate-500">Seu próximo passo.</span>
      </div>
    </header>
    <main className="mx-auto max-w-3xl px-5 pb-8 pt-9 sm:px-8 sm:pt-12">
      <section aria-labelledby="intro-title">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"><Code2 size={14} aria-hidden="true"/> Grandes começos em tecnologia</div>
        <h1 id="intro-title" className="max-w-lg text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">Encontre seu<br/><span className="text-blue-600">próximo emprego</span><span className="text-blue-600">.</span></h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">O primeiro passo da sua carreira pode estar aqui.<br className="hidden sm:block"/> Explore vagas de estágio para desenvolvedores.</p>
        <div className="relative mt-7">
          <label htmlFor="search" className="sr-only">Buscar vagas por cargo ou empresa</label>
          <Search size={20} className="pointer-events-none absolute left-4 top-4 text-slate-400" aria-hidden="true"/>
          <input id="search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Busque por cargo ou empresa" className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"/>
          {query && <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')} className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-blue-600"><X size={18}/></button>}
        </div>
      </section>
      <section aria-labelledby="jobs-title" className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3"><h2 id="jobs-title" className="text-base font-bold">Oportunidades para começar</h2><span aria-live="polite" role="status" className="whitespace-nowrap text-xs text-slate-500">{filtered.length} {filtered.length === 1 ? 'vaga' : 'vagas'}</span></div>
        <ul className="space-y-3">
          {filtered.map(job => <li key={job.id}><article className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:gap-4 sm:p-5">
            <div aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold ${job.color}`}>{job.initials}<span className="text-blue-600">.</span></div>
            <div className="min-w-0 flex-1"><p className="mb-1 text-xs text-slate-500">{job.company}</p><h3 className="text-sm font-bold leading-5 sm:text-base">{job.title}</h3><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2"><span className="inline-flex items-center gap-1 text-xs text-slate-500"><MapPin size={13} aria-hidden="true"/>{job.location}</span><span className={`rounded-md px-2 py-1 text-[11px] font-semibold ${job.mode === 'Remoto' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{job.mode}</span></div></div>
          </article></li>)}
        </ul>
        {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center"><Search className="mx-auto mb-3 text-slate-400" aria-hidden="true"/><h3 className="font-bold">Nenhuma vaga encontrada</h3><p className="mt-2 text-sm text-slate-500">Tente outro cargo ou nome de empresa.</p></div>}
      </section>
      <footer className="mt-7 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-400"><ArrowUpRight size={14} aria-hidden="true"/> Vagas fictícias. Possibilidades de verdade.</footer>
    </main>
  </div>;
}