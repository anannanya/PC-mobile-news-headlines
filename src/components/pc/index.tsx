import PcHeader from "./pcHeader";
import PcFooter from "./pcFooter/PcFooter";
import PCNewsContainer from './pcNewsContainer'
import './index.css'

export default function PcIndex() {
    return (
        <div className="pc">
            <div className="pcHeader">
                <PcHeader />
            </div>
            <div className="pcNewsCOntainer">
                <PCNewsContainer />
            </div>
            <div className="pcFooter">
                <PcFooter />
            </div>
        </div>
    )
}