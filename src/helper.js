import kinderData from './data/kindergartners_in_full_day_program.js';

const numberCleaner = (number) => {
  if (number === 'N/A' || isNaN(number)) {
    return 0;
  } else {
    return Number(parseFloat(number).toFixed(3));
  }
};

export default class DistrictRepository {
  constructor() {
    this.stats = kinderData.reduce((stats, stat) => {
      const statObj = { 
        [stat.TimeFrame] : numberCleaner(stat.Data) };
      if (!stats[stat.Location]) {
        stats[stat.Location] = statObj;
      }
      stats[stat.Location] = { ...statObj, ...stats[stat.Location]};
      return stats;
    }, {});
  }

  findByName = (search) => {
    let districtResults = {};
    if (!search) {
      return;
    }
    const statsKeys = Object.keys(this.stats);
    statsKeys.reduce((districtData, stat) => {
      if (stat.toUpperCase().includes(search.toUpperCase())) {
        districtData = {
          [stat]: this.stats[stat]
        };
        Object.assign(districtResults, districtData);
      } 
      return districtData;
    }, {});
    if 
    (Object.keys(districtResults).length === 0) {
      return;
    }
    return districtResults;
  }

  findAverage = (district) => {
    let statsVals;
    const distResults = this.findByName(district.toUpperCase());
    if (distResults[district.toUpperCase()]) {
      statsVals = Object.values(distResults[district.toUpperCase()]); 
    } else {
      statsVals = Object.values(distResults[district]);
    }
    const totalVal = statsVals.reduce((sum, num) => {
      return sum += num;
    }, 0);
    return numberCleaner(totalVal/statsVals.length);
  }

  compareDistrictAverages = (district1, district2) => {
    const dist1Ave = this.findAverage(district1);
    const dist2Ave = this.findAverage(district2);
    const result = {
      [district1.toUpperCase()]: dist1Ave,
      [district2.toUpperCase()]: dist2Ave,
      compared: numberCleaner(dist1Ave / dist2Ave)
    };
    return result;
  }

  findAllMatches = (search) => {
    if (!search){
      return [...Object.values(this.stats)];
    }
    return Object.keys(this.stats).filter(stat => {
      return stat.toUpperCase().includes(search.toUpperCase()); 
    });
  }
}
