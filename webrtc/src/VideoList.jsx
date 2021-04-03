import React from 'react';
import VideoDetail from './VideoDetail';

const VideoList = (props) => {
	const { list } = props;
	if (!list) return null;

	return (
		<div>
			{list.map((video) => (
				<VideoDetail key={video.id} video={video} />
			))}
		</div>
	);
};

export default VideoList;
