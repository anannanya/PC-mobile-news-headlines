import { useCallback, useMemo } from "react"
import { Row, Col, Tabs, Carousel } from 'antd'
import PcNewsBlock from './PcNewsBlock'
import PCNewsImageBlock from './NewsImageBlock'
const { TabPane } = Tabs
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
                    <div className="leftContainer">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src={require('../../../image/carousel_1.jpg')} alt="" /></div>
                                <div><img src={require('../../../image/carousel_2.jpg')} alt="" /></div>
                                <div><img src={require('../../../image/carousel_3.jpg')} alt="" /></div>
                                <div><img src={require('../../../image/carousel_4.jpg')} alt="" /></div>
                            </Carousel>
                        </div>
                        <PCNewsImageBlock count={6} type="国际头条" width="500px" cartTitle="国际头条" imageWidth="112px" />
                    </div>
                    <Tabs className="tabs_news">
                        <TabPane tab="头条新闻" key="1">
                            <PcNewsBlock count={22} type="top" width="100%" />
                        </TabPane>
                        <TabPane tab="国际" key="2">
                            <PcNewsBlock count={22} type="guoji" width="100%" />
                        </TabPane>
                    </Tabs>

                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className="row2">
                <Col span={2}></Col>
                <Col span={20}>
                    <div>
                        <PCNewsImageBlock count={8} type="国内" width="100%" cartTitle="国内新闻" imageWidth="132px" cardGridWidth='12.5%' />
                        <PCNewsImageBlock count={16} type="娱乐" width="100%" cartTitle="娱乐新闻" imageWidth="132px" cardGridWidth='12.5%' />
                    </div>
                </Col>
                <Col span={2}></Col>

            </Row>

        </div>
    )
}