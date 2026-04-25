'use client';

import { useEffect, useRef } from 'react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  cream: '#faf7f0',
  ink:   '#2c1f14',
  gold:  '#8a6020',
  muted: '#7a5c3a',
  rule:  '#d4b896',
};

// ── Base style: flex column so header + content never overlap ─────────────────
const base = {
  background:    C.cream,
  color:         C.ink,
  width:         '100%',
  height:        '100%',
  fontFamily:    'Georgia, "Times New Roman", serif',
  boxSizing:     'border-box',
  overflow:      'hidden',
  display:       'flex',
  flexDirection: 'column',
};

// ── Layout primitives ─────────────────────────────────────────────────────────

/**
 * Top bar: left running-head | page number (center) | right running-head
 * Used on every page type for consistent placement.
 */
function PageHeader({ left = '', right = '', num, dark = false }) {
  const fg    = dark ? '#c49a2e' : C.gold;
  const border = dark ? 'rgba(196,154,46,0.35)' : C.rule;
  return (
    <div style={{
      display:       'flex',
      alignItems:    'center',
      flexShrink:    0,
      height:        'clamp(30px, 6vh, 46px)',
      padding:       '0 clamp(10px, 6%, 36px)',
      borderBottom:  `0.5px solid ${border}`,
    }}>
      {/* Left running head */}
      <span style={{
        flex:         1,
        fontSize:     'clamp(0.38rem, 0.65vw, 0.55rem)',
        color:        fg,
        letterSpacing:'0.2em',
        textTransform:'uppercase',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        whiteSpace:   'nowrap',
      }}>
        {left}
      </span>

      {/* Page number — digital / monospace at top center */}
      <span style={{
        fontFamily:   '"Courier New", Courier, monospace',
        fontWeight:   '700',
        fontSize:     'clamp(0.75rem, 1.4vw, 1rem)',
        color:        fg,
        letterSpacing:'0.06em',
        padding:      '0 clamp(6px, 2%, 14px)',
        flexShrink:   0,
      }}>
        {num}
      </span>

      {/* Right running head */}
      <span style={{
        flex:         1,
        fontSize:     'clamp(0.38rem, 0.65vw, 0.55rem)',
        color:        fg,
        letterSpacing:'0.2em',
        textTransform:'uppercase',
        textAlign:    'right',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
        whiteSpace:   'nowrap',
      }}>
        {right}
      </span>
    </div>
  );
}

/**
 * Scrollable (hidden-overflow) content well below the header.
 * minHeight:0 lets the flex child shrink instead of overflowing.
 */
function ContentArea({ children, center = false, style }) {
  return (
    <div style={{
      flex:          1,
      minHeight:     0,
      overflow:      'hidden',
      padding:       'clamp(8px, 3vh, 20px) clamp(12px, 7%, 44px) clamp(8px, 3vh, 20px)',
      display:       'flex',
      flexDirection: 'column',
      gap:           'clamp(6px, 1.8vh, 14px)',
      ...(center ? { alignItems: 'center', justifyContent: 'center' } : {}),
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Shared book elements ──────────────────────────────────────────────────────
function HRule({ style }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0, ...style }}>
      <div style={{ flex:1, height:1, background:C.rule }} />
      <span style={{ color:C.gold, fontSize:'1em', lineHeight:1 }}>❧</span>
      <div style={{ flex:1, height:1, background:C.rule }} />
    </div>
  );
}

function Body({ children }) {
  return (
    <p style={{
      margin:     0,
      fontSize:   'clamp(0.6rem, 1.1vw, 0.82rem)',
      lineHeight: 1.85,
      textAlign:  'justify',
      flexShrink: 1,
    }}>
      {children}
    </p>
  );
}

function DropCap({ letter }) {
  return (
    <span style={{
      float:      'left',
      fontSize:   'clamp(2rem, 4vw, 3.2rem)',
      lineHeight: 0.78,
      marginRight:'0.08em',
      marginTop:  '0.05em',
      color:      C.gold,
      fontStyle:  'italic',
    }}>
      {letter}
    </span>
  );
}

function PullQuote({ children }) {
  return (
    <div style={{
      borderLeft: `3px solid ${C.gold}`,
      paddingLeft:'clamp(8px, 4%, 20px)',
      marginLeft: 0,
      color:      C.muted,
      fontStyle:  'italic',
      fontSize:   'clamp(0.6rem, 1.1vw, 0.82rem)',
      lineHeight: 1.75,
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────

function TitlePage() {
  return (
    <div style={base}>
      <PageHeader num="1" />

      <ContentArea center style={{ position: 'relative' }}>
        {/* Double-rule inset border (decorative only) */}
        <div style={{ position:'absolute', inset:'4px',  border:`1.5px solid ${C.gold}`, pointerEvents:'none', borderRadius:1 }} />
        <div style={{ position:'absolute', inset:'10px', border:`0.5px solid ${C.gold}`, pointerEvents:'none', borderRadius:1 }} />

        {/* Compass rose */}
        <svg width="clamp(48px,9vw,72px)" height="clamp(48px,9vw,72px)" viewBox="0 0 100 100" fill="none" style={{ flexShrink:0 }}>
          <circle cx="50" cy="50" r="44" stroke={C.gold} strokeWidth="1"/>
          <circle cx="50" cy="50" r="6"  fill={C.gold} opacity="0.25"/>
          <circle cx="50" cy="50" r="2.5" fill={C.gold}/>
          <polygon points="50,8 46.5,46 53.5,46"  fill={C.gold}/>
          <polygon points="50,92 46.5,54 53.5,54"  fill={C.gold} opacity="0.35"/>
          <polygon points="8,50 46,46.5 46,53.5"   fill={C.gold} opacity="0.35"/>
          <polygon points="92,50 54,46.5 54,53.5"  fill={C.gold} opacity="0.35"/>
          <line x1="22" y1="22" x2="78" y2="78" stroke={C.gold} strokeWidth="0.5" opacity="0.3"/>
          <line x1="78" y1="22" x2="22" y2="78" stroke={C.gold} strokeWidth="0.5" opacity="0.3"/>
          <text x="47.5" y="21" fill={C.gold} fontSize="8" fontFamily="Georgia,serif">N</text>
        </svg>

        <div style={{ color:C.gold, letterSpacing:'0.55em', fontSize:'clamp(0.45rem,0.8vw,0.65rem)', marginTop:'clamp(8px,2vh,16px)' }}>
          ✦ ✦ ✦
        </div>

        <h1 style={{ fontWeight:'normal', letterSpacing:'0.18em', fontSize:'clamp(1.1rem,2.6vw,2.2rem)', textAlign:'center', color:C.ink, margin:0 }}>
          THE WANDERER'S
        </h1>
        <h1 style={{ fontWeight:'normal', fontStyle:'italic', fontSize:'clamp(1.4rem,3.4vw,2.8rem)', letterSpacing:'0.12em', color:C.gold, margin:0 }}>
          Almanac
        </h1>

        <HRule style={{ width:'clamp(100px,50%,200px)' }} />

        <p style={{ fontSize:'clamp(0.5rem,0.95vw,0.72rem)', letterSpacing:'0.28em', textAlign:'center', color:C.muted, textTransform:'uppercase', margin:0 }}>
          A Collection of Natural Wonders
        </p>

        <div style={{ textAlign:'center', marginTop:'clamp(8px,2vh,16px)' }}>
          <div style={{ fontSize:'clamp(0.5rem,0.9vw,0.68rem)', color:C.gold, letterSpacing:'0.22em' }}>
            BY ELEANOR ASHWOOD
          </div>
          <div style={{ fontSize:'clamp(0.4rem,0.72vw,0.55rem)', color:C.rule, marginTop:4, letterSpacing:'0.14em' }}>
            HARROW &amp; FINCH · FIRST EDITION · MCMXCVII
          </div>
        </div>
      </ContentArea>
    </div>
  );
}

function DedicationPage() {
  return (
    <div style={base}>
      <PageHeader num="2" />

      <ContentArea center>
        <div style={{ color:C.gold, fontSize:'clamp(1.2rem,2.2vw,1.8rem)', flexShrink:0 }}>❦</div>

        <p style={{ fontStyle:'italic', textAlign:'center', fontSize:'clamp(0.65rem,1.2vw,0.9rem)', lineHeight:1.85, color:C.ink, margin:0 }}>
          For all who have ever stood at<br/>
          the edge of something vast<br/>
          and felt, not fear,<br/>
          but gratitude.
        </p>

        <HRule style={{ width:'clamp(80px,36%,160px)' }} />

        {/* Botanical leaf */}
        <svg width="clamp(30px,5vw,40px)" height="clamp(38px,6.5vw,52px)" viewBox="0 0 44 56" fill="none" style={{ flexShrink:0 }}>
          <line x1="22" y1="8"  x2="22" y2="52" stroke={C.gold} strokeWidth="1"/>
          <path d="M22 30 Q10 22 12 10 Q22 15 22 30" fill={C.gold} opacity="0.35"/>
          <path d="M22 30 Q34 22 32 10 Q22 15 22 30" fill={C.gold} opacity="0.35"/>
          <path d="M22 44 Q12 36 14 24 Q22 30 22 44" fill={C.gold} opacity="0.22"/>
          <path d="M22 44 Q32 36 30 24 Q22 30 22 44" fill={C.gold} opacity="0.22"/>
        </svg>

        <p style={{ fontSize:'clamp(0.48rem,0.85vw,0.64rem)', color:C.muted, textAlign:'center', lineHeight:1.75, margin:0 }}>
          <em>Copyright © 1997 Eleanor Ashwood. All rights reserved.</em><br/>
          No portion of this work may be reproduced without<br/>
          the prior written consent of the publisher.<br/><br/>
          <strong style={{ letterSpacing:'0.1em', fontStyle:'normal' }}>HARROW &amp; FINCH PUBLISHERS</strong><br/>
          12 Aldgate Row, London EC3 · First printing, 1997
        </p>
      </ContentArea>
    </div>
  );
}

function ContentsPage() {
  const chapters = [
    { num:'I',   title:'The Mountain',  sub:'On solitude and summits',  pg:'5'  },
    { num:'II',  title:'The Forest',    sub:'On patience and roots',     pg:'21' },
    { num:'III', title:'The Sea',       sub:'On depth and distance',     pg:'45' },
    { num:'IV',  title:'The Desert',    sub:'On silence and survival',   pg:'67' },
    { num:'V',   title:'The River',     sub:'On change and constancy',   pg:'89' },
    { num:'VI',  title:'The Night Sky', sub:'On wonder and navigation',  pg:'113'},
  ];

  return (
    <div style={base}>
      <PageHeader left="The Wanderer's Almanac" right="Contents" num="3" />

      <ContentArea>
        <h2 style={{ fontWeight:'normal', letterSpacing:'0.36em', textTransform:'uppercase', fontSize:'clamp(0.75rem,1.5vw,1.1rem)', color:C.gold, textAlign:'center', margin:0, flexShrink:0 }}>
          Contents
        </h2>

        <div style={{ borderTop:`0.5px solid ${C.rule}`, paddingTop:'clamp(8px,2vh,16px)', display:'flex', flexDirection:'column', gap:'clamp(6px,1.6vh,12px)' }}>
          {chapters.map((ch) => (
            <div key={ch.num} style={{ display:'flex', alignItems:'baseline' }}>
              <span style={{ fontStyle:'italic', fontSize:'clamp(0.48rem,0.85vw,0.62rem)', color:C.gold, width:'1.8em', flexShrink:0 }}>
                {ch.num}
              </span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'clamp(0.58rem,1.1vw,0.82rem)', letterSpacing:'0.04em' }}>{ch.title}</div>
                <div style={{ fontSize:'clamp(0.45rem,0.78vw,0.58rem)', color:'#9a7a5a', fontStyle:'italic' }}>{ch.sub}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginLeft:8, flexShrink:0 }}>
                <div style={{ width:'clamp(16px,3.5vw,50px)', borderBottom:`1px dotted ${C.rule}` }} />
                <span style={{ fontStyle:'italic', fontSize:'clamp(0.48rem,0.85vw,0.62rem)', color:C.gold }}>{ch.pg}</span>
              </div>
            </div>
          ))}
        </div>
      </ContentArea>
    </div>
  );
}

function PrefacePage() {
  return (
    <div style={base}>
      <PageHeader left="Preface" right="The Wanderer's Almanac" num="4" />

      <ContentArea>
        <h2 style={{ fontWeight:'normal', letterSpacing:'0.32em', textTransform:'uppercase', fontSize:'clamp(0.75rem,1.5vw,1.1rem)', color:C.gold, textAlign:'center', margin:0, flexShrink:0 }}>
          Preface
        </h2>
        <HRule />

        <Body>
          <DropCap letter="T" />
          his almanac was born of a conviction that the natural world speaks
          plainly to those willing to listen. I have spent thirty years walking
          the ridges and valleys of five continents, and learned that wonder is
          not a luxury — it is a discipline worth cultivating with care.
        </Body>

        <Body>
          The chapters that follow are arranged not by geography but by
          element — mountain, forest, sea, desert, river, sky — each a
          meditation on a distinct quality of attention. You may read them in
          order or at random; the land does not care for sequences.
        </Body>

        <Body>
          Bring this book to a place where the horizon is wide. Let it become
          dog-eared and weather-stained. A well-used almanac is a far better
          thing than a pristine one sitting safe upon a shelf.
        </Body>

        <div style={{ display:'flex', justifyContent:'flex-end', flexShrink:0 }}>
          <div style={{ textAlign:'right', fontSize:'clamp(0.5rem,0.9vw,0.68rem)', color:C.muted, fontStyle:'italic', lineHeight:1.8 }}>
            — E. A.<br/>
            <span style={{ fontStyle:'normal', letterSpacing:'0.1em' }}>Glen Affric, Autumn 1996</span>
          </div>
        </div>
      </ContentArea>
    </div>
  );
}

function ChapterIOpener() {
  return (
    <div style={base}>
      <PageHeader num="5" />

      <ContentArea center>
        {/* Mountain range */}
        <svg width="clamp(120px,38vw,200px)" height="clamp(50px,16vw,86px)" viewBox="0 0 210 90" fill="none" style={{ flexShrink:0 }}>
          <path d="M0 88 L55 18 L75 38 L95 4 L115 38 L135 18 L210 88Z" fill={C.gold} opacity="0.1"/>
          <path d="M0 88 L55 18 L75 38 L95 4 L115 38 L135 18 L210 88" stroke={C.gold} strokeWidth="1.2" fill="none"/>
          <path d="M88 20 L95 4 L102 20 Q95 25 88 20Z" fill={C.gold} opacity="0.45"/>
          <circle cx="28"  cy="30" r="1.2" fill={C.gold} opacity="0.55"/>
          <circle cx="170" cy="22" r="0.9" fill={C.gold} opacity="0.5"/>
          <circle cx="148" cy="12" r="1.1" fill={C.gold} opacity="0.4"/>
          <path d="M185 15 A9 9 0 1 1 185 33 A6 6 0 1 0 185 15Z" fill={C.gold} opacity="0.35"/>
        </svg>

        <div style={{ color:C.gold, letterSpacing:'0.4em', fontSize:'clamp(0.5rem,0.9vw,0.7rem)', textTransform:'uppercase' }}>
          Chapter I
        </div>

        <h2 style={{ fontWeight:'normal', fontStyle:'italic', fontSize:'clamp(1.3rem,2.9vw,2.4rem)', color:C.ink, margin:0, textAlign:'center' }}>
          The Mountain
        </h2>

        <HRule style={{ width:'clamp(80px,38%,160px)' }} />

        <blockquote style={{ fontStyle:'italic', fontSize:'clamp(0.58rem,1.05vw,0.78rem)', color:C.muted, textAlign:'center', margin:0, lineHeight:1.8 }}>
          "The summit is merely the mountain's<br/>
          excuse to show you the sky."
          <footer style={{ marginTop:'clamp(6px,1.2vh,10px)', fontSize:'clamp(0.44rem,0.78vw,0.6rem)', letterSpacing:'0.18em', fontStyle:'normal', color:C.gold }}>
            — JOHN MUIR
          </footer>
        </blockquote>
      </ContentArea>
    </div>
  );
}

function ChapterIContent() {
  return (
    <div style={base}>
      <PageHeader left="Chapter I" right="The Mountain" num="6" />

      <ContentArea>
        <Body>
          <DropCap letter="A" />
          mountain does not become a mountain overnight. The forces required —
          slow collision of tectonic plates, the patient upwelling of magma,
          the ten-thousand-year retreat of glaciers — operate on timescales
          that make human ambition look like a moth's brief hour. To stand at
          the base of a great peak is to feel, for the first time, genuinely
          small.
        </Body>

        <Body>
          I first climbed seriously at nineteen, in the Cairngorms. The
          weather was poor and the summit invisible, but I did not turn back.
          Not from courage — I was too inexperienced to know the risks — but
          from a stubborn conviction that the mountain would reward
          persistence.
        </Body>

        <PullQuote>
          The mountain had no interest in rewarding me. It simply was —
          magnificently, indifferently, utterly itself.
        </PullQuote>

        <Body>
          Our task is not to conquer the mountain but to become, briefly,
          worthy of its company. Every summit reached is less a victory over
          stone than a small revolution in the self.
        </Body>
      </ContentArea>
    </div>
  );
}

function ChapterIIIOpener() {
  return (
    <div style={base}>
      <PageHeader num="7" />

      <ContentArea center>
        {/* Ocean waves */}
        <svg width="clamp(120px,40vw,210px)" height="clamp(44px,12vw,65px)" viewBox="0 0 220 70" fill="none" style={{ flexShrink:0 }}>
          {[0,1,2].map((i) => (
            <path key={i}
              d={`M${-5+i*4} ${42-i*7} C${28+i*3} ${12-i*4} ${55+i*3} ${68-i*4} ${82+i*3} ${42-i*7} S${137+i*3} ${12-i*4} ${165+i*3} ${42-i*7} S${210} ${68-i*4} ${225} ${42-i*7}`}
              stroke={C.gold} strokeWidth={1.3-i*0.3} opacity={0.9-i*0.28} fill="none"
            />
          ))}
          <path d="M60 18 Q63 15 66 18" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.5"/>
          <path d="M70 12 Q73 9  76 12" stroke={C.gold} strokeWidth="0.8" fill="none" opacity="0.4"/>
        </svg>

        <div style={{ color:C.gold, letterSpacing:'0.4em', fontSize:'clamp(0.5rem,0.9vw,0.7rem)', textTransform:'uppercase' }}>
          Chapter III
        </div>

        <h2 style={{ fontWeight:'normal', fontStyle:'italic', fontSize:'clamp(1.3rem,2.9vw,2.4rem)', color:C.ink, margin:0, textAlign:'center' }}>
          The Sea
        </h2>

        <HRule style={{ width:'clamp(80px,38%,160px)' }} />

        <blockquote style={{ fontStyle:'italic', fontSize:'clamp(0.58rem,1.05vw,0.78rem)', color:C.muted, textAlign:'center', margin:0, lineHeight:1.8, maxWidth:'80%' }}>
          "Roll on, thou deep and dark blue Ocean — roll!<br/>
          Ten thousand fleets sweep over thee in vain."
          <footer style={{ marginTop:'clamp(6px,1.2vh,10px)', fontSize:'clamp(0.44rem,0.78vw,0.6rem)', letterSpacing:'0.18em', fontStyle:'normal', color:C.gold }}>
            — LORD BYRON, <em>Childe Harold's Pilgrimage</em>
          </footer>
        </blockquote>
      </ContentArea>
    </div>
  );
}

function ChapterIIIContent() {
  return (
    <div style={base}>
      <PageHeader left="Chapter III" right="The Sea" num="8" />

      <ContentArea>
        <Body>
          <DropCap letter="T" />
          he sea keeps no record of what has crossed it. Every ship, every
          swimmer, every storm — all swallowed without comment, without
          memorial. There is a freedom in this that terrifies and exhilarates
          in equal measure. The ocean is the world's most honest auditor: it
          accepts everything and assigns the same value, which is to say, none.
        </Body>

        <Body>
          I have sat by the Atlantic at dusk and watched the light go out like
          a candle, and felt something close to religious awe — not because
          the scene was beautiful, though it was, but because it was entirely
          indifferent to my presence. Beauty is most powerful when it does not
          perform.
        </Body>

        {/* Fish vignette */}
        <div style={{ display:'flex', justifyContent:'center', flexShrink:0 }}>
          <svg width="clamp(40px,7vw,52px)" height="clamp(18px,3vw,22px)" viewBox="0 0 56 24" fill="none">
            <path d="M6 12 Q16 5 26 12 Q36 19 46 12" stroke={C.gold} strokeWidth="1" fill="none"/>
            <path d="M46 12 L43 8 M46 12 L43 16"     stroke={C.gold} strokeWidth="1"/>
            <circle cx="21" cy="11" r="1.5"           fill={C.gold} opacity="0.5"/>
          </svg>
        </div>

        <Body>
          The old navigators gave the sea names — names of moods, of dangers,
          of gods — because to name a thing is to begin the long work of
          understanding it. The Pacific: <em>peaceful</em>. A lie so
          magnificent it functions as a prayer.
        </Body>
      </ContentArea>
    </div>
  );
}

function ChapterVIOpener() {
  return (
    <div style={{ ...base, background:'#0e0b14', color:'#e8dfc8' }}>
      <PageHeader num="9" dark />

      {/* Star field fills remaining space */}
      <div style={{ flex:1, minHeight:0, position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'clamp(6px,1.5vh,12px)' }}>

        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" fill="none">
          {[
            [40,60],[120,25],[210,55],[320,18],[370,80],
            [60,150],[155,125],[280,140],[390,165],
            [30,235],[105,215],[230,230],[350,195],
            [75,325],[185,305],[295,340],[375,285],
            [45,415],[165,395],[265,425],[360,405],
            [85,480],[205,465],[315,490],[385,470],
          ].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y}
              r={i%5===0?1.8:i%3===0?1.2:0.8}
              fill="#e8dfc8" opacity={0.25+(i%7)*0.1}
            />
          ))}
          <ellipse cx="200" cy="250" rx="55" ry="240" fill="#d4c9a8" opacity="0.04"/>
        </svg>

        {/* Crescent moon top-right */}
        <div style={{ position:'absolute', top:'6%', right:'10%' }}>
          <svg width="clamp(28px,5vw,42px)" height="clamp(28px,5vw,42px)" viewBox="0 0 50 50" fill="none">
            <path d="M28 6 A20 20 0 1 1 28 44 A14 14 0 1 0 28 6Z" fill="#e8dfc8" opacity="0.7"/>
          </svg>
        </div>

        <div style={{ color:'#c49a2e', letterSpacing:'0.4em', fontSize:'clamp(0.5rem,0.9vw,0.7rem)', textTransform:'uppercase', position:'relative' }}>
          Chapter VI
        </div>

        <h2 style={{ fontWeight:'normal', fontStyle:'italic', fontSize:'clamp(1.3rem,2.9vw,2.4rem)', color:'#e8dfc8', margin:0, textAlign:'center', position:'relative' }}>
          The Night Sky
        </h2>

        <div style={{ display:'flex', alignItems:'center', gap:8, width:'clamp(80px,38%,160px)', position:'relative' }}>
          <div style={{ flex:1, height:1, background:'#c49a2e', opacity:0.5 }}/>
          <span style={{ color:'#c49a2e', fontSize:'1em' }}>✦</span>
          <div style={{ flex:1, height:1, background:'#c49a2e', opacity:0.5 }}/>
        </div>

        <blockquote style={{ fontStyle:'italic', fontSize:'clamp(0.58rem,1.05vw,0.78rem)', color:'#c4b89a', textAlign:'center', margin:0, lineHeight:1.8, maxWidth:'72%', position:'relative' }}>
          "Two things fill the mind with ever-increasing admiration:<br/>
          the starry sky above me,<br/>
          and the moral law within me."
          <footer style={{ marginTop:'clamp(6px,1.2vh,10px)', fontSize:'clamp(0.44rem,0.78vw,0.6rem)', letterSpacing:'0.18em', fontStyle:'normal', color:'#c49a2e' }}>
            — IMMANUEL KANT
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

function ClosingPage() {
  return (
    <div style={base}>
      <PageHeader num="10" />

      <ContentArea center style={{ position:'relative' }}>
        {/* Single-rule inset border */}
        <div style={{ position:'absolute', inset:'4px', border:`1px solid ${C.rule}`, pointerEvents:'none', borderRadius:1 }} />

        {/* Anchor emblem */}
        <svg width="clamp(36px,6.5vw,50px)" height="clamp(44px,8vw,62px)" viewBox="0 0 54 68" fill="none" style={{ flexShrink:0 }}>
          <circle cx="27" cy="14" r="8"  stroke={C.gold} strokeWidth="1.2" fill="none"/>
          <circle cx="27" cy="14" r="3"  fill={C.gold} opacity="0.4"/>
          <line   x1="27" y1="22" x2="27" y2="58" stroke={C.gold} strokeWidth="1.2"/>
          <path   d="M27 58 Q14 55 10 48 Q20 50 27 46 Q34 50 44 48 Q40 55 27 58Z" stroke={C.gold} strokeWidth="1" fill={C.gold} opacity="0.15"/>
          <line   x1="14" y1="34" x2="40" y2="34" stroke={C.gold} strokeWidth="1"/>
          <circle cx="14" cy="34" r="2" fill={C.gold} opacity="0.5"/>
          <circle cx="40" cy="34" r="2" fill={C.gold} opacity="0.5"/>
        </svg>

        <div style={{ color:C.gold, letterSpacing:'0.44em', fontSize:'clamp(0.5rem,0.9vw,0.7rem)', textTransform:'uppercase' }}>
          Finis
        </div>

        <HRule style={{ width:'clamp(70px,32%,140px)' }} />

        <p style={{ fontStyle:'italic', textAlign:'center', fontSize:'clamp(0.6rem,1.1vw,0.82rem)', lineHeight:1.85, color:C.muted, margin:0, maxWidth:'75%' }}>
          "The goal of life is to make your heartbeat<br/>
          match the beat of the universe,<br/>
          to match your nature with Nature."
        </p>

        <p style={{ fontSize:'clamp(0.44rem,0.78vw,0.6rem)', letterSpacing:'0.15em', color:C.gold, margin:0 }}>
          — JOSEPH CAMPBELL
        </p>

        <p style={{ textAlign:'center', fontSize:'clamp(0.4rem,0.7vw,0.55rem)', color:C.rule, letterSpacing:'0.14em', lineHeight:1.85, margin:0, marginTop:'clamp(6px,1.5vh,12px)' }}>
          TYPESET IN GARAMOND · PRINTED ON LAID PAPER<br/>
          HARROW &amp; FINCH · LONDON · MCMXCVII
        </p>
      </ContentArea>
    </div>
  );
}

// ── FlipBook shell ────────────────────────────────────────────────────────────
const PAGES = [
  TitlePage, DedicationPage, ContentsPage, PrefacePage,
  ChapterIOpener, ChapterIContent,
  ChapterIIIOpener, ChapterIIIContent,
  ChapterVIOpener, ClosingPage,
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
        width:               window.innerWidth,
        height:              window.innerHeight,
        size:                'stretch',
        minWidth:            1,
        maxWidth:            window.innerWidth,
        minHeight:           1,
        maxHeight:           window.innerHeight,
        drawShadow:          false,
        maxShadowOpacity:    0,
        flippingTime:        650,
        usePortrait:         true,
        startZIndex:         0,
        autoSize:            false,
        showCover:           false,
        mobileScrollSupport: false,
        clickEventForward:   true,
        useMouseEvents:      true,
        swipeDistance:       30,
        showPageCorners:     false,
        disableFlipByClick:  false,
        startPage:           0,
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
      <div ref={stagingRef} style={{ display:'none' }} aria-hidden="true">
        {PAGES.map((PageComponent, i) => (
          <div key={i} style={{ width:'100%', height:'100%' }}>
            <PageComponent />
          </div>
        ))}
      </div>
    </div>
  );
}
