import React, { useCallback, useState } from "react"
import { NavLink, Route } from 'react-router-dom'
import { Row, Col, Menu, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd'
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import LoginModal from '../../loginModal'

const { SubMenu } = Menu
export default function MobileHeader() {
    const [modalVisible, setmodalVisible] = useState(false)
    const [hasLogined, setHasLogined] = useState(false)
    const [userMessage, setUserMessage] = useState({
        userNickName: 'ln',
        userId: 0
    })
    const handleLogin = useCallback(() => {
        setmodalVisible(true)
    }, [])

    const userShow = hasLogined ? (
        // <NavLink to=''>
        <UserOutlined className="userIcon" />
        // </NavLink>
    ) : (
        <SettingOutlined onClick={handleLogin} className='settingIcon' />
    )
    return (
        <header>
            <img src={require('../../../image/logo.png')} alt="logo" />
            <span>ReactNews</span>
            {userShow}
            <LoginModal
                modalVisible={modalVisible}
                setModalVisible={setmodalVisible}
            />
        </header>
    )
} 