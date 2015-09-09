'use strict';

module.exports = function(sequelize, DataTypes){
    var Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return Post;
}