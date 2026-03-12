import { useState } from "react";

const DS = {
  colors: {
    base: "#0A0A0F",
    surface: "#111118",
    surfaceHigh: "#18181F",
    border: "#1E1E2E",
    borderHigh: "#2A2A3E",
    text: "#E8E8F0",
    muted: "#6B6B8A",
    mutedMid: "#9898B8",
    accent: "#00E5A0",
    ember: "#FF6B35",
  },
  modules: [
    {
      id: "chatbot", num: "01", name: "AI Concierge", tagline: "24/7 Conversational Intelligence",
      color: "#00E5A0", colorDim: "rgba(0,229,160,0.08)", icon: "◎",
      desc: "A live AI chatbot that answers questions, qualifies leads, guides users through services, and captures bookings — trained on the brand's voice, treatments, and FAQs.",
      stack: { label: "Claude API", reason: "Only live AI delivers the real 'wow' — prospects need to feel the intelligence, not just see a mockup." },
      buildApproach: "api", complexity: "Medium",
      cost: "~$0.002 per conversation", scale: "Unlimited — serverless API", reliability: "99.9% — Anthropic-hosted",
      noCodeAlt: "Voiceflow, Botpress — faster setup but less custom brand voice",
      inputs: ["Brand name", "Industry", "Service/product list", "Tone of voice"],
      outputs: ["Live chat widget", "Lead capture", "Booking CTA push"],
    },
    {
      id: "quiz", num: "02", name: "Quiz & Personalisation Engine", tagline: "Turn Visitors Into Identified Leads",
      color: "#7C6EF0", colorDim: "rgba(124,110,240,0.08)", icon: "◈",
      desc: "A multi-step quiz that segments users by their needs, concerns, or goals — routing them to personalised product or treatment recommendations with an email gate before results.",
      stack: { label: "Pure React", reason: "No backend needed. Logic lives entirely in the component — fast, free to run, and infinitely portable across any brand." },
      buildApproach: "react", complexity: "Low",
      cost: "Zero — pure frontend", scale: "Unlimited — static logic, no server", reliability: "100% — no external dependencies",
      noCodeAlt: "Typeform, Interact — quick but less design control and harder to embed natively",
      inputs: ["Industry vertical", "Question set", "Recommendation mappings"],
      outputs: ["Segmented result page", "Email capture", "Product/service match"],
    },
    {
      id: "email", num: "03", name: "Email Flow Simulator", tagline: "The Lifecycle Engine That Compounds",
      color: "#FF6B35", colorDim: "rgba(255,107,53,0.08)", icon: "◷",
      desc: "A visual walkthrough of a complete email automation lifecycle — from first capture through welcome sequence, education drip, abandoned cart, and re-engagement — with rendered email previews.",
      stack: { label: "Pure React", reason: "This is a demonstration of a flow, not the flow itself. A simulation that makes the invisible tangible is more persuasive than showing a dashboard." },
      buildApproach: "react", complexity: "Low–Medium",
      cost: "Zero — no API", scale: "N/A — demo artifact", reliability: "100% — fully self-contained",
      noCodeAlt: "Klaviyo, Mailchimp — the real delivery tools, but a purpose-built demo is more persuasive",
      inputs: ["Brand name", "Industry", "Product/service name"],
      outputs: ["Flow visualisation", "Rendered email previews", "Timeline walkthrough"],
    },
    {
      id: "reviews", num: "04", name: "Review & Social Proof Engine", tagline: "Build the Trust That Converts",
      color: "#F5C518", colorDim: "rgba(245,197,24,0.08)", icon: "◆",
      desc: "Shows the full review collection lifecycle — trigger event → automated request → published review — plus a dramatic before/after product page comparison demonstrating the 52% conversion uplift.",
      stack: { label: "Pure React", reason: "The most powerful element is the before/after toggle. No live data needed — the visual contrast sells the concept entirely on its own." },
      buildApproach: "react", complexity: "Low",
      cost: "Zero — self-contained", scale: "N/A — demo artifact", reliability: "100% — no dependencies",
      noCodeAlt: "Stamped.io, Judge.me, Trustpilot — real collection tools. Demo shows the outcome, not the tool.",
      inputs: ["Brand name", "Product/service names", "Sample review text"],
      outputs: ["Review request simulator", "Before/after page toggle", "Conversion uplift display"],
    },
    {
      id: "upsell", num: "05", name: "Upsell & Replenishment Engine", tagline: "Increase Every Order. Recover Every Lapsed Customer.",
      color: "#00BFFF", colorDim: "rgba(0,191,255,0.08)", icon: "◉",
      desc: "A product page with intelligent 'complete your routine' recommendation blocks, a post-purchase upsell screen, and an AOV calculator that lets prospects plug in their own revenue numbers.",
      stack: { label: "React + Claude API", reason: "Claude dynamically suggests products based on cart contents — making it feel genuinely intelligent. The AOV calculator is pure React math." },
      buildApproach: "hybrid", complexity: "Medium",
      cost: "Very low — Claude called on recommendation only", scale: "Unlimited", reliability: "High — degrades to static fallback",
      noCodeAlt: "Rebuy, CartHook (Shopify) — real upsell tools, but a live revenue calculator is more persuasive",
      inputs: ["Product/service catalogue", "Price points", "Monthly order volume"],
      outputs: ["Smart product page", "Post-purchase upsell screen", "AOV revenue calculator"],
    },
  ],
};

const Tag = ({ children, color }) => (
  <span style={{
    background: color + "20", color, border: `1px solid ${color}40`,
    borderRadius: 4, padding: "2px 10px", fontSize: 11,
    fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
  }}>{children}</span>
);

const Dot = ({ filled, color }) => (
  <span style={{ color: filled ? color : "#2A2A3E", fontSize: 12 }}>●</span>
);

const ScoreDots = ({ score, color }) => (
  <span style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => <Dot key={i} filled={i <= score} color={color} />)}
  </span>
);

const MetaRow = ({ label, value, color, accent }) => (
  <div style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: "1px solid #1E1E2E" }}>
    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 100, paddingTop: 2 }}>{label}</div>
    <div style={{ fontSize: 12, color: color || "#9898B8", flex: 1 }}>{value}</div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModule, setActiveModule] = useState(0);
  const mod = DS.modules[activeModule];

  const tabs = ["Overview", "Colours", "Typography", "Modules", "Tech Stack", "Build Order"];

  const scores = {
    chatbot:  { cost: 3, ease: 3, scale: 5, rel: 4 },
    quiz:     { cost: 5, ease: 4, scale: 5, rel: 5 },
    email:    { cost: 5, ease: 5, scale: 5, rel: 5 },
    reviews:  { cost: 5, ease: 5, scale: 5, rel: 5 },
    upsell:   { cost: 4, ease: 3, scale: 5, rel: 4 },
  };

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh", color: "#E8E8F0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1E1E2E", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54, background: "#0A0A0Fee", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 26, height: 26, background: "#00E5A0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, background: "#0A0A0F", borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}>ARIA</span>
          <span style={{ color: "#6B6B8A", fontSize: 12, fontFamily: "monospace" }}>/ Design System v1.0</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["AI-Powered", "5 Modules", "Multi-Brand"].map(t => <Tag key={t} color="#00E5A0">{t}</Tag>)}
        </div>
      </div>

      {/* Nav */}
      <div style={{ borderBottom: "1px solid #1E1E2E", padding: "0 32px", display: "flex", gap: 2, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none",
            borderBottom: activeTab === tab ? "2px solid #00E5A0" : "2px solid transparent",
            color: activeTab === tab ? "#E8E8F0" : "#6B6B8A",
            padding: "13px 16px 11px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            fontWeight: activeTab === tab ? 600 : 400,
            whiteSpace: "nowrap", transition: "all 0.15s",
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: "36px 32px 80px", maxWidth: 1060, margin: "0 auto" }}>

        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <div>
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#00E5A0", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>AI Revenue Intelligence Architecture</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                ARIA <span style={{ color: "#6B6B8A", fontWeight: 700, fontSize: 28 }}>Demo Suite</span>
              </h1>
              <p style={{ color: "#9898B8", fontSize: 15, lineHeight: 1.75, maxWidth: 600, margin: 0 }}>
                A cohesive product design system for 5 AI demo modules — built to be re-skinned across any brand vertical, from beauty clinics to wellness e-commerce to hospitality. Every demo shares one visual language.
              </p>
            </div>

            {/* Principles */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Design Principles</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { p: "Brand-Agnostic Shell", d: "Neutral dark base lets any brand's colours, logo, and voice layer on top without clashing with the demo UI." },
                  { p: "Intelligence First", d: "Every demo leads with the AI output. The UI serves the intelligence, not the other way around." },
                  { p: "Simulation = Persuasion", d: "Where live AI isn't needed, a convincing simulation outperforms a real dashboard. Demos should feel real." },
                  { p: "One Suite, Five Voices", d: "Each module has its own accent colour — distinct identity within a unified system. A product family, not five separate tools." },
                ].map(({ p, d }) => (
                  <div key={p} style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 10, padding: 20 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{p}</div>
                    <div style={{ fontSize: 13, color: "#6B6B8A", lineHeight: 1.65 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suite Identity */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Suite Identity</span>
              </div>
              <div style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Suite Name</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#00E5A0" }}>ARIA</div>
                  <div style={{ fontSize: 12, color: "#6B6B8A", marginTop: 4 }}>AI Revenue Intelligence Architecture</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Positioning</div>
                  <div style={{ fontSize: 13, color: "#9898B8", lineHeight: 1.6 }}>A suite of AI-powered growth tools for consumer brands — from first click to loyal customer</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Target Verticals</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {["Beauty", "Wellness", "Clinics", "E-commerce", "Hospitality", "Retail"].map(v => (
                      <Tag key={v} color="#6B6B8A">{v}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── COLOURS ── */}
        {activeTab === "Colours" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Base Palette</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 36 }}>
              {[
                { name: "Base", hex: "#0A0A0F", use: "Page background" },
                { name: "Surface", hex: "#111118", use: "Cards, panels" },
                { name: "Surface High", hex: "#18181F", use: "Inputs, hovers" },
                { name: "Border", hex: "#1E1E2E", use: "Dividers, outlines" },
                { name: "Text", hex: "#E8E8F0", use: "Primary copy" },
                { name: "Muted Mid", hex: "#9898B8", use: "Secondary copy" },
                { name: "Muted", hex: "#6B6B8A", use: "Labels, captions" },
                { name: "Accent", hex: "#00E5A0", use: "Primary CTA, links" },
              ].map(c => (
                <div key={c.name} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #1E1E2E" }}>
                  <div style={{ background: c.hex, height: 60, border: c.hex === "#0A0A0F" ? "1px solid #1E1E2E" : "none" }} />
                  <div style={{ background: "#111118", padding: "12px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#00E5A0", marginBottom: 4 }}>{c.hex}</div>
                    <div style={{ fontSize: 11, color: "#6B6B8A" }}>{c.use}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Module Accent Colours</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 36 }}>
              {DS.modules.map(m => (
                <div key={m.id} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #1E1E2E" }}>
                  <div style={{ background: `linear-gradient(135deg, ${m.color}25, ${m.color}05)`, height: 70, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: m.color }}>{m.icon}</div>
                  <div style={{ background: "#111118", padding: "12px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>{m.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: m.color }}>{m.color}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Usage Rules</span>
            </div>
            <div style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, padding: "4px 24px" }}>
              {[
                ["Never use white backgrounds", "Dark base is non-negotiable — it frames brand colours without fighting them"],
                ["Module colour = module accent only", "Don't mix module colours. Each owns its demo — borders, icons, tags, and CTAs only"],
                ["Suite accent on key actions", "#00E5A0 is reserved for primary CTAs and active states in the navigation shell"],
                ["Text hierarchy is density-based", "Text / Muted Mid / Muted = primary / secondary / tertiary. Never change base font colours"],
              ].map(([rule, reason]) => (
                <div key={rule} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #1E1E2E" }}>
                  <div style={{ color: "#00E5A0", fontSize: 14, marginTop: 1, flexShrink: 0 }}>→</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{rule}</div>
                    <div style={{ fontSize: 12, color: "#6B6B8A" }}>{reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TYPOGRAPHY ── */}
        {activeTab === "Typography" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Type System</span>
            </div>
            <div style={{ display: "grid", gap: 14, marginBottom: 36 }}>
              {[
                { role: "Display", font: "Playfair Display", weight: "700–900", sizes: "32–64px", use: "Module names, hero headlines", sample: "AI Concierge", sz: 38, family: "'Playfair Display', serif", fw: 900 },
                { role: "UI / Body", font: "DM Sans", weight: "300–600", sizes: "12–18px", use: "All body copy, labels, buttons, inputs", sample: "Turn every visitor into a booked client.", sz: 20, family: "'DM Sans', sans-serif", fw: 400 },
                { role: "Code / Data", font: "JetBrains Mono", weight: "400–600", sizes: "10–13px", use: "Hex values, tokens, API labels, stat callouts", sample: "#00E5A0  →  claude-sonnet-4-6", sz: 14, family: "monospace", fw: 500 },
              ].map(t => (
                <div key={t.role} style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, padding: 24 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
                    <Tag color="#00E5A0">{t.role}</Tag>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A" }}>{t.font}</span>
                  </div>
                  <div style={{ fontFamily: t.family, fontSize: t.sz, fontWeight: t.fw, color: "#E8E8F0", marginBottom: 14, lineHeight: 1.2 }}>{t.sample}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[["Weight", t.weight], ["Sizes", t.sizes], ["Used for", t.use]].map(([l, v]) => (
                      <div key={l}>
                        <div style={{ fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace", marginBottom: 3 }}>{l}</div>
                        <div style={{ fontSize: 12, color: "#9898B8" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Type Scale</span>
            </div>
            <div style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, padding: "4px 24px" }}>
              {[
                { label: "Display", spec: "48px / 900 / Playfair", example: "AI Concierge", sz: 40, family: "'Playfair Display', serif", fw: 900, col: "#E8E8F0" },
                { label: "H1", spec: "32px / 700 / Playfair", example: "Turn visitors into clients", sz: 28, family: "'Playfair Display', serif", fw: 700, col: "#E8E8F0" },
                { label: "H2", spec: "20px / 600 / DM Sans", example: "How It Works", sz: 18, family: "'DM Sans', sans-serif", fw: 600, col: "#E8E8F0" },
                { label: "Body", spec: "14px / 400 / DM Sans", example: "Every demo shares one design language, re-skinned per brand.", sz: 14, family: "'DM Sans', sans-serif", fw: 400, col: "#9898B8" },
                { label: "Caption", spec: "12px / 400 / DM Sans", example: "Confidential · February 2026", sz: 12, family: "'DM Sans', sans-serif", fw: 400, col: "#6B6B8A" },
                { label: "Mono", spec: "11px / 600 / JetBrains", example: "POST /v1/messages → 200 OK", sz: 11, family: "monospace", fw: 600, col: "#00E5A0" },
              ].map(t => (
                <div key={t.label} style={{ display: "flex", gap: 20, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid #1E1E2E" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", minWidth: 56 }}>{t.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", minWidth: 190 }}>{t.spec}</div>
                  <div style={{ fontFamily: t.family, fontSize: t.sz, fontWeight: t.fw, color: t.col }}>{t.example}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MODULES ── */}
        {activeTab === "Modules" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 24 }}>
              {DS.modules.map((m, i) => (
                <div key={m.id} onClick={() => setActiveModule(i)} style={{
                  background: activeModule === i ? m.colorDim : "#111118",
                  border: `1px solid ${activeModule === i ? m.color + "60" : "#1E1E2E"}`,
                  borderRadius: 10, padding: "16px 18px", cursor: "pointer",
                  position: "relative", overflow: "hidden", transition: "all 0.2s",
                }}>
                  {activeModule === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontSize: 20, color: m.color }}>{m.icon}</div>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: m.color, background: m.color + "20", padding: "1px 6px", borderRadius: 3 }}>{m.num}</span>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#6B6B8A", lineHeight: 1.4 }}>{m.tagline}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111118", border: `1px solid ${mod.color}40`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ height: 3, background: mod.color }} />
              <div style={{ padding: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <Tag color={mod.color}>{mod.num}</Tag>
                      <Tag color={mod.color}>{mod.stack.label}</Tag>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>{mod.name}</h2>
                    <div style={{ color: mod.color, fontSize: 13 }}>{mod.tagline}</div>
                  </div>
                  <div style={{ fontSize: 36, color: mod.color }}>{mod.icon}</div>
                </div>
                <p style={{ color: "#9898B8", fontSize: 13, lineHeight: 1.7, marginBottom: 22, maxWidth: 680 }}>{mod.desc}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Build Specs</div>
                    <MetaRow label="Stack" value={mod.stack.label} color={mod.color} />
                    <MetaRow label="Complexity" value={mod.complexity} />
                    <MetaRow label="Cost" value={mod.cost} color="#00E5A0" />
                    <MetaRow label="Scale" value={mod.scale} />
                    <MetaRow label="Reliability" value={mod.reliability} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Inputs & Outputs</div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, color: "#6B6B8A", fontFamily: "monospace", marginBottom: 6 }}>INPUTS</div>
                      {mod.inputs.map(inp => (
                        <div key={inp} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: mod.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#9898B8" }}>{inp}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#6B6B8A", fontFamily: "monospace", marginBottom: 6 }}>OUTPUTS</div>
                      {mod.outputs.map(out => (
                        <div key={out} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00E5A0", flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#9898B8" }}>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ background: mod.colorDim, border: `1px solid ${mod.color}25`, borderRadius: 8, padding: 14, marginTop: 18 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: mod.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Why this stack</div>
                  <div style={{ fontSize: 13, color: "#9898B8", lineHeight: 1.65 }}>{mod.stack.reason}</div>
                </div>
                <div style={{ background: "#18181F", border: "1px solid #1E1E2E", borderRadius: 8, padding: 14, marginTop: 10 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6B6B8A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>No-Code Alternative</div>
                  <div style={{ fontSize: 13, color: "#6B6B8A", lineHeight: 1.65 }}>{mod.noCodeAlt}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TECH STACK ── */}
        {activeTab === "Tech Stack" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Approach Framework</span>
            </div>
            <p style={{ color: "#9898B8", fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 660 }}>
              Each demo is evaluated across four dimensions — Cost, Ease of Development, Scale, and Reliability — to determine the optimal build approach. The framework maps every decision.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }}>
              {[
                { label: "Claude API", color: "#00E5A0", desc: "Best for live intelligence and conversational demos. Cost is usage-based but very low. Scales without infrastructure. Use when real AI behaviour is the point of the demo." },
                { label: "Pure React", color: "#7C6EF0", desc: "Best for visual simulations, flow demos, and calculators. Zero running cost. No backend, no API keys. Fully portable — embed anywhere, run forever." },
                { label: "Hybrid (React + API)", color: "#00BFFF", desc: "Best when you need both intelligent responses and visual interactivity. Claude handles reasoning; React manages UI state and layout." },
                { label: "No-Code Reference", color: "#FF6B35", desc: "Documented per module as the real-world production alternative. Frames the code demo as the premium, custom version and gives clients a clear production path." },
              ].map(a => (
                <div key={a.label} style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 10, padding: 20 }}>
                  <Tag color={a.color}>{a.label}</Tag>
                  <div style={{ marginTop: 12, fontSize: 13, color: "#6B6B8A", lineHeight: 1.65 }}>{a.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Decision Matrix</span>
            </div>
            <div style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "170px 140px 1fr 1fr 1fr 1fr", borderBottom: "1px solid #1E1E2E", background: "#18181F" }}>
                {["Module", "Stack", "Cost", "Dev Ease", "Scale", "Reliability"].map(h => (
                  <div key={h} style={{ padding: "11px 16px", fontSize: 10, color: "#6B6B8A", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
                ))}
              </div>
              {DS.modules.map((m, i) => {
                const s = scores[m.id];
                return (
                  <div key={m.id} style={{ display: "grid", gridTemplateColumns: "170px 140px 1fr 1fr 1fr 1fr", borderBottom: i < 4 ? "1px solid #1E1E2E" : "none", background: i % 2 === 1 ? "#18181F" : "transparent" }}>
                    <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: m.color, fontSize: 14 }}>{m.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{m.name}</span>
                    </div>
                    <div style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}><Tag color={m.color}>{m.stack.label}</Tag></div>
                    {[s.cost, s.ease, s.scale, s.rel].map((score, si) => (
                      <div key={si} style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
                        <ScoreDots score={score} color={m.color} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#6B6B8A", fontFamily: "monospace" }}>● filled = scored · ● dim = not scored · 5 dots = maximum</div>
          </div>
        )}

        {/* ── BUILD ORDER ── */}
        {activeTab === "Build Order" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Recommended Build Sequence</span>
            </div>
            <p style={{ color: "#9898B8", fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 660 }}>
              Build order is determined by demo impact in a sales context. Highest visibility and easiest to understand come first. Each demo also feeds into the next, building a narrative arc from acquisition to retention.
            </p>
            <div style={{ display: "grid", gap: 12, marginBottom: 36 }}>
              {[
                { phase: "Phase 1", mod: DS.modules[0], why: "Highest visibility. Every prospect can immediately interact with it. The 'wow moment' that opens the conversation and demonstrates real AI capability in under 60 seconds.", deliverable: "Live Claude-powered chat widget, configurable per brand" },
                { phase: "Phase 2", mod: DS.modules[1], why: "Most universally applicable — appears in 22 of 25 proposals. Zero API cost. Fast to build. Anonymous visitor becomes a segmented, identified lead with a clear product match.", deliverable: "5-step quiz with dynamic result page + email gate" },
                { phase: "Phase 3", mod: DS.modules[3], why: "Fastest ROI story. The before/after conversion uplift is the most concrete number across all 25 proposals (up to 52%). Easiest demo to follow. Builds trust in the suite.", deliverable: "Review trigger simulator + before/after page toggle" },
                { phase: "Phase 4", mod: DS.modules[2], why: "Makes the invisible visible. Once chatbot + quiz are built, the email flow completes the acquisition story. Best shown as a continuation of Phases 1–2.", deliverable: "Animated lifecycle flow + rendered email preview carousel" },
                { phase: "Phase 5", mod: DS.modules[4], why: "Highest revenue impact per transaction. Built last because the AOV calculator hits hardest when the prospect already believes in the first four tools.", deliverable: "Smart product page + post-purchase screen + AOV calculator" },
              ].map(({ phase, mod, why, deliverable }) => (
                <div key={phase} style={{ display: "grid", gridTemplateColumns: "72px 1fr", background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ background: mod.colorDim, borderRight: `1px solid ${mod.color}20`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 14, gap: 6 }}>
                    <div style={{ fontSize: 22, color: mod.color }}>{mod.icon}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: mod.color, textAlign: "center", letterSpacing: "0.05em" }}>{phase}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>{mod.name}</span>
                      <Tag color={mod.color}>{mod.stack.label}</Tag>
                    </div>
                    <p style={{ fontSize: 13, color: "#9898B8", lineHeight: 1.65, margin: "0 0 10px" }}>{why}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00E5A0", flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#6B6B8A", fontFamily: "monospace" }}>{deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 3, height: 18, background: "#00E5A0", borderRadius: 2 }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6B6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>The Full Customer Journey</span>
            </div>
            <div style={{ background: "#111118", border: "1px solid #1E1E2E", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                {[
                  { label: "Visitor Arrives", sub: "Chatbot engages", color: DS.modules[0].color },
                  { label: "→", sub: "", color: "#2A2A3E" },
                  { label: "Quiz Personalises", sub: "Lead identified", color: DS.modules[1].color },
                  { label: "→", sub: "", color: "#2A2A3E" },
                  { label: "Reviews Reassure", sub: "Trust built", color: DS.modules[3].color },
                  { label: "→", sub: "", color: "#2A2A3E" },
                  { label: "Email Nurtures", sub: "Lifecycle begins", color: DS.modules[2].color },
                  { label: "→", sub: "", color: "#2A2A3E" },
                  { label: "Upsell Grows", sub: "Value maximised", color: DS.modules[4].color },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center", padding: "6px 10px" }}>
                    <div style={{ fontFamily: s.label === "→" ? "monospace" : "'DM Sans', sans-serif", fontSize: s.label === "→" ? 18 : 13, fontWeight: 600, color: s.color }}>{s.label}</div>
                    {s.sub && <div style={{ fontSize: 10, color: "#6B6B8A", fontFamily: "monospace", marginTop: 3 }}>{s.sub}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}