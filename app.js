{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww34000\viewh20820\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /* ========= Helpers ========= */\
const $ = (sel, parent = document) => parent.querySelector(sel);\
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];\
\
/* ========= Navbar toggle (mobile) ========= */\
const navToggle = $("#navToggle");\
const navLinks = $("#navLinks");\
if (navToggle && navLinks) \{\
  navToggle.addEventListener("click", () => \{\
    const isOpen = navLinks.classList.toggle("open");\
    navToggle.setAttribute("aria-expanded", String(isOpen));\
  \});\
\
  // close menu on click\
  navLinks.addEventListener("click", (e) => \{\
    const a = e.target.closest("a");\
    if (!a) return;\
    navLinks.classList.remove("open");\
    navToggle.setAttribute("aria-expanded", "false");\
  \});\
\}\
\
/* ========= Smooth anchor scrolling ========= */\
$$('a[href^="#"]').forEach(a => \{\
  a.addEventListener("click", (e) => \{\
    const id = a.getAttribute("href");\
    if (!id || id === "#") return;\
    const el = document.querySelector(id);\
    if (!el) return;\
    e.preventDefault();\
    el.scrollIntoView(\{ behavior: "smooth", block: "start" \});\
  \});\
\});\
\
/* ========= Reveal on scroll ========= */\
const io = new IntersectionObserver((entries) => \{\
  for (const entry of entries) \{\
    if (entry.isIntersecting) entry.target.classList.add("isVisible");\
  \}\
\}, \{ threshold: 0.12 \});\
\
$$(".reveal").forEach(el => io.observe(el));\
\
/* ========= Scroll progress ========= */\
const scrollBar = $("#scrollBar");\
function onScroll()\{\
  const h = document.documentElement;\
  const scrollTop = h.scrollTop || document.body.scrollTop;\
  const height = (h.scrollHeight - h.clientHeight) || 1;\
  const pct = Math.max(0, Math.min(1, scrollTop / height));\
  if (scrollBar) scrollBar.style.width = `$\{pct * 100\}%`;\
\}\
document.addEventListener("scroll", onScroll, \{ passive: true \});\
onScroll();\
\
/* ========= Count-up stats ========= */\
function formatNumber(n)\{\
  // keep 1 decimal for small float multipliers (e.g., 2.3)\
  if (n % 1 !== 0) return n.toFixed(1);\
  return n.toLocaleString();\
\}\
\
function animateCount(el, target)\{\
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;\
  if (prefersReduced) \{ el.textContent = formatNumber(target); return; \}\
\
  const start = performance.now();\
  const duration = 1200 + Math.random() * 500;\
  const from = 0;\
\
  function tick(t)\{\
    const p = Math.min(1, (t - start) / duration);\
    const eased = 1 - Math.pow(1 - p, 3);\
    const val = from + (target - from) * eased;\
    el.textContent = formatNumber(val);\
    if (p < 1) requestAnimationFrame(tick);\
  \}\
  requestAnimationFrame(tick);\
\}\
\
const countEls = $$("[data-count]");\
const countIO = new IntersectionObserver((entries) => \{\
  for (const entry of entries) \{\
    if (!entry.isIntersecting) continue;\
    const el = entry.target;\
    const target = Number(el.getAttribute("data-count"));\
    if (!Number.isFinite(target)) continue;\
    if (el.dataset.done === "1") continue;\
    el.dataset.done = "1";\
    animateCount(el, target);\
  \}\
\}, \{ threshold: 0.35 \});\
\
countEls.forEach(el => countIO.observe(el));\
\
/* ========= Copy email ========= */\
const copyBtn = $("#copyEmail");\
const toast = $("#toast");\
function showToast(msg)\{\
  if (!toast) return;\
  toast.textContent = msg;\
  toast.style.opacity = "1";\
  clearTimeout(showToast._t);\
  showToast._t = setTimeout(() => \{ toast.textContent = ""; \}, 1800);\
\}\
if (copyBtn) \{\
  copyBtn.addEventListener("click", async () => \{\
    try\{\
      await navigator.clipboard.writeText("abhishikatsoni@gmail.com");\
      showToast("Copied email \uc0\u9989 ");\
    \}catch\{\
      showToast("Copy failed \'97 please copy manually.");\
    \}\
  \});\
\}\
\
/* ========= Footer year ========= */\
const y = $("#year");\
if (y) y.textContent = String(new Date().getFullYear());\
\
/* ========= Canvas backgrounds ========= */\
function resizeCanvas(c)\{\
  const dpr = Math.min(2, window.devicePixelRatio || 1);\
  c.width = Math.floor(innerWidth * dpr);\
  c.height = Math.floor(innerHeight * dpr);\
  const ctx = c.getContext("2d");\
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\
  return ctx;\
\}\
\
/* Stars */\
const starsCanvas = $("#stars");\
let sctx;\
let stars = [];\
\
function initStars()\{\
  if (!starsCanvas) return;\
  sctx = resizeCanvas(starsCanvas);\
  const count = Math.floor(Math.min(220, Math.max(120, innerWidth / 7)));\
  stars = Array.from(\{ length: count \}, () => (\{\
    x: Math.random() * innerWidth,\
    y: Math.random() * innerHeight,\
    r: Math.random() * 1.2 + 0.2,\
    a: Math.random() * 0.6 + 0.15,\
    tw: Math.random() * 0.02 + 0.006\
  \}));\
\}\
\
function drawStars()\{\
  if (!sctx) return;\
  sctx.clearRect(0,0,innerWidth,innerHeight);\
  for (const st of stars)\{\
    st.a += (Math.random() - 0.5) * st.tw;\
    st.a = Math.max(0.08, Math.min(0.7, st.a));\
    sctx.beginPath();\
    sctx.globalAlpha = st.a;\
    sctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);\
    sctx.fillStyle = "#ffffff";\
    sctx.fill();\
  \}\
  sctx.globalAlpha = 1;\
  requestAnimationFrame(drawStars);\
\}\
\
/* Particles (soft lines + drift) */\
const pCanvas = $("#particles");\
let pctx;\
let pts = [];\
\
function initParticles()\{\
  if (!pCanvas) return;\
  pctx = resizeCanvas(pCanvas);\
  const count = Math.floor(Math.min(70, Math.max(34, innerWidth / 24)));\
  pts = Array.from(\{ length: count \}, () => (\{\
    x: Math.random() * innerWidth,\
    y: Math.random() * innerHeight,\
    vx: (Math.random() - 0.5) * 0.35,\
    vy: (Math.random() - 0.5) * 0.35,\
    r: Math.random() * 1.8 + 0.8\
  \}));\
\}\
\
function drawParticles()\{\
  if (!pctx) return;\
  pctx.clearRect(0,0,innerWidth,innerHeight);\
\
  // glow dots\
  for (const p of pts)\{\
    p.x += p.vx; p.y += p.vy;\
    if (p.x < -20) p.x = innerWidth + 20;\
    if (p.x > innerWidth + 20) p.x = -20;\
    if (p.y < -20) p.y = innerHeight + 20;\
    if (p.y > innerHeight + 20) p.y = -20;\
\
    pctx.beginPath();\
    pctx.globalAlpha = 0.45;\
    pctx.arc(p.x, p.y, p.r, 0, Math.PI*2);\
    pctx.fillStyle = "rgba(255,255,255,.9)";\
    pctx.fill();\
  \}\
\
  // connections\
  for (let i=0; i<pts.length; i++)\{\
    for (let j=i+1; j<pts.length; j++)\{\
      const a = pts[i], b = pts[j];\
      const dx = a.x - b.x, dy = a.y - b.y;\
      const d2 = dx*dx + dy*dy;\
      const max = 170*170;\
      if (d2 > max) continue;\
      const t = 1 - (d2 / max);\
      pctx.globalAlpha = 0.12 * t;\
      pctx.beginPath();\
      pctx.moveTo(a.x, a.y);\
      pctx.lineTo(b.x, b.y);\
      pctx.strokeStyle = "rgba(255,255,255,1)";\
      pctx.lineWidth = 1;\
      pctx.stroke();\
    \}\
  \}\
\
  pctx.globalAlpha = 1;\
  requestAnimationFrame(drawParticles);\
\}\
\
function boot()\{\
  initStars(); initParticles();\
  drawStars(); drawParticles();\
\}\
boot();\
\
addEventListener("resize", () => \{\
  initStars();\
  initParticles();\
\});\
}