import { Component } from 'react';
// import { getTileIndexInBoard, isIndexInBoard, isSameTile, makePieceMove } from './utils';

export default class MovesManager extends Component {
	constructor({
		droppableRef,
		draggablesClassName,
		draggblesPositionsMatrix,
		clickDeltaInPx,
		moveAction,
		setSourcePositionState,
		setTargetPositionState,
	}) {
		super();
		this.droppableRef = droppableRef;
		this.draggablesClassName = draggablesClassName;
		this.draggblesPositionsMatrix = draggblesPositionsMatrix;
		this.clickDeltaInPx = clickDeltaInPx;
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
			this.itemMovingByDrag = { draggable: e.target, source: assumedSourcePos };
			this.setSourcePositionState(assumedSourcePos);
		}
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
	};

	resetDraggablePosition = () => {
		if (this.isMovingItemByDrag()) {
			const { style } = this.itemMovingByDrag.draggable;
			style.position = 'relative';
			style.top = 'auto';
			style.left = 'auto';
		}
	};

	abortMovingByClicks = () => {
		this.itemMovingByClicks = null;
		this.setSourcePositionState(null);
		this.setTargetPositionState(null);
	};

	isAClick = e => {
		const mousePos = this.getMousePosition(e);
		const xDelta = Math.abs(this.mouseDownPosition.x - mousePos.x);
		const yDelta = Math.abs(this.mouseDownPosition.y - mousePos.y);
		return xDelta <= this.clickDeltaInPx && yDelta <= this.clickDeltaInPx;
	};

	mouseUpHandler = e => {
		if (this.isAClick(e) && this.isMovingItemByClicks()) {
			const { source } = this.itemMovingByClicks;
			const mousePos = this.getMousePosition(e);
			const target = this.detectTilePos(mousePos);
			this.moveAction({ source, target });
			this.abortMovingByClicks();
		}

		if (this.isAClick(e) && !this.isMovingItemByClicks() && this.isDraggable(e.target)) {
			this.resetDraggablePosition();
			this.itemMovingByDrag = null;
			const mousePos = this.getMousePosition(e);
			const source = this.detectTilePos(mousePos);
			this.itemMovingByClicks = { source };
		}

		if (this.isMovingItemByClicks() && !this.isAClick(e)) {
			this.abortMovingByClicks();
		}

		if (this.isMovingItemByDrag()) {
			this.resetDraggablePosition();
			this.moveItem(e);
			this.itemMovingByDrag = null;
		}

		this.mouseDownPosition = null;
	};

	mouseMoveHandler = e => {
		if (this.isMovingItemByDrag()) {
			this.dragItem(e);
		}

		if (this.isMovingItemByClicks()) {
			const mousePos = this.getMousePosition(e);
			const target = this.detectTilePos(mousePos);
			this.setTargetPositionState(target);
		}
	};
}
