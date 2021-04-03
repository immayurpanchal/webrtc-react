import React from 'react';
import Youtube from 'react-youtube';
const YTPlayer = (props) => {
	return (
		<>
			<Youtube {...props} />
		</>
	);
};

export default YTPlayer;
