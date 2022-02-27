import { Component } from 'react';
// import { getTileIndexInBoard, isIndexInBoard, isSameTile, makePieceMove } from './utils';

export default class MovesManager extends Component {
	// MovesManager({
	// droppableRef: boardRef,
	// draggablesClassName: piecesClassName,
	// draggablesMatrix,
	// moveAction,
	// setSourcePositionState: setSourceTileState,
	// setTargetPositionState: setTargetTileState,
	// });

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

		this.state = {
			mouseDownPosition: null,
			itemMovingByDrag: null,
			itemMovingByClicks: null,
		};
	}

	// constructor({ droppableRef, draggablesClassName, moveAction, boardState, setBoardState }) {
	// 	super();
	// 	this.droppableRef = droppableRef;
	// 	this.draggablesClassName = draggablesClassName;
	// 	this.moveAction = moveAction;
	// 	this.boardState = boardState;
	// 	this.setBoardState = setBoardState;

	// 	this.dragMovingPiece = null;
	// 	this.clickMovingPiece = null;
	// 	this.mouseDownPos = null;
	// 	this.hoveringTileIndex = null;
	// }

	getMousePosition = e => {
		return { x: e.clientX, y: e.clientY };
	};

	isMovingItemByClicks = () => {
		return !!this.itemMovingByClicks;
	};

	isDraggable = target => {
		return target?.className.contains(this.draggablesClassName);
	};

	detectItemPos = mousePosition => {
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
			x: mousePosInDroppable.x / draggableContainerSize.x,
			y: mousePosInDroppable.y / draggableContainerSize.y,
			isValid: isMouseInsideDroppable,
		};
		return itemPos;
	};

	mouseDownHandler = e => {
		const mousePosition = this.getMousePosition(e);
		if (!this.state.mouseDownPosition) {
			this.setState({ ...this.state, mouseDownPosition: mousePosition });
		}
		if (!this.isMovingItemByClicks() && this.isDraggable(e.target)) {
			const assumedSourcePos = this.detectItemPos(mousePosition);
			if (assumedSourcePos.isValid) {
				this.setState({ ...this.state, itemMovingByClicks: { draggable: e.target, source: assumedSourcePos } });
				this.moveDraggingItem(e);
				this.setSourcePositionState(assumedSourcePos);
			}
		}
		// this.mouseDownPos = { x: e.clientX, y: e.clientY };
		// if (!this.clickMovingPiece) {
		// 	if (!e.target.className.includes(this.draggablesClassName)) return;
		// 	this.dragMovingPiece = { image: e.target, source: getTileIndexInBoard({ e, boardRef: this.droppableRef }) };
		// 	this.mouseMoveHandler(e);
		// }
	};

	mouseUpHandler = e => {
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
