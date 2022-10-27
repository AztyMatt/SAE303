var chart = 'toutes';
var jsonData = null;
var data = [];
set_data();

function set_data(){
  data = [];

  jsonData = JSON.parse($.ajax({
    url: "./ressources/json/revenus_"+chart+".json",
    dataType: "json",
    async: false,
    }).responseText);

  colors = ['#dc3912','#3366cc','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395','#994499','#22aa99','#aaaa11']

  for (var i = 1; i < Object.keys(jsonData).length; i++) {
    data.push({
    label: Object.keys(jsonData)[i],
    backgroundColor: colors[i-1],
    data: jsonData[Object.keys(jsonData)[i]]
    });
  }
}
console.log(data);

var ctx = document.getElementById("revenus").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["janv","févr","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"],
    datasets: data,
  },
  options: {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        },
        onHover: function(event, legendItem) {
          document.getElementById("revenus").style.cursor = 'pointer';
        },
        onClick: function(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

          ci.data.datasets.forEach(function(e, i) {
            var meta = ci.getDatasetMeta(i);

            if (i !== index) {
              if (!alreadyHidden) {
                meta.hidden = meta.hidden === null ? !meta.hidden : null;
              } else if (meta.hidden === null) {
                meta.hidden = true;
              }
            } else if (i === index) {
              meta.hidden = null;
            }
          });

          ci.update();
        },
      },
      tooltips: {
        custom: function(tooltip) {
          if (!tooltip.opacity) {
            document.getElementById("revenus").style.cursor = 'default';
            return;
          }
        }
      }
    },
  }
});


let buttons = document.querySelectorAll(".btn");
for(let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener("click",function(){
  chart = this.innerText;

  if(chart !== 'Toutes'){
    myChart.options.plugins.legend.display = true;
  }else{
    myChart.options.plugins.legend.display = false;
  }

  set_data();
  myChart.data.datasets = data;
  myChart.update();
  
  const btns = document.querySelectorAll('.btn');
  for (const btn of btns) {
  btn.classList.remove('active_bis');
  }
  buttons[i].classList.toggle("active_bis");
  });
}

window.addEventListener('resize', function () { 
  "use strict";
  window.location.reload(); 
});