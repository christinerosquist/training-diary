import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class Progress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            muscledata: null,
            weightdata: null,
            userId: this.props.userId
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("HERE")
        this.setState({ready: false, userId: nextProps.userId})
        console.log(nextProps.userId)
        this.updateData(nextProps.userId, false)
    }

    updateData(id, bool) {
        console.log("updatedata")
        if(bool === false) {
            console.log("inside if!")
            mlabels.length = 0
            mdatasets[0].data.length = 0
            wlabels.length = 0
            wdatasets[0].data.length = 0
            fetch('/api/getprogress/' + id)
                .then(res => res.json())
                .then(data => {
                    data.muscledata.forEach(muscledata => {
                        mlabels.push(muscledata.date)
                        mdatasets[0].data.push(muscledata.percentage)
                    })

                    data.weightdata.forEach(weightdata => {
                        wlabels.push(weightdata.date)
                        wdatasets[0].data.push(weightdata.kg)
                    })

                    this.setState({
                        ready: true,
                        muscledata: {labels: mlabels, datasets: mdatasets},
                        weightdata: {labels: wlabels, datasets: wdatasets}
                    })
                })
                .catch(error => console.log(error))
        }
    }

    render() {

        return (
            <div className="row no-gutters">
                <div className="col-sm-6 col-xs-6">
                    {this.state.ready && <Line data={this.state.weightdata} />}
                </div>
                <div className="col-sm-6 col-xs-6">
                    {this.state.ready && <Line data={this.state.muscledata} />}
                </div>
            </div>
        );
    }
}

var wlabels = [];
var wdatasets = [{
    label: 'Weight',
    data: [],
    fill: false,
    borderColor: 'green'
}];

var mlabels = [];
var mdatasets = [{
    label: 'Muscle',
    data: [],
    fill: false,
    borderColor: 'blue'
}];


export default Progress;
