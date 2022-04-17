import { Router, Route, Link } from 'react-router-dom'
import { BetterImage } from '../../image'
import { Tooltip } from '../tooltip';
import { ReactComponent as UnStarLogo } from '../../../assets/unstar.svg';
import { ReactComponent as StarredLogo } from '../../../assets/starred.svg';
import { Button, Card, message } from 'antd'
import { useCallback, useMemo } from 'react';
import { CardDescriptionWrapper, CardImageWrapper, CardSourceWrapper, CardTitleWrapper, CardWrapper, StarIconWrapper } from './styled';
import { INewsData } from '../../../api';
import { useDispatch } from 'react-redux';
import { removeStar as removeStarAction, addStar as addStarAction } from '../../../redux/actions/star'
import usePersistFn from '../../../hooks/usePersistFn';
import { IUser } from '../../../redux';
import { storage } from '../../../common/storage';

const liStyle = {
    height: '100%',
}

interface IProps {
    cardGridWidth?: number;
    newsItem: INewsData
    imageWidth: number;
    imageHeight: number;
    isStarred: boolean;
    currentUser: IUser;
}

const sourceStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 12,
} as React.CSSProperties;

const titleStyle = {
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    fontSize: 12,
} as React.CSSProperties;

export const NewsCard: React.FC<IProps> = (props) => {
    const { cardGridWidth, newsItem, imageWidth, imageHeight, isStarred, currentUser } = props;
    const dispatch = useDispatch();

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
    }, [cardGridWidth])

    const removeStar = useCallback(e => {
        dispatch(removeStarAction({
            id: newsItem.id,
        }));
    }, []);

    const addStar = useCallback(e => {
        dispatch(addStarAction({
            id: newsItem.id,
        }));
    }, []);

    const toggleStar = usePersistFn((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (!currentUser) {
            message.info(<span>
                <span>请先登录~</span>
            </span>);
            return;
        }
        if (isStarred) {
            removeStar(e);
            const userInfo = storage.get(currentUser.name) || {};
            const starredList: number[] = userInfo.starredList || [];
            storage.set(currentUser.name, {
                ...userInfo,
                starredList: starredList.filter(id => id !== newsItem.id),
            });
        } else {
            addStar(e);
            message.success('收藏成功')
            const userInfo = storage.get(currentUser.name) || {};
            const starredList: number[] = userInfo.starredList || [];
            storage.set(currentUser.name, {
                ...userInfo,
                starredList: [...starredList, newsItem.id],
            });
        }
    });

    return (
        <Card.Grid style={girdStyle}>
            <li style={liStyle}>
                <CardWrapper href={newsItem.url} target="_blank" className="custom-card">
                    <CardImageWrapper className="custom-image">
                        <BetterImage size={imageSize} alt="" src={newsItem.imageUrl} />
                    </CardImageWrapper>
                    <CardDescriptionWrapper className="custom-description">
                        <CardTitleWrapper style={titleStyle}>{newsItem.summary}</CardTitleWrapper>
                        <CardSourceWrapper style={sourceStyle}>
                            <p style={{ marginBottom: 0 }}>{newsItem.newsSite}</p>
                            <StarIconWrapper onClick={toggleStar}>
                                {
                                    isStarred ? <StarredLogo width={14} height={14} /> : <UnStarLogo width={14} height={14} />
                                }
                            </StarIconWrapper>
                        </CardSourceWrapper>
                    </CardDescriptionWrapper>
                </CardWrapper>
            </li>
        </Card.Grid>
    )
}