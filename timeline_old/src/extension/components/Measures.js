import React from 'react'
import {yType, XYPlot, XAxis, YAxis, LineSeries, Hint, LabelSeries, HorizontalBarSeries} from 'react-vis';
import Highlight from './Highlight'
import formatTimelineData from './formatTimelineData'
import formatFiberlineData from './formatFiberlineData'
import {Decimal} from 'decimal.js';

var buttonContainerStyle = {
  paddingLeft: "400px",
  background: "#19004c",
   padding:"10px 0 10px 400px",
  width: "600px"
};


export class Measures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastDrawLocation: null,
      zoom: false,
      renderCell: false,
      unitOfWork: false,
      timelineMeasures: false,
      fiberlineMeasures: false,
      color: false,
      hint: false,
      button_color_yellow: true,
      hoveredBar: false,
      lastColor: false
    }
  }

  componentDidMount(){
   this.buildTimelineData();
   this.buildFiberlineData();
  }

  componentWillReceiveProps(){
    this.buildTimelineData();
    this.buildFiberlineData();
    console.log(this.props.workLoopMeasures)
  }

  buildTimelineData = () => {
    this.setState({
      timelineMeasures: formatTimelineData(this.props.rawMeasures)
    })
  }

  buildFiberlineData = () => {
    this.setState({
      fiberlineMeasures: formatFiberlineData(this.props.workLoopMeasures)
    })
  }

  changeButtonColor = () => {
    this.setState({button_color_yellow: !this.state.button_color_yellow})
  }

  clearHovered = (measures) => {
    let temp = this.state[measures].slice()
    //console.log('clear please',temp,'index: color ', temp[this.state.hoveredBar].color)
    temp[this.state.hoveredBar].color = this.state.lastColor;
    this.setState({
      [measures]: temp
    })
  }

  changeBarColor = (v, measures) => {
    
      let index = false;
      let savedColor = false;
      this.setState({
        [measures]: this.state[measures].map((el,i) => {
          if (el.x === v.x && el.y === v.y){
            savedColor = el.color;
            el.color = 1;
            index = i;
          }
          return el;
        }),
        hoveredBar: index,
        lastColor: savedColor
      })
    
  }
   
  render(){
    const {lastDrawLocation, renderCell, unitOfWork} = this.state;
    let buttonColor = this.state.button_color_yellow ? "yellow" : "green";

    return (
      <div>

        <div style={buttonContainerStyle}>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"red"}} onClick={() => {this.setState({lastDrawLocation: null});}}>Reset Zoom</button>
          <button style={{"background": buttonColor, fontSize: "15px", color: "#ADDDE1", borderColor:"red"}} onClick={() => {this.setState({zoom: !this.state.zoom, button_color_yellow:!this.state.button_color_yellow});}}>Brush/Zoom</button>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"red"}} onClick={() => this.props.reload()}>Reload</button>   
        </div>
        
        <XYPlot
          style={{background: '#020028', marginLeft: '20px'}}
          margin={{right: 0, top: 40 }}
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={1000}
          height={150}
          colorType="linear"
          colorDomain={[0, 1]}
          colorRange={['#007af4','#3de285']}
          yRange={[-10, 100]}
          >

        <HorizontalBarSeries 
          stroke={'#ADDDE1'}
          onValueMouseOver={v => { 
            if (!this.state.zoom){
              this.changeBarColor(v, 'fiberlineMeasures')
              this.setState({hint:v.name,  unitOfWork: v.x && v.y ? v : false})
            } 
          }}
          onValueMouseOut={() => {
            this.clearHovered('fiberlineMeasures')
            this.setState({unitOfWork: false})
            } 
          }
          data={this.state.fiberlineMeasures}/>
          
          {(this.state.zoom) ? 
              <Highlight color={'red'} onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null} 

            <Hint value={unitOfWork}>
              <div style={{background: '#3de285',fontSize:10, color:'black'}}>
                <h3>{unitOfWork.name}</h3>
              </div>
            </Hint>
            
          <XAxis hideLine orientation="top" top={-15} tickTotal={8} style={{
              paddingTop: 15,
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              //text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>
          <YAxis hideLine hideTicks/>         
        </XYPlot>


        <XYPlot
          style={{background: '#020028', marginLeft: '20px', marginTop: '12px'}}
          margin={{right: 0, top: 40}}
          xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
          yType={'ordinal'}
          width={1000}
          height={150}
          colorType="linear"
          colorDomain={[0, 1]}
          colorRange={['orange','#3de285']}
          yRange={[-10, 100]}
          >

          <HorizontalBarSeries 
          stroke={'red'}
          onValueMouseOver={v => { 
            if (!this.state.zoom){
              this.changeBarColor(v, 'timelineMeasures', false)
              this.setState({hint:v.name,  renderCell: v.x && v.y ? v : false})
            } 
          }}
          onValueMouseOut={() => {
            this.clearHovered('timelineMeasures')
            this.setState({renderCell: false})
            } 
          }
          
          data={this.state.timelineMeasures}
          />
          
          {(this.state.zoom) ? 
              <Highlight color={'red'} onBrushEnd={(area) => {
                this.setState({
                  lastDrawLocation: area
                });
              }} />
          : null} 

            <Hint value={renderCell}>
              <div style={{background: '#3de285',fontSize:10, color:'black'}}>
                <h3>{renderCell.name}</h3>
              </div>
            </Hint>
            
          <XAxis hideLine orientation="top" top={-15} tickTotal={8} style={{
              paddingTop: 15,
              line: {stroke: '#ADDDE1'},
              ticks: {stroke: '#ADDDE1'},
              //text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}/>
          <YAxis hideLine hideTicks/>     

        </XYPlot>

      </div>
    )
  }
}
