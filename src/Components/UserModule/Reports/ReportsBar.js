import React from 'react'
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';
import {SPRINT_CYCLE,STORY_POINTS} from '../../Common/Headers'
// import 'chartjs-plugin-datalabels';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
function ReportsBar(props) {

    return <div className="mt-2 ml-2 mr-3">
        <h6>{props.name}</h6>
        {props.placeholder === "" ? null : <div style={{width:300}}><Select
         
            placeholder={props.placeholder}
            onChange={(selectedOption) =>
                props.onSelect(selectedOption.value)
            }
            options={props.list}
        /></div>}<Bar
            data={props.data}
            width={"100%"}
            height={"300"}
            options={
                {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        datalabels: {
                            display: true,
                            color: 'rgba(30, 130, 255, 4)'
                        }
                    },
                    legend: {
                        display: true
                    },
                    type: "bar",
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: STORY_POINTS,
                                fontStyle: 'bold'
                            },
                            ticks: {
                                beginAtZero: true,
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: SPRINT_CYCLE,
                                fontStyle: 'bold',
                            },
                            ticks: {
                                beginAtZero: true,
                                autoSkip: false,
                                // maxRotation: 0,
                                // minRotation: 0
                            }
                        }],

                    }

                }
            }
        />
    </div>
}
export default ReportsBar;