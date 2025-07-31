import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { PlayerContext } from "./PlayerContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

const WebcamView = () => {
    const { emotion, setEmotion } = useContext(PlayerContext);
    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [detectLoader, setDetectLoader] = useState(false);

    // Load models on mount
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            setLoading(false);
        };
        loadModels();
    }, []);

    const detectEmotion = async () => {
        if (!webcamRef.current) return;

        const currUser = JSON.parse(localStorage.getItem("moody_player_user"));
        if (!currUser) {
            toast.info("Please login to access this feature.");
            return;
        }

        const video = webcamRef.current.video;
        const detections = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (detections && detections.expressions) {
            const expressions = detections.expressions;

            let top = 0;
            let topEmotion = "";
            Object.entries(expressions).forEach((num) => {
                if (num[1] > top) {
                    top = num[1];
                    topEmotion = num[0];
                }
            });
            setEmotion(topEmotion);
            setDetectLoader(false);
        }
    };

    return (
        <div className="webcam-view">
            {loading ? (
                <p>Loading models...</p>
            ) : (
                <>
                    <div className="webcam-box">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            width={320}
                            height={240}
                            screenshotFormat="image/jpeg"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setDetectLoader(true);
                            if (!webcamRef.current?.stream?.active)
                                toast.error("Please enable camera permission");
                            setTimeout(() => {
                                detectEmotion();
                            }, 1500);
                        }}
                    >
                        Detect Emotion
                    </button>
                </>
            )}
            <div className="mood-display">
                <span className="label">Current Mood:</span>
                {webcamRef.current?.stream?.active && detectLoader ? (
                    <p>Detecting Mood...</p>
                ) : (
                    <span className="value">
                        {emotion || "no mood detected"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default WebcamView;
