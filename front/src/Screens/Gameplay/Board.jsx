import React, { useRef } from 'react';
import Tile from './Tile';
import initialState from './initialState';

export default function Board() {
	const boardRef = useRef(null);

	//moving funcs
	let movingPiece = null;

	const grab = e => {
		if (!e.target.className.includes('pieceImage')) return;
		movingPiece = e.target;
		move(movingPiece);
	};

	const release = e => {
		if (!movingPiece) return;
		const boardPos = { x: boardRef.current.offsetLeft, y: boardRef.current.offsetTop };
		const targetPosInBoard = { x: e.clientX - boardPos.x, y: e.clientY - boardPos.y };
		const boardSize = { width: boardRef.current.offsetWidth, height: boardRef.current.offsetHeight };
		const tileSize = { width: boardSize.width / 8, height: boardSize.height / 8 };
		const targetTile = {
			x: 7 - Math.floor((boardSize.width - targetPosInBoard.x) / tileSize.width),
			y: Math.floor((boardSize.height - targetPosInBoard.y) / tileSize.height),
		};
		console.log(targetTile);
		movingPiece = null;
	};

	const move = e => {
		if (!movingPiece) return;
		const x = e.clientX;
		const y = e.clientY;
		movingPiece.style.position = 'absolute';
		movingPiece.style.left = `calc(${x}px - 4.5vmin)`;
		movingPiece.style.top = `calc(${y}px - 4.5vmin)`;
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
			{initialState.map((row, rowIndex) => (
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
