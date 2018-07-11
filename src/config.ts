export const SERVER_PROD="http://backend.perpule-1248.appspot.com/resources";
let SERVER_URL;
export const SERVICE = "http://subscription3.perpule-dev.appspot.com/resources";
export const SERVER_PREPROD="http://7.perpule-preprod.appspot.com/resources";


if(window.location.host.search("www.perpule.com") > -1){
	  SERVER_URL = SERVER_PREPROD;
}
else if(window.location.host.search(".perpule.com") > -1){
	  SERVER_URL = SERVER_PROD;
}
else if(window.location.host.search("perpule.com") > -1){
	  SERVER_URL = SERVER_PREPROD;
}
else if(window.location.host.search("localhost") > -1){
	  SERVER_URL = "http://" + SERVICE + ".appspot.com/resources";
}
else if(window.location.host.search("dashboard.perpule-qa") > -1){
      SERVER_URL = "http://"+SERVICE+".appspot.com/resources";
}
else if(window.location.host.search("dashboard-dot-perpule-qa") > -1){
    SERVER_URL = "http://"+SERVICE+".appspot.com/resources";
}
else {
	 SERVER_URL = window.location.origin + "/resources"; 
}
export const URL = "http://subscription3.perpule-dev.appspot.com/resources";
console.log(URL);
