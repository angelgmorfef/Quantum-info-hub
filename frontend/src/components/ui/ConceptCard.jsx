import PropTypes from 'prop-types';
import styles from './ConceptCard.module.css';

/**
 * ConceptCard — Reutilizable card for each quantum concept article.
 * Receives all data via props from the API response.
 *
 * @param {Object} props
 * @param {string} props.id - Article slug ID (used as anchor).
 * @param {string} props.title - Article heading.
 * @param {string} props.content - HTML content string from the API.
 * @param {Object|null} props.image - Image data { src, alt, caption }.
 * @param {Object|null} props.video - Video data { src, title }.
 */
const ConceptCard = ({ id, title, content, image, video }) => {
  return (
    <article id={id} className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      {/* Article content — rendered as HTML from the API */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Optional image figure */}
      {image && (
        <figure className={styles.figure}>
          <img
            src={image.src}
            alt={image.alt}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
          {image.caption && (
            <figcaption className={styles.caption}>{image.caption}</figcaption>
          )}
        </figure>
      )}

      {/* Optional embedded video */}
      {video && (
        <div className={styles.videoWrapper}>
          <iframe
            src={video.src}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className={styles.iframe}
          />
        </div>
      )}
    </article>
  );
};

ConceptCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    caption: PropTypes.string,
  }),
  video: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
  }),
};

ConceptCard.defaultProps = {
  image: null,
  video: null,
};

export default ConceptCard;
