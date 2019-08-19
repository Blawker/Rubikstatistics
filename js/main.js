function main_light() {
  main("normal");
}

function main_dark() {
  main("dark");
}


function main(theme) {
  const categorie="3x3x3"; //String(document.getElementById("choix_cubes").value);
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

        display(theme,categorie,liste);

      }
      reader.readAsText(fileUpload.files[0]);
    }
    else {
      alert("This browser does not support HTML5.");
    }
  }
}
