var jsonData = JSON.parse($.ajax({
    url: "./ressources/json/revenus_3.json",
    dataType: "json",
    async: false,
    }).responseText);



console.log(JSON.stringify(jsonData["Auvergne-Rhône-Alpes/0"]));
document.getElementById("demo").innerHTML = JSON.stringify(jsonData["Auvergne-Rhône-Alpes/0"][0]);
document.getElementById("demo").innerHTML += JSON.stringify(jsonData["Bourgogne-Franche-Comté/0"][0]);
