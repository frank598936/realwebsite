import { useEffect } from "react";


export default function MarketOverview(){


useEffect(()=>{


const script=document.createElement("script");

script.src=
"https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";

script.async=true;


script.innerHTML=JSON.stringify({

colorTheme:"dark",

dateRange:"12M",

showChart:true,

locale:"en",

width:"100%",

height:"500",

tabs:[
{
title:"Crypto",
symbols:[
{
s:"BINANCE:BTCUSDT",
d:"Bitcoin"
},
{
s:"BINANCE:ETHUSDT",
d:"Ethereum"
}
]
},
{
title:"Stocks",
symbols:[
{
s:"NASDAQ:AAPL",
d:"Apple"
},
{
s:"NASDAQ:TSLA",
d:"Tesla"
}
]
}
]

});


document
.getElementById("market")
.appendChild(script);



},[]);



return(

<div id="market"></div>

);


}