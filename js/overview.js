google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(function() {
    Piechart("coupons","Coupons utilisés :","");
    Piechart("livraisons","Modes de livraisons utilisés :","");
    Piechart("reglements","Moyens de paiements utilisés :","");
    Piechart("mois","CA par mois :","true");
    Piechart("produits","CA par produits :","true");
    Piechart("regions","CA par régions :","true");
});

function Piechart() {

    var jsonData = $.ajax({
            url: "./ressources/json/"+arguments[0]+".json",
            dataType: "json",
            async: false,
            }).responseText;

    var data = new google.visualization.DataTable();
    data.addColumn({type:'string', id:'Utilisation de coupon', label: 'Utilisation de coupon'});
    data.addColumn({type:'number', id:'Nombre de coupons', label: 'Nombre de coupons'});
    data.addRows($.parseJSON(jsonData));

    if (arguments[2]){
        var formatNumber = new google.visualization.NumberFormat({
            pattern: '###,### €'
            });
            formatNumber.format(data, 1);
    }

    var options = {
        title: arguments[1],
        titleTextStyle: { color: 'white', fontSize: 16, bold: 'true'},
        colors: ['#dc3912','#3366cc','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395','#994499','#22aa99','#aaaa11'],
        chartArea: {width: 500, height: 300, left: 30, top: 50},
        backgroundColor: 'transparent',
        legend: {position: 'right', textStyle: { color: 'white'}},
        pieSliceBorderColor: '#1f1f1f',
    };

    var chart = new google.visualization.PieChart(document.getElementById(arguments[0]));
    chart.draw(data, options);
}

