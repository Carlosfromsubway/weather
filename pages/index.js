import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { use, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [main, setMain] = useState();
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
        setWeather(response.data.weather);
        setMain(response.data.main)
        setErrorMessage("")
      }).catch(err =>{
        console.log(err)
        setErrorMessage("Enter another locale")
        setData({})
        setWeather()
        setMain()
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
      <div className={styles.header}> Enter in a Location into the search field.</div>
    <input className={styles.input}
    value={location}
    onChange={event => setLocation(event.target.value)}
    placeholder="enter locale"
    onKeyDown={Searchlocation}
    typ="text"
    

    
    />
 


        {
      weather && weather.map((w, index) =>{
        return(
          <div key={index}> 
          <weathercard> 
          <div>{w.description}</div>
          <div>{w.main}
          <div>Temperature {data.main.temp}&#8451;</div>
          <div>Windspeed {data.wind.gust}&#x4d; &#x0338; &#x53;</div>
          <div>Feels like {data.main.feels_like}&#8451;</div>
          </div>
          </weathercard>
          
          </div>

        )
      })
      
    }
      </main>
    </>
  )
}

const weathercard = styled.div `
height: 400px;
width: 250px;
background-color: white;
border-color: black;
color: white;
margin: 5px;
font-size: 19px;
`