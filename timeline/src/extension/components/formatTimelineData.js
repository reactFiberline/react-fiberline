import {Decimal} from 'decimal.js';

let dataCache = []

export default function formatTimelineData(data) {

  let stack = [0]
  let lastEndTime;
  let result = []

  for (let i = dataCache.length; i < data.length; i++) {
    if (i < data.length-1 && data[i].startTime === data[i+1].startTime && data[i].duration < data[i+1].duration){
      let j = i;
      let k = i;
      
      while (k < data.length-1 && data[k].startTime === data[k+1].startTime){
        k++
      }
      for (let h = i; h < k; h++){
        for (let l = h+1; l < k; l++){
          if (data[l-1].duration < data[l].duration){
            let temp = data[l-1];
            data[l-1] = data[l];
            data[l] = temp;
          }
        }
      }
      // while (j < data.length-1 && data[j].startTime === data[j+1].startTime && data[j].duration < data[j+1].duration){
      //   let temp = data[j];
      //   data[j] = data[j+1];
      //   data[j+1] = temp;
      //   j++;
      // }
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