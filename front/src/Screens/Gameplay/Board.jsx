import React, { useMemo, useRef, useState } from 'react';
import Tile from './Tile';
import initialState from './initialState';
import MovesManager from './MovesManager';
import { pieceMoveAction, generateTileColor } from './utils';

export default function Board() {
	const piecesClassName = 'draggablePieceImage';
	const boardRef = useRef(null);
	const [boardState, setBoardState] = useState(initialState);
	const [sourceTileState, setSourceTileState] = useState(null);
	const [targetTileState, setTargetTileState] = useState(null);

	const mm = useMemo(() => {
		return new MovesManager({
			droppableRef: boardRef,
			draggablesClassName: piecesClassName,
			draggblesPositionsMatrix: boardState,
			clickDeltaInPx: 8,
			moveAction: ({ source, target }) => pieceMoveAction({ source, target, boardState, setBoardState }),
			setSourcePositionState: setSourceTileState,
			setTargetPositionState: setTargetTileState,
		});
	}, [piecesClassName, boardState]);

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
