import React, { useMemo, useRef, useState } from 'react';
import Tile from './Tile';
import initialState from './initialState';
// import { getTileIndexInBoard, isIndexInBoard, isSameTile, makePieceMove } from './utils';
import MovesManager from './MovesManager';
import { copyMatrix, generateTileColor } from './utils';

export default function Board() {
	const piecesClassName = 'draggablePieceImage';
	const boardRef = useRef(null);
	const [boardState, setBoardState] = useState(initialState);
	const [sourceTileState, setSourceTileState] = useState(null);
	const [targetTileState, setTargetTileState] = useState(null);

	const mm = useMemo(() => {
		const moveAction = ({ source, target }) => {
			const newBoardState = copyMatrix(boardState);
			newBoardState[target.y][target.x] = newBoardState[source.y][source.x];
			if (source.x !== target.x || source.y !== target.y) {
				newBoardState[source.y][source.x] = null;
			}
			setBoardState(newBoardState);
		};

		return new MovesManager({
			droppableRef: boardRef,
			draggablesClassName: piecesClassName,
			draggblesPositionsMatrix: boardState,
			clickDeltaInPx: 8,
			moveAction,
			setSourcePositionState: setSourceTileState,
			setTargetPositionState: setTargetTileState,
		});
	}, [piecesClassName, boardState]);

	//moving funcs
	// const [dragMovingPiece, setDragMovingPiece] = useState(null);
	// const [clickMovingPiece, setClickMovingPiece] = useState(null);
	// const [mouseDownPos, setMouseDownPos] = useState(null);
	// const [hoveringTileIndex, setHoveringTileIndex] = useState(null);

	// const grab = e => {
	// 	setMouseDownPos({ x: e.clientX, y: e.clientY });
	// 	if (!clickMovingPiece) {
	// 		if (!e.target.className.includes(piecesClassName)) return;
	// 		setDragMovingPiece({ image: e.target, source: getTileIndexInBoard({ e, boardRef }) });
	// 		move(dragMovingPiece);
	// 	}
	// };

	// const release = e => {
	// 	const targetTileIndex = getTileIndexInBoard({ e, boardRef });

	// 	if (Math.abs(e.clientX - mouseDownPos.x) <= 8 && Math.abs(e.clientY - mouseDownPos.y) <= 8) {
	// 		if (!clickMovingPiece) {
	// 			setDragMovingPiece(null);
	// 			setHoveringTileIndex(null);
	// 			const clickTargetTile = getTileIndexInBoard({ e, boardRef });
	// 			if (boardState[7 - clickTargetTile.y][clickTargetTile.x]) setClickMovingPiece(clickTargetTile);
	// 		} else {
	// 			makePieceMove({ source: clickMovingPiece, target: targetTileIndex, boardState, setBoardState });
	// 			setClickMovingPiece(null);
	// 			setHoveringTileIndex(null);
	// 		}
	// 	}
	// 	clickMovingPiece && setClickMovingPiece(null);
	// 	setMouseDownPos(null);

	// 	if (dragMovingPiece) {
	// 		if (isIndexInBoard(targetTileIndex) && !isSameTile(targetTileIndex, dragMovingPiece.source)) {
	// 			makePieceMove({ source: dragMovingPiece.source, target: targetTileIndex, boardState, setBoardState });
	// 		}
	// 	}

	// 	if (dragMovingPiece && (!isIndexInBoard(targetTileIndex) || isSameTile(targetTileIndex, dragMovingPiece.source))) {
	// 		resetPiecePosition(dragMovingPiece);
	// 	}

	// 	setDragMovingPiece(null);
	// 	setHoveringTileIndex(null);
	// };

	// const resetPiecePosition = piece => {
	// 	const imageStyle = piece.image.style;
	// 	imageStyle.position = 'relative';
	// 	imageStyle.left = 'auto';
	// 	imageStyle.top = 'auto';
	// };

	// const move = e => {
	// 	if (dragMovingPiece) {
	// 		const x = e.clientX;
	// 		const y = e.clientY;
	// 		dragMovingPiece.image.style.position = 'absolute';
	// 		dragMovingPiece.image.style.left = `calc(${x}px - 4.5vmin)`;
	// 		dragMovingPiece.image.style.top = `calc(${y}px - 4.5vmin)`;
	// 	}

	// 	if (dragMovingPiece || (clickMovingPiece && !mouseDownPos)) {
	// 		const tileIndexUnderMouse = getTileIndexInBoard({ e, boardRef });
	// 		if (tileIndexUnderMouse !== hoveringTileIndex) {
	// 			setHoveringTileIndex(tileIndexUnderMouse);
	// 		}
	// 	}
	// };

	//rendering board

	const renderTile = ({ tileColor, chessPiece, key }) => (
		<Tile tileColor={tileColor} key={key} chessPiece={chessPiece} piecesClassName={piecesClassName} />
	);

	return (
		<div
			onMouseDown={e => mm.mouseDownHandler(e)}
			onMouseMove={e => mm.mouseMoveHandler(e)}
			onMouseUp={e => mm.mouseUpHandler(e)}
			style={{ marginLeft: '30vmin', marginTop: '10vmin', width: 'fit-content' }}
			ref={boardRef}
		>
			{boardState.map((row, rowIndex) => (
				<div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
					{row.map((cell, cellIndex) => {
						const chessPiece = cell;
						let tileColor = generateTileColor({ rowIndex, cellIndex, sourceTileState, targetTileState });
						const cellKey = `${rowIndex}${cellIndex}`;
						return renderTile({ tileColor, chessPiece, key: cellKey });
					})}
				</div>
			))}
		</div>
	);
}
