import React from 'react';
import { StyledTile } from './styles';

export default function Tile({ x, y, tileColor, chessPiece }) {
	return (
		<StyledTile tileColor={tileColor}>{chessPiece ? chessPiece.color + ' ' + chessPiece.type : x + ' ' + y}</StyledTile>
	);
}
