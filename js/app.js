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


// Versão 1.0 - Lista suspensa das sedes e das turmas
var menuLocal = document.getElementById('menu-local');
var menuClass = document.getElementById('menu-class');

window.onload = createLocalOptions();

function createLocalOptions() {
  var initialLocal = document.createElement('option');
  initialLocal.innerHTML = 'Selecione a sede';
  menuLocal.appendChild(initialLocal);

  var initialLocal = document.createElement('option');
  initialLocal.innerHTML = 'Selecione a turma';
  menuClass.appendChild(initialLocal);

  var locals = Object.keys(data);
  for (local in locals) {
    var newLocal = document.createElement('option');
    newLocal.innerHTML = locals[local];
    menuLocal.appendChild(newLocal);
  }
}

menuLocal.addEventListener('change', createClassOptions)

function createClassOptions() {
  menuClass.options.length = 1;
  var localSelected = menuLocal.value;
  var classSelected = menuClass.value;
  var classList = Object.keys(data[localSelected]);
  for (team in classList) {
    var newClass = document.createElement('option');
    newClass.innerHTML = classList[team];
    menuClass.appendChild(newClass);
  }
}

menuClass.addEventListener('change', function() {
  var localSelected = menuLocal.value;
  var classSelected = menuClass.value;
  var selectTitle = document.getElementById('selectTitle');
  selectTitle.innerHTML = localSelected + ' - ' + menuClass;
});

// Versão 2.0 - Seção 'Perfil' do menu
var main = document.getElementById('main');
var perfil = document.getElementById('perfil');

perfil.addEventListener('click', perfilSelected);

function perfilSelected() {
  main.innerHTML = '';
  var perfilTitle = document.createElement('h1');
  perfilTitle.innerHTML = 'PERFIL DAS ESTUDANTES ATIVAS';
  perfilTitle.setAttribute('class', 'h1');
  main.appendChild(perfilTitle);
  var perfilSearch = document.createElement('input');
  perfilSearch.setAttribute('id', 'perfilSearch');
  perfilSearch.setAttribute('value', '');
  perfilSearch.setAttribute('placeholder', 'Digite o nome da estudante');
  main.appendChild(perfilSearch);
  var buttonSearch = document.createElement('input');
  buttonSearch.setAttribute('type', 'submit');
  buttonSearch.setAttribute('value', 'Ver Perfil');
  buttonSearch.setAttribute('class', 'buttonSearch');
  buttonSearch.addEventListener('click', function () {
    var studentNameSearch = document.getElementById('perfilSearch').value;
    studentSearchButton(studentNameSearch);
  });
  main.appendChild(buttonSearch);
  var buttonInactiveStudents = document.createElement('input');
  buttonInactiveStudents.setAttribute('type', 'submit');
  buttonInactiveStudents.setAttribute('value', 'Ver Estudantes Inativas');
  buttonInactiveStudents.addEventListener('click', getInactiveStudents);
  main.appendChild(buttonInactiveStudents);
  var localSelected = menuLocal.value;
  var classSelected = menuClass.value;
  var studentsTotal = data[localSelected][classSelected]['students'].length;
  for (i = 0; i < studentsTotal; i++) {
    var studentStatus = data[localSelected][classSelected]['students'][i]['active'];
    getStudentSection(studentStatus, i);
  }

  function getInactiveStudents() {
    var studentsTotal = data[localSelected][classSelected]['students'].length;
    var arrayOfInactiveStudentsPosition = [];
    for (i = 0; i < studentsTotal; i++) {
      var studentStatus = data[localSelected][classSelected]['students'][i]['active'];
      if (!studentStatus) {
        arrayOfInactiveStudentsPosition.push(i);
      }
    }
    for (i = 0; i < arrayOfInactiveStudentsPosition.length; i++) {
      var positionOfInactiveStudent = arrayOfInactiveStudentsPosition[i];
      getStudentSection(studentStatus, positionOfInactiveStudent);
    }
  }
  // FUNCÃO RETORNANDO UNDEFINED PARA BOTÃO ESTUDANTES INATIVAS
  function getStudentSection(studentStatus, positionOfStudentInArray) {
    var div = document.createElement('div');
    var photo = data[localSelected][classSelected]['students'][positionOfStudentInArray]['photo'];
    var img = document.createElement('img');
    img.src = photo;
    div.appendChild(img);
    var pName = document.createElement('p');
    var name = data[localSelected][classSelected]['students'][positionOfStudentInArray]['name'];
    pName.innerHTML = name;
    div.appendChild(pName);
    main.appendChild(div);
    if (studentStatus) {
      getActiveStudentSection(div, positionOfStudentInArray);
    }
  }

  function getActiveStudentSection(div, positionOfStudentInArray) {
    var pSubtitle = document.createElement('p');
    var lastSprint = data[localSelected][classSelected]['students'][positionOfStudentInArray]['sprints'].length;
    pSubtitle.innerHTML = 'Habilidades do último Sprint (Sprint ' + lastSprint + ')';
    div.appendChild(pSubtitle);
    var pTechScore = document.createElement('p');
    var techScore = data[localSelected][classSelected]['students'][positionOfStudentInArray]['sprints'][lastSprint - 1]['score']['tech'];
    var avarageTechScore = parseFloat(techScore / 1800).toFixed(3)*100;
    pTechScore.innerHTML = avarageTechScore + '%' + '<br>' + 'Técnica';
    div.appendChild(pTechScore);
    var pHseScore = document.createElement('p');
    var hseScore = data[localSelected][classSelected]['students'][positionOfStudentInArray]['sprints'][lastSprint - 1]['score']['hse'];
    var avarageHseScore = parseFloat(hseScore / 1200).toFixed(3)*100;
    pHseScore.innerHTML = avarageHseScore + '%' + '<br>' + 'Socioemocional';
    div.appendChild(pHseScore);
    var buttonPerfil = document.createElement('div');
    buttonPerfil.innerHTML = 'Ver Perfil  <i class="fas fa-caret-right"></i>';
    buttonPerfil.setAttribute('id', 'buttonPerfil')
    buttonPerfil.addEventListener('click', function () {
      var studentNameSelected = document.getElementById('perfilSearch').value;
      studentNameSelected = this.parentNode.getElementsByTagName('p')[0].innerHTML;
      studentSearchButton(studentNameSelected);
    });
    div.appendChild(buttonPerfil);
  }
  // Versão 3.0 e 4.0 - Campo de busca das estudantes
  function studentSearchButton(studentName) {
    var positionOfStudent = getLocalStudentsNames(localSelected, classSelected).indexOf(studentName);
    var studentNameSearchStatus = data[localSelected][classSelected]['students'][positionOfStudent]['active'];
    main.innerHTML = '';
    getStudentSection(studentNameSearchStatus, positionOfStudent);
    var buttonPerfil = document.getElementById('buttonPerfil');
    buttonPerfil.parentNode.removeChild(buttonPerfil);

    function getLocalStudentsNames(localSelected, classSelected) {
      var studentsList = [];
      for (i = 0; i < data[localSelected][classSelected]['students'].length; i++) {
      studentsList.push(data[localSelected][classSelected]['students'][i]['name']);
      }
      return studentsList;
    }
    // Requisitos para Google Charts
    var graph = document.createElement('div');
    graph.setAttribute('id', 'graph-perfil');
    main.appendChild(graph);

    function getArraytoGraph() {
      var studentNameSearchSprints = data[localSelected][classSelected]['students'][positionOfStudent]['sprints'].length;
      var arraytoGraph = [];
      for (i = 0; i < studentNameSearchSprints; i++) {
        var elementsOfArray = [];
        var firstElement = data[localSelected][classSelected]['students'][positionOfStudent]['sprints'][i]['number'];
        var secondElement = data[localSelected][classSelected]['students'][positionOfStudent]['sprints'][i]['score']['tech'] / 1800;
        var thirdElement = data[localSelected][classSelected]['students'][positionOfStudent]['sprints'][i]['score']['hse'] / 1200;
        elementsOfArray.push(firstElement);
        elementsOfArray.push(secondElement);
        elementsOfArray.push(thirdElement);
        arraytoGraph.push(elementsOfArray);
      }
      return arraytoGraph;
    }

    var graphTitle = 'Evolução da Habilidades Técnicas e Socioemocionais';

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBasic);

    // Função Google Charts
    function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Sprints');
      data.addColumn('number', 'Tech');
      data.addColumn('number', 'Hse');

      data.addRows(getArraytoGraph());

      var options = {
        title:''
      };
      options['title'] = graphTitle;

      var chart = new google.visualization.LineChart(document.getElementById('graph-perfil'));

      chart.draw(data, options);
    }
  }
}

// Versão 5.0 - Seção 'Termômetro' do menu

var termometro = document.getElementById('termometro');

var sedes = Object.keys(data);

termometro.addEventListener('click', termometroSelected);

function termometroSelected() {
  var main = document.getElementById('main');
  main.innerHTML = '';
  var sedes = Object.keys(data);
  for (i = 0; i < sedes.length; i++) {
    var sede = sedes[i];
    var idOfDiv = 'piechart' + i;
    var div = document.createElement('div');
    div.setAttribute('id', idOfDiv);
    var main = document.getElementById('main');
    main.appendChild(div);
    criarGrafico(idOfDiv, sede);
  }
}

function criarGrafico(idDoGrafico, sede) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function() {drawChart(idDoGrafico, sede);});
}

function drawChart(idOfDiv, sede) {
  var data = google.visualization.arrayToDataTable(cumpre(sede));
  var options = {
    title: ''
  };
  options['title'] = sede;
  var chart = new google.visualization.PieChart(document.getElementById(idOfDiv));
  chart.draw(data, options);
}

function cumpre(sede){
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

// Versão 6.0 - Seção 'Equipe' do menu
var equipe = document.getElementById('equipe');
equipe.addEventListener('click', equipeSelected);

function equipeSelected() {
  main.innerHTML = '';
  var equipeTile = document.createElement('h1');
  equipeTitle.innerHTML = 'DESEMPENHO DA EQUIPE POR SPRINT';
  equipeTitle.setAttribute('class', 'h1');
  main.appendChild(equipeTitle);
  var localSelected = menuLocal.value;
  var classSelected = menuClass.value;
  var graphTeacher = document.createElement('div');
  graphTeacher.setAttribute('id', 'graph-teacher');
  main.appendChild(graphTeacher);
  var graphJedi = document.createElement('div');
  graphJedi.setAttribute('id', 'graph-jedi');
  main.appendChild(graphJedi);

  function getArraytoTeacherGraph() {
    var classSelectedSprints = data[localSelected][classSelected]['ratings'].length;
    var arraytoGraph = [];
    for (i = 0; i < classSelectedSprints; i++) {
      var elementsOfArray = [];
      var firstElement = data[localSelected][classSelected]['ratings'][i]['sprint'];
      var secondElement = data[localSelected][classSelected]['ratings'][i]['teacher'] / 5;
      elementsOfArray.push(firstElement);
      elementsOfArray.push(secondElement);
      arraytoGraph.push(elementsOfArray);
    }
      return arraytoGraph;
  }
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(runGraphToTeacher);
  function runGraphToTeacher() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Sprints');
    data.addColumn('number', 'Mentor');
    data.addRows(getArraytoTeacherGraph());
    var options = {};
    var chart = new google.visualization.LineChart(document.getElementById('graph-teacher'));
    chart.draw(data, options);
  }

  function getArraytoJediGraph() {
    var classSelectedSprints = data[localSelected][classSelected]['ratings'].length;
    var arraytoGraph = [];
    for (i = 0; i < classSelectedSprints; i++) {
      var elementsOfArray = [];
      var firstElement = data[localSelected][classSelected]['ratings'][i]['sprint'];
      var secondElement = data[localSelected][classSelected]['ratings'][i]['jedi'] / 5;
      elementsOfArray.push(firstElement);
      elementsOfArray.push(secondElement);
      arraytoGraph.push(elementsOfArray);
    }
      return arraytoGraph;
  }
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(runGraphToJedi);
  function runGraphToJedi() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Sprints');
    data.addColumn('number', 'Jedi');
    data.addRows(getArraytoTeacherGraph());
    var options = {};
    var chart = new google.visualization.LineChart(document.getElementById('graph-jedi'));
    chart.draw(data, options);
  }
}
