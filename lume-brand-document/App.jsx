import { useState } from "react";

const BRAND = {
  name: "LUMÉ",
  tagline: "Precision skincare. Elevated results.",
  descriptor: "A luxury aesthetic clinic and curated skincare house",
  location: "London · Dubai · Lagos",
  founded: "2019",
  positioning: "Where clinical precision meets considered luxury. LUMÉ exists for clients who want results — not trends.",
  colors: {
    obsidian: "#0F0E0D", charcoal: "#1A1917", smoke: "#2C2A27",
    border: "#3A3733", champagne: "#C9B99A", ivory: "#F2EDE6",
    text: "#E8E2D9", muted: "#8A8278", mutedMid: "#B5AFA7",
    gold: "#C4A96B", white: "#FAF8F5",
  },
  fonts: {
    display: "'Cormorant Garamond', serif",
    body: "'DM Sans', sans-serif",
    mono: "monospace",
  },
  services: [
    { name: "Skin Consultation", price: "£150", cat: "Diagnostics", desc: "Full facial mapping, skin analysis and bespoke treatment plan" },
    { name: "Advanced Facial", price: "£280", cat: "Facials", desc: "Clinical-grade deep treatment, tailored to skin concern" },
    { name: "Dermal Filler", price: "£450+", cat: "Injectables", desc: "Precision lip, cheek and jawline volumisation" },
    { name: "Anti-Wrinkle", price: "£300", cat: "Injectables", desc: "Botulinum toxin treatment for expression lines" },
    { name: "Laser Resurfacing", price: "£550", cat: "Laser", desc: "Fractional laser for texture, pigmentation and scarring" },
    { name: "HydraFacial", price: "£220", cat: "Facials", desc: "Multi-step cleanse, extract and hydrate treatment" },
    { name: "Profhilo", price: "£380", cat: "Skin Boosters", desc: "Hyaluronic acid bio-remodelling for skin laxity" },
    { name: "LED Therapy", price: "£120", cat: "Recovery", desc: "Red and near-infrared light for healing and rejuvenation" },
  ],
  products: [
    { name: "Barrier Serum", price: "£95", concern: "Hydration", desc: "Ceramide-rich serum rebuilding the skin's protective layer" },
    { name: "Vitamin C Radiance Drops", price: "£85", concern: "Brightening", desc: "20% stabilised Vitamin C for luminosity and even tone" },
    { name: "Retinol Renewal Cream", price: "£110", concern: "Anti-Ageing", desc: "Encapsulated retinol for overnight cell renewal" },
    { name: "Peptide Eye Complex", price: "£75", concern: "Eye Area", desc: "Multi-peptide formula targeting dark circles and fine lines" },
    { name: "SPF 50 Fluid", price: "£65", concern: "Protection", desc: "Featherlight mineral SPF, invisible finish" },
    { name: "Enzyme Cleansing Balm", price: "£70", concern: "Cleansing", desc: "Papaya enzyme balm that melts makeup and impurities" },
  ],
  skinConcerns: ["Ageing & Fine Lines", "Pigmentation", "Acne & Breakouts", "Sensitivity & Redness", "Dullness & Uneven Tone", "Loss of Volume"],
  aiModules: [
    { num: "01", name: "LUMÉ Concierge", color: "#C4A96B", desc: "24/7 AI trained on LUMÉ's full service menu, skincare range, and clinical protocols", clinic: false },
    { num: "02", name: "Skin Assessment Quiz", color: "#9B8AC4", desc: "7-step skin profile quiz routing visitors to their ideal treatment + product pairing", clinic: false },
    { num: "03", name: "Email Flow Engine", color: "#A0785A", desc: "Automated sequences: welcome, post-treatment care, lapsed client reactivation", clinic: false },
    { num: "04", name: "Review Growth System", color: "#B8A060", desc: "Post-appointment review requests + social proof surfacing on treatment pages", clinic: false },
    { num: "05", name: "Upsell & Replenishment", color: "#5A8FA0", desc: "Homecare pairings, refill reminders, and post-treatment product recommendations", clinic: false },
    { num: "06", name: "Smart Booking & No-Show System", color: "#7A9E7E", desc: "Appointment confirmation, 48hr + 2hr reminders, no-show recovery, waitlist slot refill, and revenue calculator", clinic: true },
  ],
  bookingTriggers: [
    { trigger: "Appointment confirmed", action: "Confirmation + pre-treatment instructions", timing: "Immediate" },
    { trigger: "Upcoming appointment", action: "First reminder + preparation notes", timing: "48 hours before" },
    { trigger: "Upcoming appointment", action: "Final reminder + arrival instructions", timing: "2 hours before" },
    { trigger: "No-show occurs", action: "Empathetic re-engagement + rebook CTA", timing: "4 hours after" },
    { trigger: "Cancellation received", action: "Slot opens → waitlist client notified", timing: "Immediate" },
    { trigger: "Lapsed client (60+ days)", action: "Re-engagement sequence with treatment nudge", timing: "Day 0 / 7 / 14" },
    { trigger: "Post-treatment (48hrs)", action: "Review request + homecare product recommendation", timing: "48 hours after" },
  ],
};

const C = BRAND.colors;
const F = BRAND.fonts;

const Section = ({ label, children }) => (
  <div style={{ marginBottom: 44 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <div style={{ height: 1, width: 24, background: C.gold }} />
      <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
    </div>
    {children}
  </div>
);

const Pill = ({ children, color }) => (
  <span style={{
    background: (color || C.gold) + "18", color: color || C.gold,
    border: `1px solid ${(color || C.gold)}35`,
    borderRadius: 3, padding: "2px 10px", fontSize: 10,
    fontFamily: F.mono, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
  }}>{children}</span>
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

export default function LumeBrandSheet() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Identity");
  const tabs = ["Identity", "Colours & Type", "Services", "Products", "AI Suite"];

  return (
    <div style={{ background: C.obsidian, minHeight: "100vh", color: C.text, fontFamily: F.body }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: F.display, fontSize: 26, fontWeight: 300, letterSpacing: "0.22em", color: C.ivory }}>LUMÉ</span>
          <span style={{ width: 1, height: 20, background: C.border }} />
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, letterSpacing: "0.12em" }}>BRAND DOCUMENT v1.1</span>
        </div>
        <Pill>Fictional Demo Brand</Pill>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: isMobile ? "0 16px" : "0 36px", display: "flex", gap: 2, overflowX: "auto", whiteSpace: "nowrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none",
            borderBottom: activeTab === t ? `1px solid ${C.gold}` : "1px solid transparent",
            color: activeTab === t ? C.ivory : C.muted,
            padding: "13px 16px 12px", cursor: "pointer",
            fontFamily: F.body, fontSize: 12, fontWeight: activeTab === t ? 500 : 400,
            letterSpacing: "0.04em", transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: isMobile ? "24px 16px 60px" : "40px 36px 80px", maxWidth: 1020, margin: "0 auto" }}>

        {/* IDENTITY */}
        {activeTab === "Identity" && (
          <div>
            <div style={{ marginBottom: 52, paddingBottom: 40, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Fictional Demo Brand · Aesthetic Clinic + Skincare</div>
              <h1 style={{ fontFamily: F.display, fontSize: 72, fontWeight: 300, margin: "0 0 8px", letterSpacing: "0.18em", color: C.ivory, lineHeight: 1 }}>LUMÉ</h1>
              <p style={{ fontFamily: F.display, fontSize: 22, fontWeight: 300, fontStyle: "italic", color: C.champagne, margin: "0 0 20px", letterSpacing: "0.06em" }}>{BRAND.tagline}</p>
              <p style={{ fontSize: 14, color: C.mutedMid, lineHeight: 1.75, maxWidth: 560, margin: 0 }}>{BRAND.positioning}</p>
            </div>

            <Section label="Brand Fundamentals">
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 14 }}>
                {[
                  { label: "Full Name", value: "LUMÉ Clinic & Skincare" },
                  { label: "Tagline", value: BRAND.tagline },
                  { label: "Descriptor", value: BRAND.descriptor },
                  { label: "Business Model", value: "Hybrid — Bookings + E-commerce" },
                  { label: "Positioning", value: "Luxury & Minimal" },
                  { label: "Locations", value: BRAND.location },
                  { label: "Founded", value: BRAND.founded },
                  { label: "Price Point", value: "Premium (£65 – £550+)" },
                  { label: "Target Client", value: "Women & men, 28–55, results-driven" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
                    <div style={{ fontFamily: F.mono, fontSize: 9, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 7 }}>{label}</div>
                    <div style={{ fontSize: 13, color: C.ivory, lineHeight: 1.5 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section label="Voice & Tone">
              <div style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 10, padding: isMobile ? 20 : 28 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, color: C.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>LUMÉ Sounds Like</div>
                    {["Calm and assured — never pushy", "Clinical authority without cold detachment", "Precise language — no filler words, no hype", "Inclusive luxury — confident, not intimidating", "Results-led — always specific, never vague"].map(t => (
                      <div key={t} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                        <span style={{ color: C.gold, fontSize: 12 }}>—</span>
                        <span style={{ fontSize: 13, color: C.mutedMid }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, color: C.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>LUMÉ Never Sounds Like</div>
                    {["Exclamation marks or urgency tactics", "Beauty buzzwords (glowing, transformative, obsessed)", "Generic phrases (amazing, incredible, game-changer)", "Overpromising on outcomes", "Informal slang or emoji-first communication"].map(t => (
                      <div key={t} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                        <span style={{ color: C.muted, fontSize: 12 }}>×</span>
                        <span style={{ fontSize: 13, color: C.muted }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.mono, fontSize: 9, color: C.gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Example Brand Copy</div>
                  <p style={{ fontFamily: F.display, fontSize: 18, fontWeight: 300, fontStyle: "italic", color: C.champagne, lineHeight: 1.7, margin: 0 }}>
                    "Every skin concern has a clinical answer. We find yours."
                  </p>
                </div>
              </div>
            </Section>

            <Section label="Skin Concerns Addressed">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {BRAND.skinConcerns.map(c => <Pill key={c}>{c}</Pill>)}
              </div>
            </Section>
          </div>
        )}

        {/* COLOURS & TYPE */}
        {activeTab === "Colours & Type" && (
          <div>
            <Section label="Colour Palette">
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { name: "Obsidian", hex: C.obsidian, use: "Page background" },
                  { name: "Charcoal", hex: C.charcoal, use: "Cards, panels" },
                  { name: "Smoke", hex: C.smoke, use: "Hover states" },
                  { name: "Border", hex: C.border, use: "Dividers" },
                  { name: "Gold", hex: C.gold, use: "Primary accent" },
                  { name: "Champagne", hex: C.champagne, use: "Subheadings" },
                  { name: "Ivory", hex: C.ivory, use: "Display text" },
                  { name: "Text", hex: C.text, use: "Body copy" },
                  { name: "Muted Mid", hex: C.mutedMid, use: "Secondary copy" },
                  { name: "Muted", hex: C.muted, use: "Labels, captions" },
                ].map(c => (
                  <div key={c.name} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    <div style={{ background: c.hex, height: 52, border: [C.obsidian, C.charcoal].includes(c.hex) ? `1px solid ${C.smoke}` : "none" }} />
                    <div style={{ background: C.charcoal, padding: "10px 12px" }}>
                      <div style={{ fontWeight: 500, fontSize: 12, marginBottom: 2, color: C.ivory }}>{c.name}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.gold, marginBottom: 3 }}>{c.hex}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{c.use}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: `linear-gradient(135deg, ${C.charcoal}, ${C.smoke})`, border: `1px solid ${C.border}`, borderRadius: 10, padding: 28, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>Palette in context</div>
                <div style={{ fontFamily: F.display, fontSize: 36, fontWeight: 300, letterSpacing: "0.16em", color: C.ivory }}>LUMÉ</div>
                <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 300, fontStyle: "italic", color: C.champagne }}>Precision skincare. Elevated results.</div>
                <div style={{ fontSize: 13, color: C.mutedMid, maxWidth: 400, lineHeight: 1.65 }}>Where clinical precision meets considered luxury. Results you can see — in the mirror and in the data.</div>
                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <div style={{ background: C.gold, color: C.obsidian, padding: "9px 20px", borderRadius: 3, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em" }}>BOOK NOW</div>
                  <div style={{ border: `1px solid ${C.border}`, color: C.champagne, padding: "9px 20px", borderRadius: 3, fontSize: 12, letterSpacing: "0.1em" }}>EXPLORE TREATMENTS</div>
                </div>
              </div>
            </Section>

            <Section label="Typography">
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { role: "Display", spec: "Cormorant Garamond · 300–600 · 36–72px", sample: "LUMÉ Skin Assessment", sz: 40, family: F.display, fw: 300, col: C.ivory },
                  { role: "Subheading", spec: "Cormorant Garamond · Italic · 18–24px", sample: "Your skin. Precisely understood.", sz: 22, family: F.display, fw: 300, style: "italic", col: C.champagne },
                  { role: "Body", spec: "DM Sans · 400 · 13–15px", sample: "Every skin concern has a clinical answer. We find yours.", sz: 14, family: F.body, fw: 400, col: C.mutedMid },
                  { role: "Label / Tag", spec: "Monospace · 600 · 9–11px · All caps", sample: "TREATMENT · INJECTABLES · £450", sz: 11, family: F.mono, fw: 600, col: C.gold },
                ].map(t => (
                  <div key={t.role} style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 20, alignItems: "center" }}>
                    <div style={{ minWidth: 80 }}>
                      <Pill>{t.role}</Pill>
                      <div style={{ fontFamily: F.mono, fontSize: 9, color: C.muted, marginTop: 8, lineHeight: 1.5 }}>{t.spec}</div>
                    </div>
                    <div style={{ fontFamily: t.family, fontSize: t.sz, fontWeight: t.fw, fontStyle: t.style || "normal", color: t.col, flex: 1 }}>{t.sample}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* SERVICES */}
        {activeTab === "Services" && (
          <div>
            <Section label="Treatment Menu">
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                {BRAND.services.map(s => (
                  <div key={s.name} style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <Pill>{s.cat}</Pill>
                        <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.ivory, marginTop: 8 }}>{s.name}</div>
                      </div>
                      <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 300, color: C.gold }}>{s.price}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === "Products" && (
          <div>
            <Section label="Skincare Range">
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 12 }}>
                {BRAND.products.map(p => (
                  <div key={p.name} style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <Pill>{p.concern}</Pill>
                      <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 300, color: C.gold }}>{p.price}</div>
                    </div>
                    <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 400, color: C.ivory, marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* AI SUITE */}
        {activeTab === "AI Suite" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: F.display, fontSize: 34, fontWeight: 300, margin: "0 0 10px", letterSpacing: "0.06em", color: C.ivory }}>The LUMÉ AI Growth System</h2>
              <p style={{ fontSize: 13, color: C.mutedMid, lineHeight: 1.75, maxWidth: 580, margin: 0 }}>
                Six AI-powered engines built specifically for LUMÉ — trained on the treatment menu, the skincare range, the brand voice, and the client journey from first enquiry to loyal returning client.
              </p>
            </div>

            {/* Journey Arc */}
            <div style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 24px", marginBottom: 28, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
              {[
                { label: "Visitor Arrives", sub: "Concierge engages" },
                { label: "→", sub: "" },
                { label: "Quiz Profiles", sub: "Skin concern matched" },
                { label: "→", sub: "" },
                { label: "Booking Secured", sub: "No-shows reduced" },
                { label: "→", sub: "" },
                { label: "Reviews Reassure", sub: "Trust established" },
                { label: "→", sub: "" },
                { label: "Email Nurtures", sub: "Journey continues" },
                { label: "→", sub: "" },
                { label: "Products Upsold", sub: "Value grows" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "4px 8px" }}>
                  <div style={{ fontSize: s.label === "→" ? 14 : 11, fontWeight: 500, color: s.label === "→" ? C.border : C.champagne, fontFamily: s.label === "→" ? F.mono : F.body }}>{s.label}</div>
                  {s.sub && <div style={{ fontSize: 9, color: C.muted, fontFamily: F.mono, marginTop: 2, letterSpacing: "0.04em" }}>{s.sub}</div>}
                </div>
              ))}
            </div>

            <Section label="AI Modules">
              <div style={{ display: "grid", gap: 10 }}>
                {BRAND.aiModules.map((m, i) => (
                  <div key={m.num} style={{ background: C.charcoal, border: `1px solid ${C.border}`, borderRadius: 10, padding: isMobile ? 16 : 20, display: "grid", gridTemplateColumns: isMobile ? "36px 1fr" : "52px 1fr auto", gap: isMobile ? 12 : 16, alignItems: isMobile ? "flex-start" : "center" }}>
                    <div style={{ fontFamily: F.display, fontSize: isMobile ? 24 : 30, fontWeight: 300, color: m.color, letterSpacing: "0.04em", lineHeight: 1 }}>{m.num}</div>
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: F.display, fontSize: 17, fontWeight: 400, color: C.ivory }}>{m.name}</div>
                        {m.clinic && <Pill color={m.color}>Clinic Only</Pill>}
                        {isMobile && <Pill color={m.color}>Phase {i + 1}</Pill>}
                      </div>
                      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{m.desc}</div>
                    </div>
                    {!isMobile && <Pill color={m.color}>Phase {i + 1}</Pill>}
                  </div>
                ))}
              </div>
            </Section>

            {/* Booking & No-Show Logic — Module 06 specific */}
            <Section label="Module 06 · Booking & No-Show Trigger Logic">
              <div style={{ background: C.charcoal, border: `1px solid #7A9E7E30`, borderRadius: 10, overflow: "hidden" }}>
                <div style={{ height: 2, background: "#7A9E7E" }} />
                <div style={{ padding: "4px 0" }}>
                  {BRAND.bookingTriggers.map((t, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 130px", gap: isMobile ? 8 : 16, padding: isMobile ? "16px" : "12px 22px", borderBottom: i < BRAND.bookingTriggers.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: isMobile ? "flex-start" : "center" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#7A9E7E", flexShrink: 0, marginTop: isMobile ? 6 : 0 }} />
                        <span style={{ fontSize: 12, color: C.champagne }}>{t.trigger}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.mutedMid }}>{t.action}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: "#7A9E7E", textAlign: "right" }}>{t.timing}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <div style={{ background: `linear-gradient(135deg, ${C.charcoal}, ${C.smoke})`, border: `1px solid ${C.gold}30`, borderRadius: 10, padding: isMobile ? 20 : 24 }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>Why LUMÉ is the right demo brand</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                {[
                  "Hybrid model exercises both clinic demos (Concierge, Quiz, Booking) and e-commerce demos (Reviews, Upsell) — the only fictional brand that needs all six modules",
                  "High price points make ROI calculations dramatic — recovering 3 no-shows/week at £300+ is more compelling than any abandoned cart metric",
                  "Luxury tone forces the AI to write with restraint and precision — the hardest and most impressive voice to demo in a client presentation",
                  "Aesthetics + skincare covers the two most common verticals across all 25 proposals — maximum transferability to real client conversations",
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: C.gold, flexShrink: 0, fontSize: 12 }}>—</span>
                    <span style={{ fontSize: 12, color: C.mutedMid, lineHeight: 1.65 }}>{r}</span>
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