import { useEffect, useState, useCallback, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
//import api from "../../../../../infrastructure/services/api";

function Exhibition({ eventName, exhibitionId }) {
    const { unityProvider, sendMessage, isLoaded, addEventListener, removeEventListener, loadingProgression } = useUnityContext({  // The url's of the Unity WebGL runtime, these paths are public and should be
        // accessible from the internet and relative to the index.html.
        loaderUrl: "/assets/unity_builds/event/Build/Exported.loader.js",
        dataUrl: "/assets/unity_builds/event/Build/Exported.data",
        frameworkUrl: "/assets/unity_builds/event/Build/Exported.framework.js",
        codeUrl: "/assets/unity_builds/event/Build/Exported.wasm",
        // Additional configuration Options.
        webglContextAttributes: {
            preserveDrawingBuffer: true,
        },
    });
    const hiddenFileInputCV = useRef(null);
    const hiddenResetInput = useRef(null);
    const loadingPercentage = Math.round(loadingProgression * 100);
    const [cvStandId, setCvStandId] = useState();
    const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);
    const handleChangePixelRatio = useCallback(
        function () {
            // A function which will update the device pixel ratio of the Unity
            // Application to match the device pixel ratio of the browser.
            const updateDevicePixelRatio = function () {
                setDevicePixelRatio(window.devicePixelRatio);
            };
            // A media matcher which watches for changes in the device pixel ratio.
            const mediaMatcher = window.matchMedia(
                `screen and (resolution: ${devicePixelRatio}dppx)`
            );
            // Adding an event listener to the media matcher which will update the
            // device pixel ratio of the Unity Application when the device pixel
            // ratio changes.
            mediaMatcher.addEventListener("change", updateDevicePixelRatio);
            return function () {
                // Removing the event listener when the component unmounts.
                mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
            };
        },
        [devicePixelRatio]
    );
    const handleActionPerformed = useCallback((action) => {
      /*  var response = api.addStatRecord(JSON.parse(action));
        response.then(async (response) => {
            if (response.status == 201) {
                console.log("uploaded");
            }
            else {
                console.log('sorry');
            }
        })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                hiddenResetInput.current.click();

            })*/

    }, []);
    const handleWebinarEntred = useCallback(() => {
       /* var response = api.addExhibitionStatRecord({ exhibition_id: exhibitionId, action_name: "WEBINAR" });
        
        response.then(async (response) => {
            if (response.status == 201) {
                console.log("uploaded");
            }
            else {
                console.log('error while logging webinar');
            }
        })
            .catch(function (error) {
                console.log(error);
            })*/

    }, []);
    const handleCVUpload = useCallback((stand_id) => {
        setCvStandId(stand_id);
        hiddenFileInputCV.current.click();


    }, []);
    useEffect(() => {
        addEventListener("StandActionPerformedEvent", handleActionPerformed);
        addEventListener("UploadPDFEvent", handleCVUpload);
        addEventListener("AuditoriumEnteredEvent", handleWebinarEntred);
        return () => {
            removeEventListener("StandActionPerformedEvent", handleActionPerformed);
            removeEventListener("UploadPDFEvent", handleCVUpload);
        };
    }, [addEventListener, removeEventListener, handleActionPerformed, handleCVUpload]);
    useEffect(() => {
        sendMessage("CustomizationManager", "SetExhibitionID", encodeURI(exhibitionId));
        sendMessage("CustomizationManager", "SetEntranceID", encodeURI(exhibitionId));
        sendMessage("CustomizationManager", "SetMediaStaticURL", "https://xpoland-textures-bucket.s3.eu-west-3.amazonaws.com/");
        sendMessage("CustomizationManager", "SetJsonStaticURL", "http://127.0.0.1:1235/");
        sendMessage("CustomizationManager", "SetWebinarName", encodeURI("webinar_1663538593606.mp4"));

    }, [isLoaded]);
    const handleChangeCV = event => {
        var bodyFormData = new FormData();
        const fileUploaded = event.target.files[0];
        bodyFormData.append('pdf', fileUploaded);
        bodyFormData.append('stand', cvStandId);
        /*var response = api.uploadCV(bodyFormData);

        response.then(async (response) => {
            if (response.status == 200) {
                console.log("uploaded");
            }
            else {
                console.log('sorry');
            }
        })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                hiddenResetInput.current.click();

            })*/

    };
    return (
        <>
            {isLoaded === false && (
                // We'll conditionally render the loading overlay if the Unity
                <div className="middle">
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                    <div className="bar bar4"></div>
                    <div className="bar bar5"></div>
                    <div className="bar bar6"></div>
                    <div className="bar bar7"></div>
                    <div className="bar bar8"></div>
                </div>
            )}
            <Unity className="unity-canvas"
                unityProvider={unityProvider}
                devicePixelRatio={devicePixelRatio}
                style={{ width: "100hv" }} />
            <input type="file"
                style={{ display: 'none' }}
                ref={hiddenFileInputCV}
                onChange={handleChangeCV}
                accept="application/pdf" />
            <input
                style={{ display: 'none' }}
                type="reset"
                defaultValue="Reset"
                ref={hiddenResetInput} />
        </>




    );
}

export default Exhibition;
