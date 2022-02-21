import React from 'react';
import Tile from './Tile';
import initialState from './initialState';

export default function Board() {
	//moving funcs
	let movingPiece = null;

	const grab = e => {
		if (!e.target.className.includes('pieceImage')) return;
		movingPiece = e.target;
		move(movingPiece);
	};

	const release = () => {
		movingPiece = null;
	};

	const move = e => {
		if (!movingPiece) return;
		const x = e.clientX;
		const y = e.clientY;
		movingPiece.style.position = 'absolute';
		movingPiece.style.left = `calc(${x}px - 4.5vmin)`;
		movingPiece.style.top = `calc(${y}px - 4.5vmin)`;
	};

	//rendering board

	const renderTile = ({ tileColor, chessPiece, key }) => <Tile tileColor={tileColor} key={key} chessPiece={chessPiece} />;

	return (
		<div
			onMouseDown={e => grab(e)}
			onMouseMove={e => move(e)}
			onMouseUp={release}
			style={{ marginLeft: '30vmin', marginTop: '10vmin' }}
		>
			{initialState.map((row, rowIndex) => (
				<div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
					{row.map((cell, cellIndex) => {
						const chessPiece = cell;
						const tileColor = (cellIndex + rowIndex) % 2 === 1 ? 'dark' : 'light';
						const cellKey = `${rowIndex}${cellIndex}`;
						return renderTile({ tileColor, chessPiece, key: cellKey });
					})}
				</div>
			))}
		</div>
	);
}
