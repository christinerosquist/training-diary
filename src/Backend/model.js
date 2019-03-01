/* jslint node: true */
"use strict";

const Sequelize = require('sequelize');
const sequelize = new Sequelize('rosquis', 'rosquisadmin', 'upa6fooBie', {
    host: 'mysql-vt2019.csc.kth.se',
    //host: '2001:6b0:1:1300:250:56ff:fe01:25a',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

// Setting up connection between db and sequelize

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    user_info_id: {
        type: Sequelize.INTEGER
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

const UserInfo = sequelize.define('user_info', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.INTEGER
    },
    current_weight: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

UserInfo.hasOne(User, {foreignKey: 'user_info_id'});

const Session = sequelize.define('session', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    exercise_id: {
        type: Sequelize.INTEGER
    },
    workout_id: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    sets: {
        type: Sequelize.INTEGER
    },
    reps: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

// NOT DONE
const Workout = sequelize.define('workout', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
}, {
    timestamps: false
});


exports.getLatestActivities = () => {

}
