import React, { useRef, useState } from 'react';
import Tile from './Tile';
import initialState from './initialState';
import { getTileIndexInBoard, isIndexInBoard, isSameTile, makePieceMove } from './utils';

export default function Board() {
	const boardRef = useRef(null);
	const [boardState, setBoardState] = useState(initialState);

	//moving funcs
	const [dragMovingPiece, setDragMovingPiece] = useState(null);
	const [clickMovingPiece, setClickMovingPiece] = useState(null);
	const [mouseDownPos, setMouseDownPos] = useState(null);
	const [hoveringTileIndex, setHoveringTileIndex] = useState(null);

	const grab = e => {
		setMouseDownPos({ x: e.clientX, y: e.clientY });
		if (!clickMovingPiece) {
			if (!e.target.className.includes('pieceImage')) return;
			setDragMovingPiece({ image: e.target, source: getTileIndexInBoard({ e, boardRef }) });
			move(dragMovingPiece);
		}
	};

	const release = e => {
		const targetTileIndex = getTileIndexInBoard({ e, boardRef });

		if (e.clientX === mouseDownPos?.x && e.clientY === mouseDownPos?.y) {
			if (!clickMovingPiece) {
				setDragMovingPiece(null);
				setHoveringTileIndex(null);
				const clickTargetTile = getTileIndexInBoard({ e, boardRef });
				if (boardState[7 - clickTargetTile.y][clickTargetTile.x]) setClickMovingPiece(clickTargetTile);
			} else {
				makePieceMove({ source: clickMovingPiece, target: targetTileIndex, boardState, setBoardState });
				setClickMovingPiece(null);
				setHoveringTileIndex(null);
			}
		}
		clickMovingPiece && setClickMovingPiece(null);
		setMouseDownPos(null);

		if (dragMovingPiece) {
			if (isIndexInBoard(targetTileIndex) && !isSameTile(targetTileIndex, dragMovingPiece.source)) {
				makePieceMove({ source: dragMovingPiece.source, target: targetTileIndex, boardState, setBoardState });
			}
		}

		if (dragMovingPiece && (!isIndexInBoard(targetTileIndex) || isSameTile(targetTileIndex, dragMovingPiece.source))) {
			resetPiecePosition(dragMovingPiece);
		}

		setDragMovingPiece(null);
		setHoveringTileIndex(null);
	};

	const resetPiecePosition = piece => {
		const imageStyle = piece.image.style;
		imageStyle.position = 'relative';
		imageStyle.left = 'auto';
		imageStyle.top = 'auto';
	};

	const move = e => {
		if (dragMovingPiece) {
			const x = e.clientX;
			const y = e.clientY;
			dragMovingPiece.image.style.position = 'absolute';
			dragMovingPiece.image.style.left = `calc(${x}px - 4.5vmin)`;
			dragMovingPiece.image.style.top = `calc(${y}px - 4.5vmin)`;
		}

		if (dragMovingPiece || (clickMovingPiece && !mouseDownPos)) {
			const tileIndexUnderMouse = getTileIndexInBoard({ e, boardRef });
			if (tileIndexUnderMouse !== hoveringTileIndex) {
				setHoveringTileIndex(tileIndexUnderMouse);
			}
		}
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
						let tileColor = (cellIndex + rowIndex) % 2 === 1 ? 'dark' : 'light';
						if (hoveringTileIndex?.x === cellIndex && hoveringTileIndex?.y === 7 - rowIndex) {
							tileColor = 'target';
						}
						if (
							(clickMovingPiece?.x === cellIndex && clickMovingPiece?.y === 7 - rowIndex) ||
							(dragMovingPiece?.source.x === cellIndex && dragMovingPiece?.source.y === 7 - rowIndex)
						) {
							tileColor = 'source';
						}
						const cellKey = `${rowIndex}${cellIndex}`;
						return renderTile({ tileColor, chessPiece, key: cellKey });
					})}
				</div>
			))}
		</div>
	);
}
