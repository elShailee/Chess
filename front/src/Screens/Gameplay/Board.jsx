import React from 'react';
import Tile from './Tile';
import initialState from './initialState';

export default function Board() {
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
	boardTiles = <div style={{ marginLeft: '30vmin', marginTop: '10vmin' }}>{boardTiles}</div>;

	return boardTiles;
}
