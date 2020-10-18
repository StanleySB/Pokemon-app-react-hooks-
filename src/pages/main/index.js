import React from 'react';
import CardItems from './components/CardItems';

const Main = () => {
	return (
		<div className="container">
			<div className="select">select</div>
			<div className="cards">
				<CardItems />
			</div>
		</div>
	);
};

export default Main;
