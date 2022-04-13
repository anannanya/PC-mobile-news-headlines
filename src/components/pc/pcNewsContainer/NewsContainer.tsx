import { useCallback, useMemo } from "react"
import { Row, Col, Tabs, Carousel } from 'antd'
import PcNewsBlock from './PcNewsBlock'
import PCNewsImageBlock from './NewsImageBlock'
import { BetterImage } from "../../image"
import carouseImage1 from '../../../image/carousel_1.jpg';
import carouseImage2 from '../../../image/carousel_2.jpg';
import carouseImage3 from '../../../image/carousel_3.jpg';
import carouseImage4 from '../../../image/carousel_4.jpg';
import "./index.css";
const { TabPane } = Tabs

const imageSize = {
    width: 500,
    height: 300
}
export default function NewsContainer() {

    const settings = useMemo(() => (
        {
            dots: true,
            speed: 500,
            autoplay: true
        }
    ), [])
    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className='container'>
                    <div className="content-wrapper">
                        <div className="top-area">
                            <div className="top-left-container">
                                <div className="carousel">
                                    <Carousel {...settings}>
                                        <div><BetterImage src={carouseImage1} alt="" size={imageSize} /></div>
                                        <div><BetterImage src={carouseImage2} alt="" size={imageSize} /></div>
                                        <div><BetterImage src={carouseImage3} alt="" size={imageSize} /></div>
                                        <div><BetterImage src={carouseImage4} alt="" size={imageSize} /></div>
                                    </Carousel>
                                </div>
                            </div>
                            <div className="top-right-container"></div>
                        </div>
                        <div className="bottom-area">
                            <PCNewsImageBlock count={6} type="国际头条" width={'100%'} cartTitle="国际头条" imageWidth={136} cardGridWidth={150} imageHeight={88} />
                        </div>
                    </div>

                    {/* <Tabs className="tabs_news">
                        <TabPane tab="头条新闻" key="1">
                            <PcNewsBlock count={22} type="top" width="100%" />
                        </TabPane>
                        <TabPane tab="国际" key="2">
                            <PcNewsBlock count={22} type="guoji" width="100%" />
                        </TabPane>
                    </Tabs> */}
                </Col>
                <Col span={2}></Col>
            </Row>
        </div>
    )
}