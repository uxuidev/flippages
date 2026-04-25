'use client';

import { useEffect, useRef } from 'react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  cream:  '#faf7f0',
  ink:    '#2c1f14',
  gold:   '#8a6020',
  muted:  '#7a5c3a',
  rule:   '#d4b896',
  light:  '#f0e8d8',
};

const base = {
  background: C.cream,
  color:      C.ink,
  width:      '100%',
  height:     '100%',
  fontFamily: 'Georgia, "Times New Roman", serif',
  boxSizing:  'border-box',
  position:   'relative',
  overflow:   'hidden',
};

// ── Shared micro-components ───────────────────────────────────────────────────
function HRule({ style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>
      <div style={{ flex: 1, height: 1, background: C.rule }} />
      <span style={{ color: C.gold, fontSize: '1.1em', lineHeight: 1 }}>❧</span>
      <div style={{ flex: 1, height: 1, background: C.rule }} />
    </div>
  );
}

function PageNum({ n, align = 'center' }) {
  const pos =
    align === 'left'  ? { left: '9%' } :
    align === 'right' ? { right: '9%' } :
    { left: '50%', transform: 'translateX(-50%)' };
  return (
    <div style={{
      position: 'absolute', bottom: '3%',
      fontStyle: 'italic', fontSize: 'clamp(0.55rem,1vw,0.75rem)',
      color: C.gold, letterSpacing: '0.08em', ...pos,
    }}>
      {n}
    </div>
  );
}

function RunHead({ left, right }) {
  return (
    <div style={{
      position: 'absolute', top: '3.5%', left: '9%', right: '9%',
      display: 'flex', justifyContent: 'space-between',
      fontSize: 'clamp(0.45rem,0.85vw,0.6rem)',
      color: C.gold, letterSpacing: '0.22em', textTransform: 'uppercase',
      borderBottom: `0.5px solid ${C.rule}`, paddingBottom: 3,
    }}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function DropCap({ letter }) {
  return (
    <span style={{
      float: 'left',
      fontSize: 'clamp(2.4rem,4.5vw,3.6rem)',
      lineHeight: 0.78,
      marginRight: '0.08em',
      marginTop:   '0.06em',
      color: C.gold,
      fontStyle: 'italic',
    }}>
      {letter}
    </span>
  );
}

function Body({ children, style }) {
  return (
    <p style={{
      fontSize:   'clamp(0.6rem,1.15vw,0.82rem)',
      lineHeight: 1.88,
      textAlign:  'justify',
      margin: 0,
      ...style,
    }}>
      {children}
    </p>
  );
}

// ── Page 1 · Title ────────────────────────────────────────────────────────────
function TitlePage() {
  return (
    <div style={base}>
      {/* Double-rule border */}
      <div style={{ position:'absolute', inset:'3%',   border:`1.5px solid ${C.gold}`, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:'4.6%', border:`0.5px solid ${C.gold}`, pointerEvents:'none' }} />

      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'12% 10%',
      }}>
        {/* Compass rose */}
        <svg width="min(11vw,72px)" height="min(11vw,72px)" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke={C.gold} strokeWidth="1"/>
          <circle cx="50" cy="50" r="6"  fill={C.gold} opacity="0.25"/>
          <circle cx="50" cy="50" r="2.5" fill={C.gold}/>
          {/* Cardinal arrows */}
          <polygon points="50,8 46.5,46 53.5,46"  fill={C.gold}/>
          <polygon points="50,92 46.5,54 53.5,54"  fill={C.gold} opacity="0.35"/>
          <polygon points="8,50 46,46.5 46,53.5"   fill={C.gold} opacity="0.35"/>
          <polygon points="92,50 54,46.5 54,53.5"  fill={C.gold} opacity="0.35"/>
          {/* Diagonal ticks */}
          <line x1="22" y1="22" x2="78" y2="78" stroke={C.gold} strokeWidth="0.5" opacity="0.3"/>
          <line x1="78" y1="22" x2="22" y2="78" stroke={C.gold} strokeWidth="0.5" opacity="0.3"/>
          <text x="47.5" y="21" fill={C.gold} fontSize="8" fontFamily="Georgia,serif">N</text>
        </svg>

        <div style={{ color:C.gold, letterSpacing:'0.6em', fontSize:'clamp(0.5rem,0.9vw,0.7rem)', margin:'5% 0 2%' }}>
          ✦ ✦ ✦
        </div>

        <h1 style={{
          fontWeight:'normal', letterSpacing:'0.18em',
          fontSize:'clamp(1.3rem,3vw,2.4rem)', textAlign:'center',
          color:C.ink, margin:'0 0 1%',
        }}>
          THE WANDERER'S
        </h1>
        <h1 style={{
          fontWeight:'normal', fontStyle:'italic',
          fontSize:'clamp(1.7rem,4vw,3.2rem)', letterSpacing:'0.12em',
          color:C.gold, margin:'0 0 4%',
        }}>
          Almanac
        </h1>

        <HRule style={{ width:'52%' }} />

        <p style={{
          fontSize:'clamp(0.55rem,1.1vw,0.78rem)',
          letterSpacing:'0.3em', textAlign:'center',
          color:C.muted, textTransform:'uppercase', marginTop:'4%',
        }}>
          A Collection of Natural Wonders
        </p>

        <div style={{ position:'absolute', bottom:'8%', textAlign:'center' }}>
          <div style={{ fontSize:'clamp(0.55rem,1vw,0.72rem)', color:C.gold, letterSpacing:'0.25em' }}>
            BY ELEANOR ASHWOOD
          </div>
          <div style={{ fontSize:'clamp(0.45rem,0.8vw,0.6rem)', color:C.rule, marginTop:5, letterSpacing:'0.15em' }}>
            HARROW &amp; FINCH · FIRST EDITION · MCMXCVII
          </div>
        </div>
      </div>

      <PageNum n="i" />
    </div>
  );
}

// ── Page 2 · Dedication ───────────────────────────────────────────────────────
function DedicationPage() {
  return (
    <div style={base}>
      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'10% 13%', gap:'5%',
      }}>
        <div style={{ color:C.gold, fontSize:'clamp(1.4rem,2.5vw,2rem)' }}>❦</div>

        <p style={{
          fontStyle:'italic', textAlign:'center',
          fontSize:'clamp(0.7rem,1.35vw,0.95rem)',
          lineHeight:1.85, color:C.ink,
        }}>
          For all who have ever stood at<br/>
          the edge of something vast<br/>
          and felt, not fear,<br/>
          but gratitude.
        </p>

        <HRule style={{ width:'38%' }} />

        {/* Botanical leaf SVG */}
        <svg width="min(7vw,44px)" height="min(9vw,56px)" viewBox="0 0 44 56" fill="none">
          <line x1="22" y1="8"  x2="22" y2="52" stroke={C.gold} strokeWidth="1"/>
          <path d="M22 30 Q10 22 12 10 Q22 15 22 30" fill={C.gold} opacity="0.35"/>
          <path d="M22 30 Q34 22 32 10 Q22 15 22 30" fill={C.gold} opacity="0.35"/>
          <path d="M22 44 Q12 36 14 24 Q22 30 22 44" fill={C.gold} opacity="0.22"/>
          <path d="M22 44 Q32 36 30 24 Q22 30 22 44" fill={C.gold} opacity="0.22"/>
        </svg>

        <p style={{
          fontSize:'clamp(0.5rem,0.95vw,0.68rem)',
          color:C.muted, textAlign:'center', lineHeight:1.75,
        }}>
          <em>Copyright © 1997 Eleanor Ashwood. All rights reserved.</em><br/>
          No portion of this work may be reproduced without<br/>
          the prior written consent of the publisher.<br/>
          <br/>
          <strong style={{ letterSpacing:'0.1em', fontStyle:'normal' }}>HARROW &amp; FINCH PUBLISHERS</strong><br/>
          12 Aldgate Row, London EC3 · First printing, 1997
        </p>
      </div>

      <PageNum n="ii" />
    </div>
  );
}

// ── Page 3 · Table of Contents ────────────────────────────────────────────────
function ContentsPage() {
  const chapters = [
    { num:'I',   title:'The Mountain',  sub:'On solitude and summits',     pg:'1'   },
    { num:'II',  title:'The Forest',    sub:'On patience and roots',        pg:'21'  },
    { num:'III', title:'The Sea',       sub:'On depth and distance',        pg:'45'  },
    { num:'IV',  title:'The Desert',    sub:'On silence and survival',      pg:'67'  },
    { num:'V',   title:'The River',     sub:'On change and constancy',      pg:'89'  },
    { num:'VI',  title:'The Night Sky', sub:'On wonder and navigation',     pg:'113' },
  ];

  return (
    <div style={base}>
      <RunHead left="The Wanderer's Almanac" right="Contents" />

      <div style={{ padding:'13% 10% 9%' }}>
        <h2 style={{
          fontWeight:'normal', letterSpacing:'0.38em', textTransform:'uppercase',
          fontSize:'clamp(0.8rem,1.7vw,1.25rem)', color:C.gold,
          textAlign:'center', marginBottom:'5%',
        }}>
          Contents
        </h2>

        <div style={{ borderTop:`0.5px solid ${C.rule}`, paddingTop:'4%', display:'flex', flexDirection:'column', gap:'3.5%' }}>
          {chapters.map((ch) => (
            <div key={ch.num} style={{ display:'flex', alignItems:'baseline' }}>
              <span style={{
                fontStyle:'italic', fontSize:'clamp(0.5rem,0.9vw,0.65rem)',
                color:C.gold, width:'1.8em', flexShrink:0,
              }}>
                {ch.num}
              </span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'clamp(0.62rem,1.2vw,0.86rem)', letterSpacing:'0.04em' }}>
                  {ch.title}
                </div>
                <div style={{
                  fontSize:'clamp(0.48rem,0.85vw,0.62rem)',
                  color:'#9a7a5a', fontStyle:'italic',
                }}>
                  {ch.sub}
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginLeft:8, flexShrink:0 }}>
                <div style={{ width:'clamp(18px,4vw,55px)', borderBottom:`1px dotted ${C.rule}` }} />
                <span style={{
                  fontStyle:'italic', fontSize:'clamp(0.5rem,0.9vw,0.65rem)', color:C.gold,
                }}>
                  {ch.pg}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PageNum n="iii" />
    </div>
  );
}

// ── Page 4 · Preface ──────────────────────────────────────────────────────────
function PrefacePage() {
  return (
    <div style={base}>
      <RunHead left="Preface" right="The Wanderer's Almanac" />

      <div style={{
        padding:'13% 10% 10%',
        display:'flex', flexDirection:'column', gap:'3%',
      }}>
        <h2 style={{
          fontWeight:'normal', letterSpacing:'0.32em', textTransform:'uppercase',
          fontSize:'clamp(0.8rem,1.7vw,1.2rem)', color:C.gold,
          textAlign:'center', marginBottom:'3%',
        }}>
          Preface
        </h2>
        <HRule style={{ marginBottom:'3%' }} />

        <Body>
          <DropCap letter="T" />
          his almanac was born of a conviction that the natural world speaks
          plainly to those willing to listen. I have spent the better part of
          thirty years walking the ridges and valleys of five continents, and in
          that time I have learned that wonder is not a luxury — it is a
          discipline, and one worth cultivating with care.
        </Body>

        <Body>
          The chapters that follow are arranged not by geography but by
          element — mountain, forest, sea, desert, river, sky — each one a
          meditation on a distinct quality of attention. You may read them in
          order or at random; the land does not care for sequences.
        </Body>

        <Body>
          Bring this book to a place where the horizon is wide. Let it become
          dog-eared and weather-stained. A well-used almanac is a far better
          thing than a pristine one sitting safe upon a shelf.
        </Body>

        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'4%' }}>
          <div style={{
            textAlign:'right',
            fontSize:'clamp(0.55rem,1vw,0.72rem)',
            color:C.muted, fontStyle:'italic', lineHeight:1.8,
          }}>
            — E. A.<br/>
            <span style={{ fontStyle:'normal', letterSpacing:'0.1em' }}>
              Glen Affric, Autumn 1996
            </span>
          </div>
        </div>
      </div>

      <PageNum n="iv" />
    </div>
  );
}

// ── Page 5 · Chapter I opener ─────────────────────────────────────────────────
function ChapterIOpener() {
  return (
    <div style={{ ...base, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      {/* Mountain range SVG */}
      <svg width="min(42vw,210px)" height="min(18vw,90px)" viewBox="0 0 210 90" fill="none" style={{ marginBottom:'5%' }}>
        <path d="M0 88 L55 18 L75 38 L95 4 L115 38 L135 18 L210 88Z"
              fill={C.gold} opacity="0.1"/>
        <path d="M0 88 L55 18 L75 38 L95 4 L115 38 L135 18 L210 88"
              stroke={C.gold} strokeWidth="1.2" fill="none"/>
        {/* Snow cap */}
        <path d="M88 20 L95 4 L102 20 Q95 25 88 20Z" fill={C.gold} opacity="0.45"/>
        {/* Stars */}
        <circle cx="28"  cy="30" r="1.2" fill={C.gold} opacity="0.55"/>
        <circle cx="170" cy="22" r="0.9" fill={C.gold} opacity="0.5"/>
        <circle cx="148" cy="12" r="1.1" fill={C.gold} opacity="0.4"/>
        <circle cx="52"  cy="12" r="0.8" fill={C.gold} opacity="0.4"/>
        {/* Moon */}
        <path d="M185 15 A9 9 0 1 1 185 33 A6 6 0 1 0 185 15Z"
              fill={C.gold} opacity="0.35"/>
      </svg>

      <div style={{
        color:C.gold, letterSpacing:'0.42em',
        fontSize:'clamp(0.55rem,1vw,0.75rem)',
        textTransform:'uppercase', marginBottom:'2%',
      }}>
        Chapter I
      </div>

      <h2 style={{
        fontWeight:'normal', fontStyle:'italic',
        fontSize:'clamp(1.5rem,3.2vw,2.6rem)',
        color:C.ink, margin:'1% 0', textAlign:'center',
      }}>
        The Mountain
      </h2>

      <HRule style={{ width:'42%', margin:'3% 0' }} />

      <blockquote style={{
        fontStyle:'italic',
        fontSize:'clamp(0.6rem,1.15vw,0.8rem)',
        color:C.muted, textAlign:'center',
        maxWidth:'68%', lineHeight:1.8, margin:0,
      }}>
        "The summit is merely the mountain's<br/>
        excuse to show you the sky."
        <footer style={{
          marginTop:'6%',
          fontSize:'clamp(0.48rem,0.85vw,0.62rem)',
          letterSpacing:'0.18em', fontStyle:'normal', color:C.gold,
        }}>
          — JOHN MUIR
        </footer>
      </blockquote>

      <PageNum n="1" />
    </div>
  );
}

// ── Page 6 · Chapter I content ────────────────────────────────────────────────
function ChapterIContent() {
  return (
    <div style={base}>
      <RunHead left="Chapter I" right="The Mountain" />

      <div style={{ padding:'13% 10% 10%', display:'flex', flexDirection:'column', gap:'2.8%' }}>
        <Body>
          <DropCap letter="A" />
          mountain does not become a mountain overnight. The forces required —
          the slow collision of tectonic plates, the patient upwelling of magma,
          the ten-thousand-year retreat of glaciers — operate on timescales that
          make human ambition look like a moth's brief hour. To stand at the
          base of a great peak is to feel, perhaps for the first time, genuinely
          small.
        </Body>

        <Body>
          I first climbed seriously at nineteen, in the Cairngorms. The weather
          was poor and the summit invisible, but I did not turn back. Not out of
          courage — I was far too inexperienced to know the risks — but from a
          stubborn conviction that the mountain would reward persistence.
        </Body>

        {/* Pull quote */}
        <div style={{
          borderLeft:`3px solid ${C.gold}`,
          paddingLeft:'5%', margin:'1% 0',
          color:C.muted, fontStyle:'italic',
          fontSize:'clamp(0.6rem,1.15vw,0.82rem)', lineHeight:1.75,
        }}>
          The mountain had no interest in rewarding me. It simply was —
          magnificently, indifferently, utterly itself.
        </div>

        <Body>
          Years later I came to understand that this is precisely the lesson.
          Our task is not to conquer the mountain but to become, briefly,
          worthy of its company. Every summit reached is less a victory over
          stone than a small revolution in the self.
        </Body>
      </div>

      <PageNum n="2" align="right" />
    </div>
  );
}

// ── Page 7 · Chapter III opener ───────────────────────────────────────────────
function ChapterIIIOpener() {
  return (
    <div style={{ ...base, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      {/* Ocean waves SVG */}
      <svg width="min(44vw,220px)" height="min(14vw,70px)" viewBox="0 0 220 70" fill="none" style={{ marginBottom:'5%' }}>
        {[0,1,2].map((i) => (
          <path key={i}
            d={`M${-5+i*4} ${42-i*7} C${28+i*3} ${12-i*4} ${55+i*3} ${68-i*4} ${82+i*3} ${42-i*7} S${137+i*3} ${12-i*4} ${165+i*3} ${42-i*7} S${210} ${68-i*4} ${225} ${42-i*7}`}
            stroke={C.gold}
            strokeWidth={1.3 - i * 0.3}
            opacity={0.9 - i * 0.28}
            fill="none"
          />
        ))}
        {/* Seagull silhouettes */}
        <path d="M60 18 Q63 15 66 18" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.5"/>
        <path d="M70 12 Q73 9  76 12" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.4"/>
      </svg>

      <div style={{
        color:C.gold, letterSpacing:'0.42em',
        fontSize:'clamp(0.55rem,1vw,0.75rem)',
        textTransform:'uppercase', marginBottom:'2%',
      }}>
        Chapter III
      </div>

      <h2 style={{
        fontWeight:'normal', fontStyle:'italic',
        fontSize:'clamp(1.5rem,3.2vw,2.6rem)',
        color:C.ink, margin:'1% 0', textAlign:'center',
      }}>
        The Sea
      </h2>

      <HRule style={{ width:'42%', margin:'3% 0' }} />

      <blockquote style={{
        fontStyle:'italic',
        fontSize:'clamp(0.6rem,1.15vw,0.8rem)',
        color:C.muted, textAlign:'center',
        maxWidth:'72%', lineHeight:1.8, margin:0,
      }}>
        "Roll on, thou deep and dark blue Ocean — roll!<br/>
        Ten thousand fleets sweep over thee in vain."
        <footer style={{
          marginTop:'6%',
          fontSize:'clamp(0.48rem,0.85vw,0.62rem)',
          letterSpacing:'0.18em', fontStyle:'normal', color:C.gold,
        }}>
          — LORD BYRON, <em>Childe Harold's Pilgrimage</em>
        </footer>
      </blockquote>

      <PageNum n="45" />
    </div>
  );
}

// ── Page 8 · Chapter III content ─────────────────────────────────────────────
function ChapterIIIContent() {
  return (
    <div style={base}>
      <RunHead left="Chapter III" right="The Sea" />

      <div style={{ padding:'13% 10% 10%', display:'flex', flexDirection:'column', gap:'2.8%' }}>
        <Body>
          <DropCap letter="T" />
          he sea keeps no record of what has crossed it. Every ship, every
          swimmer, every storm — all swallowed without comment, without
          memorial. There is a freedom in this that terrifies and exhilarates
          in equal measure. The ocean is the world's most honest auditor: it
          accepts everything and assigns it the same value, which is to say,
          none.
        </Body>

        <Body>
          I have sat by the Atlantic at dusk and watched the light go out like
          a candle, and felt in that moment something close to religious awe —
          not because the scene was beautiful, though it was, but because it
          was entirely indifferent to my presence. Beauty, I have decided, is
          most powerful when it does not perform.
        </Body>

        {/* Decorative fish vignette */}
        <div style={{ display:'flex', justifyContent:'center', margin:'1% 0' }}>
          <svg width="min(9vw,56px)" height="min(4vw,24px)" viewBox="0 0 56 24" fill="none">
            <path d="M6 12 Q16 5 26 12 Q36 19 46 12" stroke={C.gold} strokeWidth="1" fill="none"/>
            <path d="M46 12 L43 8 M46 12 L43 16"     stroke={C.gold} strokeWidth="1"/>
            <circle cx="21" cy="11" r="1.5"           fill={C.gold} opacity="0.5"/>
          </svg>
        </div>

        <Body>
          The old navigators knew this. They gave the sea names — names of
          moods, of dangers, of gods — because to name a thing is to begin
          the long work of understanding it. The Pacific: <em>peaceful</em>.
          A lie so magnificent it functions as a prayer.
        </Body>
      </div>

      <PageNum n="46" align="right" />
    </div>
  );
}

// ── Page 9 · Night-sky chapter opener ────────────────────────────────────────
function ChapterVIOpener() {
  return (
    <div style={{ ...base, background:'#0e0b14', color:'#e8dfc8' }}>
      {/* Star field */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" fill="none">
        {[
          [40,80],[120,30],[200,60],[310,20],[360,90],
          [60,160],[150,130],[280,150],[380,170],
          [30,250],[100,220],[230,240],[340,200],
          [70,340],[180,310],[290,350],[370,290],
          [45,420],[160,400],[260,430],[350,410],
          [80,500],[200,480],[310,520],[380,490],
          [25,560],[150,540],[280,570],[360,550],
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y}
            r={i%5===0 ? 1.8 : i%3===0 ? 1.2 : 0.8}
            fill="#e8dfc8"
            opacity={0.3 + (i % 7) * 0.1}
          />
        ))}
        {/* Milky way suggestion */}
        <ellipse cx="200" cy="300" rx="60" ry="280" fill="#d4c9a8" opacity="0.04"/>
      </svg>

      {/* Moon */}
      <div style={{ position:'absolute', top:'8%', right:'14%' }}>
        <svg width="min(8vw,50px)" height="min(8vw,50px)" viewBox="0 0 50 50" fill="none">
          <path d="M28 6 A20 20 0 1 1 28 44 A14 14 0 1 0 28 6Z" fill="#e8dfc8" opacity="0.7"/>
        </svg>
      </div>

      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
      }}>
        <div style={{
          color:'#c49a2e', letterSpacing:'0.42em',
          fontSize:'clamp(0.55rem,1vw,0.75rem)',
          textTransform:'uppercase', marginBottom:'2%',
        }}>
          Chapter VI
        </div>

        <h2 style={{
          fontWeight:'normal', fontStyle:'italic',
          fontSize:'clamp(1.5rem,3.2vw,2.6rem)',
          color:'#e8dfc8', margin:'1% 0', textAlign:'center',
        }}>
          The Night Sky
        </h2>

        <div style={{ display:'flex', alignItems:'center', gap:8, width:'42%', margin:'3% 0' }}>
          <div style={{ flex:1, height:1, background:'#c49a2e', opacity:0.5 }}/>
          <span style={{ color:'#c49a2e', fontSize:'1.1em' }}>✦</span>
          <div style={{ flex:1, height:1, background:'#c49a2e', opacity:0.5 }}/>
        </div>

        <blockquote style={{
          fontStyle:'italic',
          fontSize:'clamp(0.6rem,1.15vw,0.8rem)',
          color:'#c4b89a', textAlign:'center',
          maxWidth:'68%', lineHeight:1.8, margin:0,
        }}>
          "Two things fill the mind with ever-increasing<br/>
          admiration: the starry sky above me,<br/>
          and the moral law within me."
          <footer style={{
            marginTop:'6%',
            fontSize:'clamp(0.48rem,0.85vw,0.62rem)',
            letterSpacing:'0.18em', fontStyle:'normal', color:'#c49a2e',
          }}>
            — IMMANUEL KANT
          </footer>
        </blockquote>
      </div>

      <PageNum n="113" />
    </div>
  );
}

// ── Page 10 · Colophon / Closing ─────────────────────────────────────────────
function ClosingPage() {
  return (
    <div style={{ ...base, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10% 10%' }}>
      <div style={{ position:'absolute', inset:'3%', border:`1px solid ${C.rule}`, pointerEvents:'none' }} />

      {/* Anchor / emblem SVG */}
      <svg width="min(9vw,54px)" height="min(11vw,68px)" viewBox="0 0 54 68" fill="none" style={{ marginBottom:'5%' }}>
        <circle cx="27" cy="14" r="8" stroke={C.gold} strokeWidth="1.2" fill="none"/>
        <circle cx="27" cy="14" r="3" fill={C.gold} opacity="0.4"/>
        <line x1="27" y1="22" x2="27" y2="58" stroke={C.gold} strokeWidth="1.2"/>
        <path d="M27 58 Q14 55 10 48 Q20 50 27 46 Q34 50 44 48 Q40 55 27 58Z"
              stroke={C.gold} strokeWidth="1" fill={C.gold} opacity="0.15"/>
        <line x1="14" y1="34" x2="40" y2="34" stroke={C.gold} strokeWidth="1"/>
        <circle cx="14" cy="34" r="2" fill={C.gold} opacity="0.5"/>
        <circle cx="40" cy="34" r="2" fill={C.gold} opacity="0.5"/>
      </svg>

      <div style={{ color:C.gold, letterSpacing:'0.45em', fontSize:'clamp(0.55rem,1vw,0.72rem)', textTransform:'uppercase', marginBottom:'3%' }}>
        Finis
      </div>

      <HRule style={{ width:'36%', marginBottom:'5%' }} />

      <p style={{
        fontStyle:'italic', textAlign:'center',
        fontSize:'clamp(0.62rem,1.2vw,0.85rem)',
        lineHeight:1.85, color:C.muted, maxWidth:'72%',
      }}>
        "The goal of life is to make your heartbeat<br/>
        match the beat of the universe,<br/>
        to match your nature with Nature."
      </p>
      <p style={{
        fontSize:'clamp(0.48rem,0.85vw,0.62rem)',
        letterSpacing:'0.15em', color:C.gold, marginTop:'3%',
      }}>
        — JOSEPH CAMPBELL
      </p>

      <div style={{
        position:'absolute', bottom:'7%', textAlign:'center',
        fontSize:'clamp(0.45rem,0.8vw,0.6rem)',
        color:C.rule, letterSpacing:'0.15em', lineHeight:1.85,
      }}>
        TYPESET IN GARAMOND · PRINTED ON LAID PAPER<br/>
        HARROW &amp; FINCH · LONDON · MCMXCVII
      </div>

      <PageNum n="143" />
    </div>
  );
}

// ── FlipBook shell ────────────────────────────────────────────────────────────
const PAGES = [
  TitlePage,
  DedicationPage,
  ContentsPage,
  PrefacePage,
  ChapterIOpener,
  ChapterIContent,
  ChapterIIIOpener,
  ChapterIIIContent,
  ChapterVIOpener,
  ClosingPage,
];

export default function FlipBook() {
  'use no memo';

  const containerRef = useRef(null);
  const stagingRef   = useRef(null);
  const flipRef      = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const staging   = stagingRef.current;
    if (!container || !staging) return;

    let destroyed = false;

    async function init() {
      const { PageFlip } = await import('page-flip/dist/js/page-flip.module.js');
      if (destroyed) return;

      const pages = Array.from(staging.children);

      const pf = new PageFlip(container, {
        width:              window.innerWidth,
        height:             window.innerHeight,
        size:               'stretch',
        minWidth:           1,
        maxWidth:           window.innerWidth,
        minHeight:          1,
        maxHeight:          window.innerHeight,
        drawShadow:         false,
        maxShadowOpacity:   0,
        flippingTime:       650,
        usePortrait:        true,
        startZIndex:        0,
        autoSize:           false,
        showCover:          false,
        mobileScrollSupport:false,
        clickEventForward:  true,
        useMouseEvents:     true,
        swipeDistance:      30,
        showPageCorners:    false,
        disableFlipByClick: false,
        startPage:          0,
      });

      if (destroyed) return;
      flipRef.current = pf;
      pf.loadFromHTML(pages);
    }

    init().catch(console.error);

    return () => {
      destroyed = true;
      if (flipRef.current) {
        flipRef.current.destroy();
        flipRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-screen h-screen m-0 p-0 overflow-hidden">
      {/* Staging: page-flip moves these into .stf__block on init */}
      <div ref={stagingRef} style={{ display: 'none' }} aria-hidden="true">
        {PAGES.map((PageComponent, i) => (
          <div key={i} style={{ width: '100%', height: '100%' }}>
            <PageComponent />
          </div>
        ))}
      </div>
    </div>
  );
}
