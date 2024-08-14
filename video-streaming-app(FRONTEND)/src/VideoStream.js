import React, { useEffect, useState } from 'react';

const VideoStream = () => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchVideoStream = () => {
            fetch('http://localhost:8080/video-stream')
                .then(response => response.blob())
                .then(blob => {
                    const imageObjectURL = URL.createObjectURL(blob);
                    setImageSrc(imageObjectURL);
                })
                .catch(error => console.error('Error fetching video stream:', error));
        };

        // Fetch a new frame every 100ms (10 frames per second)
        const intervalId = setInterval(fetchVideoStream, 100);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <h1>Real-Time Video Stream</h1>
            <img src={imageSrc} alt="Video Stream" style={{ width: '100%', maxHeight: '500px' }} />
        </div>
    );
};

export default VideoStream;
