import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { DEMO_CATALOG, RARITIES, UNIVERSES } from './data/catalog';
import { loadGameState, saveGameState } from './lib/storage';
import { drawRarity, openBooster, resolveBattle } from './lib/game';

function App() {
  const state = loadGameState();
  const uniqueCards = new Set(state.cards.map((card) => card.id)).size;
  const completion = Math.min(100, Math.round((uniqueCards / Math.max(1, DEMO_CATALOG.length)) * 100));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand">RAIZEN</div>
          <p>COLLECT. EVOLVE. CONQUER.</p>
        </div>

        <nav className="nav" aria-label="Menu principal">
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/boosters">Boosters</NavLink>
          <NavLink to="/decks">Decks</NavLink>
          <NavLink to="/battles">Combats</NavLink>
          <NavLink to="/market">Marché</NavLink>
          <NavLink to="/community">Communauté</NavLink>
          <NavLink to="/universes">Univers</NavLink>
          <NavLink to="/rankings">Classements</NavLink>
          <NavLink to="/profile">Profil</NavLink>
          <NavLink to="/settings">Paramètres</NavLink>
        </nav>

        <div className="mini-panel">
          <div className="mini-label">Compte</div>
          <div className="mini-player">
            <div className="mini-avatar">{state.avatar}</div>
            <div>
              <strong>{state.username}</strong>
              <small>Niv. {state.level}</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="search-wrap">
            <input aria-label="Recherche" placeholder="Rechercher une carte, un univers..." />
          </div>
          <div className="top-actions">
            <button className="btn btn-light" type="button">Mode clair</button>
            <Link className="btn btn-light" to="/profile">Connexion</Link>
            <Link className="btn btn-primary" to="/profile">Mon profil</Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage completion={completion} />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/boosters" element={<BoosterPage />} />
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/battles" element={<BattlesPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/universes" element={<UniversePage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function HomePage({ completion }: { completion: number }) {
  const state = loadGameState();
  const recent = state.cards.slice(0, 4);

  return (
    <>
      <section className="hero panel">
        <div className="hero-copy">
          <span className="eyebrow">L'univers des collectionneurs</span>
          <h1>Collecte.<br /><span>Évolue.</span> Conquiers.</h1>
          <p>
            RAIZEN réunit les univers anime et manga dans une expérience de cartes, boosters, decks, combats et classements.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/boosters">Ouvrir un booster</Link>
            <Link className="btn btn-light" to="/collection">Découvrir la collection</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orb" />
          <div className="symbol">雷</div>
        </div>
      </section>

      <section className="stats-strip section">
        <StatBox label="Cartes" value={String(state.cards.length)} />
        <StatBox label="Unique" value={String(new Set(state.cards.map((card) => card.id)).size)} />
        <StatBox label="RC" value={String(state.coins)} />
        <StatBox label="Progression" value={`${completion}%`} />
      </section>

      <section className="section two-columns">
        <div className="panel padded">
          <div className="section-header compact">
            <div>
              <h2>Dernières cartes</h2>
            </div>
          </div>
          <div className="mini-cards">
            {recent.map((card) => (
              <div key={card.id} className="mini-card card-tile">
                <span>{card.name}</span>
                <small>{card.rarity}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel padded">
          <div className="section-header compact">
            <div>
              <h2>Missions</h2>
            </div>
          </div>
          <ul className="check-list">
            <li>Ouvrir 3 boosters : +150 XP</li>
            <li>Compléter un deck : +120 XP</li>
            <li>Gagner un combat : +85 XP</li>
          </ul>
        </div>
      </section>
    </>
  );
}

function CollectionPage() {
  const state = loadGameState();
  const uniqueRarities = ['all', ...new Set(state.cards.map((card) => card.rarity))];

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Collection</h2>
          <p>Filtrage par rareté, univers et variantes.</p>
        </div>
        <span className="chip">{state.cards.length} cartes</span>
      </div>

      <div className="toolbar">
        {uniqueRarities.map((filter) => (
          <button key={filter} className="chip filter-chip" type="button">
            {filter === 'all' ? 'Toutes' : filter}
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {state.cards.map((card) => (
          <article key={card.id} className="card-item panel" data-rarity={card.rarity}>
            <div className="card-art" style={{ background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
              {card.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="card-body">
              <span className="rarity-tag">{card.rarity}</span>
              <h3>{card.name}</h3>
              <p>{card.universe}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BoosterPage() {
  const state = loadGameState();

  const handleOpen = () => {
    const nextCards = openBooster(DEMO_CATALOG);
    const nextState = {
      ...state,
      boosters: Math.max(0, state.boosters - 1),
      xp: state.xp + 80,
      cards: [...state.cards, ...nextCards],
      coins: state.coins
    };

    saveGameState(nextState);
    window.location.reload();
  };

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Boosters</h2>
          <p>Probabilités visibles, ouverture locale et historique des résultats.</p>
        </div>
        <span className="chip">{state.boosters} disponibles</span>
      </div>

      <div className="boosters-layout">
        <div className="panel padded">
          <h3>Booster Découverte</h3>
          <ul className="rule-list">
            <li>Prix : 100 RC</li>
            <li>Cartes : 5</li>
            <li>Probabilités : C 48%, UC 27%, R 15%, SP 7%, UR 2%, E 0.8%, L 0.2%</li>
          </ul>
          <button type="button" className="btn btn-primary" onClick={handleOpen}>Ouvrir un booster</button>
        </div>

        <div className="panel padded">
          <h3>Probabilités</h3>
          <div className="rates-list">
            {RARITIES.map((rarity) => (
              <div key={rarity.id} className="rate-row">
                <span>{rarity.name}</span>
                <strong>{rarity.weight}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DecksPage() {
  const state = loadGameState();

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Decks</h2>
          <p>Construis un deck compatible et valide.</p>
        </div>
      </div>
      <div className="cards-grid">
        {state.decks.map((deck) => (
          <div key={deck.id} className="panel padded">
            <h3>{deck.name}</h3>
            <p>{deck.cards.length} cartes</p>
            <button className="btn btn-light" type="button">Sélectionner</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function BattlesPage() {
  const result = resolveBattle(['12', '14', '16'], ['10', '11', '13']);

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Combats</h2>
          <p>Mode entraînement contre une IA locale.</p>
        </div>
      </div>

      <div className="panel padded battle-panel">
        <h3>Défi d’entraînement</h3>
        <div className="battle-score">
          <div>
            <strong>Joueur</strong>
            <span>{result.playerScore}</span>
          </div>
          <div>
            <strong>IA</strong>
            <span>{result.enemyScore}</span>
          </div>
        </div>
        <p>{result.summary}</p>
        <button className="btn btn-primary" type="button">Relancer</button>
      </div>
    </section>
  );
}

function MarketPage() {
  const state = loadGameState();

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Marché</h2>
          <p>Économie locale en RC, achat et vente de cartes.</p>
        </div>
      </div>
      <div className="cards-grid">
        {state.market.map((listing) => (
          <div key={listing.id} className="panel padded">
            <h3>{listing.title}</h3>
            <p>{listing.seller}</p>
            <strong>{listing.price} RC</strong>
            <button className="btn btn-primary" type="button">Acheter</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommunityPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Communauté</h2>
          <p>Derniers événements, collectionneurs actifs et cartes populaires.</p>
        </div>
      </div>
      <div className="cards-grid">
        <div className="panel padded"><h3>Joueurs actifs</h3><p>Raizen, Astra, Kaito</p></div>
        <div className="panel padded"><h3>Cartes populaires</h3><p>Luffy, Naruto, Gojo</p></div>
      </div>
    </section>
  );
}

function UniversePage() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Univers</h2>
          <p>Catalogue extensible prêt à accueillir de nouveaux mondes.</p>
        </div>
      </div>
      <div className="cards-grid">
        {UNIVERSES.map((universe) => (
          <div key={universe.id} className="panel padded">
            <h3>{universe.name}</h3>
            <p>{universe.description}</p>
            <small>{universe.cards} cartes</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function RankingsPage() {
  const state = loadGameState();

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Classements</h2>
          <p>Classements de niveau, collection et victoires.</p>
        </div>
      </div>
      <div className="panel padded">
        <table className="ranking-table">
          <thead>
            <tr><th>Joueur</th><th>Niveau</th><th>Cartes uniques</th><th>Victoires</th></tr>
          </thead>
          <tbody>
            {state.rankings.map((entry) => (
              <tr key={entry.name}><td>{entry.name}</td><td>{entry.level}</td><td>{entry.uniqueCards}</td><td>{entry.wins}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProfilePage() {
  const state = loadGameState();

  return (
    <section className="section">
      <div className="profile-layout">
        <header className="profile-header">
          <div className="brand">RAIZEN</div>
          <nav className="nav-inline" aria-label="Profil navigation">
            <Link to="/">Accueil</Link>
            <Link to="/profile" className="active">Profil</Link>
            <Link to="/settings">Réglages</Link>
          </nav>
        </header>
        <div className="banner-surface" style={{ background: state.profile.banner }} />
        <div className="profile-card panel padded">
          <div className="avatar-large">{state.avatar}</div>
          <div className="profile-meta">
            <span className="status">Collectionneur</span>
            <h1>{state.username}</h1>
            <p>{state.profile.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SettingsPage() {
  const state = loadGameState();

  return (
    <section className="section">
      <div className="settings-shell">
        <main className="settings-panel panel padded">
          <h1>Paramètres du compte</h1>
          <p className="subtitle">Mode local de démonstration.</p>
          <form className="settings-form">
            <label><span>Pseudo</span><input defaultValue={state.username} /></label>
            <label><span>Thème</span><select defaultValue={state.preferences.theme}><option value="dark">Sombre</option><option value="light">Clair</option><option value="system">Système</option></select></label>
            <label className="toggle-row"><span>Réduire les animations</span><input type="checkbox" defaultChecked={state.preferences.reduceMotion} /></label>
            <button type="submit" className="btn btn-primary">Sauvegarder</button>
          </form>
        </main>
      </div>
    </section>
  );
}

export default App;
