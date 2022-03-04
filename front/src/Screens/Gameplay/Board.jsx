import React, { useMemo, useRef, useState } from 'react';
import Tile from './Tile';
import initialState from './initialState';
import MovesManager from './MovesManager';
import { pieceMoveAction, generateTileColor } from './utils';

export default function Board() {
	const draggablePiecesClassName = 'draggablePieceImage';
	const boardRef = useRef(null);
	const [boardState, setBoardState] = useState(initialState);
	const [sourceTileState, setSourceTileState] = useState(null);
	const [targetTileState, setTargetTileState] = useState(null);

	const mm = useMemo(
		() =>
			new MovesManager({
				droppableRef: boardRef,
				draggablesClassName: draggablePiecesClassName,
				draggablesMatrixSize: { rows: boardState.length, cols: boardState[0].length },
				clickDeltaInPx: 8,
				moveAction: ({ source, target }) => pieceMoveAction({ source, target, boardState, setBoardState }),
				setSourcePositionState: setSourceTileState,
				setTargetPositionState: setTargetTileState,
			}),
		[draggablePiecesClassName, boardState],
	);

	const renderTile = ({ rowIndex, cell, cellIndex }) => {
		let tileColor = generateTileColor({ rowIndex, cellIndex, sourceTileState, targetTileState });
		const cellKey = `row:${rowIndex},col:${cellIndex}`;

		return <Tile tileColor={tileColor} key={cellKey} chessPiece={cell} piecesClassNameAddition={draggablePiecesClassName} />;
	};

	const renderBoardRow = ({ row, rowIndex }) => (
		<div key={rowIndex} style={{ display: 'flex', flexDirection: 'row' }}>
			{row.map((cell, cellIndex) => {
				return renderTile({ rowIndex, cell, cellIndex });
			})}
		</div>
	);
	return (
		<div
			onMouseDown={e => mm.mouseDownHandler(e)}
			onMouseMove={e => mm.mouseMoveHandler(e)}
			onMouseUp={e => mm.mouseUpHandler(e)}
			style={{ marginLeft: '30vmin', marginTop: '10vmin', width: 'fit-content' }}
			ref={boardRef}
		>
			{boardState.map((row, rowIndex) => renderBoardRow({ row, rowIndex }))}
		</div>
	);
}
