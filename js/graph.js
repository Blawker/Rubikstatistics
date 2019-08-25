function graphic_avg_rsd(graphAvg,graphRsd,liste,scale_cube,value_avg) {
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
  let avg_liste=[];
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("avg"+String(value_avg[i])+"_check").checked==true) {
        let temp_liste=[];
        for (let j=0; j<value_avg[i]-1; j++) {
          temp_liste.push(null);
        }
        const temp_avg=mobile_average(liste,value_avg[i]);
        for (let j=0; j<temp_avg.length; j++) {
          temp_liste.push(temp_avg[j]);
        }
        avg_liste.push(temp_liste);
      }
      else {avg_liste.push([]);}
    }
    else {break;}
  }
  const avg5=avg_liste[0];
  const avg12=avg_liste[1];
  const avg50=avg_liste[2];
  const avg100=avg_liste[3];
  const avg1000=avg_liste[4];

  // STD
  const n=1.96;
  let std_up_liste=[],std_down_liste=[];
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("avg"+String(value_avg[i])+"_check").checked==true && document.getElementById("std"+String(value_avg[i])+"_check").checked==true) {
        let temp_up_liste=[],temp_down_liste=[];
        for (let j=0; j<value_avg[i]-1; j++) {
          temp_up_liste.push(null);
          temp_down_liste.push(null);
        }
        const temp_avg=avg_liste[i-1];
        const temp_std=standard_deviation(liste,value_avg[i]);
        for (let j=0; j<temp_std.length; j++) {
          temp_up_liste.push(temp_avg[j+value_avg[i]]+n*temp_std[j]);
          temp_down_liste.push(temp_avg[j+value_avg[i]]-n*temp_std[j]);
        }
        std_up_liste.push(temp_up_liste);
        std_down_liste.push(temp_down_liste);
      }
      else {
        std_up_liste.push([]);
        std_down_liste.push([]);
      }
    }
    else {break;}
  }
  const std_up5=std_up_liste[0];
  const std_up12=std_up_liste[1];
  const std_up50=std_up_liste[2];
  const std_up100=std_up_liste[3];
  const std_up1000=std_up_liste[4];
  const std_down5=std_down_liste[0];
  const std_down12=std_down_liste[1];
  const std_down50=std_down_liste[2];
  const std_down100=std_down_liste[3];
  const std_down1000=std_down_liste[4];

  // RSD
  let rsd_liste=[];
  let min_rsd=1000,max_rsd=0;
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
      if (document.getElementById("rsd"+String(value_avg[i])+"_check").checked==true) {
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
        rsd_liste.push(temp_liste);
      }
      else {rsd_liste.push([]);}
    }
    else {break;}
  }
  const rsd5=rsd_liste[0];
  const rsd12=rsd_liste[1];
  const rsd50=rsd_liste[2];
  const rsd100=rsd_liste[3];
  const rsd1000=rsd_liste[4];

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
  graphAvg.data.datasets[3].data=avg5;
  graphAvg.data.datasets[4].data=std_up5;
  graphAvg.data.datasets[5].data=std_down5;
  graphAvg.data.datasets[6].data=avg12;
  graphAvg.data.datasets[7].data=std_up12;
  graphAvg.data.datasets[8].data=std_down12;
  graphAvg.data.datasets[9].data=avg50;
  graphAvg.data.datasets[10].data=std_up50;
  graphAvg.data.datasets[11].data=std_down50;
  graphAvg.data.datasets[12].data=avg100;
  graphAvg.data.datasets[13].data=std_up100;
  graphAvg.data.datasets[14].data=std_down100;
  graphAvg.data.datasets[15].data=avg1000;
  graphAvg.data.datasets[16].data=std_up1000;
  graphAvg.data.datasets[17].data=std_down1000;
  graphAvg.update();

  // Update Graph RSD
  graphRsd.options.scales.yAxes[0].ticks.suggestedMin=parseInt(min_rsd);
  graphRsd.options.scales.yAxes[0].ticks.suggestedMax=parseInt(max_rsd);
  graphRsd.data.labels=scaleX;
  graphRsd.data.datasets[0].data=rsd5;
  graphRsd.data.datasets[1].data=rsd12;
  graphRsd.data.datasets[2].data=rsd50;
  graphRsd.data.datasets[3].data=rsd100;
  graphRsd.data.datasets[4].data=rsd1000;
  graphRsd.update();
}

function graphic_rep(graphRep,liste) {
  const dt=parseInt(maxi_liste(liste)-mini_liste(liste))/1000;
  const t0=parseInt(mini_liste(liste));
  const liste_rep=repartition_function(liste,t0,dt);

  // Modelisation
  // middle of the repartition function
  let offset_sig=0;
  for (let i=0; i<liste_rep.length-1; i++) {
    if (liste_rep[i]<=0.5 && liste_rep[i+1]>=0.5) {
      offset_sig=dt*(2*i+1)/2;
      break;
    }
  }
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
