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
            inputkg: '',
            percent: '',
            updated: false
        }

        this.setWeightMode = this.setWeightMode.bind(this)
        this.setMuscleMode = this.setMuscleMode.bind(this)
    }

    setWeightMode() {
        this.setState({
            mode: 'weight', inputkg: this.state.percent, percent: ''
        })
    }

    setMuscleMode() {
        this.setState({
            mode: 'muscle', percent: this.state.inputkg, inputkg: ''
        })
    }

    onDateChange = (date) => {
        this.setState({date: date})
    }

    updateInputValue = (e) => {
        if(this.state.mode === 'weight') {
            this.setState({inputkg: e.target.value})
        } else {
            this.setState({percent: e.target.value})
        }
    }

    handleAddProgress = () => {
        fetch('/api/addprogress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.state.mode === 'weight' ? this.state.inputkg : this.state.percent,
                date: moment(this.state.date).format("YYYY-MM-DD"),
                mode: this.state.mode
            })
        })
            .then(res => res.json())
            .then(data => {console.log(data)})
            .catch(error => console.log(error))

        this.setState({updated: true})
        setTimeout(function(){this.setState({updated: false})}.bind(this), 3000)
    }

    render() {
        return (
            <div className="conteiner centered">
                <div className="btn-group" style={{marginBottom: '30px'}}>
                    <button type="button" onClick={this.setWeightMode} className={'btn btn-primary ' + (this.state.mode === 'weight' ? 'active disabled': '')}>Log weight</button>
                    <button type="button" onClick={this.setMuscleMode} className={'btn btn-primary ' + (this.state.mode === 'muscle' ? 'active disabled': '')}>Log muscle</button>
                </div>

                    <div>
                        <form id="inputweight">
                            <div className="form-group">
                                <b>Enter {this.state.mode} in {this.state.mode === 'weight' ? 'kg' : 'percent'}:</b>
                                <input autoComplete="off" type="text" onChange={this.updateInputValue} className="form-control" id="formGroupExampleInput" placeholder={'Enter ' + this.state.mode}/>
                            </div>
                        </form>

                        <div id="calendarContainer">
                            <b>Enter date:</b>
                            <Calendar
                                onChange={this.onDateChange}
                                value={this.state.date}
                                maxDate={new Date()}
                            />
                        </div>

                        <button onClick={this.handleAddProgress} disabled={!(this.state.inputkg !== '' || this.state.percent !== '')} className={'btn btn-primary ' + (this.state.inputkg !== '' || this.state.percent !== '' ? '' : 'disabled')}>Submit</button>
                        {this.state.updated && <div><br /><p>Your progress was updated!</p></div>}
                    </div>

            </div>
        );
    }
}

export default AddProgress;
