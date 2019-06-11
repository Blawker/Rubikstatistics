function mobile_average(liste, n) { // moyenne mobile de période n
  var mobile_average_liste = [] ;
  for (var i=0; i<liste.length-n+1; i++) {
    var somme = 0 ;
    for (var j=0; j<n; j++) {
      somme+=liste[i+j] ;
    }
    mobile_average_liste.push(somme/n) ;
  }
  return (mobile_average_liste) ;
}

function ecart_type(liste, n) { // écart-type de période n
  var ecart_type_liste = mobile_average(liste, n) ;
  for (var i=0; i<ecart_type_liste.length; i++) {
    ecart_type_liste[i] = Math.pow(ecart_type_liste[i],2) ;
  }
  for (var i=0; i<liste.length-n+1; i++) {
    var temp = 0 ;
    for (var j=0; j<n; j++) {
      temp+=Math.pow(liste[i+j],2) ;
    }
    ecart_type_liste[i] = Math.abs(ecart_type_liste[i]-temp/n) ;
  }
  for (var i=0; i<ecart_type_liste.length; i++) {
    ecart_type_liste[i] = Math.sqrt(ecart_type_liste[i]) ;
  }
  return (ecart_type_liste) ;
}

function standard_deviation(liste, n) { // coefficient de corrélation de période n
  var coef_liste = [] ;
  const ect = ecart_type(liste, n) ;
  const mav = mobile_average(liste, n) ;
  for (var i=0; i<liste.length-n+1; i++) {
    coef_liste.push(100*ect[i]/mav[i]) ;
  }
  return (coef_liste) ;
}


function time_to_compte(liste) {
  return(liste[0]*60+liste[1]) ;
}

function compte_to_time(n) {
  const min = parseInt(n/60)
  return(String(min)+":"+String(Math.round((n-min*60)*1000)/1000)) ;
}


function valeurs_tableau(liste, val) {
  document.getElementById("nb_chronos").innerHTML = " "+String(liste.length) ;
  for (var i=1; i<val.length; i++) {
    const n = val[i] ;
    if (liste.length>=n) {
      affichage("avg"+String(n),"ect"+String(n),"std"+String(n), liste, n) ;
    }
    else {
      vide("avg"+String(n),"ect"+String(n),"std"+String(n)) ;
    }
  }
}

function affichage(avg,ect,std, liste, n) {
  document.getElementById(avg).innerHTML = compte_to_time(mobile_average(liste, n)[0]) ;
  document.getElementById(ect).innerHTML = Math.round(ecart_type(liste, n)[0]*1000)/1000 ;
  document.getElementById(std).innerHTML = Math.round(standard_deviation(liste, n)[0]*1000)/1000 ;
}

function vide(avg,ect,std) {
  document.getElementById(avg).innerHTML = "" ;
  document.getElementById(ect).innerHTML = "" ;
  document.getElementById(std).innerHTML = "" ;
}


function maxi_liste(liste) {
  var maxi = liste[0] ;
  for (var i=1; i<liste.length; i++) {
    if (liste[i]>maxi) {
      maxi = liste[i] ;
    }
  }
  return(maxi) ;
}

function mini_liste(liste) {
  var mini = liste[0] ;
  for (var i=1; i<liste.length; i++) {
    if (liste[i]<mini) {
      mini = liste[i] ;
    }
  }
  return(mini) ;
}
