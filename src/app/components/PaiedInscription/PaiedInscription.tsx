import { useState } from "react";
import { Form, Button, Input, Radio, Select, Checkbox, Result } from "antd";
import { MailOutlined, UserOutlined, PhoneOutlined, CalendarOutlined, BankOutlined } from '@ant-design/icons';
//import api from "../../../../../infrastructure/services/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { participatePaied } from "@/app/services/visitorService";

// This is the React component that will be rendering the Unity app.

function PaiedInscription({ exhibitionId, setInscriptionSelected, setParticipationSelected }: any) {
    const { Option, OptGroup } = Select;
    const stripePromise = loadStripe("pk_test_51M0o6uLLeWGK1AMVd1mUuckICaRNGHiwZeLER14HngGUKIAtmdHo9lsc3iGhwZbyMF0KrDvwR3EhkZ6L6atMtWkT00dkpSjqZq");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [sexe, setSexe] = useState("");
    const [sector, setSector] = useState(null);
    const [profession, setProfession] = useState(null);
    const [establishment, setEstablishment] = useState("");
    const [sharedata, setSharedata] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(0);
    const [clientSecret, setClientSecret] = useState("");

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <>
                    <Form autoComplete="off"
                        onFinish={() => { setStep(1) }}
                        fields={[
                            {
                                "name": [
                                    "firstName"
                                ],
                                "value": firstName
                            },
                            {
                                "name": [
                                    "lastName"
                                ],
                                "value": lastName
                            },
                            {
                                "name": [
                                    "email"
                                ],
                                "value": email
                            },
                            {
                                "name": [
                                    "age"
                                ],
                                "value": age
                            },
                            {
                                "name": [
                                    "sexe"
                                ],
                                "value": sexe


                            },
                        ]}>
                        <Form.Item name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ce champs est obligatoire',
                                },]}
                        >
                            <Input placeholder="Nom" prefix={<UserOutlined />} onChange={e => setLastName(e.target.value)} />
                        </Form.Item>

                        {/* input firstname */}
                        <Form.Item
                            className="participationInput"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ce champs est obligatoire',
                                },]}>
                            <Input placeholder="Prénom" prefix={<UserOutlined />} onChange={e => setFirstName(e.target.value)} />
                        </Form.Item>
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
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer votre un numéro valide',

                                },]}>
                            <Input placeholder="Numéro de télèphone" prefix={<PhoneOutlined />}
                                onChange={e => setPhoneNumber(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            className="participationInput"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer votre age',
                                },]}>
                            <Input placeholder="Age" prefix={<CalendarOutlined />}
                                onChange={e => setAge(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name="sexe"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ce champs est obligatoire',

                                },]}>
                            <Radio.Group buttonStyle="solid" onChange={e => setSexe(e.target.value)}>
                                <Radio.Button value="m">Homme</Radio.Button>
                                <Radio.Button value="f">Femme</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Button className="stepButton" loading={loading} htmlType="submit">Suivant</Button>
                    </Form>
                </>
            case 1:
                return <>
                    <Form autoComplete="off"
                        onFinish={() => { setStep(2) }}
                        fields={[
                            {
                                "name": [
                                    "sector"
                                ],
                                "value": sector
                            },
                            {
                                "name": [
                                    "profession"
                                ],
                                "value": profession
                            },
                            {
                                "name": [
                                    "establishment"
                                ],
                                "value": establishment

                            },


                        ]}>

                        <Form.Item name="sector" rules={[{ required: true }]}>
                            <Select placeholder="Votre secteur d'activité" style={{ width: 120 }} onChange={e => setSector(e)}>
                                <Option value="Administrations et Collectivités">Administrations et Collectivités</Option>
                                <Option value="Association">Association</Option>
                                <Option value="Banque-Finance-Assurances">Banque-Finance-Assurances</Option>
                                <Option value="BTP">BTP</Option>
                                <Option value="Commerce de détail">Commerce de détail</Option>
                                <Option value="Commerce de gros">Commerce de gros</Option>
                                <Option value="Education">Education</Option>
                                <Option value="Hôpitaux-Cliniques-Santé">Hôpitaux-Cliniques-Santé</Option>
                                <Option value="Industrie">Industrie</Option>
                                <Option value="Information - Communication">Information - Communication</Option>
                                <Option value="Informatique">Informatique</Option>
                                <Option value="Professions libérales">Professions libérales</Option>
                                <Option value="Services aux entreprises">Services aux entreprises</Option>
                                <Option value="Services aux particuliers">Services aux particuliers</Option>
                                <Option value="Transports">Transports</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="profession" rules={[{ required: true }]}>
                            <Select placeholder="Votre profession" style={{ width: 120 }} onChange={e => setProfession(e)}>
                                <OptGroup label="-- ENTREPRISE --">
                                    <Option value="PDG / Gérant">PDG / Gérant</Option>
                                    <Option value="DG / DGA">DG / DGA</Option>
                                    <Option value="CIO/CTO/IT Director/Head of IT">CIO/CTO/IT Director/Head of IT</Option>
                                    <Option value="Cloud manager">Cloud manager</Option>
                                    <Option value="Dir/Resp. Achat">Dir/Resp. Achat</Option>
                                    <Option value="Dir/Resp. Administratif">Dir/Resp. Administratif</Option>
                                    <Option value="Dir/Resp. Commercial">Dir/Resp. Commercial</Option>
                                    <Option value="Dir/Resp. Envt./Dev. Durable">Dir/Resp. Envt./Dev. Durable</Option>
                                    <Option value="Dir/Resp. Export">Dir/Resp. Export</Option>
                                    <Option value="Dir/Resp. Finance-Compta-Gestion">Dir/Resp. Finance-Compta-Gestion</Option>
                                    <Option value="Dir/Resp. Informatique">Dir/Resp. Informatique</Option>
                                    <Option value="Dir/Resp. Juridique">Dir/Resp. Juridique</Option>
                                    <Option value="Dir/Resp. Logistique-Supply Chain">Dir/Resp. Logistique-Supply Chain</Option>
                                    <Option value="Dir/Resp. Marketing-Communication">Dir/Resp. Marketing-Communication</Option>
                                    <Option value="Dir/Resp. Production">Dir/Resp. Production</Option>
                                    <Option value="Dir/Resp. R&D - BE">Dir/Resp. R&D - BE</Option>
                                    <Option value="Dir/Resp. RH - Formation">Dir/Resp. RH - Formation</Option>
                                    <Option value="Dir/Resp. Services Généraux">Dir/Resp. Services Généraux</Option>
                                    <Option value="Dir/Resp. Technique">Dir/Resp. Technique</Option>
                                    <Option value="Financial Controller">Financial Controller</Option>
                                    <Option value="Infrastructure manager">Infrastructure manager</Option>
                                    <Option value="IT Manager">IT Manager</Option>
                                    <Option value="IT professionals">IT professionals</Option>
                                    <Option value="IT vendor">IT vendor</Option>
                                    <Option value="Product Manager">Product Manager</Option>
                                    <Option value="Security manager">Security manager</Option>
                                    <Option value="Service Achat (Ent.)">Service Achat (Ent.)</Option>
                                    <Option value="Service Administratif">Service Administratif</Option>
                                    <Option value="Service Commercial">Service Commercial</Option>
                                    <Option value="Service Envt./Dev. Durable (Ent.)">Service Envt./Dev. Durable (Ent.)</Option>
                                    <Option value="Service Export">Service Export</Option>
                                    <Option value="Service Finance/Compta/Gestion (Ent.)">Service Finance/Compta/Gestion (Ent.)</Option>
                                    <Option value="Service Informatique (Ent.)">Service Informatique (Ent.)</Option>
                                    <Option value="Service Juridique">Service Juridique</Option>
                                    <Option value="Service Logistique-Supply Chain">Service Logistique-Supply Chain</Option>
                                    <Option value="Service Marketing-Communication">Service Marketing-Communication</Option>
                                    <Option value="Service Production">Service Production</Option>
                                    <Option value="Service R&D - BE">Service R&D - BE</Option>
                                    <Option value="Service RH - Formation">Service RH - Formation</Option>
                                    <Option value="Service Technique (Ent.)">Service Technique (Ent.)</Option>
                                    <Option value="Software/Application developers">Software/Application developers</Option>
                                    <Option value="Services Généraux">Services Généraux</Option>
                                    <Option value="Autre (Ent.)">Autre (Ent.)</Option>
                                </OptGroup>
                                <OptGroup label="-- PROFESSION LIBERALE --">
                                    <Option value="Architecte">Architecte</Option>
                                    <Option value="Avocat">Avocat</Option>
                                    <Option value="Expert Comptable">Expert Comptable</Option>
                                    <Option value="Huissier">Huissier</Option>
                                    <Option value="Médecin / Dentiste">Médecin / Dentiste</Option>
                                    <Option value="Notaire">Notaire</Option>
                                    <Option value="Paramédical">Paramédical</Option>
                                    <Option value="Autre (Prof. lib.)">Autre (Prof. lib.)</Option>
                                </OptGroup>
                                <OptGroup label="-- ADMINISTRATION ET COLLECTIVITE --">
                                    <Option value="Adjoint / Elu">Adjoint / Elu</Option>
                                    <Option value="DGS">DGS</Option>
                                    <Option value="Maire / Président">Maire / Président</Option>
                                    <Option value="Service Envt./Dev. Durable (Admin & coll.)s">Service Envt./Dev. Durable (Admin & coll.)s</Option>
                                    <Option value="Service Finance-Comptabilité-Gestion">Service Finance-Comptabilité-Gestion</Option>
                                    <Option value="Service Informatique (Admin & coll.)">Service Informatique (Admin & coll.)</Option>
                                    <Option value="Service Technique (Admin & coll.)">Service Technique (Admin & coll.)</Option>
                                    <Option value="Autre (Admin & coll.)">Autre (Admin & coll.)</Option>
                                </OptGroup>
                                <OptGroup label="-- ARTISAN / COMMERÇANT / INDEPENDANT --">
                                    <Option value="Artisan du BTP">Artisan du BTP</Option>
                                    <Option value="Commerce de détail">Commerce de détail</Option>
                                    <Option value="Consultant">Consultant</Option>
                                    <Option value="Indépendant">Indépendant</Option>
                                    <Option value="Autre - Artisan / Commerçant / Indépendant">Autre - Artisan / Commerçant / Indépendant</Option>
                                </OptGroup>
                                <OptGroup label="-- EDUCATION --">
                                    <Option value="Directeur d'établissement">Directeur d'établissement</Option>
                                    <Option value="Enseignant">Enseignant</Option>
                                    <Option value="Autre (Educ.)">Autre (Educ.)</Option>
                                </OptGroup>
                                <OptGroup label="-- ASSOCIATION --">
                                    <Option value="Président (Asso.)">Président (Asso.)</Option>
                                    <Option value="Service Achat (Asso.)">Service Achat (Asso.)</Option>
                                    <Option value="Service Finance/Compta/Gestion (Asso.)">Service Finance/Compta/Gestion (Asso.)</Option>
                                    <Option value="Secrétaire général (Asso.)">Secrétaire général (Asso.)</Option>
                                    <Option value="Service Informatique (Asso.)">Service Informatique (Asso.)</Option>
                                    <Option value="Service Marketing (Asso.)">Service Marketing (Asso.)</Option>
                                    <Option value="Service RH (Asso.)">Service RH (Asso.)</Option>
                                    <Option value="Autre (Asso.)">Autre (Asso.)</Option>
                                </OptGroup>
                                <OptGroup label="-- COMITE D'ENTREPRISE --">
                                    <Option value="Président (CE)">Président (CE)</Option>
                                    <Option value="Secrétaire général (CE)">Secrétaire général (CE)</Option>
                                    <Option value="Autre (CE)">Autre (CE)</Option>
                                </OptGroup>
                                <OptGroup label="-- AUTRE --">
                                    <Option value="Retraité">Retraité</Option>
                                    <Option value="Sans emploi">Sans emploi</Option>
                                </OptGroup>


                            </Select>
                        </Form.Item>
                        <Form.Item
                            className="participationInput"
                            name="establishment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ce champs est obligatoire',

                                },]}>
                            <Input placeholder="Établissement / Entreprise" prefix={<BankOutlined />} onChange={e => setEstablishment(e.target.value)} />
                        </Form.Item>
                        <Form.Item name="sharedata" valuePropName="checked" onChange={(e: any) => setSharedata(e.target.checked)}>
                            <Checkbox checked={sharedata}>J'accepte de partager mes données avec les autres visiteurs <br />(Pour des raisons de Networking)</Checkbox>
                        </Form.Item>
                        <Button className="stepButton" loading={loading} htmlType="submit" onClick={submit}>Suivant</Button>


                    </Form >

                </>
            case 2:
                return <>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm exhibitionId={exhibitionId} />
                        </Elements>
                    )}
                </>
            default: console.log("error");

        }
    };

    const submit = async (value: any) => {
        setLoading(true);

        const payload = {
            email,
            firstName,
            lastName,
            phoneNumber,
            sexe,
            age,
            profession,
            sector,
            establishment,
            sharedata,
            exhibition: exhibitionId
        };
        try {
            const response = await participatePaied(payload);
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.body.clientSecret);
                setClientSecret(response.data.body.clientSecret);
            } else {
                console.log(`${response.status}: ${response.data}`);
                console.log('sorry');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // This is the React component that will be rendering the Unity app.
    return (
        <>

            <div className="event-register-form">
                <div className='sub-form'>
                    {success ?
                        <>
                            <Result
                                status="success"
                                title="Votre inscription à l'évènement a été effectuée avec succès!"
                                subTitle="Un mail vous a été envoyé avec votre mot de passe."
                                extra={[
                                    <Button className="stepButton" key="console" onClick={() => { setInscriptionSelected(false); setParticipationSelected(true); }} >
                                        Se connecter
                                    </Button>
                                ]}
                            />
                        </> :
                        <>{renderStep()}</>}

                </div>
            </div>


        </>
    );
}

export default PaiedInscription;
