import React, {Component} from 'react';

class AddWorkout extends Component {
    constructor() {
        super()

        this.state = {
            mode: 'group',
            groupTraining: null
        }

        this.setGroupMode = this.setGroupMode.bind(this)
        this.setGymMode = this.setGymMode.bind(this)
        this.handleSelectGT = this.handleSelectGT.bind(this)
    }

    setGroupMode() {
        this.setState({
            mode: 'group'
        })
    }

    setGymMode() {
        this.setState({
            mode: 'gym',
            groupTraining: null
        })
    }

    handleSelectGT(e) {
        if(e.target.value !== 'Choose group training'){
            this.setState({
                groupTraining: JSON.parse(e.target.value)
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
                    <button type="button" onClick={this.setGroupMode} className={'btn btn-primary' + (this.state.mode === 'group' ? 'active disabled': '')}>Group Training</button>
                    <button type="button" onClick={this.setGymMode} className={'btn btn-primary' + (this.state.mode === 'gym' ? 'active disabled': '')}>Gym session</button>
                </div>

                {   // the choose group training page
                    this.state.mode === 'group' &&
                    <div>
                        <h5>Choose group training</h5>
                        <select defaultValue="Group Training" onChange={this.handleSelectGT}>
                            <option value={null}>Choose group training</option>
                            {groupTrainings.map(gt =>
                                <option key={gt.id} value={JSON.stringify(gt)}>{gt.name}</option>
                            )}
                        </select>
                        <br />
                        {this.state.groupTraining !== null &&
                        <div style={{marginTop: '30px'}}>
                            <p>
                                You will add <b>{this.state.groupTraining.name}</b> to your training diary.
                                <br /><b>Duration:</b> {this.state.groupTraining.duration}
                                <br /><b>Total calorie burn:</b> {this.state.groupTraining.duration * this.state.groupTraining.calories_per_minute} calories.
                            </p>
                            <button className="btn btn-primary">Add workout</button>
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

const groupTrainings = [
    {
        id: 5,
        name: "Kick step",
        duration: 60,
        calories_per_minute: 30
    },
    {
        id: 6,
        name: "Absolution",
        duration: 30,
        calories_per_minute: 23
    },
]

export default AddWorkout;
