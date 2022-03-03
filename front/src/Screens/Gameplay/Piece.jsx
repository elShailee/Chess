import React from 'react';
import { lib as piecesAssetsLib } from 'Assets/pieces/lib';
import { PieceContainer, StyledPiece } from './styles';

export default function Piece({ chessPiece, piecesClassNameAddition }) {
	return (
		<PieceContainer>
			<StyledPiece className={piecesClassNameAddition} src={piecesAssetsLib[chessPiece.color][chessPiece.type]} />
		</PieceContainer>
	);
}
