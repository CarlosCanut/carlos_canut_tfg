
import Image from "next/image"
import { PredictButton } from "./PredictButton";
import { RefreshIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from "react";

export function PickSelection({ 
    champions, 
    handleSearchChampion, 
    searchChampion, 
    handleChampionSelection, 
    handleDraftReset, 
    handleHoldChampionSelection, 
    draftRotation,
    handleSelectedRole,
    championsByRole,
}) {

    function ChampionsGrid ({ role }) {
        const championsArray = championsByRole.get(role)
        return (
            <div className='h-[50vh]'>
                <div className='flex flex-wrap gap-2 overflow-y-scroll max-h-[50vh]'>
                        <button key={-1} value={-1} onFocus={(event) => {setChampionSelected(event.target.value)}} className='relative w-8 h-8 bg-[#2E2E2E] drop-shadow-xl focus:border-2 '>
                            <Image
                                src={
                                    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"
                                }
                                alt="undefined"
                                width={100}
                                height={100}
                                align='center'
                            />
                        </button>
                        {champions
                            .filter((champ) => champ.name.toLowerCase().includes(searchChampion.toLowerCase()))
                            .filter((champ) => {                            
                                if (championsArray && championsArray.includes(parseInt(champ.id))) {
                                    return champ
                                }
                            })
                            .map((champion) => (
                                <button key={champion.id} value={champion.id} onFocus={handleHoldChampionSelection} className='relative w-8 h-8 bg-[#2E2E2E] drop-shadow-xl focus:border-2 '>
                                    <Image
                                        src={
                                            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/" +
                                            champion.id +
                                            ".png"
                                        }
                                        alt={champion.name}
                                        width={100}
                                        height={100}
                                        align='center'
                                    />
                                </button>
                        ))}
                    </div>
            </div>
        )
    }

    const tabItems = [
        { title: "General", value: "general", content: <ChampionsGrid role={"general"} />},
        { title: "Top", value: "top", content: <ChampionsGrid role={"top"} />},
        { title: "Jungle", value: "jungle", content: <ChampionsGrid role={"jungle"} /> },
        { title: "Mid", value: "mid", content: <ChampionsGrid role={"mid"} /> },
        { title: "Adc", value: "bottom", content: <ChampionsGrid role={"bottom"} /> },
        { title: "Support", value: "utility", content: <ChampionsGrid role={"utility"} /> },
    ];

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };
      


    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-row gap-2'>
                <input
                    type="text"
                    className="block w-48 bg-[#2E2E2E] drop-shadow-xl text-sm p-1  focus:outline-none focus:ring-2 focus:ring-[#ffffff65] focus:border-transparent"
                    placeholder="Search..."
                    value={searchChampion}
                    onChange={handleSearchChampion}
                />
                <button disabled={draftRotation.current == 10 ? true : false} onClick={handleChampionSelection} className={`w-32 flex justify-center items-center ${draftRotation.current == 10 ? 'bg-opacity-40' : 'hover:bg-opacity-50 active:bg-opacity-30'} bg-green-600 drop-shadow-xl  bg-opacity-70 text-sm`}>Select</button>
                {/* <button onClick={() => {console.log("Predict")}} className='w-32 flex justify-center items-center bg-yellow-400 drop-shadow-xl hover:bg-opacity-50 active:bg-opacity-30 bg-opacity-70 text-sm mr-auto'>Predict</button> */}
                <PredictButton />
                <button
                    className={classNames(
                    'ml-auto mr-6 p-2  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300',
                    'transition-colors duration-200 ease-in-out',
                    'text-gray-500 hover:text-gray-700 focus:ring-opacity-50'
                    )}
                    onClick={handleDraftReset}
                >
                    <RefreshIcon className="h-5 w-5" />
                </button>
            </div>
            <div className='flex flex-row'>
                {tabItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {handleTabClick(index); handleSelectedRole(item)}}
                        className={`px-4 py-2 ${
                            activeTab === index ? "bg-white text-black" : "bg-gradient-to-br from-[#252525] to-transparent"
                        }`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabItems[activeTab].content}
            </div>
            
        </div>
    )
}