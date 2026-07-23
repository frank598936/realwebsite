import { useEffect } from "react";

export default function TradingViewTicker(){

  useEffect(()=>{

    const script = document.createElement("script");

    script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols:[
        {
          proName:"BINANCE:BTCUSDT",
          title:"Bitcoin"
        },
        {
          proName:"NASDAQ:TSLA",
          title:"Tesla"
        },
        {
          proName:"NASDAQ:AAPL",
          title:"Apple"
        }
      ],
      showSymbolLogo:true,
      colorTheme:"dark",
      isTransparent:false,
      displayMode:"adaptive"
    });


    document.getElementById("ticker").appendChild(script);


  },[]);


  return(
    <div id="ticker"></div>
  );

}