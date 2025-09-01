function Card({ icon, iconContainer, title, description, cardStyle }) {
  return (
    <article data-aos="fade-up" className={cardStyle}>
      <div className={iconContainer}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default Card;
