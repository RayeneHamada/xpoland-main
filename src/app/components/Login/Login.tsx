import { useState } from "react";
import { Form, Button, Input, Radio, Select, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "@/app/services/authService";
//import api from "../../../../../infrastructure/services/api";

// This is the React component that will be rendering the Unity app.

function FreeInscription({ exhibitionId, setIsAuthentified }: any) {
    const { Option, OptGroup } = Select;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const submit = (value: any) => {
        setLoading(true);

        login({
            email: email,
            password: password,
            exhibition: exhibitionId

        }).then(async (response) => {
            if (response.status === 200) {
                setIsAuthentified(true);
            }
            else {
                message.error(`Une erreur s'est produite.`)
            }
        })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 403) {
                    message.error('Pas de ticket trouvé pour cette adresse mail.');
                }
                else if (error.response.status === 404) {
                    message.error('Veuillez vérifier votre mot de passe.');
                }
                else {
                    message.error('Une erreur s\'est produite veuillez réessayer.');

                }
                console.log(error);
            }).finally(() => {
                setLoading(false);

            })
    }
    // This is the React component that will be rendering the Unity app.
    return (
        <>

            <div className="event-register-form">
                <div className='sub-form'>
                    <Form autoComplete="off"
                        onFinish={submit}
                        fields={[
                            {
                                "name": [
                                    "email"
                                ],
                                "value": email
                            },
                            {
                                "name": [
                                    "password"
                                ],
                                "value": password
                            },
                        ]}>
                        {/* input email */}
                        <Form.Item
                            className="participationInput"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: 'Veuillez saisir un e-mail valide',
                                },]}>
                            <Input placeholder="E-mail" prefix={<MailOutlined />}
                                onChange={e => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            className="participationInput"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer votre un mot de passe valide',

                                },]}>
                            <Input.Password placeholder="Mot de passe" prefix={<LockOutlined />}
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Item>
                        <Button className="stepButton" loading={loading} htmlType="submit">Entrer</Button>
                    </Form>
                </div>
            </div>


        </>
    );
}

export default FreeInscription;
