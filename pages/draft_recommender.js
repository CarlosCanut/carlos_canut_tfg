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

  // get clusters defined by the recommendation system
  const clusters = await fetch("https://getdraftrecommendations.azurewebsites.net/api/GetClusters?code=NiEz1Xsfk8Aaqr9heGQBDH1pYHat-wM8Y25WU612EtDKAzFu2IfvtQ==")
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
    }
  }
}

export default function Draft_recommender({ champions, clusters }) {
  // State to track the loading state
  const [isLoading, setIsLoading] = useState(true)
  // State for champions grouped by role
  const [championsByRole, setChampionsByRole] = useState(new Map());
  // State for the cluster dictionary to identify each cluster
  const [clusterDictionary, setClusterDictionary] = useState(new Map());
  
  // Simulate a delay of 2 seconds to show the loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer)
  }, [])

  // Process champions and clusters to populate championsByRole and clusterDictionary
  useEffect(() => {
    var champions_by_role = new Map();
    var cluster_dictionary = new Map();

    const roles = ['top', 'jungle', 'mid', 'bottom', 'utility']
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
        <title>Laning Phase</title>
        <meta name="description" content="Laning Phase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#000000] to-primary">
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
