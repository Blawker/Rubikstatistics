function graphic(liste,scale_cube,value_avg,periode) {
  let scaleY = [];
  let scaleX = [];

  const chrono=liste;

  console.log(liste);

  for (let i=0; i<=periode; i+=1) {
    scaleX.push(i);
  }
  for (let i=parseInt(maxi_liste(chrono)); i>=parseInt(mini_liste(chrono))-parseInt(mini_liste(chrono))%scale_cube; i-=scale_cube) {
    scaleY.push(compte_to_time(i));
  }

  let ctx = document.getElementById('canvas_graph_avg_rsd').getContext('2d');
  let graphAvg = new Chart(ctx, {
      type: 'line',
      data: {
          datasets: [{
              data: chrono,
              label: 'Chrono',
            },/*
            {
              data: avg5,
              label: 'avg5',
            },
            {
              data: avg12,
              label: 'avg12',
            },
            {
              data: avg50,
              label: 'avg50',
            },
            {
              data: avg100,
              label: 'avg100',
            },
            {
              data:avg1000,
              label:'avg1000',
          }*/],
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
                  fontColor: '#FFF',
                }
              }],
              yAxes: [{
                  type: 'category',
                  labels: scaleY,
                  ticks: {
                      suggestedMin: 50,
                      suggestedMax: 100,
                      fontSize:36,
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
