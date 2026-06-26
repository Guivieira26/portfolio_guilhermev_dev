import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ArrowRight,
  Code2,
  Globe,
  Workflow,
  Quote,
} from "lucide-react";
import guilhermeAsset from "@/assets/guilherme.png";
import dashboardVideo from "@/assets/dashboard_inteligente.mp4.asset.json";
import estoqueVideo from "@/assets/EstoqueAI.mp4.asset.json";
import visaoVideo from "@/assets/computacao_visual.mp4.asset.json";

// Vídeos ficam no CDN da Lovable (não cabem no repo do GitHub).
// Prefixamos com o host absoluto para funcionar tanto no preview Lovable
// quanto no GitHub Pages (que não tem o proxy /__l5e configurado).
const LOVABLE_CDN = "https://id-preview--adbe1bf4-09ba-4030-bf4b-953bae658cc2.lovable.app";
const cdnUrl = (path: string) => `${LOVABLE_CDN}${path}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guilherme — Desenvolvedor Front-end" },
      {
        name: "description",
        content:
          "Portfólio interativo de Guilherme: sites, sistemas web e automações com design moderno e foco em performance.",
      },
      { property: "og:title", content: "Guilherme — Desenvolvedor Front-end" },
      {
        property: "og:description",
        content: "Portfólio interativo com projetos, serviços e depoimentos.",
      },
    ],
  }),
  component: Index,
});

/* ───────────────────── Hero: Terminal ───────────────────── */

function TerminalHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Shrink + fade as the user scrolls past the hero
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Typing effect
  const fullText = "Quem é Guilherme?";
  const [typed, setTyped] = useState("");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setTyped(fullText);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden px-4"
    >
      <div className="bg-grid absolute inset-0" aria-hidden />
      <motion.div
        style={{ scale, opacity, y }}
        className="terminal-window relative w-full max-w-2xl rounded-xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            guilherme@portfolio: ~
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-6 py-8 font-mono text-base sm:text-lg md:py-12 md:text-2xl">
          <div className="flex items-baseline gap-2">
            <span className="text-neon">$</span>
            <span className="text-muted-foreground">whoami</span>
          </div>
          <div className="mt-4 flex items-baseline">
            <span className="text-foreground">{typed}</span>
            <span
              className="caret-blink ml-1 inline-block h-6 w-[2px] bg-neon md:h-8"
              aria-hidden
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}

/* ───────────────────── About: GTA-style zoom out ───────────────────── */

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Zoom out happens entirely within the sticky stage; finishes before the text block.
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [4, 1, 1]);
  const opacityTitle = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const skills = ["Proativo", "Autodidata","Criatividade", "Resolução de Problemas", "Trabalho em Equipe"];

  return (
    <section id="sobre" className="relative px-4">
      {/* Sticky stage: title zooms out within this 150vh range */}
      <div ref={ref} className="relative h-[150vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <motion.h2
            style={{ scale, opacity: opacityTitle, filter }}
            className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl"
          >
            <span className="text-gradient-neon neon-glow">Sobre Mim!</span>
          </motion.h2>
        </div>
      </div>

      {/* Content sits cleanly below the title — no overlap */}
      <div className="relative z-10 mx-auto max-w-3xl space-y-8 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="avatar-tech">
            <img
              src={guilhermeAsset}
              alt="Guilherme em seu setup de desenvolvimento"
              loading="lazy"
              className="block h-44 w-44 rounded-full object-cover sm:h-56 sm:w-56"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Minha trajetória começou na faculdade de Ciência da Computação, 
          onde mergulhei de cabeça no ecossistema de tecnologia e descobri 
          uma paixão real por construir soluções robustas. Do primeiro 
          <span className="font-mono text-neon"> Hello World </span>até o desenvolvimento 
          de sistemas completos, transformei essa paixão em uma carreira focada em desenvolvimento Full Stack.<br />
          <br />
          Ao longo da minha jornada, transitei por empresas de tecnologia e pelo setor público, 
          onde entendi que programar vai muito além de escrever código limpo: é sobre resolver gargalos de negócios. 
          Especializei-me em criar APIs eficientes, arquiteturas de bancos de dados sólidas e interfaces funcionais que realmente facilita a vida das pessoas.<br />
          <br />
          Sempre em busca de inovação, venho explorando a convergência entre o desenvolvimento web tradicional e a Inteligência Artificial aplicada em negócios. 
          Seja integrando modelos de linguagem locais (LLMs) para automatizar processos ou aplicando Visão Computacional para criar novas formas de acessibilidade, 
          meu foco é usar a tecnologia para gerar autonomia e economia.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Nos bastidores, gosto de games, música e qualquer hobby que envolva
          criar algo do zero — o que combina perfeitamente com o que faço como
          desenvolvedor.
        </motion.p>

        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Soft skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium backdrop-blur transition hover:border-neon hover:text-neon"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PROJECTS --------------------------------- */

type Project = {
  title: string;
  description: string;
  tech: string[];
  accent: string;
  video: string;
};

const projects: Project[] = [
  {
    title: "Dashboard Inteligente",
    description:
      "Dashboard analítico integrado a um modelo de IA local para previsão de margem de lucro baseado na flutuação do dólar e investimentos em marketing. O projeto utiliza algoritmos de Machine Learning para análise preditiva e um LLM open-source focado em insights estratégicos, garantindo privacidade de dados e custo zero com tokens de APIs externas.",
    tech: ["Python", "Scikit-Learn", "Ollama", "Pandas", "NumPy", "Streamlit/Plotly"],
    accent: "from-indigo-500/40 to-fuchsia-500/30",
    video: cdnUrl(dashboardVideo.url),
  },
  {
    title: "Estoque AI",
    description:
      "Solução inteligente de automação de inventário desenvolvida sob medida para o cliente. O aplicativo permite a gestão de estoque automatizada a partir da foto de uma nota fiscal: o sistema extrai os dados via OCR, processa as informações estruturadas usando IA local (LLM) e atualiza automaticamente produtos, quantidades e preços, eliminando o trabalho manual.",
    tech: ["React Native", "Python", "FastAPI/Flask", "EasyOCR", "Ollama", "PostgreSQL"],
    accent: "from-cyan-500/40 to-blue-600/30",
    video: cdnUrl(estoqueVideo.url),
  },
  {
    title: "Visão Computacional e Interface Humano-Computador",
    description:
      "Aplicação de Visão Computacional focada em acessibilidade e interatividade. O sistema realiza o rastreamento em tempo real de marcos faciais (como a ponta do nariz) e gestos manuais para traduzir movimentos físicos em comandos de hardware (GamePad/Teclado), permitindo o controle do computador sem a necessidade de toque físico.",
    tech: ["Python", "MediaPipe", "OpenCV", "PyAutoGUI / Pygame"],
    accent: "from-violet-500/40 to-pink-500/30",
    video: cdnUrl(visaoVideo.url),
  }
];

// old version
function ProjectsSection() {
  return (
    <section
      id="projetos"
      aria-label="Projetos em destaque"
      className="relative mx-auto max-w-6xl px-4 py-32 sm:py-40"
    >
      <header className="mb-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--neon)]">
          // portfolio
        </p>
        <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Projetos em Destaque
        </h2>
      </header>

      <div className="space-y-28 sm:space-y-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} project={p} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, reversed }: { project: Project; reversed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });
  const mediaX = useTransform(scrollYProgress, [0, 0.6], [reversed ? 120 : -120, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.6], [reversed ? -120 : 120, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [12, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 md:grid-cols-2 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div style={{ x: mediaX, filter, opacity }}>
          <div
            className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${project.accent} p-px`}
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[15px] border border-border bg-background/90 shadow-2xl backdrop-blur-md">
              {/* Mac title bar */}
              <div className="flex items-center gap-1.5 border-b border-border bg-card/80 px-3 py-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-[10px] text-muted-foreground">
                  {project.title}
                </span>
              </div>
              {/* Video — eternal loop, muted, autoplay, no controls */}
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={`Demonstração do projeto ${project.title}`}
                className="h-full w-full flex-1 object-cover"
              />
            </div>
          </div>
      </motion.div>

      <motion.div style={{ x: textX, opacity }} className="space-y-5">
        <p className="font-mono text-xs text-[color:var(--neon)]">
          #{String(projects.indexOf(project) + 1).padStart(2, "0")}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-foreground/80"
            >
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}


// /* ───────────────────── Projects: Zig-Zag ───────────────────── */ OLD VERSION

// type Project = {
//   title: string;
//   description: string;
//   tech: string[];
//   accent: string;
// };

// const projects: Project[] = [
//   {
//     title: "Plataforma SaaS de Gestão",
//     description:
//       "Dashboard completo para uma operação interna: relatórios em tempo real, controle de usuários e automações que economizam horas por semana.",
//     tech: ["React", "TypeScript", "Tailwind", "Node.js"],
//     accent: "from-[oklch(0.78_0.18_250)] to-[oklch(0.72_0.22_300)]",
//   },
//   {
//     title: "Site Institucional Premium",
//     description:
//       "Landing page com scrollytelling para uma agência criativa. Foco total em performance, animações sob demanda e SEO técnico.",
//     tech: ["Next.js", "Framer Motion", "Tailwind"],
//     accent: "from-[oklch(0.72_0.22_300)] to-[oklch(0.78_0.18_250)]",
//   },
//   {
//     title: "Automação de Atendimento",
//     description:
//       "Bot integrado a WhatsApp e CRM que qualifica leads automaticamente e dispara fluxos personalizados por etapa do funil.",
//     tech: ["Node.js", "n8n", "Postgres"],
//     accent: "from-[oklch(0.78_0.18_250)] to-[oklch(0.85_0.15_180)]",
//   },
// ];

// function ProjectRow({ project, index }: { project: Project; index: number }) {
//   const isReversed = index % 2 === 1;
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const mediaFrom = isReversed ? 80 : -80;
//   const textFrom = isReversed ? -80 : 80;

//   return (
//     <div
//       ref={ref}
//       className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
//         isReversed ? "md:[&>*:first-child]:order-2" : ""
//       }`}
//     >
//       {/* Media */}
//       <motion.div
//         initial={{ opacity: 0, x: mediaFrom, filter: "blur(16px)" }}
//         animate={
//           inView
//             ? { opacity: 1, x: 0, filter: "blur(0px)" }
//             : { opacity: 0, x: mediaFrom, filter: "blur(16px)" }
//         }
//         transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card"
//       >
//         <div
//           className={`absolute inset-0 bg-gradient-to-br opacity-90 ${project.accent}`}
//         />
//         <div className="absolute inset-0 bg-grid opacity-40" />
//         <div className="relative flex h-full items-center justify-center">
//           <span className="font-mono text-5xl font-black text-background/80">
//             0{index + 1}
//           </span>
//         </div>
//       </motion.div>

//       {/* Text */}
//       <motion.div
//         initial={{ opacity: 0, x: textFrom }}
//         animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: textFrom }}
//         transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//         className="space-y-5"
//       >
//         <div className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
//           Projeto / 0{index + 1}
//         </div>
//         <h3 className="text-3xl font-bold sm:text-4xl">{project.title}</h3>
//         <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
//           {project.description}
//         </p>
//         <div className="flex flex-wrap gap-2 pt-2">
//           {project.tech.map((t) => (
//             <span
//               key={t}
//               className="rounded-md border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground"
//             >
//               {t}
//             </span>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// function ProjectsSection() {
//   return (
//     <section id="projetos" className="relative px-4 py-32 sm:py-40">
//       <div className="mx-auto mb-20 max-w-3xl text-center">
//         <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">
//           // Portfolio
//         </p>
//         <h2 className="text-4xl font-bold sm:text-5xl">Projetos em destaque</h2>
//       </div>
//       <div className="mx-auto flex max-w-6xl flex-col gap-32">
//         {projects.map((p, i) => (
//           <ProjectRow key={p.title} project={p} index={i} />
//         ))}
//       </div>
//     </section>
//   );
// }

/* ───────────────────── Services & Testimonials ───────────────────── */

const services = [
  {
    title: "Automações",
    desc: "Integrações entre ferramentas para eliminar trabalho repetitivo do time.",
  },
  {
    title: "Sistemas web",
    desc: "Aplicações sob medida — dashboards, áreas de cliente e ferramentas internas.",
  },
  {
    title: "Sites institucionais",
    desc: "Presenças digitais bem desenhadas, rápidas e otimizadas para conversão.",
  },
];

const testimonials = [
  {
    name: "Jean P.",
    role: "Dono de Oficina Mecânica",
    quote:
      "Ele me ofereceu mais do que a solução que eu precisava, conseguiu automatizar processos que nem sabia que existiam e me fez economizar muito tempo.",
  },
  {
    name: "Devis C.",
    role: "Fisioterapeuta e Empreendedor",
    quote:
      "Entregou muito além do combinado. O site ficou exatamente como imaginei e o processo foi tranquilo do começo ao fim.",
  },
  // {
  //   name: "Felipe",
  //   role: "Orientador de TCC",
  //   quote:
  //     "",
  // },
  {
    name: "Marina P.",
    role: "Colega de Equipe",
    quote:
      "Sempre disposto a ajudar e propor ideias. Faz diferença em qualquer time que entra.",
  },
  {
    name: "João V.",
    role: "Dono de Hambuergueria",
    quote:
      "Automatizou todo nosso fluxo de atendimento no WhatsApp. Hoje respondemos em minutos o que antes levava horas.",
  },
];

function ServicesSection() {
  return (
    <section id="servicos" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">
            // Freelance
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Serviços que entrego
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Atuo como desenvolvedor freelancer ajudando empresas e criadores a
            tirar ideias do papel com soluções modernas e enxutas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-8 backdrop-blur transition hover:border-neon"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-soft opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 font-mono text-xs text-neon">
                  0{i + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-28">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">
            // Depoimentos
          </p>
          <h3 className="mb-10 text-3xl font-bold sm:text-4xl">
            O que dizem sobre o trabalho
          </h3>

          <div
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6"
            style={{ scrollbarWidth: "thin" }}
          >
            {testimonials.map((t) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="w-[85%] shrink-0 snap-center rounded-2xl border border-border bg-card/60 p-7 backdrop-blur sm:w-[420px]"
              >
                <blockquote className="text-base leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-neon to-violet-glow font-mono text-sm font-bold text-background">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{t.name}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Footer / CTA ───────────────────── */

function FooterCTA() {
  const whatsappUrl =
    "https://wa.me/5531994691715?text=Ol%C3%A1%20Guilherme!%20Quero%20iniciar%20um%20projeto.";

  return (
    <footer id="contato" className="relative overflow-hidden px-4 py-32">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold leading-tight sm:text-6xl"
        >
          Tem uma ideia?{" "}
          <span className="text-gradient-neon">Vamos construir juntos.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Conte rapidamente sobre o seu projeto — eu respondo pessoalmente e
          monto uma proposta sob medida em até 24h.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="cta-glow group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon to-violet-glow px-8 py-4 text-base font-semibold text-background transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Fale Comigo no WhatsApp
            <ArrowRight className="h-4 w-4" />
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              
            </span>
          </a>
        </motion.div>

        <div className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
          <a
            href="https://github.com/Guivieira26"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-[color:var(--neon)]"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/guilherme-o-vieira/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-[color:var(--neon)]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:guigavieira26@gmail.com"
            aria-label="E-mail"
            className="transition-colors hover:text-[color:var(--neon)]"
          >
            <Mail className="h-5 w-5" />
          </a>
          {/* <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-neon"
          >
            GitHub
          </a>
          <span className="h-1 w-1 rounded-full bg-border" />
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-neon"
          >
            LinkedIn
          </a>
          <span className="h-1 w-1 rounded-full bg-border" />
          <a
            href="mailto:guilherme@exemplo.com"
            className="transition hover:text-neon"
          >
            E-mail
          </a> */}
        </div>

        <p className="mt-12 font-mono text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Guilherme — Feito com café & código.
        </p>
      </div>
    </footer>
  );
}

/* ───────────────────── Page ───────────────────── */

function Index() {
  return (
    <main className="relative">
      <TerminalHero />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <FooterCTA />
    </main>
  );
}
