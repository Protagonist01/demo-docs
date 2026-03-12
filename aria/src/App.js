import { useState } from "react";

const DS = {
  colors: {
    base: "#0A0A0F", surface: "#111118", surfaceHigh: "#18181F",
    border: "#1E1E2E", text: "#E8E8F0", muted: "#6B6B8A",
    mutedMid: "#9898B8", accent: "#00E5A0",
  },
  modules: [
    {
      id: "chatbot", num: "01", name: "AI Concierge", tagline: "24/7 Conversational Intelligence",
      color: "#00E5A0", colorDim: "rgba(0,229,160,0.08)", icon: "◎",
      desc: "A live AI chatbot that answers questions, qualifies leads, guides users through services, and captures bookings — trained on the brand's voice, treatments, and FAQs.",
      stack: { label: "Claude API", reason: "Only live AI delivers the real 'wow' — prospects need to feel the intelligence, not just see a mockup. A hardcoded chatbot reads as fake immediately." },
      buildApproach: "api", complexity: "Medium", cost: "~$0.002 per conversation",
      scale: "Unlimited — serverless API", reliability: "99.9% — Anthropic-hosted",
      noCodeAlt: "Voiceflow, Botpress — faster setup but less custom brand voice",
      inputs: ["Brand name", "Industry", "Service/product list", "Tone of voice"],
      outputs: ["Live chat widget", "Lead capture", "Booking CTA push"],
      scores: { cost: 3, ease: 3, scale: 5, rel: 4 }, clinic: false,
    },
    {
      id: "quiz", num: "02", name: "Quiz & Personalisation Engine", tagline: "Turn Visitors Into Identified Leads",
      color: "#7C6EF0", colorDim: "rgba(124,110,240,0.08)", icon: "◈",
      desc: "A multi-step quiz that segments users by their needs, concerns, or goals — routing them to personalised product or treatment recommendations with an email capture gate before results.",
      stack: { label: "Pure React", reason: "No backend needed. Logic lives entirely in React component state — fast, free to run, and infinitely portable across any brand." },
      buildApproach: "react", complexity: "Low", cost: "Zero — pure frontend",
      scale: "Unlimited — static logic, no server", reliability: "100% — no external dependencies",
      noCodeAlt: "Typeform, Interact — quick but less design control and harder to embed natively",
      inputs: ["Industry vertical", "Question set (5–7)", "Recommendation mappings"],
      outputs: ["Segmented result page", "Email capture", "Product/service match"],
      scores: { cost: 5, ease: 4, scale: 5, rel: 5 }, clinic: false,
    },
    {
      id: "email", num: "03", name: "Email Flow Simulator", tagline: "The Lifecycle Engine That Compounds",
      color: "#FF6B35", colorDim: "rgba(255,107,53,0.08)", icon: "◷",
      desc: "A visual walkthrough of a complete email automation lifecycle — from first capture through welcome sequence, education drip, abandoned cart, and re-engagement — with rendered email previews.",
      stack: { label: "Pure React", reason: "A simulation that makes the invisible tangible is more persuasive than a real dashboard. The goal is to help clients visualise what happens after someone enters their email." },
      buildApproach: "react", complexity: "Low–Medium", cost: "Zero — no API",
      scale: "N/A — demo artifact", reliability: "100% — fully self-contained",
      noCodeAlt: "Klaviyo, Mailchimp — the real delivery tools, but a purpose-built demo is more persuasive",
      inputs: ["Brand name", "Industry", "Product/service name"],
      outputs: ["Flow visualisation", "Rendered email previews", "Timeline walkthrough"],
      scores: { cost: 5, ease: 5, scale: 5, rel: 5 }, clinic: false,
    },
    {
      id: "reviews", num: "04", name: "Review & Social Proof Engine", tagline: "Build the Trust That Converts",
      color: "#F5C518", colorDim: "rgba(245,197,24,0.08)", icon: "◆",
      desc: "Shows the full review collection lifecycle — trigger → automated request → published review — plus a dramatic before/after product page comparison demonstrating up to 52% conversion uplift.",
      stack: { label: "Pure React", reason: "The most powerful element is the before/after toggle. No live data needed — the visual contrast sells the concept entirely on its own." },
      buildApproach: "react", complexity: "Low", cost: "Zero — self-contained",
      scale: "N/A — demo artifact", reliability: "100% — no dependencies",
      noCodeAlt: "Stamped.io, Judge.me, Trustpilot — real collection tools. Demo shows the outcome, not the platform.",
      inputs: ["Brand name", "Product/service names", "Sample review text"],
      outputs: ["Review request simulator", "Before/after page toggle", "Conversion uplift display"],
      scores: { cost: 5, ease: 5, scale: 5, rel: 5 }, clinic: false,
    },
    {
      id: "upsell", num: "05", name: "Upsell & Replenishment Engine", tagline: "Increase Every Order. Recover Every Lapsed Customer.",
      color: "#00BFFF", colorDim: "rgba(0,191,255,0.08)", icon: "◉",
      desc: "A product page with intelligent 'complete your routine' recommendation blocks, a post-purchase upsell screen, and an AOV calculator that lets prospects plug in their own revenue numbers.",
      stack: { label: "React + Claude API", reason: "Claude dynamically suggests products based on cart contents — making it feel genuinely intelligent. The AOV calculator is pure React math." },
      buildApproach: "hybrid", complexity: "Medium", cost: "Very low — Claude called on recommendation trigger only",
      scale: "Unlimited", reliability: "High — degrades to static fallback",
      noCodeAlt: "Rebuy, CartHook (Shopify) — real upsell tools, but a live revenue calculator is more persuasive",
      inputs: ["Product/service catalogue", "Price points", "Monthly order volume"],
      outputs: ["Smart product page", "Post-purchase upsell screen", "AOV revenue calculator"],
      scores: { cost: 4, ease: 3, scale: 5, rel: 4 }, clinic: false,
    },
    {
      id: "booking", num: "06", name: "Smart Booking & No-Show System", tagline: "Fill Every Slot. Recover Every No-Show.",
      color: "#5C8A6E", colorDim: "rgba(92,138,110,0.08)", icon: "◌",
      desc: "End-to-end appointment automation — booking confirmation, 48hr and 2hr reminders, no-show detection, AI-drafted recovery messages, waitlist slot refill, and a no-show revenue recovery calculator.",
      stack: { label: "React + Claude API", reason: "Reminder sequences are best as a React visual simulation. Claude handles the rescheduling conversation — the one interaction where live intelligence meaningfully beats a no-code template." },
      buildApproach: "hybrid", complexity: "Medium–High", cost: "Very low — Claude called on no-show recovery only",
      scale: "Unlimited", reliability: "High — degrades to static reminder display",
      noCodeAlt: "Acuity Scheduling, Cliniko, Pabau — real booking tools with some automation; demo shows the AI-powered layer on top",
      inputs: ["Treatment names & prices", "Appointment confirmation copy", "Reminder timing preferences"],
      outputs: ["Booking confirmation screen", "Reminder timeline visualiser", "No-show recovery simulator", "Revenue recovery calculator"],
      scores: { cost: 4, ease: 3, scale: 5, rel: 4 }, clinic: true,
    },
  ],
};

const C = DS.colors;

const Tag = ({ children, color }) => (
  <span style={{
    background: (color || C.accent) + "20", color: color || C.accent,
    border: `1px solid ${(color || C.accent)}40`, borderRadius: 4,
    padding: "2px 10px", fontSize: 11, fontFamily: "monospace",
    fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
  }}>{children}</span>
);

const ScoreDots = ({ score, color }) => (
  <span style={{ display: "flex", gap: 3 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= score ? color : "#2A2A3E", fontSize: 11 }}>●</span>
    ))}
  </span>
);

const SectionLabel = ({ label, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <div style={{ width: 3, height: 18, background: accent || C.accent, borderRadius: 2 }} />
    <span style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
  </div>
);

const MetaRow = ({ label, value, color }) => (
  <div style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
    <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 100, paddingTop: 2 }}>{label}</div>
    <div style={{ fontSize: 12, color: color || C.mutedMid, flex: 1 }}>{value}</div>
  </div>
);

import { useState, useEffect } from "react";

// Hook to detect narrow screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeModule, setActiveModule] = useState(0);
  const mod = DS.modules[activeModule];
  const tabs = ["Overview", "Colours", "Typography", "Modules", "Tech Stack", "Build Order"];

  return (
    <div style={{ background: C.base, minHeight: "100vh", color: C.text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54, background: C.base + "EE", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 26, height: 26, background: C.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, background: C.base, borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, letterSpacing: "0.06em" }}>ARIA</span>
          <span style={{ color: C.muted, fontSize: 12, fontFamily: "monospace" }}>/ Design System v1.1</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["AI-Powered", "6 Modules", "Multi-Brand"].map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: isMobile ? "0 16px" : "0 32px", display: "flex", gap: 2, overflowX: "auto", whiteSpace: "nowrap" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none",
            borderBottom: activeTab === tab ? `2px solid ${C.accent}` : "2px solid transparent",
            color: activeTab === tab ? C.text : C.muted,
            padding: "13px 16px 11px", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            fontWeight: activeTab === tab ? 600 : 400, transition: "all 0.15s",
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: isMobile ? "24px 16px 60px" : "36px 32px 80px", maxWidth: 1060, margin: "0 auto" }}>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div>
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.accent, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>AI Revenue Intelligence Architecture</div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 36 : 52, fontWeight: 600, margin: "0 0 14px", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
                ARIA <span style={{ color: C.muted, fontWeight: 300, fontSize: isMobile ? 24 : 32 }}>Demo Suite</span>
              </h1>
              <p style={{ color: C.mutedMid, fontSize: 15, lineHeight: 1.75, maxWidth: 600, margin: 0 }}>
                A cohesive product design system for 6 AI demo modules — built to be re-skinned across any brand vertical. Every demo shares one visual language, one narrative arc, one suite identity.
              </p>
            </div>

            <div style={{ marginBottom: 40 }}>
              <SectionLabel label="Design Principles" />
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                {[
                  { p: "Brand-Agnostic Shell", d: "Neutral dark base lets any brand's colours, logo, and voice layer on top without clashing with the demo UI." },
                  { p: "Intelligence First", d: "Every demo leads with the AI output. The UI serves the intelligence, not the other way around." },
                  { p: "Simulation = Persuasion", d: "Where live AI isn't needed, a convincing simulation outperforms a real dashboard. Demos must feel real." },
                  { p: "One Suite, Six Voices", d: "Each module has its own accent colour — distinct identity within a unified system. A product family, not six separate tools." },
                ].map(({ p, d }) => (
                  <div key={p} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{p}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel label="Suite Identity" />
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: isMobile ? 20 : 28, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Suite Name</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: C.accent, letterSpacing: "0.06em" }}>ARIA</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>AI Revenue Intelligence Architecture</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Positioning</div>
                  <div style={{ fontSize: 13, color: C.mutedMid, lineHeight: 1.6 }}>From first enquiry to loyal returning client — six AI-powered engines for consumer brands</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Target Verticals</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                    {["Beauty", "Wellness", "Clinics", "E-commerce", "Hospitality", "Retail"].map(v => <Tag key={v} color={C.muted}>{v}</Tag>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COLOURS */}
        {activeTab === "Colours" && (
          <div>
            <SectionLabel label="Base Palette" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 12, marginBottom: 36 }}>
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
                <div key={c.name} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ background: c.hex, height: 52, border: ["#0A0A0F","#111118"].includes(c.hex) ? `1px solid #1E1E2E` : "none" }} />
                  <div style={{ background: C.surface, padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: C.accent, marginBottom: 2 }}>{c.hex}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{c.use}</div>
                  </div>
                </div>
              ))}
            </div>

            <SectionLabel label="Module Accent Colours" />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: 10, marginBottom: 36 }}>
              {DS.modules.map(m => (
                <div key={m.id} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ background: `linear-gradient(135deg, ${m.color}25, ${m.color}05)`, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: m.color }}>{m.icon}</div>
                  <div style={{ background: C.surface, padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, fontSize: 11, marginBottom: 2 }}>{m.name.split(" ")[0]}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: m.color }}>{m.color}</div>
                    {m.clinic && <div style={{ fontSize: 9, color: C.muted, marginTop: 3, fontFamily: "monospace" }}>CLINIC ONLY</div>}
                  </div>
                </div>
              ))}
            </div>

            <SectionLabel label="Usage Rules" />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "4px 24px" }}>
              {[
                ["Never use white backgrounds", "Dark base is non-negotiable — it frames brand colours without fighting them"],
                ["Module colour = module accent only", "Don't mix module colours. Each owns its demo — borders, icons, tags, and CTAs only"],
                ["Suite accent on shell actions", "#00E5A0 is reserved for primary CTAs and active states in the navigation shell"],
                ["Text hierarchy is fixed", "Text / Muted Mid / Muted = primary / secondary / tertiary. Never change base font colours"],
                ["Module 06 is clinic-only", "Sage (#5C8A6E) appears only in booking-based brand demos — omit for pure e-commerce builds"],
              ].map(([rule, reason]) => (
                <div key={rule} style={{ display: "flex", gap: 14, flexDirection: isMobile ? "column" : "row", padding: "13px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ color: C.accent, fontSize: 14, marginTop: 1, flexShrink: 0, display: isMobile ? "none" : "block" }}>→</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{rule}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {activeTab === "Typography" && (
          <div>
            <SectionLabel label="Type System" />
            <div style={{ display: "grid", gap: 14, marginBottom: 36 }}>
              {[
                { role: "Display", spec: "Cormorant Garamond · 300–600 · 36–64px", sample: "AI Concierge", sz: 40, family: "'Cormorant Garamond', serif", fw: 600 },
                { role: "UI / Body", spec: "DM Sans · 300–600 · 12–18px", sample: "Turn every visitor into a booked client.", sz: 18, family: "'DM Sans', sans-serif", fw: 400 },
                { role: "Code / Data", spec: "Monospace · 400–600 · 10–13px", sample: "#5C8A6E  →  claude", sz: 13, family: "monospace", fw: 500 },
              ].map(t => (
                <div key={t.role} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: isMobile ? "14px 16px" : "18px 22px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                    <Tag>{t.role}</Tag>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: C.muted }}>{t.spec}</span>
                  </div>
                  <div style={{ fontFamily: t.family, fontSize: t.sz, fontWeight: t.fw, color: C.text, marginBottom: 14, lineHeight: 1.2 }}>{t.sample}</div>
                </div>
              ))}
            </div>

            <SectionLabel label="Type Scale" />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "4px 24px" }}>
              {[
                { label: "Display", spec: "52px / 600 / Cormorant", example: "Smart Booking System", sz: 40, family: "'Cormorant Garamond', serif", fw: 600, col: C.text },
                { label: "H1", spec: "32px / 300 / Cormorant", example: "Fill every slot. Automatically.", sz: 26, family: "'Cormorant Garamond', serif", fw: 300, col: C.text },
                { label: "H2", spec: "20px / 600 / DM Sans", example: "How It Works", sz: 18, family: "'DM Sans', sans-serif", fw: 600, col: C.text },
                { label: "Body", spec: "14px / 400 / DM Sans", example: "Every demo shares one design language, re-skinned per brand.", sz: 14, family: "'DM Sans', sans-serif", fw: 400, col: C.mutedMid },
                { label: "Caption", spec: "12px / 400 / DM Sans · Muted", example: "Confidential · v1.1 · 6 Modules", sz: 12, family: "'DM Sans', sans-serif", fw: 400, col: C.muted },
                { label: "Mono", spec: "11px / 600 / Monospace · Accent", example: "POST /v1", sz: 11, family: "monospace", fw: 600, col: C.accent },
              ].map(t => (
                <div key={t.label} style={{ display: "flex", gap: isMobile ? 8 : 20, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "baseline", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, minWidth: isMobile ? "auto" : 60 }}>{t.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, minWidth: isMobile ? "auto" : 200 }}>{t.spec}</div>
                  <div style={{ fontFamily: t.family, fontSize: t.sz, fontWeight: t.fw, color: t.col }}>{t.example}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULES */}
        {activeTab === "Modules" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: 8, marginBottom: 22 }}>
              {DS.modules.map((m, i) => (
                <div key={m.id} onClick={() => setActiveModule(i)} style={{
                  background: activeModule === i ? m.colorDim : C.surface,
                  border: `1px solid ${activeModule === i ? m.color + "60" : C.border}`,
                  borderRadius: 10, padding: "14px 14px", cursor: "pointer",
                  position: "relative", overflow: "hidden", transition: "all 0.2s",
                }}>
                  {activeModule === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: 18, color: m.color }}>{m.icon}</div>
                    <span style={{ fontFamily: "monospace", fontSize: 9, color: m.color, background: m.color + "20", padding: "1px 5px", borderRadius: 3 }}>{m.num}</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontWeight: 600, marginBottom: 2, lineHeight: 1.2 }}>{m.name.split(" ").slice(0,2).join(" ")}</div>
                  {m.clinic && <div style={{ fontFamily: "monospace", fontSize: 8, color: m.color, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>Clinic Only</div>}
                </div>
              ))}
            </div>

            <div style={{ background: C.surface, border: `1px solid ${mod.color}40`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ height: 3, background: mod.color }} />
              <div style={{ padding: isMobile ? 20 : 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <Tag color={mod.color}>{mod.num}</Tag>
                      <Tag color={mod.color}>{mod.stack.label}</Tag>
                      {mod.clinic && <Tag color={mod.color}>Clinic Only</Tag>}
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, margin: "0 0 4px" }}>{mod.name}</h2>
                    <div style={{ color: mod.color, fontSize: 13 }}>{mod.tagline}</div>
                  </div>
                  <div style={{ fontSize: 34, color: mod.color }}>{mod.icon}</div>
                </div>
                <p style={{ color: C.mutedMid, fontSize: 13, lineHeight: 1.7, marginBottom: 22, maxWidth: 700 }}>{mod.desc}</p>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Build Specs</div>
                    <MetaRow label="Stack" value={mod.stack.label} color={mod.color} />
                    <MetaRow label="Complexity" value={mod.complexity} />
                    <MetaRow label="Cost" value={mod.cost} color={C.accent} />
                    <MetaRow label="Scale" value={mod.scale} />
                    <MetaRow label="Reliability" value={mod.reliability} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Inputs & Outputs</div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", marginBottom: 6 }}>INPUTS</div>
                      {mod.inputs.map(inp => (
                        <div key={inp} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: mod.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: C.mutedMid }}>{inp}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", marginBottom: 6 }}>OUTPUTS</div>
                      {mod.outputs.map(out => (
                        <div key={out} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: C.mutedMid }}>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ background: mod.colorDim, border: `1px solid ${mod.color}25`, borderRadius: 8, padding: 14, marginTop: 18 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: mod.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Why this stack</div>
                  <div style={{ fontSize: 13, color: C.mutedMid, lineHeight: 1.65 }}>{mod.stack.reason}</div>
                </div>
                <div style={{ background: "#18181F", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginTop: 10 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>No-Code Alternative</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{mod.noCodeAlt}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TECH STACK */}
        {activeTab === "Tech Stack" && (
          <div>
            <SectionLabel label="Approach Framework" />
            <p style={{ color: C.mutedMid, fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 660 }}>
              Each module is evaluated across Cost, Ease of Development, Scale, and Reliability to determine the optimal build approach.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 36 }}>
              {[
                { label: "Claude API", color: C.accent, desc: "Best for live intelligence and conversational demos. Usage-based cost, very low. Scales without infrastructure. Use when real AI behaviour is the point." },
                { label: "Pure React", color: "#7C6EF0", desc: "Best for visual simulations, flow demos, calculators. Zero running cost. No backend, no API keys. Fully portable — embed anywhere, run forever." },
                { label: "Hybrid (React + API)", color: "#00BFFF", desc: "Best when you need both intelligent responses AND visual interactivity. Claude handles reasoning; React manages UI state and layout." },
                { label: "No-Code Reference", color: "#FF6B35", desc: "Documented per module as the real-world production alternative. Frames the code demo as the premium version and gives clients a clear production path." },
              ].map(a => (
                <div key={a.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
                  <Tag color={a.color}>{a.label}</Tag>
                  <div style={{ marginTop: 12, fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{a.desc}</div>
                </div>
              ))}
            </div>

            <SectionLabel label="Decision Matrix" />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflowX: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 150px 1fr 1fr 1fr 1fr", borderBottom: `1px solid ${C.border}`, background: "#18181F", minWidth: 600 }}>
                {["Module", "Stack", "Cost", "Dev Ease", "Scale", "Reliability"].map(h => (
                  <div key={h} style={{ padding: "11px 14px", fontSize: 10, color: C.muted, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
                ))}
              </div>
              {DS.modules.map((m, i) => (
                <div key={m.id} style={{ display: "grid", gridTemplateColumns: "180px 150px 1fr 1fr 1fr 1fr", borderBottom: i < DS.modules.length - 1 ? `1px solid ${C.border}` : "none", background: i % 2 === 1 ? "#18181F" : "transparent", minWidth: 600 }}>
                  <div style={{ padding: "14px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: m.color, fontSize: 14 }}>{m.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{m.name.split(" ").slice(0,2).join(" ")}</span>
                    {m.clinic && <span style={{ fontFamily: "monospace", fontSize: 8, color: m.color }}>●</span>}
                  </div>
                  <div style={{ padding: "14px 14px", display: "flex", alignItems: "center" }}><Tag color={m.color}>{m.stack.label}</Tag></div>
                  {[m.scores.cost, m.scores.ease, m.scores.scale, m.scores.rel].map((s, si) => (
                    <div key={si} style={{ padding: "14px 14px", display: "flex", alignItems: "center" }}><ScoreDots score={s} color={m.color} /></div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.muted, fontFamily: "monospace" }}>● filled = achieved · ○ empty = not achieved · 5 = max · ● small dot = clinic-only module</div>
          </div>
        )}

        {/* BUILD ORDER */}
        {activeTab === "Build Order" && (
          <div>
            <SectionLabel label="Recommended Build Sequence" />
            <p style={{ color: C.mutedMid, fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 660 }}>
              Build order is determined by demo impact in a sales context. Each demo feeds into the next, building a full narrative arc. Module 06 is clinic-specific — built after the e-commerce modules.
            </p>

            <div style={{ display: "grid", gap: 10, marginBottom: 36 }}>
              {[
                { phase: "Phase 1", mod: DS.modules[0], why: "Highest visibility. Every prospect interacts with it immediately. The 'wow moment' — real AI in the brand's exact voice in under 60 seconds.", deliverable: "Live Claude-powered chat widget, configurable per brand" },
                { phase: "Phase 2", mod: DS.modules[1], why: "Most universally applicable — 22 of 25 proposals. Zero API cost. Anonymous visitor becomes a segmented lead. Email gate means every demo run captures a lead.", deliverable: "5–7 step quiz with dynamic result page and email capture gate" },
                { phase: "Phase 3", mod: DS.modules[3], why: "Fastest ROI story. The 52% conversion uplift is the most concrete number across all proposals. Easiest demo to follow. Builds immediate trust in the suite.", deliverable: "Review trigger simulator and before/after product page toggle" },
                { phase: "Phase 4", mod: DS.modules[2], why: "Makes the invisible visible. Completes the acquisition story — showing what happens to every lead after capture. Best shown as continuation of Phases 1–2.", deliverable: "Animated lifecycle flow diagram and rendered email preview carousel" },
                { phase: "Phase 5", mod: DS.modules[4], why: "Highest revenue impact per transaction. The AOV calculator hits hardest when the prospect already believes in the first four tools.", deliverable: "Smart product page, post-purchase screen, and AOV revenue calculator" },
                { phase: "Phase 6", mod: DS.modules[5], why: "Clinic-specific. The no-show calculator is the single most impactful ROI demo for booking brands — recovering 3–4 slots/week at £300+ price points compounds fast.", deliverable: "Booking confirmation, reminder timeline, no-show recovery simulator, revenue calculator" },
              ].map(({ phase, mod, why, deliverable }) => (
                <div key={phase} style={{ display: "grid", gridTemplateColumns: isMobile ? "40px 1fr" : "68px 1fr", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ background: mod.colorDim, borderRight: `1px solid ${mod.color}20`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? 6 : 12, gap: 6 }}>
                    <div style={{ fontSize: isMobile ? 14 : 20, color: mod.color }}>{mod.icon}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: mod.color, textAlign: "center", writingMode: isMobile ? "vertical-rl" : "horizontal-tb", transform: isMobile ? "rotate(180deg)" : "none" }}>{phase}</div>
                  </div>
                  <div style={{ padding: isMobile ? 14 : 18 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600 }}>{mod.name}</span>
                      <Tag color={mod.color}>{mod.stack.label}</Tag>
                      {mod.clinic && <Tag color={mod.color}>Clinic Only</Tag>}
                    </div>
                    <p style={{ fontSize: 13, color: C.mutedMid, lineHeight: 1.65, margin: "0 0 9px" }}>{why}</p>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{deliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SectionLabel label="The Full Client Journey" />
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { label: "Visitor Arrives", sub: "Chatbot engages", color: DS.modules[0].color },
                  { label: "→", sub: "", color: C.border },
                  { label: "Quiz Profiles", sub: "Lead identified", color: DS.modules[1].color },
                  { label: "→", sub: "", color: C.border },
                  { label: "Booking Secured", sub: "No-shows reduced", color: DS.modules[5].color },
                  { label: "→", sub: "", color: C.border },
                  { label: "Reviews Reassure", sub: "Trust built", color: DS.modules[3].color },
                  { label: "→", sub: "", color: C.border },
                  { label: "Email Nurtures", sub: "Lifecycle begins", color: DS.modules[2].color },
                  { label: "→", sub: "", color: C.border },
                  { label: "Upsell Grows", sub: "Value maximised", color: DS.modules[4].color },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center", padding: "5px 8px" }}>
                    <div style={{ fontFamily: s.label === "→" ? "monospace" : "'DM Sans', sans-serif", fontSize: s.label === "→" ? 16 : 12, fontWeight: 600, color: s.color }}>{s.label}</div>
                    {s.sub && <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", marginTop: 2 }}>{s.sub}</div>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>
                For e-commerce brands, omit Module 06 and run the arc from 01 → 02 → 04 → 03 → 05. For clinic brands, Module 06 sits at the centre of the journey.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}