import PcHeader from "./pcHeader";
import PcFooter from "./pcFooter/PcFooter";
import PCNewsContainer from './pcNewsContainer'
import './index.css'
import { StarredListBtn, StarredLsit } from "./pcStarredList";
import { useCallback, useState } from "react";

export default function PcIndex() {
    const [starredListVisible, setStarredListVisible] = useState(false);

    const onStarredListBtnClick = useCallback(() => {
        setStarredListVisible(true);
    }, []);

    const hideStarredList = useCallback(() => {
        setStarredListVisible(false);
    }, []);

    return (
        <div className="pc" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="pc-header">
                <PcHeader />
            </div>
            <div className="pc-news-container">
                <PCNewsContainer />
            </div>
            <div className="pc-footer">
                <PcFooter />
            </div>
            <StarredListBtn onClick={onStarredListBtnClick} visible={!starredListVisible} />
            <StarredLsit visible={starredListVisible} hideStarredList={hideStarredList} />
        </div>
    )
}