import { Tabs, message, Form, Input, Button, Checkbox, Modal, Alert } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { storage } from '../../common/storage'
import { login, register } from '../../redux/actions/user'
import "./index.css"
const FormItem = Form.Item
const { TabPane } = Tabs
interface userMessageOption {
    userNickName: string;
    userId: number
}
interface ILoginModalProps {
    modalVisible: boolean
    setModalVisible: (modalVisible: boolean) => void
}

const displayNoneStyle = { style: { display: 'none' } as React.CSSProperties };
const posRightStyle = {
    textAlign: 'right'
} as React.CSSProperties
const modalStyle = {
    borderRadius: 6
}

export default function LoginModal(props: ILoginModalProps) {
    const { modalVisible, setModalVisible } = props
    const [action, setAction] = useState('login')
    const dispatch = useDispatch();

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
        const username = formData.username;
        const password = formData.password;
        // const myFetchOptions = {
        //     method: 'GET'
        // };
        // const params = `action=${action}&username=${formData.userName}&password=${formData.userPassword}` +
        //     `&r_userName=${formData.newUserName}&r_password=${formData.newUserPassword}&r_confirmPassword=${formData.newSurePassword}`
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?" + params, myFetchOptions).then(response =>
        //     response.json()).then(json => {
        //         setUserMessage({ userNickName: json.NickUserName, userId: json.UserId });
        //     }
        //     );
        form1.resetFields()
        form2.resetFields()

        if (action === 'login') {
            const parsedRes = storage.get(username)
            if (!parsedRes) {
                message.error("该用户尚未注册");
                return;
            }
            if (parsedRes.username !== username || parsedRes.password !== password) {
                message.error("账号密码错误");
                return;
            }
            dispatch(login({
                username
            }));
            message.success("登录成功");
        } else {
            if (password !== formData.passwordAgain) {
                message.error('确认密码与设置密码不一致！')
                return
            }
            const res = storage.get(username)
            if (res) {
                message.error("该用户名已注册");
                return;
            }
            storage.set(username, {
                username,
                password,
            });
            dispatch(login({
                username
            }));
            message.success("注册成功，即将自动登录！");
        }

        setModalVisible(false);
    }, [action])

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
                        <FormItem label="账户" name='username' rules={userNameRule}>
                            <Input placeholder="请输入您的账号" />
                        </FormItem>
                        <FormItem label="密码" name='password' rules={passwordRule}>
                            <Input.Password placeholder="请输入您的密码" />
                        </FormItem>
                        <FormItem style={posRightStyle}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane tab='注册' key='2'>
                    <Form name='zhuce' layout='vertical' form={form2} onFinish={handleSubmitSuccess} initialValues={{ remember: true }}>
                        <FormItem label='账户' name='username' rules={userNameRule}>
                            <Input placeholder="请输入您的账号" />
                        </FormItem>
                        <FormItem label='密码' name='password' rules={passwordRule}>
                            <Input.Password placeholder="请输入您的密码" />
                        </FormItem>
                        <FormItem label='确认密码' name='passwordAgain' rules={passwordRule}>
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