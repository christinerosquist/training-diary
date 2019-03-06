import React, {Component} from 'react';

class AddWorkout extends Component {
    constructor() {
        super()

        this.state = {
            groupTraining: true
        }

    }

    handleMode() {
        this.setState({
            groupTraining: !this.state.groupTraining
        })



    }

    render() {
        return (
            <div className="container">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary active">Group Training</button>
                    <button type="button" className="btn btn-primary">Gym session</button>
                </div>
            </div>
        );
    }
}

export default AddWorkout;
