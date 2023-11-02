"use client";
import { useEffect, useState } from "react";
import decode from 'jwt-decode';
//import api from "../../../../infrastructure/services/api";
import moment from 'moment';
import Exhibition from "../components/Exhibition/Exhibition";
import FreeInscription from "../components/FreeInscription/FreeInscription";
import PaiedInscription from "../components/PaiedInscription/PaiedInscription";
import { Result } from 'antd';
import Login from "../components/Login/Login";
import Loading from "../components/Loading/Loading";
import { getExhibitionForVisitor } from "../services/exhibitionService";


function Page({ params }: { params: { exhibitionId: string } }) {
    const [loading, setLoading] = useState(true);
    const [eventName, setEventName] = useState(false);
    const [isEventStarted, setIsEventStarted] = useState(false);
    const [isEventEnded, setIsEventEnded] = useState(false);
    const [isValidEvent, setValidEvent] = useState(false);
    const [duration, setDuration] = useState(10000);
    const [isFree, setIsFree] = useState(false);
    const [isAuthentified, setIsAuthentified] = useState(false);
    const [isInscriptionSelected, setInscriptionSelected] = useState(false);
    const [isParticipationSelected, setParticipationSelected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const exhibitionId = params.exhibitionId;
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        let decodedToken: any;

        if (accessToken) {
            decodedToken = decode(accessToken);
        }

        if (decodedToken && decodedToken._id !== undefined) {
            setIsAuthentified(true);
        }
        __fetchEvent();
    }, []);

    const __fetchEvent = () => {
        getExhibitionForVisitor(exhibitionId)
            .then(async (response) => {
                if (response.status === 200) {
                    if (response.data.event_name)
                        setValidEvent(true);
                    setEventName(response.data.event_name);
                    setIsFree(response.data.is_free);
                    setDuration(moment(response.data.exhibition_start_date).diff(moment(), 'seconds') * 1000);
                    if (moment(response.data.exhibition_start_date).isSameOrBefore(moment())) {
                        setIsEventStarted(true);
                    }
                    if (moment(response.data.exhibition_end_date).isBefore(moment())) {
                        setIsEventEnded(true);
                    }
                }
                else {
                    console.log('sorry');
                }
            })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            })
    }



    if (loading) {
        return (
            <Loading />
        );
    } else if (isValidEvent) {
        if (!isEventEnded) {
            if (!isEventStarted) {
                return (
                    <div className="event-register-container">
                        <div className="event-register-header">
                            <div className="event-register-left">
                                <div className="event-register-left-container">
                                    <img src="/assets/logo.png" alt="logo" />
                                    <div className="text-container">
                                        <h1>XPOLAND</h1>
                                        <ul>
                                            <p>Equipez-vous de notre solution pour:</p>
                                            <li>Organiser vos expositions en ligne</li>
                                            <li>Organiser des webinaires en ligne</li>
                                            <li>Offrir une expérience immersive dans notre métavers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="event-register-right">
                                <div className="event-register-right-container">
                                    <h1 className="eventTitle">{eventName}</h1>
                                    {isFree ? (
                                        <FreeInscription
                                            exhibitionId={exhibitionId}
                                            setIsAuthentified={setIsAuthentified}
                                            setInscriptionSelected={(e) => setInscriptionSelected(e)}
                                            setParticipationSelected={(e) => setParticipationSelected(e)}
                                        />
                                    ) : (
                                        <>page paiement</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (!isAuthentified) {
                return (
                    <div className="event-register-container">
                        <div className="event-register-header">
                            <div className="event-register-left">
                                <div className="event-register-left-container">
                                    <img src="/assets/logo.png" alt="logo" />
                                    <div className="text-container">
                                        <h1>XPOLAND</h1>
                                        <ul>
                                            <p>Equipez-vous de notre solution pour:</p>
                                            <li>Organiser vos expositions en ligne</li>
                                            <li>Organiser des webinaires en ligne</li>
                                            <li>Offrir une expérience immersive dans notre métavers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="event-register-right">
                                <div className="event-register-right-container">
                                    <h1 className="eventTitle">{eventName}</h1>
                                    {!isInscriptionSelected && !isParticipationSelected ? (
                                        <div className="connection-choices">
                                            <div
                                                className="connection-choice"
                                                onClick={() => {
                                                    setInscriptionSelected(true);
                                                    setParticipationSelected(false);
                                                }}
                                            >
                                                S'inscrire
                                            </div>
                                            <div
                                                className="connection-choice"
                                                onClick={() => {
                                                    setInscriptionSelected(false);
                                                    setParticipationSelected(true);
                                                }}
                                            >
                                                Déjà inscrit
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <a
                                                onClick={() => {
                                                    setInscriptionSelected(false);
                                                    setParticipationSelected(false);
                                                }}
                                            >
                                                Retour &#9166;
                                            </a>
                                            {isInscriptionSelected ? (
                                                isFree ? (
                                                    <FreeInscription
                                                        setIsAuthentified={setIsAuthentified}
                                                        exhibitionId={exhibitionId}
                                                        setInscriptionSelected={(e) => setInscriptionSelected(e)}
                                                        setParticipationSelected={(e) => setParticipationSelected(e)}
                                                    />
                                                ) : (
                                                    <PaiedInscription
                                                        exhibitionId={exhibitionId}
                                                        setIsAuthentified={setIsAuthentified}
                                                        setInscriptionSelected={(e) => setInscriptionSelected(e)}
                                                        setParticipationSelected={(e) => setParticipationSelected(e)}
                                                    />
                                                )
                                            ) : (
                                                <Login
                                                    exhibitionId={exhibitionId}
                                                    setIsAuthentified={setIsAuthentified}
                                                />
                                            )}
                                        </>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <Exhibition eventName={eventName} exhibitionId={exhibitionId}/>;
            }
        } else {
            return (
                <div className="event-register-container">
                    <div className="event-register-header">
                        <div className="event-register-left">
                            <div className="event-register-left-container">
                                <img src="/assets/logo.png" alt="logo" />
                                <div className="text-container">
                                    <h1>XPOLAND</h1>
                                    <ul>
                                        <p>Equipez-vous de notre solution pour:</p>
                                        <li>Organiser vos expositions en ligne</li>
                                        <li>Organiser des webinaires en ligne</li>
                                        <li>Offrir une expérience immersive dans notre métavers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="event-register-right">
                            <div className="event-register-right-container">
                                <h1 className="eventTitle">{eventName}</h1>
                                <h1 style={{ textAlign: 'center' }}>
                                    <br />Oups vous êtes un peu en retard, l'évènement est terminé.
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return <Result status="warning" title="L'URL de l'évènement n'est pas correcte." />;
    }

}

export default Page;
