import { Card } from 'antd'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Router, Route, Link } from 'react-router-dom'




interface IPcNewsBlockProps extends React.CSSProperties {
    type: string;
    count: number;
}
interface INewsItemOption {
    uniquekey: any;
    title: any;
}

export default function PcNewsBlock(props: IPcNewsBlockProps) {
    const { type, count } = props
    const [news, setNews] = useState<INewsItemOption[]>([])

    const newsList = news.length ? news.map((newsItem: INewsItemOption, index) => (
        <li key={index}>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                {newsItem.title}
            </Link>
        </li>
    ))
        : '没有加载到任何新闻';

    console.log(112, newsList)
    useEffect(() => {
        const fetchOption = {
            method: 'GET'
        }
        const params = `?type=${type}&count=${count}`
        // fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews${params}`, fetchOption)
        //     .then(response => response.json()).then(json => setNews(json))
        fetch(`/article${params}`, fetchOption).then(res => res.json()).then(res => setNews(res))
    }, [type, count])

    return (
        <div>
            <Card className='newsCard' bordered={true}>
                <div>
                    {newsList}
                </div>
            </Card>
        </div>
    )
}