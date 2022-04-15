import { Tooltip as AntdTooltip } from 'antd';

interface IProps {
    title: string;
}

const style = {
    backgroundColor: 'rgb(31, 35, 41)',
    borderRadius: 6
}
export const Tooltip: React.FC<IProps> = (props) => {
    return (
        <AntdTooltip mouseEnterDelay={1} title={props.title} overlayInnerStyle={style}>
            {props.children}
        </AntdTooltip>
    )
}