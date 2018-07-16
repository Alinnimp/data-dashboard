// GRAFICO OVERVIEW
// google.charts.load('current', {packages: ['corechart', 'line']});
// google.charts.setOnLoadCallback(drawCurveTypes);
//
// function drawCurveTypes() {
//       var data = new google.visualization.DataTable();
//       data.addColumn('number', 'Sprints');
//       data.addColumn('number', '2016-2');
//       data.addColumn('number', '2017-1');
//
//       data.addRows();
//       var options = {
//         hAxis: {
//           title: 'Time'
//         },
//         vAxis: {
//           title: 'Popularity'
//         },
//         series: {
//           1: {curveType: 'function'}
//         }
//       };
//
//       var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//       chart.draw(data, options);
//     }
// function getRowsGraphOverview (){
//   // var localSelected = document.getElementById('menu-local');
//   // var classSelected = document.getElementById('menu-class');
//   var sprints = [];
//   var paraMedia = [];
//
//   for (i = 0; i < data['AQP'].length; i++) {
//     for (j = 0; j < data['AQP'][i]['students'].length; j++){
//        for (k = 0; k < data['AQP'][i]['students'][j]['sprints'].length; k++){
//          sprints.push(k + 1);
//          var nota = data['AQP'][i]['students'][j]['sprints'][k]['score']['tech'];
//          paraMedia.push(nota);
//        }
//      }
//   }
// console.log(sprints);
// console.log(paraMedia);
//
// }
// getRowsGraphOverview();
// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data);

var sedes = Object.keys(data);

for (i = 0; i < sedes.length; i++) {
  var sede = sedes[i];
  var idOfDiv = 'piechart' + i;
  var div = document.createElement('div');
  div.setAttribute('id', idOfDiv);
  console.log("OI1");
  criarGrafico(idOfDiv, sede);
  console.log("OI5");
  var body = document.getElementById('conteudo');
  body.appendChild(div);
}

function criarGrafico(idDoGrafico, sede) {
  console.log("OI2");
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function() {drawChart(idDoGrafico, sede);});
}

function drawChart(idOfDiv, sede) {
  console.log(idOfDiv);
  console.log("OI3");
  var data = google.visualization.arrayToDataTable(cumpre(sede));
  var options = {
    title: ''
  };
  options['title'].value = sede;
  var chart = new google.visualization.PieChart(document.getElementById(idOfDiv));
  console.log(idOfDiv);
  chart.draw(data, options);
}

function cumpre(sede){
  console.log("OI4");
  var arrayGrafico = [['Situação', '%'], ['Cumpre',''], ['Não cumpre',''], ['Supera','']];
  var turmas = Object.keys(data[sede]);
  var ultTurma = Object.keys(data[sede]).length - 1;
  var ultSprint = data[sede][turmas[ultTurma]]['ratings'].length - 1;
  var naoCumpre = data[sede][turmas[ultTurma]]['ratings'][ultSprint]['student']['no-cumple'];
  var cumpre = data[sede][turmas[ultTurma]]['ratings'][ultSprint]['student']['cumple'];
  var supera = data[sede][turmas[ultTurma]]['ratings'][ultSprint]['student']['supera'];

  arrayGrafico[1][1] = naoCumpre;
  arrayGrafico[2][1] = cumpre;
  arrayGrafico[3][1] = supera;
  return arrayGrafico;
}
