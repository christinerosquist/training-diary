const Sequelize = require('sequelize');
const sequelize = new Sequelize('rosquis', 'rosquisadmin', 'upa6fooBie', {
    //host: 'mysql-vt2019.csc.kth.se',
    host: '2001:6b0:1:1300:250:56ff:fe01:25a',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,

    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = () => {

    // Setting up connection between db and sequelize
    // vi kan ha UUID istället på alla ID
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        email: {
            type: Sequelize.STRING,
            unique: {args: true, msg: "Email must be unique"}
        },
        hash: {
            type: Sequelize.TEXT('long'),
        },
        salt: {
            type: Sequelize.STRING,
        }}, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });


    const UserInfo = sequelize.define('user_info', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        user_id: {
            type: Sequelize.INTEGER
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
        image: {
            type: Sequelize.STRING
        },
        deletehash: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    const Workout = sequelize.define('workout', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        type: {
            type: Sequelize.STRING
        },
        group_training_id : {
          type: Sequelize.UUID
        },
        date: {
            type: Sequelize.DATE
        },
        likes: {
            type: Sequelize.INTEGER
        }
    }, {
        underscored: true,
        freezeTableName: true
    });

    const GroupTraining = sequelize.define('group_training', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
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
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });

    const Session = sequelize.define('session', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        exercise_id: {
            type: Sequelize.INTEGER
        },
        duration: {
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
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    const Exercise = sequelize.define('exercise', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
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
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    const MuscleMassProgress = sequelize.define('muscle_mass_progress', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        user_id: {
            type: Sequelize.UUID
        },
        date: {
            type: Sequelize.DATE
        },
        percentage: {
            type: Sequelize.INTEGER,
            validate: {
                max: 100, // kanske vill ändra till rimliga max och min
                min: 0
            }
        },

    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });

    const WeightProgress = sequelize.define('weight_progress', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        user_id: {
            type: Sequelize.UUID
        },
        date: {
            type: Sequelize.DATE
        },
        kg: {
            type: Sequelize.INTEGER,
        },
    }, {
        underscored: true,
        timestamps: false,
        freezeTableName: true
    });

    /**
     User.hasOne(UserInfo) or User.belongsTo(UserInfo) --> User = source, userInfo = target
     BelongsTo will add the foreignKey on the source where hasOne will add on the target
     **/
    User.hasOne(UserInfo, {foreignKey: 'user_id'}, {as: 'Info'}) // should be able to use user.getInfo()

    User.hasMany(MuscleMassProgress, {foreignKey: 'user_id', sourceKey: 'id', as: 'MMPs'}) // user.getMMPs()
    MuscleMassProgress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

    User.hasMany(WeightProgress, {foreignKey: 'user_id', sourceKey: 'id', as: 'WPs'}) // user.getWPs()
    WeightProgress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

    Exercise.hasMany(Session, {foreignKey: 'exercise_id', sourceKey: 'id'}) // enables exercise.getSessions()
    Session.belongsTo(Exercise, {foreignKey: 'exercise_id', targetKey: 'id'}) // enables session.getExercise()

    Workout.hasMany(Session, {foreignKey: 'workout_id', sourceKey: 'id'}) // enables exercise.getSessions()
    Session.belongsTo(Workout, {foreignKey: 'workout_id', targetKey: 'id'}) // enables session.getExercise()

    GroupTraining.hasMany(Workout, {foreignKey: 'group_training_id', sourceKey: 'id'}) // groupTraining.getWorkouts()
    Workout.belongsTo(GroupTraining, {foreignKey: 'group_training_id', targetKey: 'id'}) // not sure if workout.getGroupTraining() works

    User.hasMany(Workout, {foreignKey: 'user_id', sourceKey: 'id', as: 'SeqWorkouts'}) // user.getSeqWorkouts()
    Workout.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})


    // Vad är detta? Nån får gärna kommentera som vet lol puss
    sequelize.sync()

    return {
        User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize
    }

}
