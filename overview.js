google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(Coupons);
google.charts.setOnLoadCallback(Livraisons);

function Coupons() {

    var jsonData = $.ajax({
            url: "./ressources/json/coupons.json",
            dataType: "json",
            async: false,
            }).responseText;
            
    var data = new google.visualization.DataTable();
    data.addColumn({type:'string', id:'Utilisation de coupon', label: 'Utilisation de coupon'});
    data.addColumn({type:'number', id:'Nombre de coupons', label: 'Nombre de coupons'});
    data.addRows($.parseJSON(jsonData));

    var options = {
    title: 'Utilisation des coupons :',
    colors:['#f84f31','#23c552']
    };

    var chart = new google.visualization.PieChart(document.getElementById('coupons'));
    chart.draw(data, options);
}

function Livraisons() {

    var jsonData = $.ajax({
            url: "./ressources/json/livraisons.json",
            dataType: "json",
            async: false,
            }).responseText;
            
    var data = new google.visualization.DataTable();
    data.addColumn({type:'string', id:'Utilisation de coupon', label: 'Utilisation de coupon'});
    data.addColumn({type:'number', id:'Nombre de coupons', label: 'Nombre de coupons'});
    data.addRows($.parseJSON(jsonData));

    var options = {
    title: 'Mode de livraisons utilisés :'
    };

    var chart = new google.visualization.PieChart(document.getElementById('livraisons'));
    chart.draw(data, options);
}