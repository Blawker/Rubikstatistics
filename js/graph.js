function graphic_avg_rsd(liste,scale_cube,value_avg) {
  let scaleX=[];
  let scaleY=[];
  for (let i=0; i<=liste.length; i++) {
    scaleX.push(i);
  }
  for (let i=parseInt(maxi_liste(chrono)); i>=parseInt(mini_liste(chrono))-parseInt(mini_liste(chrono))%scale_cube; i-=scale_cube) {
    scaleY.push(compte_to_time(i));
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
        for (let j=0; j<value_avg[i]; j++) {
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
        for (let j=0; j<value_avg[i]; j++) {
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

  let ctx = document.getElementById('canvas_graph_avg');//.getContext('2d');
  let graphAvg = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              data: pb_liste,
              label: 'PB',
              borderColor: '#00FFFF',
              fill: false
            },
            {
              data: liste,
              label: 'Chrono',
              borderColor: 'rgba(255, 255, 255, 1)',
              fill: false
            },
            {
              data: liste_exp,
              label: 'Exponential Regression',
              borderColor: 'rgba(255, 255, 255, 1)',
              fill: false,
              pointRadius: 2
            },
            {
              data: avg5,
              label: 'avg5',
              borderColor: '#4200FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_up5,
              borderColor: '#4200FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_down5,
              borderColor: '#4200FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg12,
              label: 'avg12',
              borderColor: '#AD00FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_up12,
              borderColor: '#AD00FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_down12,
              borderColor: '#AD00FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg50,
              label: 'avg50',
              borderColor: '#FF00A8',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_up50,
              borderColor: '#FF00A8',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_down50,
              borderColor: '#FF00A8',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg100,
              label: 'avg100',
              borderColor: '#FF8A00',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_up100,
              borderColor: '#FF8A00',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_down100,
              borderColor: '#FF8A00',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg1000,
              label: 'avg1000',
              borderColor: 'purple',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_up1000,
              borderColor: 'purple',
              fill: false,
              pointRadius: 1
            },
            {
              data: std_down1000,
              borderColor: 'purple',
              fill: false,
              pointRadius: 1
            }
          ],
          labels: scaleX,
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
                  labels: scaleY,
                  ticks: {
                      suggestedMin: parseInt(mini_liste(liste)),
                      suggestedMax: parseInt(maxi_liste(liste)),
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

  let ctx_rsd = document.getElementById('canvas_graph_rsd');//.getContext('2d');
  let graphRsd = new Chart(ctx_rsd, {
      type: 'line',
      data: {
          datasets: [{
              data: rsd5,
              label: 'rsd5',
              borderColor: '#4200FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: rsd12,
              label: 'rsd12',
              borderColor: '#AD00FF',
              fill: false,
              pointRadius: 1
            },
            {
              data: rsd50,
              label: 'rsd50',
              borderColor: '#FF00A8',
              fill: false,
              pointRadius: 1
            },
            {
              data: rsd100,
              label: 'rsd100',
              borderColor: '#FF8A00',
              fill: false,
              pointRadius: 1
            },
            {
              data: rsd1000,
              label: 'rsd1000',
              borderColor: 'purple',
              fill: false,
              pointRadius: 1
            },
          ],
          labels: scaleX,
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
                  labels: scaleY,
                  ticks: {
                      suggestedMin: parseInt(min_rsd),
                      suggestedMax: parseInt(max_rsd),
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
}

function graphic_rep(liste) {
  const dt=(maxi_liste(liste)-mini_liste(liste))/1000;
  const t0=mini_liste(liste);
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
  for (let i=0; i<=liste_rep.length; i++) {
    scaleX.push(i);
  }

  let ctx = document.getElementById('canvas_repartition');//.getContext('2d');
  let graphRep = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              data: liste_rep,
              label: 'Repartition',
              borderColor: 'rgba(255, 255, 255, 1)',
              fill: false
            },
            {
              data: liste_sig,
              label: 'Model',
              borderColor: '#4200FF',
              fill: false,
              pointRadius: 1
            }
          ],
          labels: scaleX,
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
      }
  });
}
