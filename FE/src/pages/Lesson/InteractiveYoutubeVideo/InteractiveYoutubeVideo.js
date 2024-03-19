import React, { useState, useRef, useEffect } from 'react';
import InteractiveQuestion from '../InteractiveQuestion/InteractiveQuestion';

const InteractiveYouTubeVideo = ({ videoUrl, interactData, lessonId, resourceId }) => {
    const [listTimePause, setListTimePause] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOpenQuestion, setIsOpenQuestion] = useState(false);
    const [currentQuizId, setCurrentQuizId] = useState(null);
    const [indexKeyQuestion, setIndexKeyQuestion] = useState(0);

    const playerRef = useRef(null);

    useEffect(() => {
        // Load the YouTube API script immediately
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.body.appendChild(script);

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (window.YT && window.YT.Player) {
            // If YouTube API is already loaded, create the YouTube player
            createPlayer();
        } else {
            // Define the callback function for the API
            window.onYouTubeIframeAPIReady = createPlayer;
        }

        // Cleanup function
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy(); // Destroy the player instance
            }
        };
    }, []);

    const createPlayer = () => {
        // Create the YouTube player
        playerRef.current = new window.YT.Player(`youtube-player${lessonId}-${resourceId}`, {
            ref: playerRef,
            height: '100%',
            width: '100%',
            videoId: getYoutubeId(videoUrl),
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
            origin: 'http://localhost:3000'
        });
    };

    const onPlayerReady = (event) => {
    };

    const onPlayerStateChange = (event) => {
        const playerState = event.data;

        if (playerState === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const timePauses = interactData.map(point => point.seconds);

        setListTimePause(timePauses);
    }, [interactData]);

    useEffect(() => {
        if (isPlaying) {
            const sortedTimePauses = [...listTimePause].sort((a, b) => a - b); // Sort the listTimePause array

            const intervalIds = sortedTimePauses.map((time, index) => {
                return setInterval(() => {
                    if (playerRef.current && playerRef.current.getCurrentTime) {
                        const currentTime = playerRef.current.getCurrentTime();

                        if (currentTime > time && currentTime < time + 0.1) {
                            playerRef.current.pauseVideo();

                            setIsOpenQuestion(true);

                            const currentPoint = interactData.find(point => point.seconds === time);
                            setCurrentQuizId(currentPoint.quizId); // Set current quiz ID

                            // Set the indexKeyQuestion to the index of the current time pause
                            setIndexKeyQuestion(index);
                        }
                    }
                }, 100);
            });
            // Clear intervals on cleanup
            return () => {
                intervalIds.forEach(clearInterval);
            };
        }
    }, [isPlaying, listTimePause, interactData]);


    const togglePlayPause = () => {
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const getYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return 'Invalid YouTube URL';
        }
    };

    const handleIsAnswerCorrect = (isCorrect) => {
        if (isCorrect) {
            setIsOpenQuestion(false);
            playerRef.current.playVideo();
        }
    };

    return (
        <>
            <div className={`${isOpenQuestion ? `d-block` : `d-none`}`}>
                <InteractiveQuestion
                    indexKey={indexKeyQuestion}
                    isOpen={isOpenQuestion}
                    quizId={currentQuizId}
                    onAnswerCorrect={handleIsAnswerCorrect}
                />
            </div>
            <div className={`${isOpenQuestion ? `d-none` : `d-flex flex-column gap-2 py-2`}`} style={{ height: '80vh', width: '100%' }}>
                <div id={`youtube-player${lessonId}-${resourceId}`}></div>

                <div className="d-flex align-items-center justify-content-between px-3">
                    <button className={`btn ${isPlaying ? `btn-secondary` : `btn-primary`}`} onClick={togglePlayPause}>
                        {isPlaying ? <><i className='fa-solid fa-pause'></i> Tạm dừng</> : <><i className='fa-solid fa-play'></i> Phát</>}
                    </button>
                    <a href={videoUrl} target='blank' className="btn btn-danger"><i className="fa-brands fa-youtube pe-2"></i>Youtube</a>
                </div>
            </div>
        </>
    );
};

export default InteractiveYouTubeVideo;
