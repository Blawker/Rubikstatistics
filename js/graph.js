function graphic(liste,scale_cube,value_avg,periode) {
  let scaleX=[];
  let scaleY=[];

  let avg_liste=[];
  for (let i=1; i<value_avg.length; i++) {
    if (liste.length>=value_avg[i]) {
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
    else {
      break;
    }
  }

  const avg5=avg_liste[0];
  const avg12=avg_liste[1];
  const avg50=avg_liste[2];
  const avg100=avg_liste[3];
  const avg1000=avg_liste[4];

  for (let i=0; i<=periode; i++) {
    scaleX.push(i);
  }
  for (let i=parseInt(maxi_liste(chrono)); i>=parseInt(mini_liste(chrono))-parseInt(mini_liste(chrono))%scale_cube; i-=scale_cube) {
    scaleY.push(compte_to_time(i));
  }

  console.log(liste);

  let ctx = document.getElementById('canvas_graph_avg_rsd');//.getContext('2d');
  let graphAvg = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              data: liste,
              label: 'Chrono',
              borderColor: 'rgba(255, 255, 255, 1)',
              fill: false
            },
            {
              data: avg5,
              label: 'avg5',
              borderColor: 'red',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg12,
              label: 'avg12',
              borderColor: 'yellow',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg50,
              label: 'avg50',
              borderColor: 'green',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg100,
              label: 'avg100',
              borderColor: 'blue',
              fill: false,
              pointRadius: 1
            },
            {
              data: avg1000,
              label: 'avg1000',
              borderColor: 'purple',
              fill: false,
              pointRadius: 1
          }],
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
}
