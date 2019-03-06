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
            hash: {
                type: Sequelize.STRING
            },
            salt: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            // hash: Sequelize.STRING,
            // salt: Sequelize.STRING,
        }, {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            instanceMethods: {
                generateHash(password) {
                    // creating a unique salt for the particular user
                    this.salt = crypto.randomBytes(16).toString('hex');

                    // hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
                    this.hash = crypto.pbkdf2Sync(password, this.salt,
                        1000, 64, `sha512`).toString(`hex`);
                },

                // Method to check entered password is correct or not
                // validPassword method checks whether the user
                validPassword(password) {
                    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
                    return this.hash === hash;
                }
            }
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
        current_weight: {
            type: Sequelize.INTEGER
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
        group_training_id: {
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
        timestamps: false,
        underscored: true,
        freezeTableName: true
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

    const SessionWorkout = sequelize.define('session_workout', {
        name: Sequelize.STRING
    },
    {
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

    const MuscleMassProgress = sequelize.define('muscle_mass_progress', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
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

    });

    const WeightProgress = sequelize.define('weight_progress', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        date: {
            type: Sequelize.DATE
        },
        kg: {
            type: Sequelize.INTEGER,
        },
    });

    /**
     User.hasOne(UserInfo) or User.belongsTo(UserInfo) --> User = source, userInfo = target
     BelongsTo will add the foreignKey on the source where hasOne will add on the target
     **/
    User.hasOne(UserInfo, {foreignKey: 'user_id'}, {as: 'Info'}) // should be able to use user.getInfo()
    User.hasOne(MuscleMassProgress, {foreignKey: 'user_id'}, {as: 'MMP'}) // user.getMMP()
    User.hasOne(WeightProgress, {foreignKey: 'user_id'}, {as: 'WP'}) // user.getWP()

    Exercise.hasMany(Session, {foreignKey: 'exercise_id', sourceKey: 'id'}) // enables exercise.getSessions()
    Session.belongsTo(Exercise, {foreignKey: 'exercise_id', targetKey: 'id'}) // enables session.getExercise()

    GroupTraining.hasMany(Workout, {foreignKey: 'group_training_id', sourceKey: 'id'}) // groupTraining.getWorkouts()
    Workout.belongsTo(GroupTraining, {foreignKey: 'group_training_id', targetKey: 'id'}) // not sure if workout.getGroupTraining() works

    User.hasMany(Workout, {foreignKey: 'user_id', sourceKey: 'id'}) // user.getWorkouts()
    Workout.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'})

    /** belongsToMany: http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations
     Creates model SessionWorkout with foreign keys sessionId and workoutId
     Adds methods getSessions, setSessions, addSession, addSessions to Workout,
     and getWorkouts, setWorkouts, addWorkout, and addWorkouts to Session.
     Same for user and workout.
     **/
    Session.belongsToMany(Workout, {through: SessionWorkout})
    Workout.belongsToMany(Session, {through: SessionWorkout})
    // //
    // User.belongsToMany(Workout, {through: PersonalWorkout})
    // Workout.belongsToMany(User, {through: PersonalWorkout})

    return {
        User, UserInfo, Session, Workout, Exercise, GroupTraining, MuscleMassProgress, WeightProgress, sequelize
    }

}
