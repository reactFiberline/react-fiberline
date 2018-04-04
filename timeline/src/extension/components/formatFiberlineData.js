import {Decimal} from 'decimal.js';

let dataCache = []

export default function formatFiberlineData(data) {

  let stack = [0]
  let startTime;
  let duration;
  let lastEndTime;
  let result = []
  const keys = Object.keys(data);

  for (let i = dataCache.length; i < keys.length; i++) {

    if (i < keys.length-1 && 
      data[keys[i]].workStarted[0].time === data[keys[i+1]].workStarted[0].time && 
      data[keys[i]].workCompleted[0].time === data[keys[i+1]].workCompleted[0].time){

      let temp = data[keys[i]];
      data[keys[i]] = data[keys[i+1]];
      data[keys[i+1]] = temp;
    }

    let datum = { 
      x0: data[keys[i]].workStarted[0].time/1000, 
      x: data[keys[i]].workCompleted[0].time/1000,
      name: data[keys[i]].workStarted[0].tag
    };

    datum["color"] = Math.random()*.1;

    while (data[keys[i]].workStarted[0].time >= stack[stack.length-1] && stack.length >= 0){
      stack.pop();
    }
  
    datum["y"] = -stack.length-1;
    result.push(datum);
    startTime = new Decimal(data[keys[i]].workStarted[0].time)
    duration = new Decimal(data[keys[i]].workCompleted[0].time - data[keys[i]].workStarted[0].time)
    lastEndTime = startTime.plus(duration);
    stack.push(lastEndTime)

  }
  dataCache = dataCache.concat(result)
  return dataCache;
};