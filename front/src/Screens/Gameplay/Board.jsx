import React from 'react';
import { Tile } from './styles';

export default function Board() {
	let boardTiles;
	for (let row = 0; row < 7; row++) {
		let row;
		for (let col = 0; col < 7; col++) {
			row += <Tile />;
		}
		row = <div>{row}</div>;
		boardTiles += row;
	}
	boardTiles = <div>{boardTiles}</div>;

	return boardTiles;
}
