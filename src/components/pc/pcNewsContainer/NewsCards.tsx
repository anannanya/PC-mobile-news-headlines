import { Card } from 'antd'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import ContentLoader from 'react-content-loader';
import { fetchNews, IFetchNewsResponse, INewsData } from '../../../api';

import { CardDescriptionWrapper, CardImageWrapper, CardSourceWrapper, CardTitleWrapper, CardWrapper } from './styled';

import { useSelector, useDispatch } from 'react-redux';
import { IStarredNewsIds, IStore, IUser } from '../../../redux';
import { NewsCard } from './NewsCard';
import { storage } from '../../../common/storage';
import { addStarMultiply } from '../../../redux/actions/star';
import { addNews } from '../../../redux/actions/news';


interface IPcNewsBlockProps extends React.CSSProperties {
    type: string;
    count: number;
    cartTitle: string;
    imageWidth: number;
    cardGridWidth?: number;
    imageHeight: number;
}

const h2Style = {
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

export default function NewsCards(props: IPcNewsBlockProps) {
    const { type, count, imageWidth, imageHeight, width, cardGridWidth } = props
    const [news, setNews] = useState<IFetchNewsResponse | null>(null)
    const starredIds = useSelector<IStore, IStarredNewsIds>(state => state.starredNewsIds);
    const currentUser = useSelector<IStore, IUser>(state => state.user);
    const dispatch = useDispatch();
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

    const renderNewsList = () => {
        if (!news) {
            return Array(LIMIT_NUM).fill('').map((item, index) => (
                <Card.Grid style={girdStyle} key={index}>
                    <Loader />
                </Card.Grid>
            ));
        }
        return news.map((newsItem: INewsData, index) => {
            const isStarred = starredIds.includes(newsItem.id);
            return <NewsCard currentUser={currentUser} key={index} isStarred={isStarred} newsItem={newsItem} cardGridWidth={cardGridWidth} imageWidth={imageWidth} imageHeight={imageHeight} />
        })
    }

    useEffect(() => {
        fetchNews({ _limit: LIMIT_NUM }).then((res: IFetchNewsResponse) => {
            setNews(res)
            dispatch(addNews(res));
        })
    }, [type, count])

    useEffect(() => {
        if (currentUser) {
            const currentUserInCache = storage.get(currentUser.name) || {};
            const starredIdsInCache = currentUserInCache.starredList || [];
            dispatch(addStarMultiply({
                ids: starredIdsInCache
            }));
        }
    }, [currentUser]);

    return (
        <div>
            <Card className="news-card-list-wrapper" bordered={false} style={{
                width: width,
            }}>
                <h2 style={h2Style}>Headlines</h2>
                {renderNewsList()}
            </Card>
        </div>
    )
}