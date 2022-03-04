export const generateTileColor = ({ rowIndex, cellIndex, sourceTileState, targetTileState }) => {
	let tileColor = (rowIndex + cellIndex) % 2 === 1 ? 'dark' : 'light';
	if (targetTileState?.x === cellIndex && targetTileState?.y === rowIndex) {
		tileColor = 'target';
	}
	if (sourceTileState?.x === cellIndex && sourceTileState?.y === rowIndex) {
		tileColor = 'source';
	}
	return tileColor;
};

export const copyMatrix = boardState => {
	return boardState.map((row, rowIndex) => {
		const newRow = [];
		row.map(cell => newRow.push(cell));
		return newRow;
	});
};

export const isSameTile = (tilePosA, tilePosB) => tilePosA.x === tilePosB.x && tilePosA.y === tilePosB.y;

export const pieceMoveAction = ({ source, target, boardState, setBoardState }) => {
	if (isSameTile(source, target)) return;

	const newBoardState = copyMatrix(boardState);
	newBoardState[target.y][target.x] = newBoardState[source.y][source.x];
	newBoardState[source.y][source.x] = null;
	setBoardState(newBoardState);
};
