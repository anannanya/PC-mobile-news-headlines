import React, { useCallback, useState } from "react"
import { Row, Col, Menu, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import { NavLink, Route } from 'react-router-dom'
import LoginModal from "../../loginModal"
import { ReactComponent as RocketIcon } from '../../../assets/rocket.svg';


// const { SubMenu } = Menu
const MenuItemGroup = Menu.ItemGroup
export default function PcHeader(props: any) {
    // const { userShow } = props.form
    const [current, setCurrent] = useState('headNews')
    const [hasLogined, setHasLogined] = useState(false)
    const [modalVisible, setmodalVisible] = useState(false)
    const [userMessage, setUserMessage] = useState({
        userNickName: 'ln',
        userId: 0
    })

    const handleMenuClick = useCallback((e: any) => {
        setCurrent(e.key)
    }, [])
    const handleLogin = useCallback(() => {
        console.log(11)
        setmodalVisible(true)
    }, [])
    const logout = useCallback(() => {
        setUserMessage({
            userNickName: '',
            userId: 0
        })
        setHasLogined(false)
    }, [])

    const loginView = hasLogined ? (
        <div key='logout' className="register">
            <Button type='primary' htmlType="button">{userMessage.userNickName}</Button>
            &nbsp;&nbsp;
            {/* <NavLink target='' to=''> */}
            <Button type='dashed' htmlType="button">个人中心</Button>
            {/* </NavLink> */}
            &nbsp;&nbsp;
            <Button type="ghost" onClick={logout}>退出</Button>
        </div>
    ) : (
        <Button type='text' key='register' onClick={handleLogin}>
            <AppstoreOutlined />注册/登录
        </Button>
    )
    return (
        <header>
            <Row style={{ paddingTop: 12 }}>
                <Col span={2}></Col>
                <Col span={4}>
                    <a href="/" className="logo">
                        <RocketIcon width={24} height={24} />
                        <span>Rocket News</span>
                    </a>
                </Col>
                <Col span={12}>
                </Col>
                <Col span={4} className='loginView'>
                    {loginView}
                </Col>
                <Col span={2} >

                </Col>
                <LoginModal
                    modalVisible={modalVisible}
                    setModalVisible={setmodalVisible}
                    setUserMessage={setUserMessage}
                    setHasLogined={setHasLogined}
                />
            </Row>
        </header >
    )
}