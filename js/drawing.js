function draw_single_line(context,x1,y1,x2,y2,color) {
  context.fillStyle = color ;
  context.strokeStyle = color ;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function draw_arc(context, x, y, r_courbure) {
  context.beginPath();
  context.arc(x, y, r_courbure, 0, 2*Math.PI);
  context.stroke();
}

function draw_text(context, text,x,y,color,size) {
  context.fillStyle = color ;
  context.strokeStyle = color ;
  context.font = String(size)+'px helvetica' ;
  context.fillText(text, x,y) ;
}


function graphique(canvas,context,liste, val,color,style,scale, d,l) { // val=valeurs des moyennes; d=distance par rapport au bord haut du canvas; l=largeur du graphique
  const height = canvas.height, width = canvas.width ;
  const x_max = maxi_liste(liste), x_min = mini_liste(liste) ;
  const x_m = (x_max+x_min)/2 ;
  const dist = d-x_m, c = l/(x_max-x_min) ;
  var i = 0 ;

  // plot grid
  grid_plot(canvas,context,scale,x_min,x_max,c,d,x_m,"gray") ;

  // plot chrono & meilleurs chrono
  if (val[i]===1) {
    var liste_temp = [] ;
    for (var j=0; j<=liste.length-val[i]; j++) {
      liste_temp.push(height-((liste[j]-x_m)*c+d)) ;
    }
    plot(context, liste_temp, width,val[i],color[i],style[i],"") ;
    // plot meilleur chrono
    plot_pb(canvas,context,liste_temp, "pink",val[i] , x_m,c,d) ;
  }

  var liste_exp = graph_exp(mobile_average(liste,12)) ;
  var liste_temp_exp = [] ;
  for (var j=0; j<liste_exp.length; j++) {
    liste_temp_exp.push(height-((liste_exp[liste_exp.length-j-1]-x_m)*c+d+150)) ;
  }
  //console.log(liste_temp_exp) ;
  plot(context, liste_temp_exp, width,12,"white",".-","") ;


  // plot moyenne & écart-type
  for (i=1; i<val.length; i++) {
    const text = "avg"+String(val[i]) ;
    if (document.getElementById(text+"_check").checked===true && liste.length>=val[i]) {
      const offset = val[i] ;
      var avg_liste = mobile_average(liste,offset) ;
      var ect_liste = ecart_type(liste,offset) ;
      for (var j=0; j<=liste.length-val[i]; j++) {
        avg_liste[j] = height-((avg_liste[j]-x_m)*c+d) ;
        ect_liste[j] = (ect_liste[j])*c ;
      }
      plot(context, avg_liste, width,offset,color[i],style[i],text) ;
      if (document.getElementById("ect"+String(val[i])+"_check").checked===true) {
        const n = 1.96 // intervalle de confiance
        plot_ecart_type_I(canvas,context, avg_liste,ect_liste, color[i],offset, n) ;
        plot_ecart_type_II(canvas,context, avg_liste,ect_liste, color[i],offset, n) ;
      }
    }
  }
}

function plot(context, y, width,offset, color,style,text) {
  const margin = 100 ; // marge par rapport au bord droit
  const len = y.length
  context.fillStyle = color ;
  context.strokeStyle = color ;
  context.beginPath() ;
  context.moveTo(offset*(width-margin)/(len+offset), y[len-1]) ;
  for (var i=1; i<len; i++) {
    context.lineTo((i+offset)*(width-margin)/(len+offset), y[len-i-1]) ;
  }
  context.stroke() ;
  if (style===".-") {
    for (var i=0; i<len; i++) {
      draw_arc(context, (i+offset)*(width-margin)/(len+offset), y[len-i-1],2) ;
    }
  }
  draw_text(context, text, (width-margin), y[0],color,17) ;
}

function plot_pb(canvas,context,liste, color,offset, x_m,c,d) {
  const height = canvas.height, width = canvas.width ;
  const margin = 100 ; // marge par rapport au bord droit
  liste.reverse() ;
  var pbliste = [0,liste[0]] ;
  for (var i=1; i<liste.length; i++) {
    if (liste[i]>pbliste[1]) {
      draw_single_line(context, (pbliste[0]+offset)*(width-margin)/(liste.length+offset),
                                pbliste[1],
                                (i+offset)*(width-margin)/(liste.length+offset),
                                liste[i],color) ;
      pbliste = [i,liste[i]] ;
    }
  }
  document.getElementById("PB").innerHTML = "PB: "+compte_to_time((height-pbliste[1]-d)/c+x_m) ;
  liste.reverse() ;
}

function grid_plot(canvas,context,scale,mini,maxi,c,d,x_m,color) {
  for (var i=parseInt(mini); i<=parseInt(maxi); i+=scale) {
    const y = canvas.height-((i-x_m)*c+d) ;
    draw_single_line(context, 0,y, canvas.width,y, color) ;
    draw_text(context, String(compte_to_time(i)),canvas.width-40,y,color,17) ;
  }
}

function grid_std(canvas,context,scale,mini,maxi,c,d,x_m,color) {
  for (var i=parseInt(mini); i<=parseInt(maxi); i+=scale) {
    const y = canvas.height-((i-x_m)*c+d) ;
    if (i==8 || i==12) {
      draw_single_line(context, 0,y, canvas.width,y, "red") ;
      draw_text(context, String(i),canvas.width-40,y,"red",17) ;
    }
    else {
      draw_single_line(context, 0,y, canvas.width,y, color) ;
      draw_text(context, String(i),canvas.width-40,y,color,17) ;
    }
  }
}

function plot_ecart_type_I(canvas,context, avg_liste,ect_liste, color,offset,n) { // n=pour intervalle de confiance n=1.95 -> 95%
  const len = avg_liste.length ;
  const margin = 100, height = canvas.height, width = canvas.width ;
  for (var i=0; i<len; i++) {
    if ((len-i-1)%10===0) {
      draw_single_line(context,(i+offset)*(width-margin)/(len+offset),
                               avg_liste[len-i-1]+n*ect_liste[len-i-1],
                               (i+offset)*(width-margin)/(len+offset),
                               avg_liste[len-i-1]-n*ect_liste[len-i-1],
                               color) ;
    }
  }
}

function plot_ecart_type_II(canvas,context, avg_liste,ect_liste, color,offset,n) {
  var ect_up = [], ect_down = [] ;
  for (var i=0; i<avg_liste.length; i++) {
    ect_up.push(avg_liste[i]+n*ect_liste[i]) ;
    ect_down.push(avg_liste[i]-n*ect_liste[i]) ;
  }
  plot(context, ect_up,canvas.width,offset, color,"-","") ;
  plot(context, ect_down,canvas.width,offset, color,"-","") ;
}


function graph_coeff_corr(canvas,context,liste,val,color,style,d,l) {
  // recherche du min et du max de coefficient de correlation
  var x_max = maxi_liste(standard_deviation(liste,val[1])), x_min = mini_liste(standard_deviation(liste,val[1])) ;
  for (var i=2; i<val.length; i++) {
    if (liste.length>val[i]) {
      var max_temp = maxi_liste(standard_deviation(liste,val[i])) ;
      var min_temp = mini_liste(standard_deviation(liste,val[i])) ;
      if (max_temp+1>x_max) {
        x_max = max_temp+1 ;
      }
      if (min_temp-1<x_min) {
        x_min = min_temp-1 ;
      }
    }
  }

  const x_m = (x_max+x_min)/2 ;
  const dist = d-x_m, c = l/(x_max-x_min) ;

  grid_std(canvas,context,1,x_min,x_max,c,d,x_m,"gray") ;

  for (var i=1; i<val.length; i++) {
    if (document.getElementById("std"+String(val[i])+"_check").checked===true) {
      const text = "std"+String(val[i]) ;
      if (liste.length>=val[i]) { // && document.getElementById(text+"_check").checked===true) {
        const offset = val[i] ;
        var std_liste = standard_deviation(liste,offset) ;
        for (var j=0; j<=liste.length-val[i]; j++) {
          std_liste[j] = canvas.height-((std_liste[j]-x_m)*c+d) ;
        }
        plot(context, std_liste, canvas.width,offset,color[i],style[i],text) ;
        // ajouter un écart-type ?
      }
    }
  }
}

function graph_exp(liste) {
  var somme_y1 = 0, somme_y2 = 0 ;
  const n0 = 0 ;
  const N = liste.length+n0 ;
  var alpha=0.7, b=0;
  var modele = [] ;

  for (var i=0; i<liste.length; i++) {
    somme_y1+=liste[i] ;
    somme_y2+=Math.pow(liste[i],2) ;
  }
  var func = somme_y2*(1+alpha) -Math.pow(somme_y1,2)*(Math.pow(alpha,n0)+Math.pow(alpha,N))*(1-alpha) ;
  //console.log(func,somme_y1,somme_y2) ;

  while(func<0 && func>-10000000000 && alpha<1) {
    func = somme_y2*(1+alpha) -Math.pow(somme_y1,2)*(Math.pow(alpha,n0)+Math.pow(alpha,N))*(1-alpha) ;
    alpha+=0.00001 ;
    b = somme_y1*(1-alpha)/(Math.pow(alpha,n0)-Math.pow(alpha,N)) ;
  }
  console.log(func,alpha,b) ;
  console.log(Math.log(liste[0]/b)/Math.log(alpha)) ;
  const n_temp = parseInt(Math.log(liste[0]/b)/Math.log(alpha)) ;
  console.log(n_temp) ;
  for (var i=n_temp; i<N+n_temp; i++) {
    modele.push(b*Math.pow(alpha,i)) ;
  }
  return (modele) ;
}
