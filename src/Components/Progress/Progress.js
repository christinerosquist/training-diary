import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class Progress extends Component {

    componentDidMount() {
        wlabels = []
        mlabels = []
        wdatasets[0].data = []
        mdatasets[0].data = []

        mockWeightProgress.forEach((weight) => {
            wlabels.push(weight.date)
            wdatasets[0].data.push(weight.weight)
        })

        mockMuscleProgress.forEach((muscle) => {
            mlabels.push(muscle.date)
            mdatasets[0].data.push(muscle.percent)
        })
    }

    render() {
        const muscleData = {
            labels: mlabels,
            datasets: mdatasets
        }

        const weightData = {
            labels: wlabels,
            datasets: wdatasets
        }

        return (
            <div className="row no-gutters">
                <div className="col-sm-6 col-xs-6">
                    <Line data={weightData} />
                </div>
                <div className="col-sm-6 col-xs-6">
                    <Line data={muscleData} />
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

const mockWeightProgress = [
    {
        date: '2018-01-20',
        weight: 60
    },
    {
        date: '2018-01-25',
        weight: 59
    },
    {
        date: '2018-03-30',
        weight: 55
    },
]

const mockMuscleProgress = [
    {
        date: '2018-01-20',
        percent: 10
    },
    {
        date: '2018-01-25',
        percent: 13
    },
    {
        date: '2018-03-30',
        percent: 15
    },
]


export default Progress;
