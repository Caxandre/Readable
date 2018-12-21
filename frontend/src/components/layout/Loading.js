import React from 'react';
import ReactLoading from 'react-loading';

export default () => {
	return (
		<div className="loading-wrapper">
			<ReactLoading type="spin" color="#ee5253" className="loading" />
			<span style={{ color: '#ee5253' }}>Loading</span>
		</div>
	);
};
