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
	let boardTiles = [];
	for (let row = 0; row <= 7; row++) {
		let rowTiles = [];
		for (let col = 0; col <= 7; col++) {
			const chessPiece = initialState[row][col];
			const tileColor = (col + row) % 2 === 1 ? 'dark' : 'light';
			rowTiles.push(<Tile x={col} y={7 - row} tileColor={tileColor} key={col + row} chessPiece={chessPiece} />);
		}
		rowTiles = (
			<div key={row} style={{ display: 'flex', flexDirection: 'row' }}>
				{rowTiles}
			</div>
		);
		boardTiles.push(rowTiles);
	}
	boardTiles = (
		<div
			onMouseDown={e => grab(e)}
			onMouseMove={e => move(e)}
			onMouseUp={release}
			style={{ marginLeft: '30vmin', marginTop: '10vmin' }}
		>
			{boardTiles}
		</div>
	);

	return boardTiles;
}
