var chart = 'toutes';
var jsonData = null;
var data = [];

function set_data(){
  data = [];

  jsonData = JSON.parse($.ajax({
    url: "./ressources/json/revenus_"+chart+".json",
    dataType: "json",
    async: false,
    }).responseText);

  colors = ['#dc3912','#3366cc','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395','#994499','#22aa99','#aaaa11']

  for (var i = 0; i < Object.keys(jsonData).length; i++) {
    data.push({
    label: Object.keys(jsonData)[i],
    backgroundColor: colors[i],
    data: jsonData[Object.keys(jsonData)[i]]
    });
  }
}

set_data();
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
      },
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
        },
      }
    },
  }
});

var jsonDataTotal = JSON.parse($.ajax({
  url: "./ressources/json/revenus_total.json",
  dataType: "json",
  async: false,
  }).responseText);

var analyse = 0;
product_analysis();

function product_analysis(){
  if(analyse == 0){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En mars, avec un CA pour la famille <span style='color:"+colors[2]+"'>Image-Son</span> élevé à 26 520,54€.</p><p>Plus petit CA : En septembre, avec un CA pour la <span style='color:"+colors[2]+"'>Image-Son</span> de seulement 9 139,20€.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[6]][0].toLocaleString()+"€</p>"
  }else if(analyse == 1){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En juillet, avec un CA pour la <span style='color:"+colors[8]+"'>Normandie</span> élevé à 4 455,45€.</p><p>Plus petit CA : En janvier, avec un CA pour la <span style='color:"+colors[2]+"'>Bretagne</span> de seulement 404,94€.</p><p>Région la plus régulière : La <span style='color:"+colors[12]+"'>Provence-Alpes Côtes d'Azur</span> car elle n'a pas vendu seulement en janvier.</p><p>Région la moins régulière : La <span style='color:"+colors[9]+"'>Nouvelle-Aquitaine</span> car elle n'a vendu qu'un peu en été et en fin d'année.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[1]][0].toLocaleString()+"€</p>"
  }else if(analyse == 2){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En janvier, avec un CA pour la <span style='color:"+colors[12]+"'>Provence-Alpes Côtes d'Azur</span> élevé à 3 909,66€.</p><p>Plus petit CA : En décembre, avec un CA pour la <span style='color:"+colors[8]+"'>Normandie</span> de seulement 105,04€.</p><p>Régions les plus régulières : L'<span style='color:"+colors[7]+"'>Île-de-France</span> et la <span style='color:"+colors[12]+"'>Provence-Alpes Côtes d'Azur</span> car elles ont vendu tout les mois.</p><p>Régions les moins régulières : La <span style='color:"+colors[4]+"'>Corse</span> et le <span style='color:"+colors[5]+"'>Grand Est</span> car elles n'ont pas vendu 6 mois sur 12, en particulier pendant l'été et la fin d'année.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[2]][0].toLocaleString()+"€</p>"
  }else if(analyse == 3){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En mars, avec un CA pour l'<span style='color:"+colors[10]+"'>Occitanie</span> élevé à 7 528,58€.</p><p>Plus petit CA : En septembre, avec un CA pour la <span style='color:"+colors[2]+"'>Bretagne</span> de seulement 189,72€.</p><p>Région la plus régulière : L'<span style='color:"+colors[7]+"'>Île-de-France</span> car elle a vendu tout les mois.</p><p>Région la moins régulière : Le <span style='color:"+colors[11]+"'>Pays de la Loire</span> car elle n'a vendu que 5 mois.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[3]][0].toLocaleString()+"€</p>"
  }else if(analyse == 4){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En décembre, avec un CA pour l'<span style='color:"+colors[7]+"'>Île-de-France</span> élevé à 3 960,66€.</p><p>Plus petit CA : En août, avec un CA pour la <span style='color:"+colors[2]+"'>Bretagne</span> de seulement 429,42€.</p><p>Régions les plus régulières : L'<span style='color:"+colors[7]+"'>Île-de-France</span> et l'<span style='color:"+colors[0]+"'>Auvergne-Rhône-Alpes</span> car elles ont vendu tout les mois.</p><p>Régions les moins régulières : La <span style='color:"+colors[9]+"'>Nouvelle-Aquitaine</span> et l'<span style='color:"+colors[10]+"'>Occitanie</span> car elles n'ont pas vendu 6 mois sur 12, en particulier pendant la fin d'année.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[4]][0].toLocaleString()+"€</p>"
  }else if(analyse == 5){
    document.getElementById("analyse").innerHTML = 
    "<p>Plus gros CA : En août, avec un CA pour l'<span style='color:"+colors[0]+"'>Auvergne-Rhône-Alpes</span> élevé à 4 483,92€.</p><p>Plus petit CA : En décembre, avec un CA pour la <span style='color:"+colors[12]+"'>Provence-Alpes Côtes d'Azur</span> de seulement 386,58€.</p><p>Régions les plus régulières : L'<span style='color:"+colors[0]+"'>Auvergne-Rhône-Alpes</span>, l'<span style='color:"+colors[7]+"'>Île-de-France</span> et la <span style='color:"+colors[12]+"'>Provence-Alpes Côtes d'Azur</span> car elles n'ont pas vendu que 2 mois.</p><p>Régions les moins régulières : La <span style='color:"+colors[8]+"'>Normandie</span> et la <span style='color:"+colors[1]+"'>Bourgogne-franche-Comté</span> car elles n'ont pas vendu 6 mois sur 12, en particulier pendant la fin d'année.</p><p>CA total : "+jsonDataTotal[Object.keys(jsonDataTotal)[5]][0].toLocaleString()+"€</p>"
  }
}

let buttons = document.querySelectorAll(".btn");
for(let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener("click",function(){
  chart = this.innerText.toLowerCase();
  analyse = i;
  product_analysis()

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