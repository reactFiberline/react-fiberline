import React from 'react'
import { VictoryTooltip, VictoryBrushContainer, VictoryZoomContainer, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import { minBy, maxBy } from 'lodash'; // get more specific to make bundle smaller


var buttonContainerStyle = {
  paddingLeft: "400px",
  background: "#19004c",
  padding:"10px 0 10px 400px",
  width: "600px",
};


export class Measures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: false,
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
      zoomedDomain: [0, 1],
    }
  }

  componentDidMount(){
   this.buildFiberlineData(this.props.workLoopMeasures);
  }

  componentWillReceiveProps(nextProps){
    const entireDomain = this.getEntireDomain(nextProps.workLoopMeasures);
    const fiberlineMeasures = this.buildFiberlineData(nextProps.workLoopMeasures, entireDomain);
    this.setState({
      entireDomain,
      fiberlineMeasures
    })
  }

  buildFiberlineData = (workLoopMeasures, domain) => {
    if (workLoopMeasures) {
      const { maxPoints } = this.props;
      const _zoomedDomain = !!domain ? domain : {x: [0, 1], y: [0, 20]};
      const filtered = workLoopMeasures.filter(
        (d) => (
          d.x >= _zoomedDomain.x[0] && 
          d.x <= _zoomedDomain.x[1] &&
          d.y >= _zoomedDomain.y[0] &&
          d.y <= _zoomedDomain.y[1] ||
          d.x0 >= _zoomedDomain.x[0] && 
          d.x0 <= _zoomedDomain.x[1] &&
          d.y >= _zoomedDomain.y[0] &&
          d.y <= _zoomedDomain.y[1]
        )
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

  onDomainChange(domain) {
    const fiberlineMeasures = this.buildFiberlineData(this.props.workLoopMeasures, domain)
    this.setState({
      fiberlineMeasures,
      zoomedDomain: domain,
    });
  }

  getEntireDomain(data) {
    return {
      y: [_.minBy(data, d => d.y).y, _.maxBy(data, d => d.y).y],
      x: [ data[0].x, _.maxBy(data, d => d.x).x ]
    };
  }
   
  render(){
    let buttonColor = this.state.button_color_yellow ? "#ffff80" : "green";

    return (
      <div>

        <div style={buttonContainerStyle}>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => {this.setState({zoomDomain: this.state.entireDomain});}}>Reset Zoom</button>
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => this.props.reload()}>Reload</button>   
          <button style={{"background": "#19004c", fontSize: "15px", color: "#ADDDE1", borderColor:"teal"}} onClick={() => this.props.getWorkLoopMeasures()}>Get Fiberdata</button>   
        </div>


        {/* Fibernode graph */}
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 0 }}
          width={1200} height={550}
          domainPadding={10}
          domain={this.state.entireDomain}

          containerComponent={
            <VictoryZoomContainer 
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.onDomainChange.bind(this)}
              minimumZoom={{ x: .03, y: 3 }}
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
                      mutation: () => ({ style: { fill: "#3de285" } })
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
