import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import ReactRain from 'react-rain-animation';

import "react-rain-animation/lib/style.css";


function eCO2Calc(distance, transport, house_area, probability, temperature) {

  // eCO2 per km
  // https://www.co2everything.com/category/travel-and-transport
  const eCO2PerKm = {
    bike: 0.0,
    foot: 0.0,
    car: 0.197,
    "electric car": 0.08,
    bus: 0.103,
    train: 0.037
  }

  // eCO2 per day
  // 135/(365*24) kWh/m2 of house heating
  // 0.203 kg/kWh gas heating
  // 8 hours at work
  // https://www.carbonindependent.org/15.html
  let eCO2heating = 0
  
  if (temperature < 15) {
    eCO2heating += (135/(365*24)) * house_area * 0.203 * 8
  }
  

  let eCO2 = 0
  if (probability > 50) {
    eCO2 += eCO2heating - (distance * eCO2PerKm[transport])
  } else {
    eCO2 += (distance * eCO2PerKm[transport]) - eCO2heating
  }

  return {"eCO2" : eCO2, "eCO2heating" : eCO2heating,  "eCO2Transport" : (distance * eCO2PerKm[transport])}
}

const Home: NextPage = (data) => {
    const router = useRouter()
    const slug = router.query.slug || []
  console.log(slug, data)

  const [probability, setProbability] = useState(data.prediction)
  const [cloudOpacity, setCloudOpacity] = useState(data.cloudOpacity)
  const [temperature, setTemperature] = useState(data.temperature) // temperature [°C]
  const [rain, setRain] = useState(data.rain)

  const [distance, setDistance] = useState(slug[0]) // distance to work [km]
  const [transport, setTransport] = useState(slug[1]) // method of transport
  const [house_area, setHouseArea] = useState(slug[2]) // house area

  const [eCO2, setECO2] = useState({}) // eCO2 spent

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
      setECO2(eCO2Calc(distance, transport, house_area, probability, temperature))
  }, [])

  return (
    <div className="max-h-screen items-center justify-center text-gray-900">

      <Head>
        <title>Remote forcaster</title>
        <link rel="icon" href="../../../../small-logo.svg" />
      </Head>
      <div className="h-screen w-screen bg-gradient-to-tr from-cyan-300 to-blue-200 -z-20 top-0 absolute"></div>
      <div className={`h-screen w-screen bg-gray-400 top-0 absolute -z-20 overflow-hidden left-0`}
      style={{opacity: `${cloudOpacity}%`}}>
        {rain && 
            <ReactRain
              numDrops="100"
            />
        }
      </div>

      {/* logo */}
      <div className="mt-12 flex items-center justify-center">
        <img src='../../../../small-logo.svg' className="h-12 w-12" alt="Remote forecast logo" />
      </div>

      {/* main content */}
      <main className="flex flex-col justify-center items-center w-full px-8 mt-12 text-left text-xl font-sans">
        <div className="mt-6 max-w-4xl flex-wrap items-center justify-center sm:w-full md:w-1/4">
          <p>
            There's a <span className="font-bold text-blue-700">{(probability).toFixed(1)}%</span> recommendation to work remotely today.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>

          <p className='mt-10'>
            {probability > 50 ? "By staying at home" : "By going to work"} you will {eCO2['eCO2'] > 0 ? "spend" : "save"} <span className="font-bold text-blue-700">{Math.abs(eCO2['eCO2']).toFixed(2)}&nbsp;kg</span> of eCO2.
          </p>

          {showModal ? (
          <div className="mt-6 flex items-center justify-center" onClick={() => setShowModal(!showModal)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-70">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

          </div>
          ) : (

          <div className="mt-6 flex items-center justify-center" onClick={() => setShowModal(!showModal)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>    
        
          )
          }

          <div className={`ease-in-out duration-300 ${showModal ? 'block' : 'hidden'}`}>
            <p className='mt-6'>
              Here, heating your {house_area}&nbsp;m<sup>2</sup> house accounts for <span className="font-bold text-blue-700">{Math.abs(eCO2['eCO2heating']).toFixed(2)}&nbsp;kg</span> of eCO2 since it is {temperature > 15 ? "warm" : "cold"} today. While travelling {distance}&nbsp;km to work by {transport} accounts for <span className="font-bold text-blue-700">{Math.abs(eCO2['eCO2Transport']).toFixed(2)}&nbsp;kg</span> of eCO2.
            </p>
          </div>
          
          <p className='mt-16'>
            It is {rain ? "likely to rain" : "not likely to rain"} today, with an expected cloud cover of <span className="font-bold text-blue-700">{cloudOpacity}%</span>.
          </p>
          

        </div>
      </main>


      <footer className="flex h-24 w-full items-center justify-center fixed
             inset-x-0
             bottom-0 z-10">
        <a
          className="flex items-center justify-center gap-2"
          href="https://hackzurich.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className='underline'>PASS</span>
        </a>
      </footer>
    </div>
  )
}

export default Home


export async function getServerSideProps({ params, req, res }) {

  const req_api = await fetch("https://hackzurich-predictions-api-kyqiv7tb6q-oa.a.run.app/predict", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const req_api_rain = await fetch("https://hackzurich-predictions-api-kyqiv7tb6q-oa.a.run.app/get_rain_status", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const req_api_cloud = await fetch("https://hackzurich-predictions-api-kyqiv7tb6q-oa.a.run.app/get_cloud_cover", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const req_api_temp = await fetch("https://hackzurich-predictions-api-kyqiv7tb6q-oa.a.run.app/get_avg_temp", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await req_api.json();
  const data_r = await req_api_rain.json();
  const data_c = await req_api_cloud.json();
  const data_t = await req_api_temp.json();

  const p = 100 - 100*(data.prediction - 400)/600;

  return {
      props: { prediction: p, rain: data_r.raining, cloudOpacity: data_c.cloudy, temperature: data_t.temperature },
  }
}