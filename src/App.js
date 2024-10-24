import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [videoUrl, setVideoUrl] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleDownload = async () => {
        setError('');
        try {
            const response = await axios.post("http://localhost:5000/api/download", { videoUrl });
            if (response.data && response.data.download_url) {
                setDownloadLink(response.data.download_url);
            } else {
                setError('No download link found.');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching video. Please check the URL and try again.');
        }
    };

    return (
        <div className="App">
            <h1>Instagram Video Downloader</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={videoUrl} 
                    onChange={handleInputChange} 
                    placeholder="Enter Instagram video URL" 
                />
                <button onClick={handleDownload}>Download</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {downloadLink && 
                <a href={downloadLink} download>
                    Download Video
                </a>
            }
        </div>
    );
}

export default App;
