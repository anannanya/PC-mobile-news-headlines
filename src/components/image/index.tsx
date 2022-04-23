import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ContentLoader from "react-content-loader"
import BrokenImage from '../../assets/broken_image.png';

const Loader = ({ width, height }: { width: number | string, height: number | string }) => (
    <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="4" ry="4" width={width} height={height} />
    </ContentLoader>
)

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholderSrc?: string;
    errorSrc?: string;
    src: string;
    size: { width: number | string, height: number | string };
    retryTimes?: number; // 支持重试的次数
}

export const BetterImage = (props: IProps) => {
    const { errorSrc = BrokenImage, placeholderSrc = BrokenImage, src, retryTimes, size, ...rest } = props;
    const { width, height } = size;

    const ref = useRef<HTMLImageElement | null>(null);
    const srcRef = useRef<string>('');
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    const retryTimesRef = useRef<number>(retryTimes === undefined ? 2 : retryTimes);

    const style = useMemo(() => ({
        width,
        height,
    }), [width, height]);

    // 预拉取
    useLayoutEffect(() => {
        const image = new Image();
        image.onload = () => {
            srcRef.current = src;
            setStatus('loaded');
        }
        image.onerror = () => {
            srcRef.current = errorSrc;
            setStatus('loaded');
        }
        image.src = src;
    }, [src]);

    if (src === 'None') {
        return <img ref={ref} style={style} {...rest} src={placeholderSrc} />
    }

    if (status === 'loading') {
        return <Loader width={width} height={height} />
    } else {
        return <img ref={ref} style={style} {...rest} src={srcRef.current} />
    }
}