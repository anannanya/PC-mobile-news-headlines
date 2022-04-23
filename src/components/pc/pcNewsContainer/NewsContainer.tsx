import { useCallback, useMemo } from "react"
import { Row, Col, Tabs, Carousel } from 'antd'
import RecommandNews from './RecommandNews'
import PCNewsImageBlock from './NewsCards'
import { BetterImage } from "../../image"
import carouseImage1 from '../../../image/rocket1.png';
import carouseImage2 from '../../../image/rocket2.jpg';
import carouseImage3 from '../../../image/rocket3.jpg';
import carouseImage4 from '../../../image/rocket4.jpg';
import "./index.css";
const { TabPane } = Tabs

const imageSize = {
    width: '100%',
    height: 300,
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
                                        <a href="http://www.cmse.gov.cn/xwzx/202204/t20220416_49524.html" target="_blank">
                                            <div><BetterImage src={carouseImage1} alt="" size={imageSize} /></div>
                                        </a>
                                        <a href="http://www.cmse.gov.cn/xwzx/202204/t20220414_49516.html" target="_blank">
                                            <div><BetterImage src={carouseImage2} alt="" size={imageSize} /></div>
                                        </a>
                                        <a href="http://www.cmse.gov.cn/gjhz/201905/t20190510_23746.html" target="_blank">
                                            <div><BetterImage src={carouseImage3} alt="" size={imageSize} /></div>
                                        </a>
                                        <a href="http://www.cmse.gov.cn/gjhz/201906/t20190612_23749.html" target="_blank">
                                            <div><BetterImage src={carouseImage4} alt="" size={imageSize} /></div>
                                        </a>
                                    </Carousel>
                                </div>
                            </div>
                            <div className="top-medium-container">
                                <RecommandNews />
                            </div>
                        </div>
                        <div className="bottom-area">
                            <PCNewsImageBlock count={6} type="国际头条" width={'100%'} cartTitle="国际头条" imageWidth={136} cardGridWidth={150} imageHeight={88} />
                        </div>
                    </div>

                    {/* <Tabs className="tabs_news">
                        <TabPane tab="头条新闻" key="1">
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