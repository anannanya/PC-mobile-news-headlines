import { Card } from 'antd'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import ContentLoader from 'react-content-loader';
import { Router, Route, Link } from 'react-router-dom'
import { fetchNews, IFetchNewsResponse, INewsData } from '../../../api';
import { BetterImage } from '../../image'
import { CardDescriptionWrapper, CardImageWrapper, CardSourceWrapper, CardTitleWrapper, CardWrapper } from './styled';


interface IPcNewsBlockProps extends React.CSSProperties {
    type: string;
    count: number;
    cartTitle: string;
    imageWidth: number;
    cardGridWidth?: number;
    imageHeight: number;
}

const h2Style = {
    paddingLeft: 8,
    paddingTop: 12,
    fontFamily: 'Google Sans, sans-serif',
}
const liStyle = {
    height: '100%',
}


const Loader = () => (
    <CardWrapper>
        <CardImageWrapper>
            <ContentLoader
                speed={0}
                width={136}
                height={88}
                viewBox="0 0 136 88"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="5" ry="5" width="136" height="88" />
                {/* <rect x="6" y="112" rx="5" ry="5" width="136" height="14" />
            <rect x="6" y="130" rx="5" ry="5" width="136" height="14" />
            <rect x="6" y="148" rx="5" ry="5" width="66" height="14" />
            <rect x="6" y="178" rx="5" ry="5" width="88" height="12" /> */}
            </ContentLoader>
        </CardImageWrapper>
        <CardDescriptionWrapper>
            <CardTitleWrapper>
                <ContentLoader
                    speed={0}
                    width={136}
                    height={52}
                    viewBox="0 0 136 52"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="136" height="14" />
                    <rect x="0" y="18" rx="5" ry="5" width="136" height="14" />
                    <rect x="0" y="36" rx="5" ry="5" width="100" height="14" />
                </ContentLoader>
            </CardTitleWrapper>
            <CardSourceWrapper>
                <ContentLoader
                    speed={0}
                    width={136}
                    height={22}
                    viewBox="0 0 136 22"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="5" ry="5" width="88" height="14" />
                </ContentLoader>
            </CardSourceWrapper>
        </CardDescriptionWrapper>
    </CardWrapper>


)

const LIMIT_NUM = 40;

export default function NewsImageBlock(props: IPcNewsBlockProps) {
    const { type, count, cartTitle, imageWidth, imageHeight, width, cardGridWidth } = props
    const [news, setNews] = useState<IFetchNewsResponse | null>(null)
    const [a, setA] = useState(false);

    const imageSize = useMemo(() => ({
        width: imageWidth,
        height: imageHeight
    }), [imageWidth, imageHeight])

    const girdStyle = useMemo(() => {
        return {
            width: cardGridWidth,
            padding: 0,
            border: '1px solid #dadce0',
            height: 210,
            margin: 8,
            borderRadius: 8,
        } as React.CSSProperties
    }, [])
    const titleStyle = {
        overflow: 'hidden',
        display: '-webkit-box',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        fontSize: 12,
    } as React.CSSProperties;

    const sourceStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 12,
    } as React.CSSProperties;

    const renderNewsList = () => {
        if (!news) {
            return Array(LIMIT_NUM).fill('').map((item, index) => (
                <Card.Grid style={girdStyle} key={index}>
                    <Loader />
                </Card.Grid>
            ));
        }
        return news.map((newsItem: INewsData, index) => (
            <Card.Grid style={girdStyle} key={index}>
                <li key={index} style={liStyle}>
                    <CardWrapper href={newsItem.url} target="_blank" className="custom-card">
                        <CardImageWrapper className="custom-image">
                            <BetterImage size={imageSize} alt="" src={newsItem.imageUrl} />
                        </CardImageWrapper>
                        <CardDescriptionWrapper className="custom-description">
                            <CardTitleWrapper style={titleStyle}>{newsItem.summary}</CardTitleWrapper>
                            <CardSourceWrapper style={sourceStyle}>{newsItem.newsSite}</CardSourceWrapper>
                        </CardDescriptionWrapper>
                    </CardWrapper>
                </li>
            </Card.Grid>
        ))
    }

    useEffect(() => {
        fetchNews({ _limit: LIMIT_NUM }).then((res: IFetchNewsResponse) => {
            setNews(res)
            setA(true);
        })
    }, [type, count])

    return (
        <div>
            <Card bordered={false} style={{
                width: width,
            }}>
                <h2 style={h2Style}>国际新闻</h2>
                {renderNewsList()}
            </Card>
        </div>
    )
}