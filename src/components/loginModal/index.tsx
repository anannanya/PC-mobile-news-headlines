import { Tabs, message, Form, Input, Button, Checkbox, Modal, Alert } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import "./index.css"
const FormItem = Form.Item
const { TabPane } = Tabs
interface ILoginModalProps {
    modalVisible: boolean
    setModalVisible: any
    setUserMessage: any
    setHasLogined: any
}

const displayNoneStyle = { style: { display: 'none' } as React.CSSProperties };
const posRightStyle = {
    textAlign: 'right'
} as React.CSSProperties
const modalStyle = {
    borderRadius: 6
}

export default function LoginModal(props: ILoginModalProps) {
    const { modalVisible, setModalVisible, setUserMessage, setHasLogined } = props
    const [action, setAction] = useState('login')

    const [form1] = Form.useForm()
    const [form2] = Form.useForm()
    const handleCancel = useCallback(() => {
        form2.resetFields()
        setModalVisible(false)
    }, [])
    const handleOk = useCallback(() => {
        form2.resetFields()
        setModalVisible(false)
    }, [])
    const handleSubmitSuccess = useCallback((formData) => {
        if (formData.newUserPassword !== formData.newSurePassword) {
            message.error('确认密码与设置密码不一致！')
            return
        }
        const myFetchOptions = {
            method: 'GET'
        };
        const params = `action=${action}&username=${formData.userName}&password=${formData.userPassword}` +
            `&r_userName=${formData.newUserName}&r_password=${formData.newUserPassword}&r_confirmPassword=${formData.newSurePassword}`
        console.log(111, params)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?" + params, myFetchOptions).then(response =>
            response.json()).then(json => {
                setUserMessage({ userNickName: json.NickUserName, userid: json.UserId });
            }
            );
        message.success("请求成功！");
        form1.resetFields()
        form2.resetFields()
        if (action === 'login') {
            setHasLogined(true)
            setUserMessage({ userNickName: formData.userName, userid: '' })
        }
        setModalVisible(false);
    }, [])

    const handelTabKeyChange = useCallback((key) => {
        if (key === '1') {
            setAction('login')
        }
        if (key === '2') {
            setAction('register')
        }
    }, [])

    const cancelButtonStyle = useMemo(() => {
        return {
            style: {
                display: 'none'
            }
        }
    }, [])
    const userNameRule = useMemo(() => {
        return [{
            required: true,
            message: 'Please input your username'
        }]
    }, [])
    const passwordRule = useMemo(() => {
        return [{
            required: true,
            message: 'Please input your password'
        }]
    }, [])

    return (
        <Modal
            title='用户中心'
            wrapClassName='vertical-center-modal'
            className="user-center-modal"
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            okText='关闭'
            cancelButtonProps={displayNoneStyle}
            footer={null}
            style={modalStyle}
        >
            <Tabs type="card" onChange={handelTabKeyChange}>
                <TabPane tab="登录" key="1" className="tab-pane-wrapper">
                    <Form name='login' layout='vertical' form={form1} onFinish={handleSubmitSuccess} initialValues={{ remember: true }}>
                        <FormItem label="账户" name='userName' rules={userNameRule}>
                            <Input placeholder="请输入您的账号" />
                        </FormItem>
                        <FormItem label="密码" name='userPassword' rules={passwordRule}>
                            <Input.Password placeholder="请输入您的密码" />
                        </FormItem>
                        <FormItem style={posRightStyle}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane tab='注册' key='2'>
                    <Form name='zhuce' layout='vertical' form={form2} onFinish={handleSubmitSuccess} initialValues={{ remember: true }}>
                        <FormItem label='账户' name='newUserName' rules={userNameRule}>
                            <Input placeholder="请输入您的账号" />
                        </FormItem>
                        <FormItem label='密码' name='newUserPassword' rules={passwordRule}>
                            <Input.Password placeholder="请输入您的密码" />
                        </FormItem>
                        <FormItem label='确认密码' name='newSurePassword' rules={passwordRule}>
                            <Input.Password placeholder="请再次输入密码" />
                        </FormItem>
                        <FormItem style={posRightStyle}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>

                </TabPane>
            </Tabs>
        </Modal>
    )
}