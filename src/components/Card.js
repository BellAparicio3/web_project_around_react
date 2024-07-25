function Card({ card, onCardClick }) {
  return (
    <>
      <div className='card' onClick={() => onCardClick(card)}>
        <img
          className='card__img'
          //alt={card.name}
          style={{ backgroundImage: `url(${card.link})` }}
        />
        <div className='card__info'>
          <img
            className='card__trash'
            src={require('../images/trash.png')}
            alt='Bote de basura'
          />
          <p className='card__name'>{card.name}</p>
          <img
            className='card__like'
            src={require('../images/heart.png')}
            alt='Icono Me gusta'
          />
          <span className='card__like_count'>{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}
export default Card;
