import React,{useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { getTrending } from '../config/api';

import Card from "./Card";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CryptoState } from '../CryptoContext';
const Carousel = () => {
    const [coins,setCoins]=useState([]);
    const {currency} =CryptoState();

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 }
      };

  const fetchCoins=async()=>{
    const data=await axios.get(getTrending(currency));
    setCoins(data.data); 
  }
  useEffect(()=>{
    fetchCoins();
  },[currency])

  const items=coins?.map((coin)=>{
    return <Card coin={coin}/>
  })

  return (
    <>
      
     <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="responsive,alternate"
        // autoPlayControls="true"
        autoPlay="true"
        autoPlayInterval="1000"
        disableButtonsControls="true"
        disableDotsControls="true"
        infinite="true"
      />
  
    </>
  )
}

export default Carousel
