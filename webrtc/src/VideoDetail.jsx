import React from 'react';
import { selectedVideoId } from './utility';
import { useAtom } from 'jotai';

const VideoDetail = ({ video }) => {
	const {
		id,
		title,
		thumbnails: {
			default: { url, height, width },
		},
	} = video;

	const [, setSelectedVideoId] = useAtom(selectedVideoId);

	const onSelectVideo = () => {
		setSelectedVideoId(id);
	};

	return (
		<div onClick={onSelectVideo}>
			<b>{title}</b>
			<img src={url} alt='title' width={width} height={height} />
		</div>
	);
};

export default VideoDetail;
