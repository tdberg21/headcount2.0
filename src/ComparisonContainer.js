import React from 'react';
import './ComparisonContainer.css';
import DistrictRepository from './helper.js';
import PropTypes from 'prop-types';

const districts = new DistrictRepository();

const ComparisonContainer = ( { cardsToCompare } ) => {
  if (cardsToCompare.length === 0) {
    return (<div></div>);
  }
  if (cardsToCompare.length > 0) {
    var newCards = cardsToCompare.map((location) => {
      const cardData =
        Object.keys(location).map((district, index) => { 
          var districtAvg = districts.findAverage(district);
          const dataArray = Object.keys(location[district]).map(year => {
            const toggle = location[district][year] <= .5 ? 'low' : 'high';
            return (
              <aside key={Math.floor(Math.random() * 100000)}
                className={toggle}> {year}: {location[district][year]} 
              </aside>);
          });
          return (
            <div  className="comp-card" 
              key={index}>
              <h3>{district}</h3>
              <ul>{dataArray}</ul>
              <h4>Average: {districtAvg}</h4>
            </div>);
        });
      return cardData;
    });

    if (cardsToCompare.length === 1) {
      return (<div className="comp-container"> {newCards} </div>);
    } 
    if (cardsToCompare.length === 2) {
      const displayAvgs = cardsToCompare.reduce((accu, district) => {
        const title = Object.keys(district);
        return accu.concat(title);
      }, []);
      const finalResult = districts.compareDistrictAverages(displayAvgs[0], displayAvgs[1]);
      const displayResult = Object.values(finalResult);
      const displayInfo = Object.keys(finalResult);
      return (
        <div className="comp-container">
          <div> {newCards[0]}</div>
          <div className="total-card">
            <h5>{displayInfo[0]}: {displayResult[0]}</h5>
            <h5>{displayInfo[1]}: {displayResult[1]}</h5>
            <h4>{displayInfo[2]}: {displayResult[2]}</h4>
          </div>
          <div> {newCards[1]}</div>
        </div>
      );
    
    }
  }
};

ComparisonContainer.propTypes = {
  cardsToCompare: PropTypes.array
};

export default ComparisonContainer;