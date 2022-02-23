export const getTileIndexInBoard = ({ e, boardRef }) => {
	const targetPos = { x: e?.clientX, y: e?.clientY };
	const boardSize = { x: boardRef?.current.offsetWidth, y: boardRef?.current.offsetHeight };
	const boardPos = { x: boardRef?.current.offsetLeft, y: boardRef?.current.offsetTop };

	//check input completeness
	if (!boardPos || !boardSize || !targetPos) {
		console.log('please pass boardPos, boardSize and targetPos coords to getTileIndexInBoard.');
		return { x: -1, y: -1 };
	}

	//validate input
	if (
		targetPos.x < boardPos.x ||
		targetPos.y < boardPos.y ||
		targetPos.x > boardPos.x + boardSize.x ||
		targetPos.y > boardPos.y + boardSize.y
	) {
		console.warn('target position passed to getTileIndexInBoard is outside of board.');
		return { x: -1, y: -1 };
	}

	const targetPosInBoard = { x: targetPos.x - boardPos.x, y: targetPos.y - boardPos.y };
	const tileSize = { x: boardSize.x / 8, y: boardSize.y / 8 };
	const targetTile = {
		x: 7 - Math.floor((boardSize.x - targetPosInBoard.x) / tileSize.x),
		y: Math.floor((boardSize.y - targetPosInBoard.y) / tileSize.y),
	};
	return targetTile;
};

export const isIndexInBoard = tileIndex => {
	return tileIndex.x >= 0 && tileIndex.x < 8 && tileIndex.y >= 0 && tileIndex.y < 8;
};

export const copyBoardState = boardState => {
	return boardState.map((row, rowIndex) => {
		const newRow = [];
		row.map(cell => newRow.push(cell));
		return newRow;
	});
};

export const isSameTile = (tileIndexA, tileIndexB) => tileIndexA.x === tileIndexB.x && tileIndexA.y === tileIndexB.y;
