import React from 'react';
import { lib } from 'Assets/pieces/lib';
import { PieceContainer, StyledPiece } from './styles';

export default function Piece({ chessPiece }) {
	return (
		<PieceContainer>
			<StyledPiece className='pieceImage' src={lib[chessPiece.color][chessPiece.type]} />
		</PieceContainer>
	);
}
