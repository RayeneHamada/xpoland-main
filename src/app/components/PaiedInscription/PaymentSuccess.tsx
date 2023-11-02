import { useParams } from 'react-router-dom'
import { Button, Result } from "antd";
import { useNavigate } from 'react-router-dom';


// This is the React component that will be rendering the Unity app.

function PaiedInscription() {
    const { exhibitionId } = useParams();
    const navigate = useNavigate();


    // This is the React component that will be rendering the Unity app.
    return (
        <>
            <div className="event-register-form">
                <div className='sub-form'>

                    <Result
                        status="success"
                        title="Votre inscription à l'évènement a été effectuée avec succès!"
                        subTitle="Un mail vous a été envoyé avec votre mot de passe."
                        extra={[
                            <Button type="primary" key="console" onClick={() =>navigate('/exhibition/'+exhibitionId)} >
                                Se connecter
                            </Button>
                        ]}
                    />


                </div>
            </div>


        </>
    );
}

export default PaiedInscription;
