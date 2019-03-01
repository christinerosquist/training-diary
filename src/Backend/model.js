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
// man skulle kunna ta bort alla foreign keys och istället skapa dem via Sequelize
// vi kan även ha UUID istället på alla ID
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    // user_info_id: {
    //     type: Sequelize.INTEGER
    // },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

// borde kanske ha user_id i UserInfo istället?
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

/**
    User.hasOne(UserInfo) or User.belongsTo(UserInfo) --> User = source, userInfo = target
    BelongsTo will add the foreignKey on the source where hasOne will add on the target
**/
User.hasOne(UserInfo, {foreignKey: 'user_id'}, {as: 'Info'}) // should be able to use user.getInfo()
User.hasOne(MuscleMassProgress, {foreignKey: 'user_id'}, {as: 'MMP'})
User.hasOne(WeightProgress, {foreignKey: 'user_id'}, {as: 'WP'})

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

const Workout = sequelize.define('workout', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    likes: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

/** belongsToMany: http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations
    Creates model SessionWorkout with foreign keys sessionId and workoutId
    Adds methods getSessions, setSessions, addSession, addSessions to Workout,
    and getWorkouts, setWorkouts, addWorkout, and addWorkouts to Session.
**/
Session.belongsToMany(Workout, {through: 'SessionWorkout'})
Workout.belongsToMany(Session, {through: 'SessionWorkout'})

const Exercise = sequelize.define('exercise', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    define_calories_upon: {
        type: Sequelize.STRING
    },
    calories: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

Exercise.hasMany(Session, {foreignKey: 'exercise_id'}) // enables exercise.getSessions()
Session.belongsTo(Exercise, {foreignKey: 'exercise_id'}) // enables session.getExercise()

const GroupTraining = sequelize.define('exercise', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.INTEGER
    },
    calories_per_minute: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});


GroupTraining.hasMany(Workout)
Workout.belongsTo(GroupTraining)

const MuscleMassProgress = sequelize.define('muscle_mass_progress', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE
    },
    percentage: {
        type: Sequelize.INTEGER
        validate: {
            max: 100, // kanske vill ändra till rimliga max och min
            min: 0
        }
    },

});

const WeightProgress = sequelize.define('weight_progress', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE
    },
    percentage: {
        type: Sequelize.INTEGER
        validate: {
            max: 100, // kanske vill ändra till rimliga max och min
            min: 0
        }
    },

});

MuscleMassProgress.belongsTo(User)

exports.getLatestActivities = () => {

}
