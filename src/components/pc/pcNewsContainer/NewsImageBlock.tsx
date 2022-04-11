import { Card } from 'antd'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Router, Route, Link } from 'react-router-dom'




interface IPcNewsBlockProps extends React.CSSProperties {
    type: string;
    count: number;
    cartTitle: string;
    imageWidth?: string;
    cardGridWidth?: string;
}
interface INewsItemOption {
    uniquekey: any;
    title: any;
}

export default function NewsImageBlock(props: IPcNewsBlockProps) {
    const { type, count, cartTitle, imageWidth, width, cardGridWidth } = props
    const [news, setNews] = useState<INewsItemOption[]>([])
    const styleImage = {
        width: imageWidth,
    };
    const girdStyle = useMemo(() => {
        return {
            width: cardGridWidth,
            textAlign: 'center'
        } as React.CSSProperties
    }, [])
    const styeH3 = {
        width: imageWidth,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    };
    const newsList = news.length ? news.map((newsItem: INewsItemOption, index) => (
        <Card.Grid style={girdStyle}>
            <li key={index}>
                <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                    <div className="custom-image">
                        <img alt="" style={styleImage} src={require('../../../image/carousel_2.jpg')} />
                    </div>
                    <div className="custom-card">
                        <h3 >{newsItem.title}</h3>
                        <p>{`来源：新闻网`}</p>
                    </div>
                </Link>
            </li>
        </Card.Grid>

    ))
        : '没有加载到任何新闻';

    useEffect(() => {
        const fetchOption = {
            method: 'GET'
        }
        const params = `?type=${type}&count=${count}`

        fetch(`/picture${params}`, fetchOption).then(res => res.json()).then(res => setNews(res))
    }, [type, count])

    return (
        <div>
            <Card title={cartTitle} bordered={true} style={{
                width: width
            }}>
                {newsList}
            </Card>
        </div>
    )
}