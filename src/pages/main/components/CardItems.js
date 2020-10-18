import React, { useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';

const CardItems = () => {
	const [ { isLoading, response, error }, doFetch ] = useFetch('/cards');
	useEffect(
		() => {
			doFetch();
		},
		[ doFetch ]
	);
	if (isLoading || !response) {
		return <div className="loading">loading</div>;
	}

	if (error) {
		return <div className="error">Error</div>;
	}
	console.log(response.cards);
	return (
		<div className="cards">
			{response.cards.map((card) => (
				<div key={card.id} className="card">
					<img src={card.imageUrl} alt={`${card.name} img`} />
					<div className="name">{card.name}</div>
					<div className="artist">{card.artist}</div>
				</div>
			))}
		</div>
	);
};

export default CardItems;
