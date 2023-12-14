
import { useRef, useState } from "react"
import { Dropdown } from "./Dropdown";
import { DraftCard } from "./DraftCard";
import { PickSelection } from "./PickSelection";
import Image from "next/image";
import { BanCard } from "./BanCard";
import { SelectRole } from "./SelectRole";

export function Content({ champions, championsByRole, clusterDictionary }) {
    // State for the current recommendation
    const [recommendation, setRecommendation] = useState({"recommendation": ["", 0]})
    // Ref for the current draft rotation index
    const draftRotation = useRef(0)
    // Ref for the current draft selection picks and bans based on order pick
    const draftSelection = useRef([{"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}])
    // State for the currently selected role
    const [selectedRole, setSelectedRole] = useState("top")

    // State used to rerender draft components when a reset in draft happens
    const [state, setState] = useState(0)

    // State for the search text field input
    const [searchChampion, setSearchChampion] = useState("")
    // State for the current champion selection
    const [championSelected, setChampionSelected] = useState("")

    // State for the patch filter
    const [patch, setPatch] = useState('');

    // Handler for champion selection
    const handleChampionSelection = () => {
        if (championSelected != "") {
            draftSelection.current[draftRotation.current] = {"champion": championSelected, "role": selectedRole}
            draftRotation.current += 1
            setChampionSelected("")
        }
    }

    // Handler for role selection
    const handleSelectedRole = (role) => {
        setSelectedRole(role.value)
    }
    
    // Handler for champio selection on hold
    const handleHoldChampionSelection = (event) => {
        setChampionSelected(event.target.value)
    }
    
    // Handler for the search input
    const handleSearchChampion = (event) => {
        setSearchChampion(event.target.value)
    }

    // Handler for draft simulation reset
    const handleDraftReset = () => {
        draftRotation.current = 0
        draftSelection.current = [{"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}, {"champion": "", "role": "unselected", "cluster": 0}]
        setChampionSelected("")
        setSearchChampion("")
        setState(state + 1)
    }

    // Handler for patch selection
    const handlePatchChange = (event) => {
        setPatch(event.target.value);
    };


    // Handler for creating a recommendation
    const handlePrediction = async () => {
        
        setRecommendation({"recommendation": ["", 0]})
        {draftSelection.current.reduce( (acc, pick) => {
            if (pick.champion == "") {
                return acc
            }
            var cluster_translation = clusterDictionary.get(pick.role)

            cluster_translation.map((item) => {
                const [key, value] = Object.entries(item)[0];
                if (key == pick.champion) {
                    pick.cluster = value
                }
            })
            acc.push(pick)
            return acc
        }, [])}
        
        const draft = {
            "draftSelection": draftSelection.current,
            "draftRotation": (draftRotation.current + 1)
        }

        const res = await fetch('/api/predict', {
            method: 'POST',
            body: JSON.stringify(draft),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        
        setRecommendation(data)
    };

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
                            options={[{value: '', tag: 'patch'},{value: '13.10', tag: '13.10'}]}
                        />
                    </div>
                </div>

                {/* Draft Section */}
                <div className='w-full flex flex-row'>
                    {/* Blue Team */}
                    <div className='flex-1 flex flex-col items-end text-center py-4 gap-1'>
                    <div className='w-48 h-8 flex items-center justify-center bg-blue-500 text-sm drop-shadow-xl'>Blue Team</div>
                    <div className='w-full h-full flex items-center justify-end gap-2'>
                        <BanCard />
                        <BanCard />
                        <BanCard />                      
                        <div className='w-1 h-6 bg-white drop-shadow-xl' />
                        <BanCard />
                        <BanCard />                    
                    </div>
                    </div>

                    <div className='w-[10%] flex justify-center items-center text-3xl py-4'>VS</div>
                    
                    {/* Red Team */}
                    <div className='flex-1 flex flex-col items-start text-center py-4 gap-1'>
                    <div className='w-48 h-8 flex items-center justify-center bg-red-500 text-sm drop-shadow-xl'>Red Team</div>
                    <div className='w-full h-full flex items-center justify-start gap-2'>
                        <BanCard />
                        <BanCard />
                        <BanCard />
                        <div className='w-1 h-6 bg-white drop-shadow-xl' />
                        <BanCard />
                        <BanCard />
                    </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='w-full h-full flex flex-col items-end justify-start gap-2 pr-4'>
                        <div className='flex '>
                            <SelectRole role={draftSelection.current[0]['role']} />
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={0} champLocked={draftSelection.current[0].champion} champSelected={championSelected} />                        
                        </div>
                        <div className='flex '>
                            <SelectRole role={draftSelection.current[3]['role']} />
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={3} champLocked={draftSelection.current[3].champion} champSelected={championSelected} />                        
                        </div>
                        <div className='flex '>
                            <SelectRole role={draftSelection.current[4]['role']} />
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={4} champLocked={draftSelection.current[4].champion} champSelected={championSelected} />
                        </div>
                        <div className='h-1 w-16 bg-white drop-shadow-xl' />
                        <div className='flex '>
                            <SelectRole role={draftSelection.current[7]['role']} />
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={7} champLocked={draftSelection.current[7].champion} champSelected={championSelected} />                        
                        </div>
                        <div className='flex '>
                            <SelectRole role={draftSelection.current[8]['role']} />
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={8} champLocked={draftSelection.current[8].champion} champSelected={championSelected} />                        
                        </div>
                    </div>
                    <PickSelection
                        champions={champions}
                        handleSearchChampion={handleSearchChampion}
                        searchChampion={searchChampion}
                        handleChampionSelection={handleChampionSelection}
                        handleDraftReset={handleDraftReset}
                        handleHoldChampionSelection={handleHoldChampionSelection}
                        draftRotation={draftRotation}
                        handleSelectedRole={handleSelectedRole}
                        championsByRole={championsByRole}
                        handlePrediction={handlePrediction}
                        clusterDictionary={clusterDictionary}
                        recommendation={recommendation}
                    />
                    <div className='w-full h-full flex flex-col items-start justify-start gap-2 pl-4'>
                        <div className='flex '>
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={1} champLocked={draftSelection.current[1].champion} champSelected={championSelected} />                        
                            <SelectRole role={draftSelection.current[1]['role']} />
                        </div>
                        <div className='flex '>
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={2} champLocked={draftSelection.current[2].champion} champSelected={championSelected} />                        
                            <SelectRole role={draftSelection.current[2]['role']} />
                        </div>
                        <div className='flex '>
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={5} champLocked={draftSelection.current[5].champion} champSelected={championSelected} />                        
                            <SelectRole role={draftSelection.current[5]['role']} />
                        </div>
                        <div className='h-1 w-16 bg-white drop-shadow-xl' />
                        <div className='flex '>
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={6} champLocked={draftSelection.current[6].champion} champSelected={championSelected} />                        
                            <SelectRole role={draftSelection.current[6]['role']} />
                        </div>
                        <div className='flex '>
                            <DraftCard dimensions={'w-16 h-16'} rotation={draftRotation.current} index={9} champLocked={draftSelection.current[9].champion} champSelected={championSelected} />                        
                            <SelectRole role={draftSelection.current[9]['role']} />
                        </div>
                    </div>
                </div>

                </div>
            </div>
            <div className="h-screen lg:flex-1 text-center py-8"></div>
        </div>
    )
}
