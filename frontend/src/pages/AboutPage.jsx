import styles from './AboutPage.module.css';

const skills = [
  { name: 'HTML5 Semántico', level: 90 },
  { name: 'CSS3 Moderno', level: 85 },
  { name: 'JavaScript ES6+', level: 88 },
  { name: 'React.js', level: 80 },
  { name: 'Node.js / Express', level: 75 },
  { name: 'Git & GitHub', level: 82 },
];

const timeline = [
  { year: '2023', event: 'Inicio en Desarrollo Web', desc: 'Aprendizaje de HTML, CSS y JavaScript desde cero.' },
  { year: '2024', event: 'Bootcamp JSCamp', desc: 'Profundización en desarrollo web moderno con tecnologías nativas.' },
  { year: '2025', event: 'Algoritmos y Programación I', desc: 'Aplicación de conceptos en proyectos prácticos como Quantum Hub.' },
  { year: '2026', event: 'Quantum Hub Full-Stack', desc: 'Migración del proyecto a arquitectura React + Node.js + Express.' },
];

const AboutPage = () => (
  <div className={styles.page}>
    <section className={styles.hero}>
      <span className={styles.tag}>// Sobre el Desarrollador</span>
      <h1 className={styles.name}>DEVo</h1>
      <p className={styles.bio}>
        Desarrollador web apasionado por la tecnología y la divulgación científica. 
        Este proyecto nació como una experiencia de aprendizaje significativa 
        alineada con los principios del bootcamp JSCamp: construir software de calidad 
        usando exclusivamente tecnologías nativas de la web.
      </p>
    </section>

    {/* Skills */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>// Stack Tecnológico</h2>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <div key={skill.name} className={styles.skill}>
            <div className={styles.skillHeader}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillLevel}>{skill.level}%</span>
            </div>
            <div className={styles.skillBar}>
              <div
                className={styles.skillFill}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>// Trayectoria</h2>
      <div className={styles.timeline}>
        {timeline.map((item) => (
          <div key={item.year} className={styles.timelineItem}>
            <div className={styles.timelineYear}>{item.year}</div>
            <div className={styles.timelineContent}>
              <h3 className={styles.timelineEvent}>{item.event}</h3>
              <p className={styles.timelineDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default AboutPage;
