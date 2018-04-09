import React from 'react'
import {yType, XYPlot, XAxis, YAxis, LineSeries, Hint, LabelSeries, HorizontalBarSeries} from 'react-vis';
import Highlight from './Highlight'
import formatTimelineData from './formatTimelineData'
import formatFiberlineData from './formatFiberlineData'
import {Decimal} from 'decimal.js';
import { VictoryTooltip, VictoryBrushContainer, VictoryZoomContainer, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import _ from 'lodash'; // get more specific to make bundle smaller


var buttonContainerStyle = {
  paddingLeft: "400px",
  background: "#19004c",
   padding:"10px 0 10px 400px",
  width: "600px"
};


export class Measures extends React.Component {
  constructor(props) {
    super(props)
    
    // this.getData = this.getData.bind(this);
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
      lastColor: false,
      searchText: '',
      searchResult: [],
      entireDomain: {x: [0, 1], y: [0, 20]},
      zoomedXDomain: [0, 1],
    }
  }

  componentDidMount(){
  //  this.buildTimelineData();
   this.buildFiberlineData(this.props);
  }

  componentWillReceiveProps(nextProps){
    // this.buildTimelineData();
    console.log('nextProps WL ', nextProps.workLoopMeasures)
    const entireDomain = this.getEntireDomain(nextProps.workLoopMeasures);
    const fiberlineMeasures = this.buildFiberlineData(nextProps, entireDomain);
    console.log('fl Measures ', fiberlineMeasures)
    this.setState({
      entireDomain,
      fiberlineMeasures
    })
  }

  // buildTimelineData = () => {
  //   this.setState({
  //     timelineMeasures: formatTimelineData(this.props.rawMeasures)
  //   })
  // }

  buildFiberlineData = (nextProps, domain) => {
    if (nextProps.workLoopMeasures) {
      console.log(nextProps.workLoopMeasures)
      const { entireDomain } = this.state;
      const { maxPoints } = this.props;
      const _zoomedDomain = !!entireDomain ? entireDomain.x : [0, 1];
      const filtered = nextProps.workLoopMeasures.filter(
        (d) => (d.x >= _zoomedDomain[0] && d.x <= _zoomedDomain[1])
      );
      if (filtered.length > maxPoints) {
        const k = Math.ceil(filtered.length / maxPoints);
        return filtered.filter(
          (d, i) => ((i % k) === 0)
        );
      }
      return filtered;
    }
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

  onDomainChange(domain) {
    console.log(domain)
    this.setState({
      zoomedXDomain: domain.x,
    });
  }

  // getData() {
  //   if (this.state.fiberlineMeasures) {
  //     const { zoomedXDomain } = this.state;
  //     const { maxPoints } = this.props;
  //     const filtered = this.state.fiberlineMeasures.filter(
  //       (d) => (d.x >= zoomedXDomain && d.x <= zoomedXDomain[1])
  //     );
  //     if (filtered.length > maxPoints ) {
  //       const k = Math.ceil(filtered.length / maxPoints);
  //       return filtered.filter(
  //         (d, i) => ((i % k) === 0)
  //       );
  //     }
  //     return filtered;
  //   }
  // }

  getEntireDomain(data) {
    // const data = this.state.fiberlineMeasures;
    return {
      y: [_.minBy(data, d => d.y).y, _.maxBy(data, d => d.y).y],
      x: [ data[0].x, _.last(data).x ]
    };
  }

  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return _.round(factor, factor < 3 ? 1 : 0);
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }
   
  render(){
    const {lastDrawLocation, renderCell, unitOfWork} = this.state;
    let buttonColor = this.state.button_color_yellow ? "#ffff80" : "green";
    // let renderedData = this.getData();

    return (
      <div>

        <div style={buttonContainerStyle}>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => {this.setState({lastDrawLocation: null});}}>Reset Zoom</button>
          <button style={{"background": buttonColor, fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => {this.setState({zoom: !this.state.zoom, button_color_yellow:!this.state.button_color_yellow});}}>Brush/Zoom</button>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => this.props.reload()}>Reload</button>   
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => this.props.getWorkLoopMeasures()}>Get Fiberdata</button>   

          <form class="form-inline" id="form">
            <button style={{ "background": "#b3ffb3", fontSize: "15px", color: "green", borderColor: "teal" }}>Clear Search</button>
            <input style={{
              "background": "#ccffcc", fontSize: "15px", color: "blue", borderColor: "teal" }} onSubmit={this.submitForm} type="text" class="form-control" id="term" />
            <button style={{ "background": "#b3ffb3", fontSize: "15px", color: "green", borderColor: "teal" }}>Search</button>
            
          </form>
        </div>


        {/* Fibernode graph */}
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 0 }}
          width={1200} height={550}
          domainPadding={10}
          domain={this.state.entireDomain}

          containerComponent={
            <VictoryZoomContainer 
              // zoomDomain={{ x: [0, 50], y: [0, 30] }}
              // zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.onDomainChange.bind(this)}
              // minimumZoom={{x: 1/10000}}
            />
          }
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
            domain={[0, 20]}

          />
          <VictoryBar
            barRatio={1.5}
            horizontal
            style={{
              data: {
                fill: "tomato",
                stroke: "black",
                strokeWidth: 1
              },
            }}
            padding={{ top: 0, bottom: 0 }}
            data={this.state.fiberlineMeasures}
            // data={this.state.data}
            x="y"
            y0="x0"
            y="x"

            labelComponent={
              <VictoryTooltip/>
            }
           

            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({ style: { fill: "#3de285", width: 40 } })
                    }, {
                      target: "labels",
                      mutation: () => ({ active: true })
                    }
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => { }
                    }, {
                      target: "labels",
                      mutation: () => ({ active: false })
                    }
                  ];
                }
              }
            }]}
          />

        </VictoryChart>
        
      </div>
    )
  }
}
