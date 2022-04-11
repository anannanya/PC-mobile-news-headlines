import MobileHeader from "./mobileHeader";
import MobileFooter from "./mobileFooter/MobileFooter";
import MobileTabs from "./mobileTabs/MobileTabs";
import './index.css'

export default function MobileIndex() {
    return (
        <div className="mobile">
            <div className="mobileHeader">
                <MobileHeader />
            </div>
            <div className="mobileTabs">
                <MobileTabs />
            </div>
            <div className="mobileFooter">
                <MobileFooter />
            </div>

        </div>
    )
}