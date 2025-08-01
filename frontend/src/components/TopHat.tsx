import hat from "../assets/top hat.png"

export default function TopHat(){
    return (
        <div className="h-full w-full test relative top-hat-container">
            <img className="top-hat" width={250} src={hat}></img>
        </div>
    )
}