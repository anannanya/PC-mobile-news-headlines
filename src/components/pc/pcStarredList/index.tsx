import { useSelector, useDispatch } from 'react-redux';
import { INewsDataMap, IStarredNewsIds, IStore } from '../../../redux';
import { ReactComponent as UnStarLogo } from '../../../assets/unstar.svg';
import { ReactComponent as DoubleArrow } from '../../../assets/double_arrow.svg';
import "./index.css"
import classnames from 'classnames';

interface IListProps {
    visible: boolean;
    hideStarredList: () => void;
}
export const StarredLsit: React.FC<IListProps> = (props) => {
    const { hideStarredList } = props;
    const starredIds = useSelector<IStore, IStarredNewsIds>(state => state.starredNewsIds);
    const news = useSelector<IStore, INewsDataMap>(state => state.news);

    return <div className={classnames("starred-list", { visible: props.visible })}>
        <header className="starred-list-header">
            <div className="title">
                收藏列表
            </div>
            <div className="icon-wrapper" onClick={hideStarredList}>
                <DoubleArrow width={16} height={16} />
            </div>
        </header>
        <div className="list-wrapper" style={{ padding: 6 }}>
            {starredIds.filter(id => news[id]).map((id) => (
                <div className='starred-list-item'>
                    <a href={news[id].url} style={{
                        width: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: 'rgb(31, 35, 41)',
                    }}>{news[id].summary}</a>
                </div>))}
        </div>
    </div>
}

interface IBtnProps {
    onClick: () => void;
    visible: boolean;
}
export const StarredListBtn: React.FC<IBtnProps> = (props) => {
    const { visible } = props;
    return (
        <div className={classnames("starred-btn", { visible })} onClick={props.onClick}>
            <UnStarLogo width={16} height={16} />
        </div>
    )
}