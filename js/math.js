function mobile_average(liste,n) { // moyenne mobile de période n
  var avg=[];
  for (var i=0; i<liste.length-n+1; i++) {
    var sum=0;
    for (var j=0; j<n; j++) {
      sum+=liste[i+j];
    }
    avg.push(sum/n);
  }
  return(avg);
}

function standard_deviation(liste,n) { // écart-type de période n
  var std=mobile_average(liste,n);
  for (var i=0; i<std.length; i++) {
    std[i]=Math.pow(std[i],2);
  }
  for (var i=0; i<liste.length-n+1; i++) {
    var temp=0;
    for (var j=0; j<n; j++) {
      temp+=Math.pow(liste[i+j],2);
    }
    std[i]=Math.abs(std[i]-temp/n);
  }
  for (var i=0; i<std.length; i++) {
    std[i]=Math.sqrt(std[i]);
  }
  return(std);
}

function relative_standard_deviation(liste,n) { // coefficient de variation de période n
  var rsd=[];
  const std=standard_deviation(liste,n);
  const avg=mobile_average(liste,n);
  for (var i=0; i<liste.length-n+1; i++) {
    rsd.push(100*std[i]/avg[i]);
  }
  return(rsd);
}


function time_to_compte(liste) {
  return(liste[0]*60+liste[1]);
}

function compte_to_time(n) {
  const min=parseInt(n/60);
  return(String(min)+":"+String(Math.round((n-min*60)*1000)/1000));
}


function valeurs_tableau(liste,val) {
  document.getElementById("nb_total_chronos").innerHTML=" "+String(liste.length);
  document.getElementById("PB").innerHTML="PB: "+compte_to_time(mini_liste(liste));
  for (var i=1; i<val.length; i++) {
    const n=val[i];
    if (liste.length>=n) {
      affichage("best_avg"+String(n),"avg"+String(n),"std"+String(n),"rsd"+String(n),liste,n);
    }
    else {
      vide("best_avg"+String(n),"avg"+String(n),"std"+String(n),"rsd"+String(n));
    }
  }
}

function affichage(best_avg,avg,std,rsd,liste,n) {
  document.getElementById(best_avg).innerHTML=compte_to_time(mini_liste(mobile_average(liste,n)));
  document.getElementById(avg).innerHTML=compte_to_time(mobile_average(liste,n)[0]);
  document.getElementById(std).innerHTML=Math.round(standard_deviation(liste,n)[0]*1000)/1000;
  document.getElementById(rsd).innerHTML=Math.round(relative_standard_deviation(liste,n)[0]*1000)/1000;
}

function vide(best_avg,avg,std,rsd) {
  document.getElementById(best_avg).innerHTML="";
  document.getElementById(avg).innerHTML="";
  document.getElementById(std).innerHTML="";
  document.getElementById(rsd).innerHTML="";
}


function maxi_liste(liste) {
  var maxi=liste[0];
  for (var i=1; i<liste.length; i++) {
    if (liste[i]>maxi) {
      maxi=liste[i];
    }
  }
  return(maxi);
}

function mini_liste(liste) {
  var mini=liste[0];
  for (var i=1; i<liste.length; i++) {
    if (liste[i]<mini) {
      mini=liste[i];
    }
  }
  return(mini);
}

function solve_polynomial(c) {
  var min=0,max=1e6,dx=1e5,xf=0;
  while (dx>1e3) {
    for (var x=min; x<=max; x+=dx) {
      var f_x=0,f_x_dx=0;
      for (var i=0; i<c.length; i++) {
        f_x+=Math.pow(x,i)*c[i];
        f_x_dx+=Math.pow(x+dx,i)*c[i];
      }
      if ((f_x<=0 && f_x_dx>=0) || (f_x>=0 && f_x_dx<=0)) {
        //console.log(min,(2*x+dx)/2,max);
        min=x;
        max=x+dx;
        dx=dx/10;
        xf=(2*x+dx)/2;
        break;
      }
    }
    if (x+2*dx>=max) {
      dx=dx/2;
    }
  }
  return(xf);
}

function solve_expression(m1,m2,n) {
  var min=0,max=1e9,dx=1e8,xf=0;
  while (dx>1e-9) {
    for (var x=min; x<=max; x+=dx) {
      const f_x=(m1*m1*x*(n-1)*(1-Math.exp(-2*x*(n-1))))/(2*m2*Math.pow(1-Math.exp(-x*(n-1)),2))-1;
      const f_x_dx=(m1*m1*(x+dx)*(n-1)*(1-Math.exp(-2*(x+dx)*(n-1))))/(2*m2*Math.pow((1-Math.exp(-(x+dx)*(n-1))),2))-1;
      if ((f_x<=0 && f_x_dx>=0) || (f_x>=0 && f_x_dx<=0)) {
        //console.log(min,(2*x+dx)/2,max);
        min=x;
        max=x+dx;
        dx=dx/10;
        xf=(2*x+dx)/2;
        break;
      }
    }
    if (x+2*dx>=max) {
      dx=dx/2;
      max/=2;
    }
  }
  return(xf);
}
/*
function randn() {
  return(Math.exp(-Math.pow((Math.random()-0.5)*10,2)));
}
function exp() {
  var liste=[];
  for (var i=-2; i<5; i+=0.1) {
    liste.push(Math.exp(-i)+randn());
  }
  return(liste);
}
*/

/* Prototype
function graph_exp(liste) {
  var somme_y1=0,somme_y2=0;
  const n0=0;
  const N=liste.length+n0;
  var alpha=0.7,b=0;
  var modele=[];

  for (var i=0; i<liste.length; i++) {
    somme_y1+=liste[i];
    somme_y2+=Math.pow(liste[i],2);
  }
  var func=somme_y2*(1+alpha)-Math.pow(somme_y1,2)*(Math.pow(alpha,n0)+Math.pow(alpha,N))*(1-alpha);
  //console.log(func,somme_y1,somme_y2) ;

  while(func<0 && func>-10000000000 && alpha<1) {
    func=somme_y2*(1+alpha)-Math.pow(somme_y1,2)*(Math.pow(alpha,n0)+Math.pow(alpha,N))*(1-alpha);
    alpha+=0.00001;
    b=somme_y1*(1-alpha)/(Math.pow(alpha,n0)-Math.pow(alpha,N));
  }
  console.log(func,alpha,b);
  console.log(Math.log(liste[0]/b)/Math.log(alpha));
  const n_temp=parseInt(Math.log(liste[0]/b)/Math.log(alpha));
  console.log(n_temp);
  for (var i=n_temp; i<N+n_temp; i++) {
    modele.push(b*Math.pow(alpha,i));
  }
  return(modele);
}

function graph_exp_reg(liste) {
  console.log(liste[0],liste[liste.length-1]);
  const n=liste.length;
  var m0=0,m1=0,m2=0;
  for (var i=0; i<n; i++) {
    m0+=liste[i];
    m1+=i*liste[i];
    m2+=i*i*liste[i];
  }
  const k1=3*m2-m0*Math.pow(n-1,2);
  const k2=6*m1-3*(n-1)*m0;

  console.log(m0,m1,m2,k1,k2);

  const c4=(n-1)*(12*k1-16*k2)+2*(Math.pow(n-1,2)+Math.pow(n-1,3));
  const c3=24*(k1-k2)+4*(n-1)-6*Math.pow(n-1,2);
  const c2=24*k2-20*(n-1)+6*Math.pow(n-1,2);
  const c1=-48;
  const c0=-24;

  console.log([c0,c1,c2,c3,c4]);

  b=solve_polynomial([c0,c1,c2,c3,c4]);

  //const b=0.0017321;//-0.00192203;

  const a=b*(2*m1-(n-1)*m0)/((1/b-(n-1)/2)*(1-Math.exp(-b*(n-1)))-(n-1)*Math.exp(-b*(n-1)));
  const d=1/(n-1)*(m0-a/b*(1-Math.exp(-b*(n-1))));

  console.log(a,b,d);

  var y=[];
  for (var i=0; i<n; i++) {
    y.push(a*Math.exp(-b*i)+d);
  }
  return(y);
}
*/
function graph_exp_reg_II(liste,offset) { // test and fonctionnal
  const avg_liste=mobile_average(liste,offset);
  const n=avg_liste.length;
  var m1=0,m2=0;
  for (var i=0; i<n; i++) {
    m1+=avg_liste[i];
    m2+=Math.pow(avg_liste[i],2);
  }
  m1/=n;
  m2/=n;

  // find a and b
  const b=solve_expression(m1,m2,n);
  const a=(m1*b*(n-1))/(1-Math.exp(-b*(n-1)));

  var y=[];
  for (var i=0; i<n; i++) {
    y.push(a*Math.exp(-b*i));
  }
  const sub_time=parseFloat(document.getElementById("sub_reg_input").value);
  document.getElementById("estimation_avg_sub").innerHTML=String(parseInt(1/b*Math.log(a/sub_time)-avg_liste.length))+" Cubes before avg"+document.getElementById("avg_reg_input").value+" sub"+String(sub_time);
  return(y);
}


function repartition_function(liste,t0,dt) {
  var rep=[];
  for (var i=t0-50*dt; i<t0; i+=dt) {
    rep.push(0);
  }
  for (var i=t0; i<maxi_liste(liste)+10*dt; i+=dt) {
    var compt=0;
    for (var j=0; j<liste.length; j++) {
      if (liste[j]<i) {
        compt++;
      }
    }
    rep.push(compt/liste.length);
  }
  return(rep);
}

function derivate(liste,t,dt,n) {
  //return((liste[parseInt(t/dt+n/2)]-liste[parseInt(t/dt-n/2)])/(n*dt));
  // vartical linear regression to find the slope of mid sigmoid (cf Wikipedia)
  var x=[],y=[];
  for (var i=0; i<n; i++) {
    const temp=parseInt(t+dt*(-n/2+i));
    x.push(temp);
    y.push(liste[parseInt(temp/dt)]);
  }
  const x_=mobile_average(x,n);
  const y_=mobile_average(y,n);

  var temp_num=0,temp_den=0;
  for (var i=0; i<n; i++) {
    temp_num+=(x[i]-x_)*(y[i]-y_);
    temp_den+=Math.pow(x[i]-x_,2);
  }
  return(temp_num/temp_den);
}

function sigmoid(x,a) {
  return(1/(1+Math.exp(-a*x)));
}

function sigmoid_p(x,a) {
  return(Math.exp(-a*x)*Math.pow(sigmoid(x,a),2));
}
