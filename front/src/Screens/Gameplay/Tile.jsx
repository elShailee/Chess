import React from 'react';
import Piece from './Piece';
import { StyledTile } from './styles';

export default function Tile({ tileColor, chessPiece }) {
	return <StyledTile tileColor={tileColor}>{chessPiece && <Piece chessPiece={chessPiece} />}</StyledTile>;
}
