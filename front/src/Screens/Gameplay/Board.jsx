import React, { useRef, useState } from 'react';
import Tile from './Tile';
import initialState from './initialState';
import { copyBoardState, getTileIndexInBoard, isIndexInBoard, isSameTile } from './utils';

export default function Board() {
	const boardRef = useRef(null);
	const [boardState, setBoardState] = useState(initialState);

	//moving funcs
	let movingPiece = null;

	const grab = e => {
		if (!e.target.className.includes('pieceImage')) return;
		movingPiece = { image: e.target, source: getTileIndexInBoard({ e, boardRef }) };
		move(movingPiece);
	};

	const release = e => {
		if (!movingPiece) return;
		const targetTileIndex = getTileIndexInBoard({ e, boardRef });
		if (isIndexInBoard(targetTileIndex)) {
			let newBoardState = copyBoardState(boardState);
			newBoardState[7 - targetTileIndex.y][targetTileIndex.x] =
				newBoardState[7 - movingPiece.source.y][movingPiece.source.x];
			if (!isSameTile(targetTileIndex, movingPiece.source))
				newBoardState[7 - movingPiece.source.y][movingPiece.source.x] = null;
			setBoardState(newBoardState);
		}
		movingPiece = null;
	};

	const move = e => {
		if (!movingPiece) return;
		const x = e.clientX;
		const y = e.clientY;
		movingPiece.image.style.position = 'absolute';
		movingPiece.image.style.left = `calc(${x}px - 4.5vmin)`;
		movingPiece.image.style.top = `calc(${y}px - 4.5vmin)`;
	};

	//rendering board

	const renderTile = ({ tileColor, chessPiece, key }) => <Tile tileColor={tileColor} key={key} chessPiece={chessPiece} />;

	return (
		<div
			onMouseDown={e => grab(e)}
			onMouseMove={e => move(e)}
			onMouseUp={e => release(e)}
			style={{ marginLeft: '30vmin', marginTop: '10vmin', width: 'fit-content' }}
			ref={boardRef}
		>
			{boardState.map((row, rowIndex) => (
				<div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
					{row.map((cell, cellIndex) => {
						const chessPiece = cell;
						const tileColor = (cellIndex + rowIndex) % 2 === 1 ? 'dark' : 'light';
						const cellKey = `${rowIndex}${cellIndex}`;
						return renderTile({ tileColor, chessPiece, key: cellKey });
					})}
				</div>
			))}
		</div>
	);
}
