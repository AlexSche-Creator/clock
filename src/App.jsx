import TopBar from './components/TopBar.jsx';
import Hourglass from './components/Hourglass.jsx';
import StatsCard from './components/StatsCard.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

const PALETTES = {
  blue: {
    sand: '#1ea7ff',
    sandDeep: '#0a5cff',
    glow: 'rgba(30, 167, 255, 0.55)',
    ring: 'rgba(70, 180, 255, 0.9)',
    cardAccent: '#1ea7ff',
  },
  orange: {
    sand: '#ff8a1a',
    sandDeep: '#ff5400',
    glow: 'rgba(255, 120, 20, 0.65)',
    ring: 'rgba(255, 150, 40, 0.95)',
    cardAccent: '#ff7a1a',
  },
  purple: {
    sand: '#8a5cff',
    sandDeep: '#5a2bd9',
    glow: 'rgba(140, 80, 255, 0.55)',
    ring: 'rgba(160, 100, 255, 0.9)',
    cardAccent: '#9a6cff',
  },
};

const REVENUE = { plan: '56,80', fact: '42,35', percent: '74,6' };

export default function App() {
  return (
    <div className="app">
      <TopBar />

      <main className="main">
        <header className="page-header">
          <h1>Выполнение акционерного задания в 2026 году</h1>
          <p>Динамика выполнения плановых показателей и формирование выручки</p>
        </header>

        <section className="dashboard">
          <div className="column column-side">
            <Hourglass
              title="ПО ПП"
              palette={PALETTES.blue}
              scale={0.82}
            />
            <StatsCard {...REVENUE} accent={PALETTES.blue.cardAccent} />
          </div>

          <div className="column column-center">
            <Hourglass
              title="ОБЩЕЕ ЗАДАНИЕ"
              palette={PALETTES.orange}
              scale={1}
              capWide
            />
            <StatsCard {...REVENUE} accent={PALETTES.orange.cardAccent} elevated />
          </div>

          <div className="column column-side">
            <Hourglass
              title="ПО ВТС"
              palette={PALETTES.purple}
              scale={0.82}
            />
            <StatsCard {...REVENUE} accent={PALETTES.purple.cardAccent} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
