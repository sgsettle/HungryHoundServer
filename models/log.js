module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        restaurantName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foodType: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Log;
}