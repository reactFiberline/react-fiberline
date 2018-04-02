import React from 'react'
import {yType, XYPlot, XAxis, YAxis, HorizontalBarSeries, LineSeries, Hint} from 'react-vis';
import Highlight from './Highlight'

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px'
};
const boxStyle = {height: '10px', width: '10px'};

function buildValue(hoveredCell) {
  const {x, y} = hoveredCell;
  //const truedAngle = (angle + angle0) / 2;
  return {
    x: x,
    y: y
  };
}

export class Measures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastDrawLocation: null,
      zoom: false,
      hoveredCell: false
    }
  }
// sortMeasures(){
//   let measures = this.props.rawMeasures;
//   let lastDuration = 0;
//   let lastLongestDuration = 0;
//   for (let i = 0; i < measures; i++){

//   }
// }
   
  render(){
    const {lastDrawLocation, hoveredCell} = this.state;
    return (
      <div>
        <XYPlot
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={600}
          height={300}>
          {(this.state.zoom) ? 
              <Highlight onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null}
          
          
          <HorizontalBarSeries onValueRightClick={(d,e)=> {console.log('ima bar',d,e)}} onValueMouseOver={v => this.setState({hoveredCell: v})} onValueMouseOut={v => this.setState({hoveredCell: false})}
            data={this.props.updateQueues.map((queue,i)=>{
              if (queue.updateque){
                return { x0:queue.time/1000, x:queue.time/1000+.001, y:0, name:"queue update", priorityLevel: queue.updateque.first.priorityLevel}
              }
            })}/>
          <HorizontalBarSeries onValueRightClick={(d,e)=> {console.log('ima bar',d,e)}} onValueMouseOver={v => this.setState({hoveredCell: v.x && v.y ? v : false})} onValueMouseOut={v => this.setState({hoveredCell: false})}
            data={this.props.rawMeasures.map((measure,i)=>{
              return { x0:measure.startTime/1000, x:(measure.startTime + measure.duration)/1000, y:i, name:measure.name}
            })}/>

            {hoveredCell ? <Hint value={hoveredCell}>
              <div style={{background: 'lightgrey'}}>
                <h3>{this.state.hoveredCell.name}</h3>
                <p>{(this.state.hoveredCell.name === 'queue update') ? 'priorityLevel:'+this.state.hoveredCell.priorityLevel : null}</p>
              </div>
            </Hint> : null}
          <XAxis />
          <YAxis />
          
        </XYPlot>

        <button onClick={() => {
          this.setState({lastDrawLocation: null});
        }}>
          Reset Zoom
        </button>
         <button onClick={() => {
          this.setState({zoom: !this.state.zoom});
        }}>
          Zoom Tool
        </button>

        {this.props.updateQueues.map((queue) => {
          if (queue.updateque){

            return(
              <div>
              {
               'priorityLevel:'+ queue.updateque.first.priorityLevel +'time'+ queue.time
              }
              </div>
            )
          }
        })}
      </div>
    )
  }
}

// {this.props.rawMeasures.map((measure) => {
//           return(
//             <div>
//             {
//               measure.name +": startTime: "+
//               measure.startTime +" duration: "+
//               measure.duration 
//             }
//             </div>
//           )
//         })}
