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
	const [videoId] = useAtom(selectedVideoId);

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
				if (data.search !== inputVal) {
					setInputVal(data.search);
				}
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (inputVal) {
			drone.publish({ room: 'test', message: { search: inputVal } });
		}
	}, [inputVal]);

	const onSearch = async () => {
		const opts = {
			maxResults: 10,
			key: `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
		};
		const res = await search(inputVal, opts);
		setYoutubeResults(res.results);
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
