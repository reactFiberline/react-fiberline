import React from 'react'
import {yType, XYPlot, XAxis, YAxis, LineSeries, Hint, LabelSeries, HorizontalBarSeries} from 'react-vis';
import Highlight from './Highlight'
import formatTimelineData from './formatTimelineData'
import formatFiberlineData from './formatFiberlineData'
import {Decimal} from 'decimal.js';
import { VictoryTooltip, VictoryBrushContainer, VictoryZoomContainer, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

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
      lastColor: false,
      searchText: '',
      searchResult: [],
    }
  }

  componentDidMount(){
   this.buildTimelineData();
   this.buildFiberlineData();
  }

  componentWillReceiveProps(){
    this.buildTimelineData();
    this.buildFiberlineData();
    // console.log(this.props.workLoopMeasures)
  }

  buildTimelineData = () => {
    this.setState({
      timelineMeasures: formatTimelineData(this.props.rawMeasures)
    })
  }

  buildFiberlineData = () => {
    this.setState({
      // fiberlineMeasures: formatFiberlineData(this.props.workLoopMeasures)
      fiberlineMeasures: this.props.workLoopMeasures
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

  

  // submitForm = (e) => {
  //   e.preventDefault();
  //   search(term);
  // }
 
  // search = (term) => {
  //   const searchResults = [];
  //   timelineMeasures.each(function (data) {
  //     searchResults = searchData(data, term);

  //   })
  //   return searchResults;
  // }

  // searchData = (d, term) => {
  //   var re = new RegExp(term),
  //     searchResults = [];

  //   function searchInner(d) {
  //     var label = d.data.name;

  //     if (children(d)) {
  //       children(d).forEach(function (child) {
  //         searchInner(child);
  //       });
  //     }

  //     if (label.match(re)) {
  //       d.highlight = true;
  //       searchResults.push(d);
  //     } else {
  //       d.highlight = false;
  //     }
  //   }

  //   searchInner(d);
  //   return searchResults;
  // }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }
   
  render(){
    const {lastDrawLocation, renderCell, unitOfWork} = this.state;
    let buttonColor = this.state.button_color_yellow ? "#ffff80" : "green";

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

          containerComponent={
            <VictoryZoomContainer 
              zoomDomain={{ x: [0, 50], y: [0, 30] }}
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
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
        



        {/* <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 0 }}
          width={1200} height={450} 
          domainPadding={10}
          theme={VictoryTheme.material}

          containerComponent={
            <VictoryZoomContainer 
            zoomDomain={{ x: [0, 50], y: [0, 30] }} 
            zoomDomain={this.state.zoomDomain}
            onZoomDomainChange={this.handleZoom.bind(this)} 
            />
          }
        >
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
            domain={[0, -5]}

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
            data={this.state.timelineMeasures}
            x="y"
            y0="x0"
            y="x"
            label="name"
            labelComponent={
              <VictoryTooltip />
            }
            
            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({ style: { fill: "#3de285", width: 20 } })
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
            
            animate={{
              duration: 300,
              
            }}
          />
        </VictoryChart>
 */}



        {/* <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 50 }}
          width={900} height={150} 

          containerComponent={
            <VictoryBrushContainer responsive={false}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >

          <VictoryAxis
            dependentAxis
            domain={[0, -5]}

          />
          <VictoryBar
            horizontal
            style={{
              data: { fill: "tomato" }
            }}
            data={this.state.timelineMeasures}
            x="y"
            y0="x0"
            y="x"
          />

        </VictoryChart> */}

             
        {/* <XYPlot
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

        </XYPlot> */}
       


      </div>
    )
  }
}
