import { useEffect } from "react";


export default function TechnicalAnalysis(){


useEffect(()=>{


const script=document.createElement("script");


script.src=
"https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";


script.async=true;


script.innerHTML=JSON.stringify({

interval:"1D",

width:"100%",

height:450,

symbol:"BINANCE:BTCUSDT",

showIntervalTabs:true,

locale:"en",

colorTheme:"dark"

});


document
.getElementById("technical")
.appendChild(script);



},[]);



return(

<div id="technical"></div>

);


}