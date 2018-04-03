import {Decimal} from 'decimal.js';

let dataCache = []

export default function formatTimelineData(data) {

  let stack = [0]
  let lastEndTime;
  let result = []

  for (let i = dataCache.length; i < data.length; i++) {
    if (i < data.length-1 && data[i].startTime === data[i+1].startTime && data[i].duration < data[i+1].duration){
      let temp = data[i];
      data[i] = data[i+1];
      data[i+1] = temp;
    }

    let datum = { x0: data[i].startTime/1000, x: (data[i].startTime + data[i].duration)/1000, name: data[i].name };

    datum["color"] = Math.random()*.1;

    while (data[i].startTime >= stack[stack.length-1] && stack.length >= 0){
      stack.pop();
    }
  
    datum["y"] = -stack.length-1;
    result.push(datum);
    let startTime = new Decimal(data[i].startTime)
    let duration = new Decimal(data[i].duration)
    lastEndTime = startTime.plus(duration);
    stack.push(lastEndTime)

  }
  dataCache = dataCache.concat(result)
  return dataCache;
};