import { useEffect, useRef, useState } from 'react'

const images = [
  ['01_全景_2.jpg', 'Under the Southern Sky', 'Astro / Waikato', 'wide'],
  ['1577e25805a3423fa4257d8ca45cf898.jpg', 'The Crossing', 'Architecture / Night', 'standard'],
  ['1a3f78964q1d694f1026a0fa418c8561.jpg', 'Orbit', 'City / Long Exposure', 'standard'],
  ['1e8da26721099bc01e6a5ae1517aa72c_2.JPG', 'Alpine Silence', 'Landscape / Aotearoa', 'wide'],
  ['76dcd743d8e142d486d19e64ea23f904.jpg', 'Arc of Night', 'Astro / Panorama', 'wide'],
  ['8913f0138b8d49d29c5aa60cb5c198a6.jpg', 'Outpost', 'Aerial / Coast', 'standard'],
  ['95cf76a95826e95770d7b00c8716239c.JPG', 'Moon Over Pagoda', 'Composite / Lunar', 'tall'],
  ['IMGL63631_2.jpg', 'The Mountain Remembers', 'Landscape / Taranaki', 'wide'],
  ['2026-06-07_095430.jpg', 'White Range II', 'Aerial / Southern Alps', 'wide'],
  ['IMGL5990_2.jpg', 'Two Beacons', 'Landscape / Taranaki', 'standard'],
  ['IMG_7816.jpg', 'Earth in Red', 'Landscape / Gansu', 'wide'],
  ['悬月_2.jpg', 'Suspended Moon', 'Composite / City', 'tall'],
]

const projects = [
  { n: '01', title: 'ESG AI Insight Assistant', meta: 'AWS · Bedrock · DynamoDB · Python', text: 'A serverless data assistant that turns natural-language questions into emissions insights, visualisations and compliance-ready reports.' },
  { n: '02', title: 'GProM', meta: 'Research · Databases · Oracle', text: 'Database-independent middleware for computing provenance. Built data-skipping and self-tuning techniques for faster analytical queries.', link: 'https://github.com/IITDBGroup/gprom' },
  { n: '03', title: 'Ticket+', meta: 'Java · REST · MongoDB · EC2', text: 'An event discovery and recommendation service, load-tested to handle 150 queries per second.' },
  { n: '04', title: 'Around', meta: 'Go · Elasticsearch · GCP', text: 'A scalable, geo-indexed social network with nearby search, Dataflow pipelines and BigQuery analytics.' },
]

const papers = [
  { year: '2025', venue: 'arXiv', title: 'Cost-based Selection of Provenance Sketches for Data Skipping', authors: 'Ziyu Liu · Boris Glavic', href: 'https://arxiv.org/abs/2504.19252' },
  { year: '2024', venue: 'CIDR', title: 'Towards an Objective Metric for Data Value Through Relevance', authors: 'B. Glavic · P. Li · Z. Liu · et al.' },
  { year: '2021', venue: 'PVLDB 15(3)', title: 'Provenance-based Data Skipping', authors: 'X. Niu · Z. Liu · P. Li · et al.' },
]

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14m-5-5 5 5-5 5'} /></svg>
}

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return
    let tx = 0, ty = 0, x = 0, y = 0, frame
    const move = e => { tx = e.clientX; ty = e.clientY; dot.current?.style.setProperty('transform', `translate(${tx}px,${ty}px)`) }
    const tick = () => { x += (tx-x)*.11; y += (ty-y)*.11; ring.current?.style.setProperty('transform', `translate(${x}px,${y}px)`); frame = requestAnimationFrame(tick) }
    addEventListener('mousemove', move); tick()
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [])
  return <><div ref={dot} className="cursor-dot"/><div ref={ring} className="cursor-ring"/></>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="Leo Liu home"><span>LEO</span><span>LIU®</span></a>
    <nav className={open ? 'open' : ''}>
      <a href="#work" onClick={() => setOpen(false)}>Work</a>
      <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
      <a href="#research" onClick={() => setOpen(false)}>Research</a>
      <a href="#about" onClick={() => setOpen(false)}>About</a>
    </nav>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span/><span/></button>
  </header>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-orbit" aria-hidden="true"><span>AVAILABLE FOR SELECT PROJECTS · AUCKLAND, NZ · </span></div>
    <div className="hero-kicker"><span className="status-dot"/> Creative technologist / Visual storyteller</div>
    <h1><span>CODE<span className="lime">/</span>LIGHT</span><span className="outline">/MOTION</span></h1>
    <div className="hero-bottom">
      <p>I build systems with logic and tell stories with light.<br/>IT graduate, researcher, photographer & editor.</p>
      <a className="circle-link" href="#work" aria-label="Explore selected work"><Arrow/></a>
    </div>
    <div className="hero-image"><img src="/media/76dcd743d8e142d486d19e64ea23f904.jpg" alt="Milky Way arch above a dark landscape"/><div className="scanline"/></div>
  </section>
}

function SectionTitle({ index, eyebrow, children, side }) {
  return <div className="section-heading"><div className="eyebrow">({index}) {eyebrow}</div><h2>{children}</h2>{side && <p>{side}</p>}</div>
}

function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const shown = active === 'All' ? images : images.filter(([, , cat]) => cat.startsWith(active))
  return <section className="section work" id="work">
    <SectionTitle index="01" eyebrow="Selected frames" side="A visual archive of remote landscapes, quiet cities and the strange geometry of time.">Photography</SectionTitle>
    <div className="filters">{['All','Astro','Landscape','City','Composite'].map(x => <button className={active===x?'active':''} onClick={() => setActive(x)} key={x}>{x}</button>)}</div>
    <div className="gallery">{shown.map(([src,title,cat,shape], i) => <button className={`photo ${shape}`} key={src} onClick={() => setLightbox({src,title,cat})}>
      <div className="photo-media"><img src={`/media/${src}`} alt={title} loading={i > 3 ? 'lazy' : 'eager'}/><span className="photo-index">{String(i+1).padStart(2,'0')}</span><span className="view">VIEW</span></div>
      <div className="photo-caption"><span>{title}</span><small>{cat}</small></div>
    </button>)}</div>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button aria-label="Close">×</button><img src={`/media/${lightbox.src}`} alt={lightbox.title}/><div><span>{lightbox.title}</span><small>{lightbox.cat}</small></div></div>}
  </section>
}

function Film() {
  return <section className="film-section">
    <div className="film-copy"><div className="eyebrow">(02) Motion works</div><h2>STORIES<br/><i>IN</i> MOTION</h2><p>Short-form campaigns, cinematic edits and visual experiments — shaped from first frame to final cut.</p><a href="mailto:zliu562@aucklanduni.ac.nz">Request private reel <Arrow diagonal/></a></div>
    <div className="film-frame"><img src="/media/1e8da26721099bc01e6a5ae1517aa72c_2.JPG" alt="Snowy mountain range reflected in a lake"/><div className="play"><span>PLAY</span></div><div className="film-meta"><span>DIRECT / SHOOT / EDIT</span><span>00:47</span></div></div>
  </section>
}

function Projects() {
  return <section className="section projects" id="projects"><SectionTitle index="03" eyebrow="Digital practice" side="Systems engineered for scale, clarity and real-world use.">Selected<br/><i>projects</i></SectionTitle>
    <div className="project-list">{projects.map(p => <a className="project-row" href={p.link || '#contact'} key={p.n} target={p.link ? '_blank' : undefined} rel="noreferrer"><span>{p.n}</span><div><h3>{p.title}</h3><p>{p.text}</p></div><small>{p.meta}</small><span className="project-arrow"><Arrow diagonal/></span></a>)}</div>
  </section>
}

function Research() {
  return <section className="section research" id="research"><SectionTitle index="04" eyebrow="Published research" side="Exploring database provenance, data relevance and the infrastructure behind trustworthy decisions.">Research</SectionTitle>
    <div className="paper-list">{papers.map(p => <a href={p.href || '#contact'} target={p.href ? '_blank' : undefined} rel="noreferrer" key={p.title} className="paper"><span className="paper-year">{p.year}</span><div><small>{p.venue}</small><h3>{p.title}</h3><p>{p.authors}</p></div><span className="paper-arrow"><Arrow diagonal/></span></a>)}</div>
  </section>
}

function About() {
  return <section className="about" id="about"><div className="about-image"><img src="/media/IMGL0021-编辑_2.jpg" alt="A figure painting light beneath the Milky Way"/></div><div className="about-copy"><div className="eyebrow">(05) About</div><h2>BETWEEN<br/>SYSTEMS <i>&</i><br/>STORIES.</h2><p className="lead">I’m Leo Liu, a creative technologist based in Tāmaki Makaurau Auckland.</p><p>With a Master of IT from the University of Auckland and a research background in computer science, I move comfortably between databases, cloud systems and visual storytelling. I like work that is rigorous under the hood and unforgettable on the surface.</p><div className="facts"><div><small>Based</small><span>Auckland, NZ</span></div><div><small>Education</small><span>UoA · IIT · NUAA</span></div><div><small>Languages</small><span>English · 中文</span></div><div><small>Focus</small><span>AI · Data · Visuals</span></div></div></div></section>
}

function Footer() {
  return <footer id="contact"><div className="footer-top"><div className="eyebrow"><span className="status-dot"/> Open to collaborations</div><h2>LET’S MAKE<br/><i>SOMETHING</i> <span>STRANGE.</span></h2><a className="email" href="mailto:zliu562@aucklanduni.ac.nz">zliu562@aucklanduni.ac.nz <Arrow diagonal/></a></div><div className="footer-bottom"><span>© 2026 Leo Liu</span><div><a href="https://www.linkedin.com/in/ziyu-liu-9b6352355/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/zliu102/" target="_blank" rel="noreferrer">GitHub ↗</a></div><a href="#top">Back to top ↑</a></div></footer>
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('revealed') }), {threshold:.08})
    document.querySelectorAll('section, .project-row, .paper').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <><Cursor/><Header/><main><Hero/><Gallery/><Film/><Projects/><Research/><About/></main><Footer/></>
}
