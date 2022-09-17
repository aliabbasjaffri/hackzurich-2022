import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ParentSize } from '@visx/responsive';
import { ScaleSVG } from '@visx/responsive';
import Line from './linegraph';
import Chart from './pollutionbar';
import useSWR from 'swr'
import { createRoot } from 'react-dom/client';

import { useState, useEffect } from 'react'

import ReactRain from 'react-rain-animation';

import "react-rain-animation/lib/style.css";


function eCO2Calc(distance: number, transport: string, house_area: number, probability: number) {

  // eCO2 per km
  // https://www.co2everything.com/category/travel-and-transport
  const eCO2PerKm = {
    bike: 0.0,
    car: 0.197,
    electric_car: 0.08,
    bus: 0.103,
    train: 0.037
  }

  // eCO2 per day
  // 135/(365*24) kWh/m2 of house heating
  // 0.203 kg/kWh gas heating
  // 8 hours at work
  // https://www.carbonindependent.org/15.html
  const eCO2heating = (135 / (365 * 24)) * house_area * 0.203 * 8

  let eCO2 = 0
  if (probability > 50) {
    eCO2 += eCO2heating - (distance * eCO2PerKm[transport])
  } else {
    eCO2 += (distance * eCO2PerKm[transport]) - eCO2heating
  }

  return eCO2
}

const Home: NextPage = (data) => {

  console.log(data)

  const [probability, setProbability] = useState(data.prediction)
  const [cloudOpacity, setCloudOpacity] = useState(data.cloudOpacity)
  const [rain, setRain] = useState(data.rain)

  const [distance, setDistance] = useState(10) // distance to work [km]
  const [transport, setTransport] = useState('car') // method of transport
  const [house_area, setHouseArea] = useState(100) // house area
  const [eCO2, setECO2] = useState(-999) // eCO2 spent

  useEffect(() => {
    setECO2(eCO2Calc(distance, transport, house_area, probability))
  }, [])



  // bg-gradient-to-tr from-cyan-100 to-blue-100
  return (
    <div className="max-h-screen overflow-visible items-center justify-center">

      <Head>
        <title>Remote forcast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen overflow-visible w-screen bg-gradient-to-tr from-cyan-100 to-blue-100 -z-20 top-0 absolute"></div>
      <div className={`h-screen overflow-visible w-screen bg-gray-900 top-0 absolute -z-20 overflow-hidden left-0`}
        style={{ opacity: `${cloudOpacity}%` }}>
        {rain &&
          <ReactRain
            numDrops="100"
          />
        }
      </div>

      {/* logo */}
      <div className="mt-12 flex items-center justify-center">
        <img src='./small-logo.svg' className="h-12 w-12" alt="Remote forecast logo" />
      </div>

      {/* main content */}
      <main className="flex flex-col justify-center items-center w-full px-8 mt-8 text-left text-xl font-serif">
        <div className="mt-6 max-w-4xl flex-wrap items-center justify-center sm:w-full md:w-1/4">
          <p>
            There's a <span className="font-bold text-blue-500">{(probability).toFixed(1)}%</span> recommendation to work remotely today.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>

          <p className='mt-10'>
            {/* By staying at home you save <span className="font-bold text-blue-500">{(eCO2[0]).toFixed(1)} kg vs {(eCO2[1]).toFixed(2)} kg</span> of eCO2, extend your life by <span className="font-bold text-blue-500">X days</span>, and reduce your risk of catching an airborne illness by <span className="font-bold text-blue-500">Y%</span>. */}

            {probability > 50 ? "By staying at home" : "By going to work"} you {eCO2 > 0 ? "spend" : "save"} <span className="font-bold text-blue-500">{Math.abs(eCO2).toFixed(2)} kg</span> of eCO2.

          </p>

          <p className='mt-6'>
            It is {rain ? "likely to rain" : "not likely to rain"} today, with a cloud cover of <span className="font-bold text-blue-500">{cloudOpacity}%</span>.
          </p>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Distance to work
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="123456789km" />
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Method of transportation
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>Foot or Bike</option>
                    <option>Public transporation</option>
                    <option>Private vehicle</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              </div>
            </div>
          </form>
          <Chart width={500} height={500} />

          <Line width={800} height={500} />


          {/* <div className="mt-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>      */}

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


        <div className="w-full max-w-xs">

          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>

      </footer>
    </div>
  )
}

export async function getServerSideProps({ params, req, res }) {

  const req_api = await fetch("https://hackzurich-predictions-api-kyqiv7tb6q-oa.a.run.app/predict", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await req_api.json();

  const p = 100 * (data.prediction - 400) / 600;

  return {
    props: { prediction: p, rain: false, cloudOpacity: 20 },
  }
}
export default Home
