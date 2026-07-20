import { useState } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio.';
    if (!form.email.trim()) e.email = 'El correo es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido.';
    if (!form.message.trim()) e.message = 'El mensaje es obligatorio.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    // In production, send to a backend /api/contact endpoint
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <span className={styles.successIcon}>✅</span>
          <h2>¡Mensaje enviado!</h2>
          <p>Gracias por contactarte. Te responderé a la brevedad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.tag}>// Contacto</span>
        <h1 className={styles.title}>Hablemos</h1>
        <p className={styles.subtitle}>
          ¿Tienes preguntas sobre computación cuántica o quieres colaborar? 
          Envíame un mensaje.
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="Tu nombre completo"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="subject">Asunto <span className={styles.optional}>(opcional)</span></label>
          <input
            id="subject"
            name="subject"
            type="text"
            className={styles.input}
            placeholder="¿Sobre qué quieres hablar?"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            placeholder="Escribe tu mensaje aquí..."
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Enviar Mensaje →
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
