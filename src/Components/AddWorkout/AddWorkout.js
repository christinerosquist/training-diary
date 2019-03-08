import React, {Component} from 'react';

function WorkoutInfo(props) {
    const name = props.name
    const duration = props.duration
    const calories = props.calories
    const added = props.added
    let addMessage = 'You will add '

    if(added) {
        addMessage = 'You have added '
    }
    const info =
        <p>
            {addMessage} <b>{name}</b> to your training diary.
            <br /><b>Duration:</b> {duration}
            <br /><b>Total calorie burn:</b> {duration * calories} calories.
        </p>
    return info
}

class AddWorkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mode: 'group',
            groupTraining: null,
            groupTrainingList: [],
            added: false
        }

        this.handleAddWorkout = this.handleAddWorkout.bind(this)
        this.setGroupMode = this.setGroupMode.bind(this)
        this.setGymMode = this.setGymMode.bind(this)
        this.handleSelectGT = this.handleSelectGT.bind(this)
    }

    addWorkoutDB = async (userID, gtID) => {
        const response = await fetch('/api/addworkout/1/' + gtID)
        console.log(response)
    }

    componentDidMount() {
        fetch('/api/getgrouptrainings')
            .then(res => res.json())
            .then(data => {
                console.log(data.group_trainings)
                this.setState({groupTrainingList: data.group_trainings})
            })
            .catch(error => console.log(error))
    }

    setGroupMode() {
        this.setState({
            mode: 'group',
            added: false
        })
    }

    setGymMode() {
        this.setState({
            mode: 'gym',
            groupTraining: null,
            added: false
        })
    }

    handleAddWorkout() {
        console.log(this.state.groupTraining)
        this.setState({
            added: true
        })
        console.log(this.state.added)
        if(this.state.groupTraining !== null) {
            this.addWorkoutDB("1", this.state.groupTraining.id)
        }
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

    render() {

        return (
            <div className="container centered">
                <div className="btn-group" style={{marginBottom: '30px'}}>
                    <button type="button" onClick={this.setGroupMode} className={'btn btn-primary ' + (this.state.mode === 'group' ? 'active disabled': '')}>Group Training</button>
                    <button type="button" onClick={this.setGymMode} className={'btn btn-primary ' + (this.state.mode === 'gym' ? 'active disabled': '')}>Gym session</button>
                </div>

                {   // the choose group training page
                    this.state.mode === 'group' &&
                    <div>
                        <h5>Choose group training</h5>
                        <select defaultValue="Group Training" onChange={this.handleSelectGT}>
                            <option value={null}>Choose group training</option>
                            {this.state.groupTrainingList.map(gt =>
                                <option key={gt.id} value={JSON.stringify(gt)}>{gt.name}</option>
                            )}
                        </select>
                        <br />
                        {this.state.groupTraining !== null &&
                        <div style={{marginTop: '30px'}}>
                            <WorkoutInfo name={this.state.groupTraining.name} duration={this.state.groupTraining.duration}
                                calories={this.state.groupTraining.calories_per_minute} added={this.state.added}/>
                            <button className="btn btn-primary" onClick={this.handleAddWorkout}>Add workout</button>
                        </div>
                        }
                    </div>
                }

                {
                    this.state.mode === 'gym' &&
                    <div>
                        <h5>Add your Gym Session</h5>
                        Gym page
                    </div>
                }

            </div>
        );
    }
}

export default AddWorkout;
