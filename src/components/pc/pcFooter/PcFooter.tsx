import React, { useState } from "react"
import { Row, Col, Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const { SubMenu } = Menu
export default function PcFooter() {
    return (
        <footer className='footer-content'>
            &copy;&nbsp;2022 ReactNews. All Rights Reserved
        </footer>
    )
}