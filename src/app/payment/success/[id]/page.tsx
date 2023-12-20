"use client";
import { Button, Result } from "antd";

function PaiedInscription() {
    return (
        <div className="event-register-form">
            <div className='sub-form'>

                <Result
                    status="success"
                    title="Votre inscription à l'évènement a été effectuée avec succès!"
                    subTitle="Un mail vous a été envoyé avec votre mot de passe."
                    extra={[
                        <Button type="primary" key="console" onClick={() => console.log("uo")} >
                            Se connecter
                        </Button>
                    ]}
                />
            </div>
        </div>
    );
}

export default PaiedInscription;
