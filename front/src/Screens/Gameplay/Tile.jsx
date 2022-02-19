import React from 'react';
import { StyledTile } from './styles';
import { lib } from 'Assets/pieces/lib';

export default function Tile({ x, y, tileColor, chessPiece }) {
	return <StyledTile tileColor={tileColor}>{chessPiece && <img src={lib[chessPiece.color][chessPiece.type]} />}</StyledTile>;
}
