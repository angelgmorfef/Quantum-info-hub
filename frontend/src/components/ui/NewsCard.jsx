import PropTypes from 'prop-types';
import styles from './NewsCard.module.css';

const NewsCard = ({ title, description, link, image_url, source_id, pubDate }) => {
  return (
    <article className={styles.card}>
      {image_url && (
        <div className={styles.imageContainer}>
          <img src={image_url} alt={title} className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>
          <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
        </h2>
        <p className={styles.description}>{description || 'Sin descripción disponible.'}</p>
        <div className={styles.meta}>
          <span className={styles.source}>{source_id || 'Fuente Desconocida'}</span>
          <span className={styles.date}>
            {pubDate ? new Date(pubDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'Fecha desconocida'}
          </span>
        </div>
      </div>
    </article>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  source_id: PropTypes.string,
  pubDate: PropTypes.string,
};

export default NewsCard;
