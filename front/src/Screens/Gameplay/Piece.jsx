import React from 'react';
import { lib } from 'Assets/pieces/lib';
import { PieceContainer, StyledPiece } from './styles';

export default function Piece({ chessPiece, piecesClassName }) {
	return (
		<PieceContainer>
			<StyledPiece className={piecesClassName} src={lib[chessPiece.color][chessPiece.type]} />
		</PieceContainer>
	);
}
