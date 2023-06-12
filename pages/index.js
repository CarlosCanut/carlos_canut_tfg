import { Content } from '@/components/App'
import Head from 'next/head'
import { Suspense, useEffect, useState } from 'react'

export const getStaticProps = async() => {
  // get last league of legends patch
  const last_patch = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    .then(response => response.json())
    .then(versions => versions[0])
    .catch(error => console.error(error));

  // get all champions from last patch
  const champions = await fetch("http://ddragon.leagueoflegends.com/cdn/" + last_patch + "/data/en_US/champion.json")
    .then(response => response.json())
    .then(all_champions => {
      let counter = 0;
      let champions = [];
      for (const champ in all_champions["data"]) {
        champions.push({name: all_champions["data"][champ]["id"], id: all_champions["data"][champ]["key"]});
        counter += 1;
      }
      return champions
    })
    .catch(error => console.error(error));


  const clusters = await fetch("https://loldrafts.azurewebsites.net/api/GetClusters?code=YJs1p4ueqy8GQmY2Z91yApSBbztlUOAZWB3Nswe_g8H5AzFuaSyhcw==")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error HTTP: " + response.status)
      }
      return response.json()
    })
    .catch(error => console.error(error))
  

  return {
    props:{
        champions: champions,
        clusters: clusters,
        // champions_by_role: champions_by_role
    }
  }
}

export default function Home({ champions, clusters }) {
  // Define a state variable to keep track of the loading state
  const [isLoading, setIsLoading] = useState(true)
  const [championsByRole, setChampionsByRole] = useState(new Map());
  const [clusterDictionary, setClusterDictionary] = useState(new Map());
  
  useEffect(() => {
    // Simulate a delay of 2 seconds to show the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    var champions_by_role = new Map();
    var cluster_dictionary = new Map();

    const roles = ['general', 'top', 'jungle', 'mid', 'bottom', 'utility']
    roles.forEach((role) => {
      const roleArray = clusters.filter((item) => item.role === role).map((item) => item.championId)
      const clusterMap = clusters.filter((item) => item.role === role).map((item) => ({ [item.championId]: item.cluster }))
      champions_by_role.set(role, roleArray)
      cluster_dictionary.set(role, clusterMap)
    })
    setChampionsByRole(champions_by_role)
    setClusterDictionary(cluster_dictionary)
  }, [])

  return (
    <>
      <Head>
        <title>Carlos Canut TFG</title>
        <meta name="description" content="Carlos Canut Final Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-transparent">
        <Suspense fallback={<></>}>
          <div
            className={`opening-animation ${isLoading ? '' : 'loaded'}`}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
          >
            <Content champions={champions} championsByRole={championsByRole} clusterDictionary={clusterDictionary} />
          </div>
        </Suspense>
      </main>
    </>
  )
}
