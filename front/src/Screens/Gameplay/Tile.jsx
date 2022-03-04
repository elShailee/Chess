import React, { useMemo } from 'react';
import Piece from './Piece';
import { StyledTile } from './styles';

export default function Tile({ tileColor, chessPiece, piecesClassNameAddition }) {
	const memoizedTile = useMemo(() => {
		const colorMatchLib = {
			dark: 'bisque',
			light: 'white',
			source: 'teal',
			target: 'green',
		};
		return (
			<StyledTile backgroundColor={colorMatchLib[tileColor]}>
				{chessPiece && <Piece piecesClassNameAddition={piecesClassNameAddition} chessPiece={chessPiece} />}
			</StyledTile>
		);
	}, [chessPiece, tileColor, piecesClassNameAddition]);

	return memoizedTile;
}
