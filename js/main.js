function main_light() {
  main("normal");
}

function main_dark() {
  main("dark");
}

let categorie="3x3x3";

const setCategorie = (str) => {
  document.getElementById(categorie).className = "modal__cube__image__container"
  categorie = str;
  document.getElementById(categorie).className = "modal__cube__image__container active"

  // Reset the graph when change the cube
  graphic_avg_rsd_reset_value(graphAvg,graphRsd);
  graphic_rep_reset_value(graphRep);
}

document.getElementById("3x3x3").addEventListener("click", () => setCategorie("3x3x3"));
document.getElementById("2x2x2").addEventListener("click", () => setCategorie("2x2x2"));
document.getElementById("4x4x4").addEventListener("click", () => setCategorie("4x4x4"));
document.getElementById("5x5x5").addEventListener("click", () => setCategorie("5x5x5"));
document.getElementById("6x6x6").addEventListener("click", () => setCategorie("6x6x6"));
document.getElementById("7x7x7").addEventListener("click", () => setCategorie("7x7x7"));
document.getElementById("3x3x3_Blindfold").addEventListener("click", () => setCategorie("3x3x3_Blindfold"));
document.getElementById("3x3x3_One_Hand").addEventListener("click", () => setCategorie("3x3x3_One_Hand"));
document.getElementById("Megaminx").addEventListener("click", () => setCategorie("Megaminx"));
document.getElementById("Pyraminx").addEventListener("click", () => setCategorie("Pyraminx"));
document.getElementById("Skewb").addEventListener("click", () => setCategorie("Skewb"));
document.getElementById("Square-1").addEventListener("click", () => setCategorie("Square-1"));

let ctx_avg=document.getElementById('canvas_graph_avg');
let graphAvg=new Chart(ctx_avg, {
    type: 'line',
    data: {
      datasets: [{ // PB
          data: [],
          label: 'PB',
          borderColor: '#00FFFF',
          fill: false
        },
        { // Chronos
          data: [],
          label: 'Chrono',
          borderColor: 'rgba(255, 255, 255, 1)',
          fill: false
        },
        { // Exponential Regression
          data: [],
          label: 'Exponential Regression',
          borderColor: 'rgba(255, 255, 255, 1)',
          fill: false,
          pointRadius: 2
        },
        { // avg5
          data: [],
          label: 'avg5',
          borderColor: '#4200FF',
          fill: false,
          pointRadius: 1
        },
        { // std_up5
          data: [],
          borderColor: '#4200FF',
          fill: false,
          pointRadius: 1
        },
        { // std_down5
          data: [],
          borderColor: '#4200FF',
          fill: false,
          pointRadius: 1
        },
        { // avg12
          data: [],
          label: 'avg12',
          borderColor: '#AD00FF',
          fill: false,
          pointRadius: 1
        },
        { // std_up12
          data: [],
          borderColor: '#AD00FF',
          fill: false,
          pointRadius: 1
        },
        { // std_down12
          data: [],
          borderColor: '#AD00FF',
          fill: false,
          pointRadius: 1
        },
        { // avg50
          data: [],
          label: 'avg50',
          borderColor: '#FF00A8',
          fill: false,
          pointRadius: 1
        },
        { // std_up50
          data: [],
          borderColor: '#FF00A8',
          fill: false,
          pointRadius: 1
        },
        { // std_down50
          data: [],
          borderColor: '#FF00A8',
          fill: false,
          pointRadius: 1
        },
        { // avg100
          data: [],
          label: 'avg100',
          borderColor: '#FF8A00',
          fill: false,
          pointRadius: 1
        },
        { // std_up100
          data: [],
          borderColor: '#FF8A00',
          fill: false,
          pointRadius: 1
        },
        { // std_down100
          data: [],
          borderColor: '#FF8A00',
          fill: false,
          pointRadius: 1
        },
        { // avg1000
          data: [],
          label: 'avg1000',
          borderColor: 'purple',
          fill: false,
          pointRadius: 1
        },
        { // std_up1000
          data: [],
          borderColor: 'purple',
          fill: false,
          pointRadius: 1
        },
        { // std_down1000
          data: [],
          borderColor: 'purple',
          fill: false,
          pointRadius: 1
        }
      ],
      labels: [],
    },
    options: {
        title: {
          display: true,
          text: 'Chrono Graph',
          fontColor: '#FFF',
          fontSize: 36,
        },
        legend: {
          display: false,
        },
        spanGaps: true,
        elements: {
          line: {
              tension: 0.2
          }
        },
        scales: {
            xAxes: [{
              gridLines: {
                display: true,
                color: 'rgba(255, 255, 255, 0.5)',
              },
              ticks: {
                fontSize: 36,
                fontColor: '#FFF'
              }
            }],
            yAxes: [{
                //type: 'category',
                //labels: axisY,
                ticks: {
                    callback: function(value, index, values) {
                        return(compte_to_time(value));
                    },
                    suggestedMin: 5,//parseInt(mini_liste(liste)),
                    suggestedMax: 20,//parseInt(maxi_liste(liste)),
                    fontSize: 36,
                    fontColor: '#FFF',
                },
                gridLines: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.5)',
                },
            }],
        }
    }
});

let ctx_rsd=document.getElementById('canvas_graph_rsd');//.getContext('2d');
let graphRsd=new Chart(ctx_rsd, {
    type: 'line',
    data: {
        datasets: [{ // rsd5
            data: [],
            label: 'rsd5',
            borderColor: '#4200FF',
            fill: false,
            pointRadius: 1
          },
          { // rsd12
            data: [],
            label: 'rsd12',
            borderColor: '#AD00FF',
            fill: false,
            pointRadius: 1
          },
          { // rsd50
            data: [],
            label: 'rsd50',
            borderColor: '#FF00A8',
            fill: false,
            pointRadius: 1
          },
          { // rsd100
            data: [],
            label: 'rsd100',
            borderColor: '#FF8A00',
            fill: false,
            pointRadius: 1
          },
          { // rsd1000
            data: [],
            label: 'rsd1000',
            borderColor: 'purple',
            fill: false,
            pointRadius: 1
          },
        ],
        labels: [],
    },
    options: {
        title: {
          display: true,
          text: 'RSD Graph',
          fontColor: '#FFF',
          fontSize: 36,
        },
        legend: {
          display: false,
        },
        scales: {
            xAxes: [{
              gridLines: {
                display: true,
                color: 'rgba(255, 255, 255, 0.5)',
              },
              ticks: {
                fontSize: 36,
                fontColor: '#FFF'
              }
            }],
            yAxes: [{
                //type: 'category',
                //labels: scaleY,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                    fontSize: 36,
                    fontColor: '#FFF',
                },
                gridLines: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.5)',
                },
            }],
        }
    }
});

let ctx_rep=document.getElementById('canvas_repartition');//.getContext('2d');
let graphRep=new Chart(ctx_rep, {
    type: 'line',
    data: {
        datasets: [{ // Upper Chrono
            data: [],
            label: 'Upper Chrono',
            borderColor: 'green',
            fill: false,
            pointRadius: 3,
          },
          { // Lower Chrono
            data: [],
            label: 'Lower Chrono',
            borderColor: 'green',
            fill: true,
            pointRadius: 3,
          },
          { // liste of the Model of the repartition
            data: [],
            label: 'Model',
            borderColor: '#f04646',
            fill: true,
            pointRadius: 1
          },
          { // liste repartition of the Chronos
            data: [],
            label: 'Repartition',
            borderColor: 'rgba(255, 255, 255, 1)',
            fill: false
          }
        ],
        labels: [],
    },
    options: {
        title: {
          display: true,
          text: 'Repartition Graph',
          fontColor: '#FFF',
          fontSize: 36,
        },
        legend: {
          display: false,
        },
        scales: {
            xAxes: [{
              labels: [],
              gridLines: {
                display: true,
                color: 'rgba(255, 255, 255, 0.5)',
              },
              ticks: {
                fontSize: 36,
                fontColor: '#FFF'
              }
            }],
            yAxes: [{
                //type: 'category',
                //labels: axisY,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1,
                    fontSize: 36,
                    fontColor: '#FFF',
                },
                gridLines: {
                  display: true,
                  color: 'rgba(255, 255, 255, 0.5)',
                },
            }],
        }
    },
    lineAtIndex: [2,4,20]
});

function main(theme) {
  // choose the cube on the desktop version
  if (document.getElementById("choix_cubes")!=null) {
    categorie=String(document.getElementById("choix_cubes").value);
    // update image cube selection
    document.getElementById("activeCube").src="../image/cube/"+categorie+".jpg";
  }
  else {
    // update image cube selection on mobile version
    document.getElementById("activeCube").src="../image/cube/"+categorie+".png";
  }

  // extraction of the file
  var fileUpload=document.getElementById("fileUpload");
  var regex=/^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof(FileReader)!="undefined") {
      var reader=new FileReader();
      reader.onload=function(e) {
        var liste=[];
        var table=document.createElement("table");
        var rows=e.target.result.split("\n");

        const application=document.getElementById("choice_application").value;
        if (application=="Twisty Timer") {
          if (categorie=="3x3x3") {
            for (var i=0; i<rows.length-1; i++) {
              const temp=rows[i].split(";")[0].split("\"")[1];
              if (temp!="--") {
                liste.push(parseFloat(temp));
              }
            }
          }
          liste.reverse();
        }

        else if (application=="Cube Timer") {
          // cherche les données dans le fichier .csv
          for (var i=0; i<rows.length; i++) {
            var row=table.insertRow(-1);
            var cells=rows[i].split(","); // isole les lignes
            /*for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = cells[j];
            }
            */
            var subcells=cells[0].split(";"); // isole les composantes des lignes
            if (subcells[0]===categorie) { // sélection de la catégorie
              const sub1=subcells[1].split(":");
              var min=parseFloat(sub1[0]); // minutes
              var sec=parseFloat(sub1[1]); // secondes avec millisecondes
              var compt=time_to_compte([min,sec]);
              liste.push(compt);
            }
          }
        }

        display(theme,categorie,liste,graphAvg,graphRsd,graphRep);

      }
      reader.readAsText(fileUpload.files[0]);
    }
    else {
      alert("This browser does not support HTML5.");
    }
  }
}
