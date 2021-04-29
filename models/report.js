'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Report.init({
    hr_uid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    change_cases: DataTypes.INTEGER,
    change_fatalities: DataTypes.INTEGER,
    change_tests: DataTypes.INTEGER,
    change_hospitalizations: DataTypes.INTEGER,
    change_criticals: DataTypes.INTEGER,
    change_recoveries: DataTypes.INTEGER,
    change_vaccinations: DataTypes.INTEGER,
    change_vaccines_distributed: DataTypes.INTEGER,
    total_cases: DataTypes.INTEGER,
    total_fatalities: DataTypes.INTEGER,
    total_tests: DataTypes.INTEGER,
    total_hospitalizations: DataTypes.INTEGER,
    total_criticals: DataTypes.INTEGER,
    total_recoveries: DataTypes.INTEGER,
    total_vaccinations: DataTypes.INTEGER,
    total_vaccines_distributed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};