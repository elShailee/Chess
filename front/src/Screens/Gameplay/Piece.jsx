import React from 'react';
import { lib } from 'Assets/pieces/lib';
import { StyledPiece } from './styles';

export default function Piece({ chessPiece }) {
	return <StyledPiece src={lib[chessPiece.color][chessPiece.type]} />;
}
