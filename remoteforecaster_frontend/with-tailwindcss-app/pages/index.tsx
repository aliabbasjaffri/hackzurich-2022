import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {

  const [distance, setDistance] = useState(null) // distance to work [km]
  const [transport, setTransport] = useState(null) // method of transport
  const [house_area, setHouseArea] = useState(null) // house area

  const [url, setUrl] = useState("");


  return (
    <div className="max-h-screen items-center justify-center text-gray-900">

      <Head>
        <title>Remote forcaster</title>
        <link rel="icon" href="./small-logo.svg" />
      </Head>
      <div className="h-screen w-screen bg-gradient-to-tr from-blue-400 to-cyan-300 -z-20 top-0 absolute"></div>
      <div className={`h-screen w-screen bg-gray-400 top-0 absolute -z-20 overflow-hidden left-0 opacity-40`}></div>

      {/* logo */}
      <div className="mt-12 flex items-center justify-center">
        <img src='./small-logo.svg' className="h-12 w-12" alt="Remote forecast logo" />
      </div>

      {/* main content */}
      <main className="flex flex-col justify-center items-center w-full px-8 mt-12 text-left text-xl font-sans">
        <div className="mt-6 max-w-4xl flex-wrap items-center justify-center sm:w-full md:w-1/4">

        <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" >
                  Distance to work [km]
                </label>
                <input 
                  onChange={(e) => {setDistance(e.target.value)}}
                  id="distance"
                  name="distance"
                  min="0"
                  required              
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="input distance" />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" >
                  Method of transportation
                </label>
                <div className="relative">
                  <select 
                  onChange={(e) => {setTransport(e.target.value)}}
                  id="transport"
                  name="transport"
                  required  
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option value="bike">Bike/foot</option>
                    <option value="train">Train/bus</option>
                    <option value="car">Car</option>
                    <option value="electric car">Electric car</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" >
                  House size [m<sup>2</sup>]
                </label>
                <input 
                  onChange={(e) => {setHouseArea(e.target.value)}}
                  id="house_area"
                  name="house_area"
                  min="0"
                  required                
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="input area" />
              </div>
            </div>

            <div >
              {distance && transport && house_area ? 
              (
                

                <Link href={'/result/' + distance + '/' + transport + '/' + house_area}>
                  <div className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded mt-4 w-full text-center cursor-pointer">
                    Submit
                  </div>
                </Link>
                
              ) : 
              (
                <div className="bg-gray-500 text-white py-3 px-4 rounded mt-4 w-full text-center cursor-pointer">
                 Submit
                </div>
                
              )
              }
            </div>
          </form>
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

