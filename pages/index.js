import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { use, useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  var apikey = "6e9eec007068656a19ba913cd5caeaca"
  var Lang = "en";
  var Units = "metric";
  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${Units}&appid=${apikey}&lang=${Lang}`
  console.log(Url)
  const Searchlocation = (event) => {
    if(event.key === "Enter") {
      axios.get(Url)
      .then((response) => {
        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather)
        setErrorMessage("")
      }).catch(err =>{
        console.log(err)
        setErrorMessage("Enter another locale")
        setData({})
        setWeather()
      })
      setLocation('')
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
    <input
    value={location}
    onChange={event => setLocation(event.target.value)}
    placeholder="enter locale"
    onKeyDown={Searchlocation}
    typ="text"
    

    
    />
        {
      weather && weather.map((w, index) =>{
        return(
          
        )
      })
    }
      </main>
    </>
  )
}
