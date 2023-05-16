import Image from "next/image"
import { useRef, useState } from "react"
import { Dropdown } from "./Dropdown";
import { DraftCard } from "./DraftCard";
import { RefreshIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { PredictButton } from "./PredictButton";

export function Content({ champions }) {
    // current draft rotation index
    const draftRotation = useRef(0)
    // current draft selection picks and bans based on order pick
    const draftSelection = useRef(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    console.log(draftSelection)

    // state used to rerender draft components when a reset in draft happens
    const [state, setState] = useState(0)

    // input of the search text field
    const [searchChampion, setSearchChampion] = useState("")
    // current champion selection
    const [championSelected, setChampionSelected] = useState("")

    // patch filter
    const [patch, setPatch] = useState('');
    // role filter
    const [role, setRole] = useState('');


    /////////////////
    const handleChampionSelection = () => {
        if (championSelected != "") {
            draftSelection.current[draftRotation.current] = championSelected
            draftRotation.current += 1
            setChampionSelected("")
        }
    }
    const handleDraftReset = () => {
        draftRotation.current = 0
        draftSelection.current = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
        setChampionSelected("")
        setSearchChampion("")
        setState(state + 1)
    }
    const handlePatchChange = (event) => {
        setPatch(event.target.value);
    };
    const handleRoleChange = (event) => {
        setPatch(event.target.value);
    };
    /////////////////

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="h-screen lg:flex-1 text-center py-8 "></div>
            <div className="lg:w-3/4 mx-8 h-screen text-center py-8">
                <div className='w-full h-full flex flex-col justify-center items-center'>
                {/* Simulation section */}
                <div className='w-full h-24 flex flex-col items-start justify-center'>
                    <h2 className='text-2xl ml-2'>Prediction preference</h2>
                    <div className='flex flex-row gap-2'>
                        <Dropdown
                            selectedOption={patch}
                            onOptionChange={handlePatchChange}
                            options={[{value: '', tag: 'patch'},{value: '10.12', tag: '10.12'},{value: '10.13', tag: '10.13'}]}
                        />
                        {/* <Dropdown
                            selectedOption={role}
                            onOptionChange={handleRoleChange}
                            options={[{value: '', tag: 'role'},
                            {value: 'top', tag: 'top'},
                            {value: 'jungle', tag: 'jungle'},
                            {value: 'mid', tag: 'mid'},
                            {value: 'adc', tag: 'adc'},
                            {value: 'support', tag: 'support'}]}
                        /> */}
                    </div>
                </div>

                {/* Draft Section */}
                <div className='w-full flex flex-row'>
                    {/* Blue Team */}
                    <div className='flex-1 flex flex-col items-end text-center py-4 gap-1'>
                    <div className='w-48 h-8 flex items-center justify-center bg-blue-500 text-sm drop-shadow-xl'>Blue Team</div>
                    <div className='w-full h-full flex items-center justify-end gap-2'>
                        <DraftCard rotation={draftRotation.current} index={0} champLocked={draftSelection.current[0]} champSelected={championSelected} />                        
                        <DraftCard rotation={draftRotation.current} index={2} champLocked={draftSelection.current[2]} champSelected={championSelected} />
                        <DraftCard rotation={draftRotation.current} index={4} champLocked={draftSelection.current[4]} champSelected={championSelected} />
                        <div className='w-2 h-8 bg-white drop-shadow-xl'></div>
                        <DraftCard rotation={draftRotation.current} index={13} champLocked={draftSelection.current[13]} champSelected={championSelected} />
                        <DraftCard rotation={draftRotation.current} index={15} champLocked={draftSelection.current[15]} champSelected={championSelected} />
                    </div>
                    <div className='w-full h-full flex items-center justify-end gap-2'>
                        <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={6} champLocked={draftSelection.current[6]} champSelected={championSelected} />                        
                        <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={9} champLocked={draftSelection.current[9]} champSelected={championSelected} />                        
                        <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={10} champLocked={draftSelection.current[10]} champSelected={championSelected} />                        
                        <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={17} champLocked={draftSelection.current[17]} champSelected={championSelected} />                        
                        <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={18} champLocked={draftSelection.current[18]} champSelected={championSelected} />                        

                    </div>
                    </div>

                    <div className='w-[10%] flex justify-center items-center text-3xl py-4'>VS</div>
                    
                    {/* Red Team */}
                    <div className='flex-1 flex flex-col items-start text-center py-4 gap-1'>
                    <div className='w-48 h-8 flex items-center justify-center bg-red-500 text-sm drop-shadow-xl'>Red Team</div>
                    <div className='w-full h-full flex items-center justify-start gap-2'>
                        <DraftCard rotation={draftRotation.current} index={1} champLocked={draftSelection.current[1]} champSelected={championSelected} />
                        <DraftCard rotation={draftRotation.current} index={3} champLocked={draftSelection.current[3]} champSelected={championSelected} />
                        <DraftCard rotation={draftRotation.current} index={5} champLocked={draftSelection.current[5]} champSelected={championSelected} />
                        <div className='w-2 h-8 bg-white drop-shadow-xl'></div>
                        <DraftCard rotation={draftRotation.current} index={12} champLocked={draftSelection.current[12]} champSelected={championSelected} />
                        <DraftCard rotation={draftRotation.current} index={14} champLocked={draftSelection.current[14]} champSelected={championSelected} />

                    </div>
                    <div className='w-full h-full flex items-center justify-start gap-2'>
                    <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={7} champLocked={draftSelection.current[7]} champSelected={championSelected} />                        
                    <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={8} champLocked={draftSelection.current[8]} champSelected={championSelected} />                        
                    <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={11} champLocked={draftSelection.current[11]} champSelected={championSelected} />                        
                    <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={16} champLocked={draftSelection.current[16]} champSelected={championSelected} />                        
                    <DraftCard dimensions={'w-12 h-12'} rotation={draftRotation.current} index={19} champLocked={draftSelection.current[19]} champSelected={championSelected} />                        

                    </div>
                    </div>
                </div>

                {/* Pick Selection */}
                <div className='w-full flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                    <input
                        type="text"
                        className="block w-48 bg-[#2E2E2E] drop-shadow-xl text-sm p-1  focus:outline-none focus:ring-2 focus:ring-[#ffffff65] focus:border-transparent"
                        placeholder="Search..."
                        value={searchChampion}
                        onChange={((event) => {setSearchChampion(event.target.value)})}
                    />
                    <button onClick={handleChampionSelection} className='w-32 flex justify-center items-center bg-green-600 drop-shadow-xl hover:bg-opacity-50 active:bg-opacity-30 bg-opacity-70 text-sm'>Select</button>
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
                    <div className='flex flex-wrap gap-2'>
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
                        {champions.filter((champ) => champ.name.toLowerCase().includes(searchChampion.toLowerCase())).map((champion) => (
                            <button key={champion.id} value={champion.id} onFocus={(event) => {setChampionSelected(event.target.value)}} className='relative w-8 h-8 bg-[#2E2E2E] drop-shadow-xl focus:border-2 '>
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

                </div>
            </div>
            <div className="h-screen lg:flex-1 text-center py-8"></div>
        </div>
    )
}
