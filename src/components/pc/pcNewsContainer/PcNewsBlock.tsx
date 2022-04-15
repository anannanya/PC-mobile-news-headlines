import { Card } from 'antd'
import classnames from 'classnames';
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ContentLoader from 'react-content-loader';
import { Router, Route, Link } from 'react-router-dom'
import { fetchNews, IFetchNewsResponse, INewsData } from '../../../api';
import { ReactComponent as ChangeLogo } from '../../../assets/change.svg';
import { Tooltip } from '../tooltip';

const Loader = () => (
    <ContentLoader
        speed={0}
        width={600}
        height={250}
        viewBox="0 0 600 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="16" />
        <rect x="0" y="26" rx="5" ry="5" width="80%" height="16" />
        <rect x="0" y="52" rx="5" ry="5" width="100%" height="16" />
        <rect x="0" y="78" rx="5" ry="5" width="40%" height="16" />
        <rect x="0" y="104" rx="5" ry="5" width="80%" height="16" />
        <rect x="0" y="130" rx="5" ry="5" width="40%" height="16" />
        <rect x="0" y="156" rx="5" ry="5" width="100%" height="16" />
        <rect x="0" y="182" rx="5" ry="5" width="90%" height="16" />
        <rect x="0" y="208" rx="5" ry="5" width="100%" height="16" />
        <rect x="0" y="234" rx="5" ry="5" width="100%" height="16" />
    </ContentLoader>
)
const LIMIT_NUM = 10;
const headerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
}
const style = {
    height: 25,
    maxWidth: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
} as React.CSSProperties;

interface IPcNewsBlockProps extends React.CSSProperties { }

export default function PcNewsBlock(props: IPcNewsBlockProps) {
    const [news, setNews] = useState<INewsData[]>([])
    const startIndex = useRef(0);
    const [isIconRotating, setIsIconRotating] = useState(false);

    const fetchData = async (start: number) => {
        return fetchNews({ _limit: LIMIT_NUM, _start: start }).then((res: IFetchNewsResponse) => {
            setNews(res)
            setIsIconRotating(false);
        })
    }

    const changeNews = async () => {
        setNews([]);
        setIsIconRotating(true)
        await fetchData(startIndex.current);
        startIndex.current += LIMIT_NUM;
    }

    useEffect(() => {
        fetchData(startIndex.current);
        startIndex.current += LIMIT_NUM;
    }, [])


    return (
        <div>
            <Card className='newsCard' bordered={false}>
                <header style={headerStyle}>
                    <h2 style={{ margin: 0 }}>Recommends</h2>
                    <ChangeLogo className={classnames('change-logo', { rotate: isIconRotating })} width={16} height={16} onClick={changeNews} />
                </header>
                <div>
                    {
                        news.length ? news.map((newsItem: INewsData, index) => (
                            <li key={index} style={style}>
                                <Tooltip title={newsItem.summary}>
                                    <a href={newsItem.url} className="ellipsis" target="_blank" style={{ maxWidth: '100%', display: 'block' }}>
                                        {newsItem.summary}
                                    </a>
                                </Tooltip>
                            </li>
                        )) : <Loader></Loader>
                    }
                </div>
            </Card>
        </div >
    )
}