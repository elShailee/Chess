import { Component } from 'react';
// import { getTileIndexInBoard, isIndexInBoard, isSameTile, makePieceMove } from './utils';

export default class MovesManager extends Component {
	constructor({
		droppableRef,
		draggablesClassName,
		draggblesPositionsMatrix,
		moveAction,
		setSourcePositionState,
		setTargetPositionState,
	}) {
		super();
		this.droppableRef = droppableRef;
		this.draggablesClassName = draggablesClassName;
		this.draggblesPositionsMatrix = draggblesPositionsMatrix;
		this.moveAction = moveAction;
		this.setSourcePositionState = setSourcePositionState;
		this.setTargetPositionState = setTargetPositionState;

		this.mouseDownPosition = null;
		this.itemMovingByDrag = null;
		this.itemMovingByClicks = null;
	}

	getMousePosition = e => {
		return { x: e.clientX, y: e.clientY };
	};

	isMovingItemByClicks = () => {
		return !!this.itemMovingByClicks;
	};

	isMovingItemByDrag = () => {
		return !!this.itemMovingByDrag;
	};

	isDraggable = target => {
		return target?.className.includes(this.draggablesClassName);
	};

	detectTilePos = mousePosition => {
		const droppablePos = { x: this.droppableRef.current.offsetLeft, y: this.droppableRef.current.offsetTop };
		const droppableSizeInPx = { x: this.droppableRef.current.offsetWidth, y: this.droppableRef.current.offsetHeight };
		const mousePosInDroppable = {
			x: mousePosition.x - droppablePos.x,
			y: mousePosition.y - droppablePos.y,
		};
		const isMouseInsideDroppable =
			mousePosInDroppable.x >= 0 &&
			mousePosInDroppable.y >= 0 &&
			mousePosInDroppable.x <= droppableSizeInPx.x &&
			mousePosInDroppable.y <= droppableSizeInPx.y;
		const draggableContainerSize = {
			x: droppableSizeInPx.x / this.draggblesPositionsMatrix[0].length,
			y: droppableSizeInPx.y / this.draggblesPositionsMatrix.length,
		};
		const itemPos = {
			x: Math.floor(mousePosInDroppable.x / draggableContainerSize.x),
			y: Math.floor(mousePosInDroppable.y / draggableContainerSize.y),
			isDroppable: isMouseInsideDroppable,
		};
		return itemPos;
	};

	dragItem = e => {
		const x = e.clientX;
		const y = e.clientY;
		const draggableWidth = this.itemMovingByDrag.draggable.offsetWidth;
		const draggableHeight = this.itemMovingByDrag.draggable.offsetHeight;
		this.itemMovingByDrag.draggable.style.position = 'absolute';
		this.itemMovingByDrag.draggable.style.left = `calc(${x}px - ${draggableWidth / 2}px)`;
		this.itemMovingByDrag.draggable.style.top = `calc(${y}px - ${draggableHeight / 2}px)`;

		const mousePosition = this.getMousePosition(e);
		const hoverTarget = this.detectTilePos(mousePosition);
		this.setTargetPositionState(hoverTarget);
	};

	mouseDownHandler = e => {
		const mousePosition = this.getMousePosition(e);
		if (!this.mouseDownPosition) {
			this.mouseDownPosition = mousePosition;
		}
		if (!this.isMovingItemByClicks() && this.isDraggable(e.target)) {
			const assumedSourcePos = this.detectTilePos(mousePosition);
			if (this.isDraggable(e.target)) {
				this.itemMovingByDrag = { draggable: e.target, source: assumedSourcePos };
				this.setSourcePositionState(assumedSourcePos);
				this.dragItem(e);
			}
		}
		// this.mouseDownPos = { x: e.clientX, y: e.clientY };
		// if (!this.clickMovingPiece) {
		// 	if (!e.target.className.includes(this.draggablesClassName)) return;
		// 	this.dragMovingPiece = { image: e.target, source: getTileIndexInBoard({ e, boardRef: this.droppableRef }) };
		// 	this.mouseMoveHandler(e);
		// }
	};

	moveItem = e => {
		const movingItem = this.itemMovingByDrag || this.itemMovingByDrag;
		if (!movingItem) return;
		const { source } = movingItem;

		const mousePosition = this.getMousePosition(e);
		const target = this.detectTilePos(mousePosition);

		this.moveAction({ source, target });
		this.setSourcePositionState(null);
		this.setTargetPositionState(null);
		// if (source.x === target.x && source.y === target.y) return;
		// let newBoardState = copyBoardState(boardState);
		// newBoardState[7 - target.y][target.x] = newBoardState[7 - source.y][source.x];
		// newBoardState[7 - source.y][source.x] = null;
		// setBoardState(newBoardState);
	};

	resetDraggablePosition = () => {
		if (this.isMovingItemByDrag()) {
			const { style } = this.itemMovingByDrag.draggable;
			style.position = 'relative';
			style.top = 'auto';
			style.left = 'auto';
		}
	};

	mouseUpHandler = e => {
		if (this.isMovingItemByDrag()) {
			this.resetDraggablePosition();
			this.moveItem(e);
			this.itemMovingByDrag = null;
		}
		// const targetTileIndex = getTileIndexInBoard({ e, boardRef: this.droppableRef });
		// if (Math.abs(e.clientX - this.mouseDownPos.x) <= 8 && Math.abs(e.clientY - this.mouseDownPos.y) <= 8) {
		// 	if (!this.clickMovingPiece) {
		// 		this.dragMovingPiece = null;
		// 		this.hoveringTileIndex = null;
		// 		const clickTargetTile = getTileIndexInBoard({ e, boardRef: this.droppableRef });
		// 		if (this.boardState[7 - clickTargetTile.y][clickTargetTile.x]) this.clickMovingPiece = clickTargetTile;
		// 	} else {
		// 		makePieceMove({
		// 			source: this.clickMovingPiece,
		// 			target: targetTileIndex,
		// 			boardState: this.boardState,
		// 			setBoardState: this.setBoardState,
		// 		});
		// 		this.clickMovingPiece = null;
		// 		this.hoveringTileIndex = null;
		// 	}
		// }
		// this.clickMovingPiece && (this.clickMovingPiece = null);
		// this.mouseDownPos = null;
		// if (this.dragMovingPiece) {
		// 	if (isIndexInBoard(targetTileIndex) && !isSameTile(targetTileIndex, this.dragMovingPiece.source)) {
		// 		makePieceMove({
		// 			source: this.dragMovingPiece.source,
		// 			target: targetTileIndex,
		// 			boardState: this.boardState,
		// 			setBoardState: this.setBoardState,
		// 		});
		// 	}
		// }
		// if (
		// 	this.dragMovingPiece &&
		// 	(!isIndexInBoard(targetTileIndex) || isSameTile(targetTileIndex, this.dragMovingPiece.source))
		// ) {
		// 	this.resetPiecePosition(this.dragMovingPiece);
		// }
		// this.dragMovingPiece = null;
		// this.hoveringTileIndex = null;
	};

	mouseMoveHandler = e => {
		if (this.isMovingItemByDrag()) {
			this.dragItem(e);
		}
		// 	if (this.dragMovingPiece) {
		// 		const x = e.clientX;
		// 		const y = e.clientY;
		// 		this.dragMovingPiece.image.style.position = 'absolute';
		// 		this.dragMovingPiece.image.style.left = `calc(${x}px - 4.5vmin)`;
		// 		this.dragMovingPiece.image.style.top = `calc(${y}px - 4.5vmin)`;
		// 	}
		// 	if (this.dragMovingPiece || (this.clickMovingPiece && !this.mouseDownPos)) {
		// 		const tileIndexUnderMouse = getTileIndexInBoard({ e, boardRef: this.droppableRef });
		// 		if (tileIndexUnderMouse !== this.hoveringTileIndex) {
		// 			this.hoveringTileIndex = tileIndexUnderMouse;
		// 		}
		// 	}
		// };
		// resetPiecePosition = piece => {
		// 	const imageStyle = piece.image.style;
		// 	imageStyle.position = 'relative';
		// 	imageStyle.left = 'auto';
		// 	imageStyle.top = 'auto';
	};
}
