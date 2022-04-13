import PcHeader from "./pcHeader";
import PcFooter from "./pcFooter/PcFooter";
import PCNewsContainer from './pcNewsContainer'
import './index.css'

export default function PcIndex() {
    return (
        <div className="pc">
            <div className="pc-header">
                <PcHeader />
            </div>
            <div className="pc-news-container">
                <PCNewsContainer />
            </div>
            <div className="pc-footer">
                <PcFooter />
            </div>
        </div>
    )
}