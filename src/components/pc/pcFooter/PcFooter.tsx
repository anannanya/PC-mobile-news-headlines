import React, { useState } from "react"
import { Row, Col, Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const { SubMenu } = Menu
export default function PcFooter() {

    return (
        <Row>
            <Col span={2}></Col>
            <Col span={20} className='footer'>
                &copy;&nbsp;2022 ReactNews. All Rights Reserved
            </Col>
            <Col span={2}></Col>
        </Row>
    )
}