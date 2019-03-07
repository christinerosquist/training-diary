import React, {Component} from 'react';
import './Diary.css'

class Diary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            workouts: null,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch('/api/profile/' + this.props.user_id)
            .then(res => res.json())
            .then(data => {
                this.setState({workouts: data.workouts, ready: true})
            })
            .catch(error => console.log(error))
    }

    handleClick(workout_id, workout_type, group_training_id) {

        if(this.state[workout_id] === undefined) {
            console.log("I don't have any saved data, so lets get some!")

            if (workout_type === 'Session') {

                fetch('/api/getsessions/' + workout_id)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({[workout_id]: data.sessions})
                    })
                    .catch(error => console.log(error))

            } else if (workout_type === 'Group Training') {

                fetch('/api/getgrouptraining/' + group_training_id)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({[workout_id]: data.group_training})
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    render() {

        return (
            <div className="container" id="diaryContainer">
                <h3>Training Diary</h3>

                {this.state.ready &&
                <div id="accordion">
                    {this.state.workouts.map((workout) =>
                        <div className="card" key={workout.id}>
                            <div className="card-header" id={'heading' + workout.id}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link" onClick={() => this.handleClick(workout.id, workout.type, workout.group_training_id)}
                                            data-toggle="collapse" data-target={'#collapse' + workout.id}
                                            aria-expanded="false" aria-controls={'collapse' + workout.id}>
                                        {workout.type} on {workout.date}
                                    </button>
                                </h5>
                            </div>

                            <div id={'collapse' + workout.id} className="collapse"
                                 aria-labelledby={'heading' + workout.id} data-parent="#accordion">
                                <div className="card-body">
                                    {workout.type === 'Session' && this.state[workout.id] !== undefined &&
                                        JSON.stringify(this.state[workout.id])
                                    }

                                    {workout.type === 'Group Training' && this.state[workout.id] !== undefined &&
                                    <div>
                                        <b>Date:</b> {workout.date}, <b>Likes:</b> {workout.likes}
                                        <br /><br />

                                        <b>Name:</b> {this.state[workout.id].name}
                                        <br />
                                        <b>Duration:</b> {this.state[workout.id].duration} minutes
                                        <br />
                                        <b>Total calories burned</b> {this.state[workout.id].calories_per_minute * this.state[workout.id].duration} calories

                                    </div>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                }

            </div>
        );
    }
}

export default Diary;
