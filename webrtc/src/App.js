import './App.css';
import { useEffect, useState } from 'react';
import search from 'youtube-search';
import YTPlayer from './YTPlayer';
import VideoList from './VideoList';
import { useAtom } from 'jotai';
import { selectedVideoId } from './utility';

const drone = new window.Scaledrone('3G2ChYG4nHuKXhea');
const room = drone.subscribe('test');

function App() {
	const [inputVal, setInputVal] = useState('');
	const [currentClientId, setCurrentClientId] = useState('');
	const [youtubeResults, setYoutubeResults] = useState([]);
	const [videoId, setCurrentVideoId] = useAtom(selectedVideoId);

	useEffect(() => {
		room.on('open', (error) => {
			if (error) {
				return console.error(error);
			}
		});
		room.on('message', (messageObj) => {
			if (!currentClientId) {
				setCurrentClientId(messageObj.clientId);
			}
			if (messageObj.clientId !== currentClientId) {
				const { data } = messageObj;
				console.log(messageObj);
				setInputVal(data.search);
				setYoutubeResults(data.results);
				setCurrentVideoId(data.currentVideo);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO: user selects a video from list of video then, video player should be updated as selection
	const onSearch = async () => {
		const opts = {
			maxResults: 10,
			key: `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
		};
		const res = await search(inputVal, opts);
		setYoutubeResults(res.results);
		drone.publish({ room: 'test', message: { search: inputVal, results: res.results, currentVideo: videoId } });
	};
	return (
		<div className='App'>
			<input value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
			<button onClick={onSearch}>Search</button>
			<YTPlayer videoId={videoId} />
			<VideoList list={youtubeResults} />
		</div>
	);
}

export default App;
