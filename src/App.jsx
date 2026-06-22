import { useEffect, useRef, useState } from 'react'

const images = [
  ['photos/astro/01_全景_2.jpg', 'Under the Southern Sky', 'Astro / Waikato', 'wide'],
  ['photos/city-architecture/1577e25805a3423fa4257d8ca45cf898.jpg', 'The Crossing', 'Architecture / Night', 'standard'],
  ['photos/city-architecture/1a3f78964q1d694f1026a0fa418c8561.jpg', 'Orbit', 'City / Long Exposure', 'standard'],
  ['photos/landscape/1e8da26721099bc01e6a5ae1517aa72c_2.JPG', 'Alpine Silence', 'Landscape / Aotearoa', 'wide'],
  ['photos/astro/76dcd743d8e142d486d19e64ea23f904.jpg', 'Arc of Night', 'Astro / Panorama', 'wide'],
  ['photos/aerial-coast/8913f0138b8d49d29c5aa60cb5c198a6.jpg', 'Outpost', 'Aerial / Coast', 'standard'],
  ['photos/moon-composite/95cf76a95826e95770d7b00c8716239c.JPG', 'Moon Over Pagoda', 'Composite / Lunar', 'tall'],
  ['photos/landscape/IMGL63631_2.jpg', 'The Mountain Remembers', 'Landscape / Taranaki', 'wide'],
  ['photos/landscape/2026-06-07_095430.jpg', 'White Range II', 'Aerial / Southern Alps', 'wide'],
  ['photos/landscape/IMGL5990_2.jpg', 'Two Beacons', 'Landscape / Taranaki', 'standard'],
  ['photos/landscape/IMG_7816.jpg', 'Earth in Red', 'Landscape / Gansu', 'wide'],
  ['photos/moon-composite/悬月_2.jpg', 'Suspended Moon', 'Composite / City', 'tall'],
  ['photos/astro/99ece230040efb6a4b039b83639d51cf_2.jpg', 'Edge of Night', 'Astro / Coast', 'wide'],
  ['photos/astro/IMGL0021-编辑_2.jpg', 'Light Seeker', 'Astro / Night', 'wide'],
  ['photos/astro/IMGL1734_全景2.jpg', 'Galactic Arc', 'Astro / Panorama', 'wide'],
  ['photos/city-architecture/7f5fe21c639fd06d2a162ef194229fc3.JPG', 'Urban Geometry', 'Architecture / City', 'standard'],
  ['photos/city-architecture/f83dfd471614dd6da0bbe275b1f2226e.JPG', 'After Dark', 'City / Night', 'standard'],
  ['photos/landscape/2026-06-07_095350.jpg', 'Southern Passage', 'Landscape / Desert', 'wide'],
  ['photos/landscape/6b60665f0c999a952532de167a070ae2.jpg', 'Quiet Terrain', 'Landscape / Aotearoa', 'wide'],
  ['photos/landscape/8b4f55ce682744dbad419996af322831.jpg', 'Open Country', 'Landscape / Aotearoa', 'wide'],
  ['photos/landscape/IMGL63631_2_mask_working_copy.jpg', 'Mountain Study', 'Landscape / Taranaki', 'wide'],
  ['photos/aerial-coast/2026-06-06_150458.jpg', 'Coastal Trace', 'Aerial / Coast', 'wide'],
  ['photos/moon-composite/IMGL1135.jpg', 'Moonrise Study', 'Composite / Lunar', 'tall'],
  ['photos/moon-composite/c1f0c84097b64a28837c08d28c403de6.jpg', 'Lunar Sequence', 'Composite / Lunar', 'tall'],
  ['photos/moon-composite/月食0303_2.jpg', 'Eclipse Study', 'Composite / Lunar', 'tall'],
]

const featuredImages = [
  ['photos/astro/99ece230040efb6a4b039b83639d51cf_2.jpg', 'Under the Southern Sky', 'Astro / Waikato', 'wide'],
  images[3],
  ['photos/landscape/IMGL63631_2.jpg', 'The Mountain Remembers', 'Landscape / Taranaki', 'standard'],
  ['photos/landscape/2026-06-07_095350.jpg', 'Southern Passage', 'Landscape / Aotearoa', 'tall'],
  ['photos/astro/IMGL1734_全景2.jpg', 'Galactic Arc', 'Astro / Panorama', 'wide'],
  ['photos/moon-composite/IMGL1135.jpg', 'Moonrise Study', 'Composite / Lunar', 'tall'],
]
const archiveCategories = [
  { slug: 'astro', label: 'Astro', folder: 'photos/astro/', cover: 'photos/astro/99ece230040efb6a4b039b83639d51cf_2.jpg' },
  { slug: 'landscape', label: 'Landscape', folder: 'photos/landscape/', cover: 'photos/landscape/IMGL63631_2.jpg' },
  { slug: 'city-architecture', label: 'City & Architecture', folder: 'photos/city-architecture/', cover: 'photos/city-architecture/1577e25805a3423fa4257d8ca45cf898.jpg' },
  { slug: 'aerial-coast', label: 'Aerial & Coast', folder: 'photos/aerial-coast/', cover: 'photos/aerial-coast/2026-06-06_150458.jpg' },
  { slug: 'lunar-composite', label: 'Lunar Composite', folder: 'photos/moon-composite/', cover: 'photos/moon-composite/95cf76a95826e95770d7b00c8716239c.JPG' },
]

const videos = [
  { src: 'videos/日照金山-web.mp4', poster: 'videos/日照金山-poster.jpg', title: 'Golden Mountain', subtitle: 'Light Study No. 01', duration: '00:13' },
  { src: 'videos/0725星轨-web.mp4', poster: 'videos/0725星轨-poster.jpg', title: 'Star Trails', subtitle: 'Night Study No. 02', duration: '00:08' },
  { src: 'videos/0622-web.mp4', poster: 'videos/0622-poster.jpg', title: 'Night Sequence', subtitle: 'Light Study No. 03', duration: '00:11' },
  { src: 'videos/奥克兰穿云-web.mp4', poster: 'videos/奥克兰穿云-poster.jpg', title: 'Above Auckland', subtitle: 'Aerial Study No. 04', duration: '00:16' },
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

function Header({ archive = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    const update = () => setScrolled(root.scrollTop > 36)
    update()
    root.addEventListener('scroll', update, { passive: true })
    return () => root.removeEventListener('scroll', update)
  }, [])
  const sectionHref = id => archive ? `/#${id}` : `#${id}`
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <a className="brand" href={archive ? '/' : '#top'} aria-label="Leo Liu home"><span>LEO</span><span>LIU®</span></a>
    <nav className={open ? 'open' : ''}>
      <a href={sectionHref('work')} onClick={() => setOpen(false)}>Portfolio</a>
      <a href={sectionHref('projects')} onClick={() => setOpen(false)}>Projects</a>
      <a href={sectionHref('research')} onClick={() => setOpen(false)}>Publications</a>
      <a href={sectionHref('about')} onClick={() => setOpen(false)}>Bio</a>
    </nav>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><span/><span/></button>
  </header>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-orbit" aria-hidden="true"><span>AVAILABLE FOR SELECT PROJECTS · AUCKLAND, NZ · </span></div>
    <div className="hero-kicker"><span className="status-dot"/> Creative technologist / Visual storyteller</div>
    <h1><span>CODE<span className="accent">/</span>LIGHT</span><span className="outline">/MOTION</span></h1>
    <div className="hero-bottom">
      <p>I build systems with logic and tell stories with light.<br/>IT graduate, researcher, photographer & editor.</p>
      <a className="circle-link" href="#work" aria-label="Explore selected work"><Arrow/></a>
    </div>
    <div className="hero-image"><img src="/media/photos/astro/IMGL0021-编辑_2.jpg" alt="A figure shining a beam of light toward the Milky Way"/><div className="scanline"/></div>
  </section>
}

function SectionTitle({ index, eyebrow, children, side }) {
  return <div className="section-heading"><div className="eyebrow" data-reveal>({index}) {eyebrow}</div><h2 data-reveal data-delay="1">{children}</h2>{side && <p data-reveal data-delay="2">{side}</p>}</div>
}

function PhotoCard({ photo, index, onOpen, archive = false }) {
  const [src, title, category, shape] = photo
  return <button className={`photo ${archive ? 'archive-photo' : shape}`} data-reveal="image" style={{'--reveal-delay': `${(index % 3) * 110}ms`}} onClick={() => onOpen({src, title, cat:category})}>
    <div className="photo-media"><img src={`/media/${src}`} alt={title} loading={index > 3 ? 'lazy' : 'eager'}/><span className="photo-index">{String(index+1).padStart(2,'0')}</span><span className="view">VIEW</span></div>
    <div className="photo-caption"><span>{title}</span><small>{category}</small></div>
  </button>
}

function Lightbox({ photo, onClose }) {
  if (!photo) return null
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={photo.title} onClick={onClose}><button aria-label="Close">×</button><img src={`/media/${photo.src}`} alt={photo.title}/><div><span>{photo.title}</span><small>{photo.cat}</small></div></div>
}

function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return <section className="section work" id="work">
    <SectionTitle index="01" eyebrow="Curated frames" side="One defining frame from each visual world — astro, landscape, city and composite.">Photography</SectionTitle>
    <div className="featured-note" data-reveal>SELECTED ACROSS ASTRO / LANDSCAPE / CITY / COMPOSITE</div>
    <div className="gallery featured-gallery">{featuredImages.map((photo, index) => <PhotoCard photo={photo} index={index} onOpen={setLightbox} key={photo[0]}/>)}</div>
    <div className="archive-cta" data-reveal><div><small>THE COMPLETE COLLECTION</small><span>{images.length} photographs · {archiveCategories.length} categories</span></div><a className="archive-link" href="/archive">View full archive <Arrow diagonal/></a></div>
    <Lightbox photo={lightbox} onClose={() => setLightbox(null)}/>
  </section>
}

function ArchivePage() {
  return <section className="archive-page" id="top">
    <div className="archive-hero"><div className="eyebrow">PHOTOGRAPHIC ARCHIVE · 2026</div><h1>ALL<br/><i>FRAMES</i></h1><p>A complete visual index of night skies, distant landscapes, cities and constructed realities.</p><a href="/#work">← Back to selected work</a></div>
    <div className="archive-categories">
      <div className="category-heading"><div><small>BROWSE THE ARCHIVE</small><h2>Explore by category</h2></div><a href="/archive/all">View all · {images.length}</a></div>
      <div className="category-grid">{archiveCategories.map(category => {
        const count = images.filter(([src]) => src.startsWith(category.folder)).length
        return <a className="category-card" href={`/archive/${category.slug}`} key={category.slug}>
          <img src={`/media/${category.cover}`} alt=""/><span>{category.label}</span><small>{String(count).padStart(2, '0')} frames</small>
        </a>
      })}</div>
    </div>
  </section>
}

function CategoryArchivePage({ slug }) {
  const [lightbox, setLightbox] = useState(null)
  const category = archiveCategories.find(item => item.slug === slug)
  const shown = slug === 'all' ? images : category ? images.filter(([src]) => src.startsWith(category.folder)) : []
  const title = slug === 'all' ? 'All Frames' : category?.label || 'Archive'
  return <section className="archive-page category-page" id="top">
    <div className="category-page-head"><div><div className="eyebrow">PHOTOGRAPHIC ARCHIVE · {String(shown.length).padStart(2, '0')} FRAMES</div><h1>{title}</h1></div><a href="/archive">← All categories</a></div>
    <div className="gallery archive-gallery">{shown.map((photo, index) => <PhotoCard photo={photo} index={index} onOpen={setLightbox} archive key={photo[0]}/>)}</div>
    <Lightbox photo={lightbox} onClose={() => setLightbox(null)}/>
  </section>
}

function Film() {
  const [active, setActive] = useState(0)
  const videoRef = useRef(null)
  const video = videos[active]
  const canSlide = videos.length > 1
  const move = direction => setActive(index => (index + direction + videos.length) % videos.length)
  useEffect(() => {
    const element = videoRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.play().catch(() => {})
      else element.pause()
    }, { threshold: .35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [active])
  return <section className="film-section">
    <div className="film-copy"><div className="eyebrow" data-reveal>(02) Motion works</div><h2 data-reveal data-delay="1">STORIES<br/><i>IN</i> MOTION</h2><p data-reveal data-delay="2">Short-form campaigns, cinematic edits and visual experiments — shaped from first frame to final cut.</p><a data-reveal data-delay="3" href="/videos">View all motion works <Arrow diagonal/></a></div>
    <div className="film-showcase" data-reveal="image">
      <div className="film-frame"><video ref={videoRef} key={video.src} muted loop playsInline preload="metadata" poster={`/media/${video.poster}`}><source src={`/media/${video.src}`} type="video/mp4"/></video></div>
      <div className="film-controls"><div><small>{String(active + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}</small><strong>{video.title} <i>{video.subtitle}</i></strong></div><div className="film-control-end"><small className="film-duration">{video.duration}</small><div className="film-arrows"><button onClick={() => move(-1)} disabled={!canSlide} aria-label="Previous video"><Arrow/></button><button onClick={() => move(1)} disabled={!canSlide} aria-label="Next video"><Arrow/></button></div></div></div>
    </div>
  </section>
}

function VideosPage() {
  return <section className="archive-page video-archive" id="top">
    <div className="archive-hero"><div className="eyebrow">MOTION ARCHIVE · 2026</div><h1>ALL<br/><i>MOTION</i></h1><p>Films, visual studies and cinematic fragments — directed, shot and edited frame by frame.</p><a href="/#work">← Back to selected work</a></div>
    <div className="video-index-grid">{videos.map((video, index) => <article className="video-index-card" key={video.src}>
      <div className="video-index-media"><video controls playsInline preload="metadata" poster={`/media/${video.poster}`}><source src={`/media/${video.src}`} type="video/mp4"/></video><span>{String(index + 1).padStart(2, '0')}</span></div>
      <div className="video-index-caption"><div><h2>{video.title}</h2><p>{video.subtitle}</p></div><small>{video.duration}</small></div>
    </article>)}</div>
  </section>
}

function Projects() {
  return <section className="section projects" id="projects"><SectionTitle index="03" eyebrow="Digital practice" side="Systems engineered for scale, clarity and real-world use.">Selected<br/><i>projects</i></SectionTitle>
    <div className="project-list">{projects.map((p, i) => <a className="project-row" data-reveal style={{'--reveal-delay': `${i * 85}ms`}} href={p.link || '#contact'} key={p.n} target={p.link ? '_blank' : undefined} rel="noreferrer"><span>{p.n}</span><div><h3>{p.title}</h3><p>{p.text}</p></div><small>{p.meta}</small><span className="project-arrow"><Arrow diagonal/></span></a>)}</div>
  </section>
}

function Research() {
  return <section className="section research" id="research"><SectionTitle index="04" eyebrow="Published research" side="Exploring database provenance, data relevance and the infrastructure behind trustworthy decisions.">Research</SectionTitle>
    <div className="paper-list">{papers.map((p, i) => <a href={p.href || '#contact'} data-reveal style={{'--reveal-delay': `${i * 100}ms`}} target={p.href ? '_blank' : undefined} rel="noreferrer" key={p.title} className="paper"><span className="paper-year">{p.year}</span><div><small>{p.venue}</small><h3>{p.title}</h3><p>{p.authors}</p></div><span className="paper-arrow"><Arrow diagonal/></span></a>)}</div>
  </section>
}

function About() {
  return <section className="about" id="about"><div className="about-image" data-reveal="image"><img src="/media/photos/astro/IMGL0021-编辑_2.jpg" alt="A figure painting light beneath the Milky Way"/></div><div className="about-copy"><div className="eyebrow" data-reveal>(05) Bio</div><h2 data-reveal data-delay="1">BETWEEN<br/>SYSTEMS <i>&</i><br/>STORIES.</h2><p className="lead" data-reveal data-delay="2">I’m Leo Liu, a creative technologist based in Tāmaki Makaurau Auckland.</p><p data-reveal data-delay="3">With a Master of IT from the University of Auckland and a research background in computer science, I move comfortably between databases, cloud systems and visual storytelling. I like work that is rigorous under the hood and unforgettable on the surface.</p><div className="facts" data-reveal data-delay="4"><div><small>Based</small><span>Auckland, NZ</span></div><div><small>Education</small><span>UoA · IIT · NUAA</span></div><div><small>Languages</small><span>English · 中文</span></div><div><small>Focus</small><span>AI · Data · Visuals</span></div></div></div></section>
}

function Footer() {
  return <footer id="contact"><div className="footer-top"><div className="eyebrow" data-reveal><span className="status-dot"/> Open to collaborations</div><h2 data-reveal data-delay="1">LET’S MAKE<br/><i>SOMETHING</i> <span>STRANGE.</span></h2><a className="email" data-reveal data-delay="2" href="mailto:zliu562@aucklanduni.ac.nz">zliu562@aucklanduni.ac.nz <Arrow diagonal/></a></div><div className="footer-bottom" data-reveal><span>© 2026 Leo Liu</span><div><a href="https://www.linkedin.com/in/ziyu-liu-9b6352355/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/zliu102/" target="_blank" rel="noreferrer">GitHub ↗</a></div><a href="#top">Back to top ↑</a></div></footer>
}

export default function App() {
  useEffect(() => {
    const reveal = element => element.classList.add('is-visible')
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(reveal)
      return
    }
    const observer = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      reveal(e.target)
      observer.unobserve(e.target)
    }), {threshold:.01, rootMargin:'0px 0px 24% 0px'})
    const observe = root => {
      if (root.matches?.('[data-reveal]')) observer.observe(root)
      root.querySelectorAll?.('[data-reveal]').forEach(el => observer.observe(el))
    }
    observe(document)
    const mutations = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(observe)))
    mutations.observe(document.body, {childList:true, subtree:true})
    let frame
    const revealInRange = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(element => {
        const rect = element.getBoundingClientRect()
        if (rect.top < innerHeight * 1.24 && rect.bottom > -innerHeight * .1) {
          reveal(element)
          observer.unobserve(element)
        }
      }))
    }
    const scrollRoot = document.getElementById('root')
    revealInRange()
    scrollRoot.addEventListener('scroll', revealInRange, {passive:true})
    addEventListener('resize', revealInRange)
    return () => {
      observer.disconnect(); mutations.disconnect(); cancelAnimationFrame(frame)
      scrollRoot.removeEventListener('scroll', revealInRange); removeEventListener('resize', revealInRange)
    }
  }, [])
  const path = window.location.pathname
  if (path === '/archive') return <><Header archive/><main><ArchivePage/></main></>
  if (path.startsWith('/archive/')) return <><Header archive/><main><CategoryArchivePage slug={decodeURIComponent(path.slice('/archive/'.length))}/></main></>
  if (path === '/videos') return <><Header archive/><main><VideosPage/></main></>
  return <><Header/><main><Hero/><Gallery/><Film/><Projects/><Research/><About/></main><Footer/></>
}
