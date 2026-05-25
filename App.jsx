import { useState, useRef } from "react";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  const workouts = [
    {
      title: "Explosivité complète",
      time: 20,
      color: "#ff6b00",
      desc: "Développe puissance, vitesse et détente",
      steps: ["Sprints 20m x6", "Sauts verticaux", "Squats explosifs"],
    },
    {
      title: "Contrôle du ballon",
      time: 25,
      color: "#00b4ff",
      desc: "Améliore ton dribble sous pression",
      steps: ["Main forte / faible", "Slalom cônes", "Dribble rapide"],
    },
    {
      title: "Vitesse & agilité",
      time: 15,
      color: "#a855f7",
      desc: "Réactivité et changements de direction",
      steps: ["Shuttle run", "Départs explosifs", "Stops rapides"],
    },
  ];

  const equipment = [
    {
      name: "Ballon de basket",
      brand: "Wilson / Spalding",
      text: "Les meilleures marques pour débuter et progresser rapidement.",
    },
    {
      name: "Cônes d’agilité",
      brand: "Nike / Decathlon",
      text: "Indispensable pour le dribble et les déplacements.",
    },
    {
      name: "Échelle de rythme",
      brand: "SKLZ",
      text: "Améliore la vitesse de pieds et la coordination.",
    },
    {
      name: "Élastiques",
      brand: "Domyos",
      text: "Renforcement musculaire et prévention des blessures.",
    },
  ];

  const tips = [
    { title: "Régularité", text: "3 à 5 entraînements par semaine." },
    { title: "Échauffement", text: "Toujours 10–15 min avant." },
    { title: "Hydratation", text: "Boire avant / pendant / après." },
    { title: "Progression", text: "Augmente l’intensité progressivement." },
  ];

  const startWorkout = (w) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setSelected(w);

    let total = w.time * 60;
    setTimeLeft(total);
    setRunning(true);

    intervalRef.current = setInterval(() => {
      total -= 1;
      setTimeLeft(total);

      if (total <= 0) {
        clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 1000);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.title}>
          BASKET <span style={{ color: "#ff6b00" }}>PERFORMANCE</span>
        </h1>

        <p style={styles.subtitle}>
          Préparation physique complète pour joueurs de basket
        </p>

        <div style={styles.scroll}>↓ Scroll</div>
      </section>

      <div style={styles.container}>

        {/* TIMER */}
        <div style={styles.card}>
          <h2>Séance active</h2>

          {selected ? (
            <>
              <h3 style={{ color: selected.color }}>{selected.title}</h3>
              <p style={{ color: "#aaa" }}>{selected.desc}</p>
              <div style={styles.timer}>{formatTime(timeLeft)}</div>
              <p style={{ color: running ? "#00ff88" : "#ff5555" }}>
                {running ? "En cours" : "Terminé"}
              </p>
            </>
          ) : (
            <p style={{ color: "#888" }}>Choisis un entraînement</p>
          )}
        </div>

        {/* WORKOUTS */}
        <h2 style={styles.h2}>Entraînements</h2>

        {workouts.map((w, i) => (
          <div key={i} style={styles.card}>
            <h3 style={{ color: w.color }}>{w.title}</h3>
            <p style={{ color: "#aaa" }}>{w.desc}</p>
            <p>{w.time} min</p>

            <ul>
              {w.steps.map((s, j) => (
                <li key={j}>{s}</li>
              ))}
            </ul>

            <button
              onClick={() => startWorkout(w)}
              style={{ ...styles.button, background: w.color }}
            >
              Lancer
            </button>
          </div>
        ))}

        {/* EQUIPMENT */}
        <h2 style={styles.h2}>Matériel recommandé</h2>

        {equipment.map((e, i) => (
          <div key={i} style={styles.card}>
            <h3>{e.name}</h3>
            <p style={{ color: "#ff6b00" }}>{e.brand}</p>
            <p style={{ color: "#aaa" }}>{e.text}</p>
          </div>
        ))}

        {/* TIPS */}
        <h2 style={styles.h2}>Conseils</h2>

        {tips.map((t, i) => (
          <div key={i} style={styles.card}>
            <h3>{t.title}</h3>
            <p style={{ color: "#aaa" }}>{t.text}</p>
          </div>
        ))}

        <div style={styles.footer}>
          Basket Performance Hub © 2026
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b0f17",
    color: "white",
    fontFamily: "system-ui",
  },

  hero: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: 60,
    fontWeight: 800,
  },

  subtitle: {
    color: "#aaa",
    marginTop: 10,
    maxWidth: 500,
  },

  scroll: {
    marginTop: 20,
    color: "#555",
  },

  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 30,
  },

  card: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
  },

  h2: {
    marginTop: 40,
  },

  button: {
    marginTop: 10,
    padding: 10,
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    color: "black",
    width: "100%",
  },

  timer: {
    fontSize: 42,
    fontWeight: 700,
    marginTop: 10,
  },

  footer: {
    textAlign: "center",
    marginTop: 50,
    color: "#666",
    fontSize: 12,
  },
};