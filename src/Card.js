import React from 'react';
import PropTypes from 'prop-types';


const Card = ({ title, content, updateClickedCard }) => {
  const cardData =

    Object.keys(content).map((year, index) => {
      const toggle = content[year] <= .5 ? 'low' : 'high';
      return <aside 
        key={index} 
        className={toggle}> {year}: {content[year]} </aside>;

    });

  return (
    <div  className="Card" 
      onClick={() => updateClickedCard(title, content)}>
      <h3>{title}</h3>
      <ul>{cardData}</ul>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
  updateClickedCard: PropTypes.func
};

export default Card;