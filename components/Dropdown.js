
export function Dropdown({ selectedOption, onOptionChange, options }) {
    
    return (
        <div className="relative inline-block text-left">
            <div>
                <span className="shadow-sm">
                <select
                    className="block w-36 pl-3  py-2 text-base border-b leading-6 border-gray-300 bg-transparent  focus:outline-none focus:shadow-outline-blue focus:border-white transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={selectedOption}
                    onChange={onOptionChange}
                >
                    {options.map((item) => {
                        return (
                            <option key={item.tag} value={item.value}>{item.tag}</option>
                        )
                    })}
                </select>
                </span>
            </div>
        </div>
    )
}