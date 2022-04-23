import Loadable from 'react-loadable';
// import LoginModal  from './loginModal';
const LoadableLoginModal = Loadable({
    loader: () => import(/* webpackChunkName: "login-modal" */'./loginModal'),
    loading: () => <></>,
});

export default LoadableLoginModal;
// export default LoginModal;