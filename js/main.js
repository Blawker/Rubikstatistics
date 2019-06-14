function main_light() {
  Upload("normal");
}

function main_dark() {
  Upload("dark");
}

function Upload(theme) {
  const categorie=String(document.getElementById("choix_cubes").value);
  var fileUpload=document.getElementById("fileUpload");
  var regex=/^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof(FileReader)!="undefined") {
      var reader=new FileReader();
      reader.onload=function(e) {
        var liste=[];
        var table=document.createElement("table");
        var rows=e.target.result.split("\n");
        const periode=parseInt(document.getElementById("periode_input").value);

        if (document.getElementById("choice_application").value=="Twisty Timer") {
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

        else if (document.getElementById("choice_application").value=="Cube Timer") {
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


        var canvas=document.getElementById("canvas");
        var context=canvas.getContext("2d");
        const len_l=liste.length;

        // setup mobile average and standard deviation style and values
        const val=  [1,   5,  12, 50, 100,1000] ;
        const style=[".-","-","-","-","-","-"];
        var color;
        if (theme==="dark") {
          color=["white",'#F30','#FD0','#6C0','#09F',"purple"];
        }
        else {
          color=["black","red","orange","green","blue","purple"];
        }

        // setup cube
        const type_cube=["2x2x2","3x3x3","4x4x4","5x5x5","6x6x6","7x7x7","Megaminx"];
        var scale_table=[ 1,      1,      10,     15,     15,     15,     10];
        var scale=1;

        context.clearRect(0,0,canvas.width,canvas.height);

        // update the value of the table
        valeurs_tableau(liste,val);

        // restriction du nombre de données
        if (len_l>periode) {
          for (var i=0; i<len_l-periode; i++) {
            liste.pop(0);
          }
        }
        liste.reverse();

        // choix de l'échelle de la grille
        for (var i=0; i<type_cube.length; i++) {
          if (categorie===type_cube[i]) {
            scale=scale_table[i];
            break;
          }
        }

        // graphique chrono & moyenne & écart-type
        draw_text(context,"Graphique des Chronos",10,30,color[0],26);
        graphique(canvas,context,liste,val,color,style,scale,1000,940); // d = distance par rapport au bord haut du canvas; l = largeur du graphique

        // graphique coefficient de corrélation
        draw_text(context,"Graphique du Coefficient de Corr\u00e9lation",10,1040,color[0],26) ;
        graph_coeff_corr(canvas,context,liste,val,color,style,250,440) ;
      }
      reader.readAsText(fileUpload.files[0]);
    }
    else {
      alert("This browser does not support HTML5.");
    }
  }
}
