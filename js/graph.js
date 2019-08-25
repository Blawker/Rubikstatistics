function graphic_avg_rsd(graphAvg,graphRsd,liste,scale_cube,value_avg) {
  const len_liste_canvas=graphAvg.data.labels.length;
  let scaleX=[];
  let axisY=[];
  for (let i=0; i<liste.length; i++) {
    scaleX.push(i);
  }
  for (let i=parseInt(mini_liste(chrono)); i<=parseInt(maxi_liste(chrono))%scale_cube; i+=scale_cube) {
    axisY.push(compte_to_time(i));
  }

  // PB
  let pb_min=liste[0];
  let pb_liste=[liste[0]];
  for (let i=1; i<liste.length; i++) {
    if (liste[i]<pb_min) {
      pb_liste.push(liste[i]);
      pb_min=liste[i];
    }
    else {
      pb_liste.push(null);
    }
  }

  // AVG
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("avg"+String(value_avg[i])+"_check").checked==true) {
        graphAvg.data.datasets[i*3].hidden=false;
        if (len_liste_canvas!=liste.length || graphAvg.data.datasets[i*3].data.length==0) {
          let temp_liste=[];
          for (let j=0; j<value_avg[i]-1; j++) {
            temp_liste.push(null);
          }
          const temp_avg=mobile_average(liste,value_avg[i]);
          for (let j=0; j<temp_avg.length; j++) {
            temp_liste.push(temp_avg[j]);
          }
          graphAvg.data.datasets[i*3].data=temp_liste;
        }
      }
      else {
        graphAvg.data.datasets[i*3].hidden=true;
      }
    }
    else {
      break;
    }
  }

  // STD
  const n=1.96;
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("avg"+String(value_avg[i])+"_check").checked==true && document.getElementById("std"+String(value_avg[i])+"_check").checked==true) {
        graphAvg.data.datasets[i*3+1].hidden=false;
        graphAvg.data.datasets[i*3+2].hidden=false;
        if (len_liste_canvas!=liste.length || graphAvg.data.datasets[i*3+1].data.length==0) {
          let temp_up_liste=[],temp_down_liste=[];
          for (let j=0; j<value_avg[i]-1; j++) {
            temp_up_liste.push(null);
            temp_down_liste.push(null);
          }
          const temp_avg=graphAvg.data.datasets[i*3].data;
          const temp_std=standard_deviation(liste,value_avg[i]);
          for (let j=0; j<temp_std.length; j++) {
            temp_up_liste.push(temp_avg[j+value_avg[i]]+n*temp_std[j]);
            temp_down_liste.push(temp_avg[j+value_avg[i]]-n*temp_std[j]);
          }
          graphAvg.data.datasets[i*3+1].data=temp_up_liste;
          graphAvg.data.datasets[i*3+2].data=temp_down_liste;
        }
      }
      else {
        graphAvg.data.datasets[i*3+1].hidden=true;
        graphAvg.data.datasets[i*3+2].hidden=true;
      }
    }
    else {
      break;
    }
  }

  // RSD
  let min_rsd=1000,max_rsd=0;
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("rsd"+String(value_avg[i])+"_check").checked==true) {
        graphRsd.data.datasets[i-1].hidden=false;
        if (len_liste_canvas!=liste.length || graphRsd.data.datasets[i-1].data.length==0) {
          let temp_liste=[];
          for (let j=0; j<value_avg[i]; j++) {
            temp_liste.push(null);
          }
          const temp_rsd=relative_standard_deviation(liste,value_avg[i]);
          if (mini_liste(temp_rsd)<min_rsd) {
            min_rsd=mini_liste(temp_rsd);
          }
          if (maxi_liste(temp_rsd)>max_rsd) {
            max_rsd=maxi_liste(temp_rsd);
          }
          for (let j=0; j<temp_rsd.length; j++) {
            temp_liste.push(temp_rsd[j]);
          }
          graphRsd.data.datasets[i-1].data=temp_liste;
        }
      }
      else {
        graphRsd.data.datasets[i-1].hidden=true;
      }
    }
    else {
      break;
    }
  }

  // Exponential Regression
  let liste_exp=[];
  if (document.getElementById("reg_check").checked==true) {
    const offset_exp=parseInt(document.getElementById("avg_reg_input").value);
    const temp_exp=graph_exp_reg_II(liste,offset_exp);
    for (let i=0; i<temp_exp.length+offset_exp; i++) {
      if (i<offset_exp) {
        liste_exp.push(null);
      }
      else {
        liste_exp.push(temp_exp[i-offset_exp]);
      }
    }
  }
  else {
    const sub_time=time_to_compte([parseFloat(document.getElementById("sub_reg_min_input").value),parseFloat(document.getElementById("sub_reg_input").value)]);
    document.getElementById("probability").innerHTML="0 Cubes before avg"+document.getElementById("avg_reg_input").value+" sub"+String(sub_time);
  }

  // Update Graph Chronos + PB + AVG + RSD
  graphAvg.options.scales.yAxes[0].ticks.suggestedMin=parseInt(mini_liste(liste));
  graphAvg.options.scales.yAxes[0].ticks.suggestedMax=parseInt(maxi_liste(liste));
  graphAvg.data.labels=scaleX;
  graphAvg.data.datasets[0].data=pb_liste;
  graphAvg.data.datasets[1].data=liste;
  graphAvg.data.datasets[2].data=liste_exp;
  graphAvg.update();

  // Update Graph RSD
  graphRsd.options.scales.yAxes[0].ticks.suggestedMin=parseInt(min_rsd);
  graphRsd.options.scales.yAxes[0].ticks.suggestedMax=parseInt(max_rsd);
  graphRsd.data.labels=scaleX;
  graphRsd.update();
}

function graphic_avg_rsd_reset_value(graphAvg,graphRsd) {
  if (graphAvg.data.labels.length!=0) {
    for (let i=0; i<18; i++) {
      graphAvg.data.datasets[i].data=[];
    }
    for (let i=0; i<5; i++) {
      graphRsd.data.datasets[i].data=[];
    }
  }
}

function graphic_rep(graphRep,liste) {
  const len_graph_canvas=graphRep.data.labels.length;
  if (len_graph_canvas!=liste.length || len_graph_canvas==0) {
    const dt=parseInt(maxi_liste(liste)-mini_liste(liste))/1000;
    const t0=parseInt(mini_liste(liste));
    const liste_rep=repartition_function(liste,t0,dt);

    // middle of the repartition function
    let offset_sig=0;
    for (let i=0; i<liste_rep.length-1; i++) {
      if (liste_rep[i]<=0.5 && liste_rep[i+1]>=0.5) {
        offset_sig=dt*(2*i+1)/2;
        break;
      }
    }
    // Modelisation
    const a=4*derivate(liste_rep,offset_sig,dt,50);
    let liste_sig=[];
    for (let i=0; i<liste_rep.length; i++) {
      liste_sig.push(sigmoid(i*dt-offset_sig,a));
    }

    let scaleX=[];
    let axisX=[];
    for (let i=0; i<=liste_rep.length; i++) {
      scaleX.push(i);
      axisX.push(compte_to_time(parseInt((t0+i*dt)*10)/10));
    }

    // Update Graph Repartition
    graphRep.data.labels=scaleX;
    graphRep.data.datasets[0].data=liste_rep;
    graphRep.data.datasets[1].data=liste_sig;
    graphRep.options.scales.xAxes[0].labels=axisX;
    graphRep.update();
  }
}

function graphic_rep_reset_value(graphRep) {
  if (graphRep.data.labels.length!=0) {
    for (let i=0; i<2; i++) {
      graphRep.data.datasets[i].data=[];
    }
    graphRep.data.labels=[];
  }
}
