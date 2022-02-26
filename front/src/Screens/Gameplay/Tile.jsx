import React, { useMemo } from 'react';
import Piece from './Piece';
import { StyledTile } from './styles';

export default function Tile({ tileColor, chessPiece }) {
	const memoizedTile = useMemo(() => {
		const colorMatchLib = {
			dark: 'bisque',
			light: 'white',
			source: 'teal',
			target: 'green',
		};
		return (
			<StyledTile backgroundColor={colorMatchLib[tileColor]}>{chessPiece && <Piece chessPiece={chessPiece} />}</StyledTile>
		);
	}, [chessPiece, tileColor]);

	return memoizedTile;
}
