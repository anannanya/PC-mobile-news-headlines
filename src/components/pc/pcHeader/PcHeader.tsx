import React, { useCallback, useState } from "react"
import { Row, Col, Menu, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import { NavLink, Route } from 'react-router-dom'
import LoginModal from "../../loginModal"

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
            <Row>
                <Col span={2}></Col>
                <Col span={4}>
                    <a href="/" className="logo">
                        <img src={require('../../../image/logo.png')} alt="logo" />
                        <span>ReactNews</span>
                    </a>
                </Col>
                <Col span={12}>
                    <Menu mode='horizontal' onClick={handleMenuClick} selectedKeys={[current]} className='menuTabs'>
                        <Menu.Item key='headNews' icon={<AppstoreOutlined />}>
                            头条
                        </Menu.Item>
                        <Menu.Item key='social' icon={<AppstoreOutlined />}>
                            社会
                        </Menu.Item>
                        <Menu.Item key='china' icon={<AppstoreOutlined />}>
                            国内
                        </Menu.Item>
                        <Menu.Item key='international' icon={<AppstoreOutlined />}>
                            国际
                        </Menu.Item>
                        <Menu.Item key='fun' icon={<AppstoreOutlined />}>
                            娱乐
                        </Menu.Item>
                        <Menu.Item key='sport' icon={<AppstoreOutlined />}>
                            体育
                        </Menu.Item>
                        <Menu.Item key='science' icon={<AppstoreOutlined />}>
                            科技
                        </Menu.Item>
                        <Menu.Item key='fashion' icon={<AppstoreOutlined />}>
                            时尚
                        </Menu.Item>
                    </Menu>
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