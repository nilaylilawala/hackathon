
let data = []
let symbol = ""
let period = 1
let period1="day"
let history=[]
let chartType=0

document.getElementById("btn1").addEventListener("click", () => {
  data = []
  symbol = []
  period = 1;
  symbol = document.getElementById("symbol").value;
  if (symbol.length != 0) {
    history.push(symbol);
    stockItems.forEach((item) => {
      if (symbol.localeCompare(item.symbol) == 0) {
        let temp = []
        temp.push(item.open)
        temp.push(item.high)
        temp.push(item.low)
        temp.push(item.close)
        const obj = {
          x: new Date(item.date),
          y: temp
        }
        data.push(obj);
      }
    });
    if (data.length != 0) {
      if(chartType==0) {
        ohlcChart();
      } else {
        candlestickChart();
      }
      let temp=symbol;
      let completeURL="https://cloud.iexapis.com/stable/stock/"+temp.toLowerCase()+"/company?token=pk_f700924df963421ea2b03387dfa33a72";
      fetch(completeURL)
        .then(response=>{
          return response.json();
        })
        .then(desc=>{
          document.getElementById("desc").innerHTML = desc.description;
          document.getElementById("error").innerHTML = "";
        })
    } else {
      document.getElementById("desc").innerHTML = "";
      document.getElementById("chartContainer").innerHTML = "";
      document.getElementById("error").innerHTML = "Error 404";
    }
  } else {
    document.getElementById("desc").innerHTML = "";
    document.getElementById("chartContainer").innerHTML = "";
    document.getElementById("error").innerHTML = "Error 404";
  }
});


document.querySelectorAll(".btn").forEach((button)=>{
  button.addEventListener("click",()=>{
    if(button.value==="daily") {
      if(symbol.length != 0) {
        period=1;
        if(chartType==0) {
          ohlcChart();
        } else {
          candlestickChart();
        }
      }
    }
    if(button.value==="weekly") {
      if(symbol.length != 0) {
        period=5;
        if(chartType==0) {
          ohlcChart();
        } else {
          candlestickChart();
        }
      }
    } else if(button.value==="monthly") {
      if(symbol.length != 0) {
        period=22;
        if(chartType==0) {
          ohlcChart();
        } else {
          candlestickChart();
        }
      }
    } else if(button.value==="history") {
      var modal = document.getElementById("myModal");
      hst="";
      for(let i=history.length-1;i>=1;i--) {
        hst+=history[i]+", ";
      }
      if(history.length!=0) {
        hst+=history[0];
      }
      if(hst.length==0) {
        hst="No History"
      }
      document.getElementById("modalPara").innerHTML = hst;
      console.log(hst);
      modal.style.display = "block";
      window.onclick = (event)=> {
        if (event.target == modal) {
          modal.style.display = "none";
        }       
      }
    } else if(button.value==="ohlc") {
      ohlcChart();
      chartType=0;
    } else if(button.value==="candlestick") {
      candlestickChart();
      chartType=1;
    }
  })
})

function reqData() {
  let dataToUse = [];
  for (var i = 0; i < data.length;i+=period) { 
    let date=i;
    let open = data[i].y[0];
    let close = data[i].y[3];
    let high = data[i].y[1];
    let low = data[i].y[2];

    const obj={
      x: data[i].x,
      y: [open,high,low,close]
    }
    dataToUse.push(obj);
    
  }
  return dataToUse;
}

function ohlcChart() {
  let dataToUse=reqData();
  let chart = new CanvasJS.Chart("chartContainer", {
    axisX: {
      interval: 1,
      intervalType: "month",
      valueFormatString: "MM YYYY"
    },
    axisY: {
      prefix: "$",
      title: "Price (in USD)"
    },
    data: [{
      type: "ohlc",
      yValueFormatString: "$###0.00",
      xValueFormatString: "DD MM YYYY",
      dataPoints: dataToUse
    }]
  });
  chart.render();
};

function candlestickChart() {
  let dataToUse=reqData();
  let chart = new CanvasJS.Chart("chartContainer", {
    axisX: {
      interval: 1,
      intervalType: "month",
      valueFormatString: "MM YYYY"
    },
    axisY: {
      prefix: "$",
      title: "Price (in USD)"
    },
    data: [{
      type: "candlestick",
      yValueFormatString: "$###0.00",
      xValueFormatString: "DD MM YYYY",
      dataPoints: dataToUse
    }]
  });
  chart.render();
};
