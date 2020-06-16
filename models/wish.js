module.exports = (sequelize, DataTypes) => {
    const Wish = sequelize.define('wish', {
        // change rname, add, ftype, into foreign key with log model
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
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // turn into foreign key relationship w/ user model
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
    return Wish;
}