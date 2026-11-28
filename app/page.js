'use client';
import { useEffect, useState } from 'react';

const COLORS = ['#ff9d2e', '#e5532d', '#ffc94a', '#f08a8a'];
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Jaya+Susee+Hive+Kaveri+Nagar+Kolathur+Chennai+600099';
const CAL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
  encodeURIComponent('Griha Pravesh – Vijayalakshmi Murugan Illam') +
  '&dates=20261213T003000Z/20261213T020000Z&location=' +
  encodeURIComponent('Plot No. 7, Jaya Susee Hive, Kaveri Nagar 4th Street, Kolathur, Chennai 600099');

export default function Page() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const [active, setActive] = useState(0);
  const [petals, setPetals] = useState([]);

  // petals (client only, avoids hydration mismatch)
  useEffect(() => {
    setPetals(
      Array.from({ length: 14 }, (_, i) => {
        const s = 7 + Math.random() * 9;
        return {
          left: Math.random() * 100 + '%', width: s, height: s, background: COLORS[i % 4],
          '--dx': Math.random() * 160 - 80 + 'px',
          animationDuration: 9 + Math.random() * 10 + 's',
          animationDelay: '-' + Math.random() * 15 + 's',
        };
      })
    );
  }, []);

  // scroll reveal + active section + parallax
  useEffect(() => {
    const rv = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.2 }
    );
    document.querySelectorAll('.rv,.orn').forEach((el) => rv.observe(el));

    const secs = [...document.querySelectorAll('section')];
    const so = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(secs.indexOf(e.target))),
      { threshold: 0.55 }
    );
    secs.forEach((s) => so.observe(s));

    const mand = document.querySelector('.mandala');
    const lamps = [...document.querySelectorAll('.lamp')];
    const onScroll = () => {
      const y = window.scrollY;
      mand.style.translate = `0 ${y * 0.3}px`;
      lamps.forEach((l, i) => (l.style.translate = `0 ${-y * 0.08 * ((i % 2) + 1)}px`));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { rv.disconnect(); so.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const openGate = () => {
    setOpen(true);
    setTimeout(() => setGone(true), 2400);
  };

  const toggleTheme = () => {
    const r = document.documentElement;
    r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <>
      {!gone && (
        <div id="gate" className={open ? 'open' : ''} onClick={openGate}>
          <div className="door l" />
          <div className="door r" />
          <div className="seal"><b>ॐ</b><p>Tap to open the invitation</p></div>
        </div>
      )}
      <div id="petals">
        {petals.map((p, i) => <span key={i} className="petal" style={p} />)}
      </div>
      <button id="tg" aria-label="Toggle theme" onClick={toggleTheme}>◐</button>
      <nav>
        {[1, 2, 3, 4, 5].map((n, i) => <a key={n} href={`#s${n}`} className={active === i ? 'on' : ''} />)}
      </nav>

      <section id="s1" className={'hero' + (open ? ' go' : '')}>
        <svg className="mandala" viewBox="-100 -100 200 200" fill="none" stroke="currentColor" strokeWidth=".5">
          {Array.from({ length: 16 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 22.5})`}>
              <path d="M0-95C12-70 12-50 0-30 -12-50 -12-70 0-95Z" />
              <path d="M0-60C18-45 18-30 0-12 -18-30 -18-45 0-60Z" />
              <circle cy="-100" r="3" />
            </g>
          ))}
          <circle r="20" /><circle r="100" />
        </svg>
        <div className="lamp" style={{ left: '8%', '--h': '60px' }}><i /><span /></div>
        <div className="lamp" style={{ left: '20%', '--h': '130px', animationDelay: '-1s' }}><i /><span /></div>
        <div className="lamp" style={{ right: '20%', '--h': '130px', animationDelay: '-2s' }}><i /><span /></div>
        <div className="lamp" style={{ right: '8%', '--h': '60px', animationDelay: '-.5s' }}><i /><span /></div>
        <p className="eyebrow ta">ஸ்ரீ அங்காள பரமேஸ்வரி துணை</p>
        <p className="eyebrow">You’re invited to our</p>
        <h1><span className="w"><span>Griha</span></span> <span className="w"><span>Pravesh</span></span></h1>
        <p className="ta" style={{ marginTop: 14, fontSize: 'clamp(20px,4vw,30px)', fontWeight: 700, color: 'var(--red)' }}>
          புதுமனை புகுவிழா அழைப்பிதழ்
        </p>
        <div className="scroll">SCROLL</div>
      </section>

      <section id="s2">
        <p className="eyebrow rv">Dear family &amp; friends</p>
        <h2 className="rv d1">With Joyful Hearts</h2>
        <div className="orn rv d1" />
        <p className="msg rv d2">
          We are stepping into our new abode and would love for you to join us. Please come with friends and relatives, and bless our home with your presence.
        </p>
        <p className="eyebrow ta rv" style={{ marginTop: 48 }}>அன்புள்ள குடும்பத்தினரே மற்றும் நண்பர்களே</p>
        <h2 className="ta rv d1" style={{ fontSize: 'clamp(24px,5vw,40px)', fontWeight: 700, margin: '6px 0 22px' }}>
          மகிழ்ச்சி நிறைந்த இதயங்களுடன்
        </h2>
        <p className="msg ta rv d3">தாங்கள் தங்கள் சுற்றமும் நட்பும் சூழ வருகை தந்து வாழ்த்தியருளுமாறு அன்புடன் அழைக்கின்றோம்.</p>
      </section>

      <section id="s3">
        <div className="orn rv" />
        <p className="names ta rv d1">
          சென்னை,<br />
          தெய்வத்திரு <span>G. முருகன்</span> –<br />
          திருமதி <span>S. விஜயலட்சுமி</span> BA.,<br />
          <small style={{ fontSize: 15, fontWeight: 500 }}>
            கண்காணிப்பாளர், த.நா.ந.வா.மே. வாரியம்<br />அவர்களால் அமைக்க பெற்ற
          </small>
        </p>
        <h2 className="home ta rv d2">விஜயலட்சுமி முருகன் இல்ல<br />புதுமனை புகும் விழாவிற்கு</h2>
        <p className="msg ta rv d3">தாங்கள் தங்கள் சுற்றமும் நட்பும் சூழ வருகை தந்து வாழ்த்தியருளுமாறு அன்புடன் அழைக்கின்றோம்.</p>
        <div className="orn rv d3" />
        <p className="ta rv d3" style={{ marginTop: 26, fontSize: 'clamp(18px,3.6vw,24px)' }}>தங்கள் வரவை அன்புடன் எதிர்நோக்கும்:</p>
        <p className="eyebrow rv d3">Awaiting your arrival with love:</p>
        <p className="names ta rv d3">
          <span>G.M. புகழேந்தி</span> MCA.,<br /><span>G.M. பிரியதர்ஷினி</span> B.Com.,<br /><span>R. பிரவீணா</span> MBA.,
        </p>
      </section>

      <section id="s4">
        <p className="eyebrow rv">The Auspicious Day</p>
        <div className="big rv d1">13·12·2026</div>
        <p className="script sub rv d2">Sunday</p>
        <a className="btn rv d3" href={CAL} target="_blank" rel="noopener">Add to Calendar</a>
      </section>

      <section id="s5">
        <div className="pin rv">📍</div>
        <h2 className="rv d1">The Venue</h2>
        <p className="addr ta rv d2">
          <b style={{ color: 'var(--red)' }}>Plot No. 7, Jaya Susee Hive</b><br />
          காவேரி நகர் 4வது தெரு,<br />சரோஜினி நகர், கொளத்தூர்,<br />சென்னை – 600099
        </p>
        <p className="addr rv d2" style={{ fontSize: 15, opacity: 0.85 }}>
          Kaveri Nagar 4th Street, Sarojini Nagar, Kolathur, Chennai – 600099
        </p>
        <div className="rv d3">
          <a className="btn" target="_blank" rel="noopener" href={MAPS}>Open in Maps</a>
          <a className="btn" href="tel:+919444574070">Call 94445 74070</a>
          <a className="btn" href="tel:+916369323541">Call 63693 23541</a>
        </div>
      </section>
    </>
  );
}
