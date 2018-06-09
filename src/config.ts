export const SERVER_PROD="//subscription-dot-perpule-dev.appspot.com/resources/";
export const SERVICE = "subscription-dot-perpule-dev";
export const SERVER_PREPROD="//7.perpule-preprod.appspot.com/resources/";
let SERVER_URL;

if(window.location.host.search("www.perpule.com") > -1){
	SERVER_URL = SERVER_PREPROD;
}
else if(window.location.host.search(".perpule.com") > -1){
	SERVER_URL = SERVER_PROD;
}
else if(window.location.host.search("perpule.com") > -1){
	SERVER_URL = SERVER_PROD;
}
else if(window.location.host.search("localhost") > -1){
	SERVER_URL = "//" + SERVICE + ".appspot.com/resources";
}
else if(window.location.host.search("dashboard.perpule-qa") > -1){
    SERVER_URL = "//"+SERVICE+".appspot.com/resources/";
}
else if(window.location.host.search("dashboard-dot-perpule-qa") > -1){
    SERVER_URL = "//"+SERVICE+".appspot.com/resources/";
}
else {
	SERVER_URL = window.location.origin + "/resources/";
}
SERVER_URL = "http://localhost:8888/resources";
export const URL = SERVER_URL;
console.log(URL);
