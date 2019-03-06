import React, {Component} from 'react';
import './Diary.css'

class Diary extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container" id="diaryContainer">
                <h3>Training Diary</h3>

                <div id="accordion">
                {userWorkouts.map((workout) =>
                    <div className="card">
                        <div className="card-header" id={'heading' + workout.id}>
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target={'#collapse' + workout.id} aria-expanded="false" aria-controls={'collapse' + workout.id}>
                                    {workout.type} on {workout.date}
                                </button>
                            </h5>
                        </div>

                        <div id={'collapse' + workout.id} className="collapse" aria-labelledby={'heading' + workout.id} data-parent="#accordion">
                            <div className="card-body">
                                Hämta info om träningen och skriv ut här.
                            </div>
                        </div>
                    </div>
                )}
                </div>

            </div>
        );
    }
}

const userWorkouts = [
    {
        id: 1,
        type: 'Group Training',
        date: '2019-05-05',
        likes: 5
    },
    {
        id: 2,
        type: 'Gym Session',
        date: '2019-03-04',
        likes: 2
    }
]


export default Diary;
