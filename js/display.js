function display(theme,categorie,data) {
  const periode=parseInt(document.getElementById("input_nb_chronos").value);
  var canvas=document.getElementById("canvas");
  var context=canvas.getContext("2d");
  const len_l=data.length;
  const margin=100;
  var liste=[];

  // setup mobile average and standard deviation style and values
  const val=  [1,   5,  12, 50, 100,1000] ;
  const style=[".-","-","-","-","-","-"];
  var color;
  if (theme==="dark") {
    color=["white",'#F30','#FD0','#6C0','#09F',"#D501FF"];
  }
  else {
    color=["black","red","orange","green","blue","purple"];
  }

  // setup cube
  const type_cube=["2x2x2","3x3x3","4x4x4","5x5x5","6x6x6","7x7x7","Megaminx"];
  const scale_table=[ 1,      1,       5,     15,     15,     15,     10]; // en secondes
  var scale=1;
  context.lineWidth=2;

  context.clearRect(0,0,canvas.width,canvas.height);

  // update the value of the table
  valeurs_tableau(data,val);

  // restriction du nombre de données
  if (len_l>periode) {
    for (var i=0; i<periode; i++) {
      liste.push(data[i]);
    }
  }
  else {
    for (var i=0; i<len_l; i++) {
      liste.push(data[i]);
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

  // display every charts
  var nb_graph=0;
  for (var i=2; i<val.length; i++) {
    if (document.getElementById("rsd"+String(val[i])+"_check").checked===true) {
      nb_graph=1;
      break;
    }
  }


  var canvas_repartition=document.getElementById("canvas_repartition");
  var context_repartion=canvas_repartition.getContext("2d");
  plot_repartition_function(canvas_repartition,context_repartion,liste,val,color,style,scale,canvas_repartition.height-10,canvas_repartition.height-10/2,10);

  if (nb_graph==1) {
    // graphique chrono & moyenne & écart-type
    draw_text(context,"Graphique des Chronos",10,30,color[0],26);
    graphique(canvas,context,liste,val,color,style,scale,canvas.height*2/3,canvas.height*2/3-margin/2,margin); // d=distance par rapport au bord du canvas(1000,940); l=largeur du graphique

    // graphique coefficient de corrélation
    draw_text(context,"Graphique du Coefficient de Corr\u00e9lation",10,canvas.height*2/3+30,color[0],26) ;
    graph_rsd(canvas,context,liste,val,color,style,0,canvas.height/3,margin); // 250,440
  }
  else if (nb_graph==0) {
    // graphique chrono & moyenne & écart-type
    draw_text(context,"Graphique des Chronos",10,30,color[0],26);
    graphique(canvas,context,liste,val,color,style,scale,canvas.height,canvas.height-margin/2,margin);
  }
}
