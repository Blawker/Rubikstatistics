function draw_single_line(context,x1,y1,x2,y2,color) {
  context.fillStyle = color ;
  context.strokeStyle = color ;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function draw_arc(context,x,y,r_courbure) {
  context.beginPath();
  context.arc(x, y, r_courbure, 0, 2*Math.PI);
  context.stroke();
}

function draw_text(context,text,x,y,color,size) {
  context.fillStyle = color ;
  context.strokeStyle = color ;
  context.font = String(size)+'px helvetica' ;
  context.fillText(text, x,y) ;
}


function graphique(canvas,context,liste,val,color,style,scale,d,l,margin) { // val=valeurs des moyennes; d=distance par rapport au bord haut du canvas; l=largeur du graphique
  const max=maxi_liste(liste),min=mini_liste(liste);
  const scale_x=(canvas.width-margin)/liste.length;
  const scale_y=(l-margin)/(max-min);
  const x0=20;
  const y0=d+min*scale_y-margin;

  // plot grid
  grid_plot(context,y0,scale_y,scale,min,max,"gray");

  // plot chrono
  plot(context,x0,y0,scale_x,scale_y,liste,color[0],style[0],"");

  // plot meilleurs chrono
  plot_pb(context,x0,y0,scale_x,scale_y,liste,"pink");

  // Exponential Regression
  if (document.getElementById("reg_check").checked==true) {
    const offset_exp=parseInt(document.getElementById("avg_reg_input").value);
    const liste_exp=graph_exp_reg_II(liste,offset_exp);
    plot(context,x0+(offset_exp-1)*scale_x,y0,scale_x,scale_y,liste_exp,color[0],".-","");
    //plot(context,x0+(offset_exp-1)*scale_x,y0-350,scale_x,scale_y,exp(),"red","-","");
  }

  // plot average & standard deviation
  for (i=1; i<val.length; i++) {
    const text="avg"+String(val[i]);
    if (document.getElementById(text+"_check").checked===true && liste.length>=val[i]) {
      const offset=val[i];
      const avg_liste=mobile_average(liste,offset);
      const std_liste=standard_deviation(liste,offset);
      plot(context,x0+(offset-1)*scale_x,y0,scale_x,scale_y,avg_liste,color[i],style[i],text);
      if (document.getElementById("std"+String(val[i])+"_check").checked===true) {
        const n=1.96; // intervalle de confiance
        plot_ecart_type(context,x0+(offset-1)*scale_x,y0,scale_x,scale_y,avg_liste,std_liste,n,color[i],style[i],"");
      }
    }
  }


  /*/Prototype: // Repartition function
  const dt=0.05;
  const liste_rep=repartition_function(liste,dt);
  plot(context,x0,canvas.height-10,(canvas.width-margin)/liste_rep.length,l-margin,liste_rep,"red",".-","");

  // middle of the repartition function
  var offset_sig=0;
  for (var i=0; i<liste_rep.length-1; i++) {
    if (liste_rep[i]<=0.5 && liste_rep[i+1]>=0.5) {
      offset_sig=dt*(2*i+1)/2;
    }
  }
  var a=4*derivate(liste_rep,offset_sig,dt,50);
  var liste_sig=[];
  for (var i=0; i<liste_rep.length; i++) {
    liste_sig.push(sigmoid(i*dt-offset_sig,a));
  }
  plot(context,x0,canvas.height-10,(canvas.width-margin)/liste_rep.length,l-margin,liste_sig,"blue","-","");

  // add an interface for the probability to between to chronos
  const upper_chrono=20,lower_chrono=0;
  console.log("P="+String(100*(sigmoid(upper_chrono-offset_sig,a)-sigmoid(lower_chrono-offset_sig,a)))+"%");
  draw_single_line(context,x0+upper_chrono*(canvas.width-margin)/(dt*liste_rep.length),canvas.height-10,x0+upper_chrono*(canvas.width-margin)/(dt*liste_rep.length),canvas.height-10-sigmoid(upper_chrono-offset_sig,a)*(l-margin),"green");
  draw_single_line(context,x0+lower_chrono*(canvas.width-margin)/(dt*liste_rep.length),canvas.height-10,x0+lower_chrono*(canvas.width-margin)/(dt*liste_rep.length),canvas.height-10-sigmoid(lower_chrono-offset_sig,a)*(l-margin),"green");
  /*
  // average of all chrono
  offset_sig=mobile_average(liste,liste.length)[0];
  a=4*derivate(liste_rep,offset_sig,dt,20);
  liste_sig=[];
  for (var i=0; i<liste_rep.length; i++) {
    liste_sig.push(sigmoid(i*dt-offset_sig,a));
  }
  console.log(a,offset_sig);
  plot(context,x0,canvas.height-10,(canvas.width-margin)/liste_rep.length,l-margin,liste_sig,"green","-","");
  //*/
}

function plot(context,x0,y0,scale_x,scale_y,liste,color,style,text) {
  context.fillStyle=color;
  context.strokeStyle=color;
  context.beginPath();
  context.moveTo(x0,y0-liste[0]*scale_y);
  for (var i=1; i<liste.length; i++) {
    context.lineTo(x0+i*scale_x,y0-liste[i]*scale_y);
  }
  context.stroke();
  if (style===".-") {
    for (var i=0; i<liste.length; i++) {
      draw_arc(context,x0+i*scale_x,y0-liste[i]*scale_y,2);
    }
  }
  draw_text(context,text,x0+i*scale_x,y0-liste[i-1]*scale_y,color,17);
}

function plot_pb(context,x0,y0,scale_x,scale_y,liste,color) {
  var pbliste=[0,liste[0]];
  for (var i=1; i<liste.length; i++) {
    if (liste[i]<pbliste[1]) {
      draw_single_line(context,x0+pbliste[0]*scale_x,y0-pbliste[1]*scale_y,x0+i*scale_x,y0-liste[i]*scale_y,color);
      pbliste=[i,liste[i]];
    }
  }
  //document.getElementById("PB").innerHTML="PB: "+compte_to_time((height-pbliste[1]-d)/c+x_m);
}

function grid_plot(context,y0,scale_y,scale,min,max,color) {
  for (var i=parseInt(min); i<=parseInt(max); i+=scale) {
    draw_single_line(context,0,y0-i*scale_y,canvas.width,y0-i*scale_y,color);
    draw_text(context,String(compte_to_time(i)),canvas.width-40,y0-i*scale_y,color,17);
  }
}

function plot_ecart_type(context,x0,y0,scale_x,scale_y,avg_liste,ect_liste,n,color,style,text) {
  const len=avg_liste.length;
  // vertical line
  for (var i=0; i<len; i++) {
    if ((len-i-1)%10===0) {
      draw_single_line(context,x0+i*scale_x,
                               y0-(avg_liste[i]+n*ect_liste[i])*scale_y,
                               x0+i*scale_x,
                               y0-(avg_liste[i]-n*ect_liste[i])*scale_y,
                               color);
    }
  }
  // upper and lower bands
  var ect_up=[],ect_down=[];
  for (var i=0; i<len; i++) {
    ect_up.push(avg_liste[i]+n*ect_liste[i]);
    ect_down.push(avg_liste[i]-n*ect_liste[i]);
  }
  plot(context,x0,y0,scale_x,scale_y,ect_up,color,style,text);
  plot(context,x0,y0,scale_x,scale_y,ect_down,color,style,text);
}


function grid_rsd(context,y0,scale_y,min,max,color) {
  for (var i=parseInt(min); i<=parseInt(max); i++) {
    if (i==8 || i==12) {
      draw_single_line(context,0,y0-i*scale_y,canvas.width,y0-i*scale_y,"red");
      draw_text(context,String(i),canvas.width-40,y0-i*scale_y,"red",17);
    }
    else {
      draw_single_line(context,0,y0-i*scale_y,canvas.width,y0-i*scale_y,color);
      draw_text(context,String(i),canvas.width-40,y0-i*scale_y,color,17);
    }
  }
}

function graph_rsd(canvas,context,liste,val,color,style,d,l,margin) {
  // recherche du min et du max de coefficient de correlation
  var max=0,min=1000;
  for (var i=1; i<val.length; i++) {
    if (liste.length>val[i] && document.getElementById("rsd"+String(val[i])+"_check").checked===true) {
      if (liste.length>val[i]) {
        const max_temp=maxi_liste(relative_standard_deviation(liste,val[i]));
        const min_temp=mini_liste(relative_standard_deviation(liste,val[i]));
        if (max_temp+1>max) {
          max=max_temp+1;
        }
        if (min_temp-1<min) {
          min=min_temp-1;
        }
      }
    }
  }
  const scale_x=(canvas.width-margin)/liste.length;
  const scale_y=(l-margin)/(max-min);
  const x0=20;
  const y0=canvas.height+min*scale_y-margin/2;

  grid_rsd(context,y0,scale_y,min,max,"gray");

  for (var i=1; i<val.length; i++) {
    if (document.getElementById("rsd"+String(val[i])+"_check").checked===true) {
      const text="rsd"+String(val[i]);
      if (liste.length>=val[i]) { // && document.getElementById(text+"_check").checked===true) {
        const offset=val[i];
        const rsd_liste=relative_standard_deviation(liste,offset);
        plot(context,x0+(offset-1)*scale_x,y0,scale_x,scale_y,rsd_liste,color[i],style[i],text);
        // ajouter un écart-type ?
      }
    }
  }
}


function plot_repartition_function(canvas,context,liste,val,color,style,scale,d,l,margin) {
  const x0=10,y0=canvas.height-margin/2;
  context.clearRect(0,0,canvas.width,canvas.height);
  context.lineWidth=1;

  draw_text(context,"Repartition Function",margin,2*margin,color[0],18);

  //Prototype: // Repartition function
  const dt=(maxi_liste(liste)-mini_liste(liste))/1000;
  const t0=mini_liste(liste);
  const liste_rep=repartition_function(liste,t0,dt);
  plot(context,x0,y0,(canvas.width-2*margin)/liste_rep.length,l-margin,liste_rep,color[1],".-","");

  // middle of the repartition function
  var offset_sig=0;
  for (var i=0; i<liste_rep.length-1; i++) {
    if (liste_rep[i]<=0.5 && liste_rep[i+1]>=0.5) {
      offset_sig=dt*(2*i+1)/2;
      break;
    }
  }
  const a=4*derivate(liste_rep,offset_sig,dt,50);
  var liste_sig=[];
  for (var i=0; i<liste_rep.length; i++) {
    liste_sig.push(sigmoid(i*dt-offset_sig,a));
  }
  context.lineWidth=2;
  plot(context,x0,y0,(canvas.width-2*margin)/liste_sig.length,l-margin,liste_sig,color[4],"-","");

  // add an interface for the probability to between to chronos
  const upper_chrono=time_to_compte([parseFloat(document.getElementById("upper_chrono_min_input").value),parseFloat(document.getElementById("upper_chrono_sec_input").value)]);
  const lower_chrono=time_to_compte([parseFloat(document.getElementById("lower_chrono_min_input").value),parseFloat(document.getElementById("lower_chrono_sec_input").value)]);
  const x_up=x0+(upper_chrono-t0+50*dt)*(canvas.width-2*margin)/(dt*(liste_rep.length));
  const x_lo=x0+(lower_chrono-t0+50*dt)*(canvas.width-2*margin)/(dt*(liste_rep.length));

  const text_prob_betw=String(Math.round(1000*100*(sigmoid(upper_chrono-t0+50*dt-offset_sig,a)-sigmoid(lower_chrono-t0+50*dt-offset_sig,a)))/1000)+"%";
  if (document.getElementById("probability_between_output")!='undefined' && document.getElementById("probability_between_output")!=null) {
    document.getElementById("probability_between_output").innerHTML="P="+text_prob_betw;
  }
  else {
    draw_text(context,"P = "+text_prob_betw,margin,4*margin,color[0],18);
  }


  draw_single_line(context,x_up,y0,x_up,y0-sigmoid(upper_chrono-t0+50*dt-offset_sig,a)*(l-margin),color[3]);
  draw_text(context,str_min_round(compte_to_time(upper_chrono)),x_up-35,y0,color[0],16);

  draw_single_line(context,x_lo,y0,x_lo,y0-sigmoid(lower_chrono-t0+50*dt-offset_sig,a)*(l-margin),color[3]);
  draw_text(context,str_min_round(compte_to_time(lower_chrono)),x_lo+10,y0,color[0],16);
}
