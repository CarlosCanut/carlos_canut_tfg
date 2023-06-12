export function PredictButton ({ handlePrediction }) {
    return (
        <button 
            onClick={handlePrediction} 
            className='w-32 flex justify-center items-center bg-yellow-400 drop-shadow-xl hover:bg-opacity-50 active:bg-opacity-30 bg-opacity-70 text-sm mr-auto'
        >
            Predict
        </button>
    )
}