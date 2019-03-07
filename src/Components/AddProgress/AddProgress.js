import React, {Component} from 'react';
import './AddProgress.css'
import Calendar from "react-calendar";
import moment from "moment";

class AddProgress extends Component {
    constructor() {
        super()

        this.state = {
            mode: 'weight',
            date: new Date(),
            inputkg: ''
        }

        this.setWeightMode = this.setWeightMode.bind(this)
        this.setMuscleMode = this.setMuscleMode.bind(this)
    }

    setWeightMode() {
        this.setState({
            mode: 'weight'
        })
    }

    setMuscleMode() {
        this.setState({
            mode: 'muscle'
        })
    }

    onDateChange = (date) => {
        this.setState({date: date})
    }

    updateInputValue = (e) => {
        this.setState({inputkg: e.target.value})
    }

    handleAddProgress = () => {
        const weight = this.state.inputkg
        const date = moment(this.state.date).format("YYYY-MM-DD")


    }

    render() {
        return (
            <div className="conteiner centered">
                <div className="btn-group" style={{marginBottom: '30px'}}>
                    <button type="button" onClick={this.setWeightMode} className={'btn btn-primary ' + (this.state.mode === 'weight' ? 'active disabled': '')}>Log weight</button>
                    <button type="button" onClick={this.setMuscleMode} className={'btn btn-primary ' + (this.state.mode === 'muscle' ? 'active disabled': '')}>Log muscle</button>
                </div>

                {
                    this.state.mode === 'weight' &&
                    <div>
                        <form id="inputweight">
                            <div className="form-group">
                                <b>Enter weight:</b>
                                <input autoComplete="off" type="text" onChange={this.updateInputValue} className="form-control" id="formGroupExampleInput" placeholder="Enter weight in kg"/>
                            </div>
                        </form>

                        <div id="calendarContainer">
                            <b>Enter date:</b>
                            <Calendar
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                        </div>

                        <button className={'btn btn-primary ' + (this.state.inputkg === '' ? 'disabled' : '')}>Submit</button>
                    </div>
                }

            </div>
        );
    }
}

export default AddProgress;
