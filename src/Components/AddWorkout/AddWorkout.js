import React, {Component} from 'react';
import Calendar from "react-calendar";
import './AddWorkout.css'
import moment from "moment";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function WorkoutInfo(props) {
    const name = props.name
    const duration = props.duration
    const calories = props.calories
    const date = props.date
    const added = props.added
    const sessions = props.sessions

    let dateMessage = null
    let addMessage = 'You will add '

    if(added) {
        addMessage = 'You have added '
        dateMessage = <span> <b>Date:</b> {moment(date).format("YYYY-MM-DD")} </span>
    }
    let info = ''
    if(name) {
        info =
            <p>
                {addMessage} <b>{name}</b> to your training diary.
                <br /><b>Duration:</b> {duration}
                <br /><b>Total calorie burn:</b> {duration * calories} calories.
                <br />{dateMessage}
            </p>
    } else {
        let listItems = sessions.map((sess, index) =>
            <li key={index}>{sess.name}, {sess.cardio ? sess.duration + ' minutes' : sess.weight + ' kilo, ' + sess.reps + 'x' + sess.sets}</li>
        )
        info =
            <p>
                {addMessage}the following to your training diary: {listItems}
                <br />{dateMessage}
            </p>
    }
    return info
}

class AddWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...this.getStartStates(),
            mode: 'group',
            exerciseList: [],
            groupTrainingList: [],
            currentUser: null
        }

        this.onDateChange = this.onDateChange.bind(this)
        this.handleChangeSession = this.handleChangeSession.bind(this)
        this.handleAddWorkout = this.handleAddWorkout.bind(this)
        this.handleNewWorkout = this.handleNewWorkout.bind(this)
        this.handleAddSession = this.handleAddSession.bind(this)
        this.setGroupMode = this.setGroupMode.bind(this)
        this.setGymMode = this.setGymMode.bind(this)
        this.handleSelectGT = this.handleSelectGT.bind(this)
        this.handleSelectExercise = this.handleSelectExercise.bind(this)
    }

    componentDidMount() {
        fetch('/api/getgrouptrainings')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    groupTrainingList: data.group_trainings,
                    exerciseList: data.exercises
                })
            })
            .catch(error => console.log(error))

        fetch('/api/getCurrentUser')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    currentUser: data.user
                })
            })
    }

    getStartStates() {
        return {
            groupTraining: null,
            exercise: null,
            isCardio: false,
            session: {
                exerciseId: '',
                name: '',
                cardio: false,
                weight: 10,
                sets: 5,
                reps: 5,
                duration: 30
            },
            sessions: [],
            date: new Date(),
            added: false,
        }
    }

    setGroupMode() {
        if(this.state.added) {
            this.setState(this.getStartStates())
        }
        this.setState({
            mode: 'group',
            added: false
        })
    }

    onDateChange(date) {
        this.setState({date: date})
    }

    setGymMode() {
        if(this.state.added) {
            this.setState({
                ...this.getStartStates(),
                mode: 'gym'
            })
        } else {
            this.setState({
                mode: 'gym',
                groupTraining: null,
                exercise: null,
                added: false
            })
        }
    }

    handleChangeSession(e) {
        let changed = e.target
        switch(changed.name) {
            case 'duration':
                this.setState({
                    session: {
                        ...this.state.session,
                        duration: changed.value
                }
                })
                break;
            case 'weight':
                this.setState({
                    session: {
                        ...this.state.session,
                        weight: changed.value
                    }
                })
                break;
            case 'sets':
                this.setState({
                    session: {
                        ...this.state.session,
                        sets: changed.value
                    }
                })
                break;
            case 'reps':
                this.setState({
                    session: {
                        ...this.state.session,
                        reps: changed.value
                    }
                })
                break;
            default:
        }
    }

    handleAddWorkout(e) {
        e.preventDefault()
        this.setState({
            added: true
        })

        // send to socket so that the added workout is displayed immediately
        socket.emit('addWorkout', {
            userId: this.state.currentUser.id,
            sessions: this.state.sessions,
            group_training: this.state.groupTraining,
            date: moment(this.state.date).format("YYYY-MM-DD")
        })
    }

    handleNewWorkout(e) {
        e.preventDefault()
        this.setState(this.getStartStates())
    }

    handleAddSession(e) {
        e.preventDefault()
        this.setState({
            added: false
        })
        let newSession = this.state.session
        this.setState(prevState => ({
            sessions: [...prevState.sessions, newSession]
        }))
    }

    handleSelectGT(e) {
        this.setState({
            added: false
        })
        if(e.target.value !== 'Choose group training'){
            this.setState({
                groupTraining: JSON.parse(e.target.value),
            })
        } else {
            this.setState({
                groupTraining: null
            })
        }
    }

    handleSelectExercise(e) {
        let selected = e.target.value
        let cardio = false
        this.setState({
            added: false
        })
        if(this.state.added) {
            let exercise = null
            if(selected !== 'Choose exercise') {
                exercise = JSON.parse(selected)
            }
            this.setState({
                ...this.getStartStates(),
                exercise: exercise
            })
        }
        if(selected !== 'Choose exercise'){
            selected = JSON.parse(selected)
            if(selected.define_calories_upon === 'minutes') {
                cardio = true
            }
            this.setState({
                session: {
                    ...this.state.session,
                    cardio: cardio,
                    exerciseId: selected.id,
                    name: selected.name
                },
                exercise: selected,
                isCardio: cardio
            })
        } else {
            this.setState({
                exercise: null
            })
        }
    }

    render() {
        let { mode, groupTraining, groupTrainingList, exercise, session, sessions, isCardio, exerciseList, date, added } = this.state
        return (
            <div className="container centered">
                <div className="btn-group" style={{marginBottom: '30px'}}>
                    <button type="button" onClick={this.setGroupMode} className={'btn btn-primary ' + (mode === 'group' ? 'active disabled': '')}>Group Training</button>
                    <button type="button" onClick={this.setGymMode} className={'btn btn-primary ' + (mode === 'gym' ? 'active disabled': '')}>Gym session</button>
                </div>

                {   // the choose group training page
                    this.state.mode === 'group' &&
                    <div>
                        <h5>Choose group training</h5>
                        <select defaultValue="Group Training" onChange={this.handleSelectGT}>
                            <option value={null}>Choose group training</option>
                            {groupTrainingList.map(gt =>
                                <option key={gt.id} value={JSON.stringify(gt)}>{gt.name}</option>
                            )}
                        </select>
                        <br />
                        {groupTraining !== null &&
                        <div style={{marginTop: '30px'}}>
                            <WorkoutInfo id="gtInfo" name={groupTraining.name} duration={groupTraining.duration}
                                calories={groupTraining.calories_per_minute} date={date} added={added}/>

                                {added ?
                                    null
                                    :
                                    <div>
                                        <div id="gtCalendar" className="calendarContainer">
                                            <b>Enter date:</b>
                                            <Calendar
                                                onChange={this.onDateChange}
                                                value={date}
                                            />
                                        </div>
                                        <button className="btn btn-primary" onClick={this.handleAddWorkout}>Add workout</button>
                                    </div>
                                }
                        </div>
                        }
                    </div>
                }
                <div className='container'>
                {
                    this.state.mode === 'gym' &&
                        <div>
                        <h5>Add your Gym Session</h5>
                        <div>
                        <select onChange={this.handleSelectExercise}>
                            <option value={null}>Choose exercise</option>
                            {exerciseList.map(exercise =>
                                <option key={exercise.id} value={JSON.stringify(exercise)}>{exercise.name}</option>
                            )}
                        </select>
                        </div>

                        { exercise !== null &&
                        <div>
                        { !added &&
                            <form onSubmit={this.handleAddSession} onChange={this.handleChangeSession} >
                                <div id='forms'>
                                    { isCardio ?
                                        <div>
                                            <label>Duration</label>
                                            <input type="number" name="duration" id='duration' value={session.duration} />
                                        </div> :
                                        <div>
                                            <label>Weight</label>
                                            <input type="number" name="weight" id="weight" value={session.weight}/>
                                            <label>Sets</label>
                                            <input type="number" name="sets" id="sets" value={session.sets}/>
                                            <label>Reps</label>
                                            <input type="number" name="reps" id="reps" value={session.reps}/>

                                        </div>
                                    }
                                    <button id="addSessBtn" name='weight' onClick={this.handleAddSession}>Add session to workout</button>
                                </div>
                                </form>
                            }
                                <div id="sessInfo">
                                    <WorkoutInfo sessions={sessions} date={date} added={added}/>
                                </div>
                                { added ?
                                    null :
                                    <div>
                                    <div id="sessCalendar" className="calendarContainer">
                                        <b>Enter date:</b>
                                        <Calendar
                                            onChange={this.onDateChange}
                                            value={date}
                                        />
                                    </div>
                                    <button id="addWorkoutBtn" onClick={this.handleAddWorkout}>Add workout</button>
                                    </div>
                                }
                        </div>
                    }
                    </div>
                }
                </div>
                </div>
        );
    }
}

export default AddWorkout;
