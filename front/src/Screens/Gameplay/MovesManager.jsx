import { Component } from 'react';

export default class MovesManager extends Component {
	constructor({
		droppableRef,
		draggablesClassName,
		draggablesMatrixSize,
		clickDeltaInPx,
		moveAction,
		setSourcePositionState,
		setTargetPositionState,
	}) {
		super();
		this.droppableRef = droppableRef;
		this.draggablesClassName = draggablesClassName;
		this.draggablesMatrixSize = draggablesMatrixSize;
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
		return this.itemMovingByClicks && true;
	};

	isMovingItemByDrag = () => {
		return this.itemMovingByDrag && true;
	};

	isDraggable = target => {
		return target?.className.includes(this.draggablesClassName);
	};

	resetSourceAndTargetStates = () => {
		this.setSourcePositionState(null);
		this.setTargetPositionState(null);
	};

	getTilePositionUnderMouse = e => {
		const mousePosition = this.getMousePosition(e);
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
			x: droppableSizeInPx.x / this.draggablesMatrixSize.cols,
			y: droppableSizeInPx.y / this.draggablesMatrixSize.rows,
		};
		const itemPos = {
			x: Math.floor(mousePosInDroppable.x / draggableContainerSize.x),
			y: Math.floor(mousePosInDroppable.y / draggableContainerSize.y),
			isDroppable: isMouseInsideDroppable,
		};
		return itemPos;
	};

	dragItem = e => {
		const mousePos = this.getMousePosition(e);
		const draggableWidth = this.itemMovingByDrag.draggable.offsetWidth;
		const draggableHeight = this.itemMovingByDrag.draggable.offsetHeight;
		this.itemMovingByDrag.draggable.style.position = 'absolute';
		this.itemMovingByDrag.draggable.style.left = `calc(${mousePos.x}px - ${draggableWidth / 2}px)`;
		this.itemMovingByDrag.draggable.style.top = `calc(${mousePos.y}px - ${draggableHeight / 2}px)`;

		const hoverTarget = this.getTilePositionUnderMouse(e);
		this.setTargetPositionState(hoverTarget);
	};

	mouseDownHandler = e => {
		e.preventDefault();

		const mousePosition = this.getMousePosition(e);
		if (!this.mouseDownPosition) {
			this.mouseDownPosition = mousePosition;
		}
		if (!this.isMovingItemByClicks() && this.isDraggable(e.target)) {
			const source = this.getTilePositionUnderMouse(e);
			this.itemMovingByDrag = { draggable: e.target, source };
			this.setSourcePositionState(source);
		}
	};

	moveItem = e => {
		const movingItem = this.itemMovingByDrag || this.itemMovingByClicks;
		const { source } = movingItem;

		const target = this.getTilePositionUnderMouse(e);

		if (target.isDroppable) {
			this.moveAction({ source, target });
		}
		this.resetSourceAndTargetStates();
	};

	resetDraggablePosition = () => {
		if (this.isMovingItemByDrag()) {
			const { style } = this.itemMovingByDrag.draggable;
			style.position = 'relative';
			style.top = 'auto';
			style.left = 'auto';
		}
	};

	isAClick = e => {
		const mousePos = this.getMousePosition(e);
		const xDelta = Math.abs(this.mouseDownPosition.x - mousePos.x);
		const yDelta = Math.abs(this.mouseDownPosition.y - mousePos.y);
		return xDelta <= this.clickDeltaInPx && yDelta <= this.clickDeltaInPx;
	};

	mouseUpHandler = e => {
		e.preventDefault();

		if (this.isAClick(e)) {
			this.clickHandler(e);
		} else {
			this.itemMovingByClicks = null;
			this.resetSourceAndTargetStates();
		}

		if (this.isMovingItemByDrag()) {
			this.resetDraggablePosition();
			this.moveItem(e);
			this.itemMovingByDrag = null;
		}

		this.mouseDownPosition = null;
	};

	mouseMoveHandler = e => {
		e.preventDefault();

		if (this.isMovingItemByDrag()) {
			this.dragItem(e);
		}

		if (this.isMovingItemByClicks()) {
			const target = this.getTilePositionUnderMouse(e);
			this.setTargetPositionState(target);
		}
	};

	clickHandler = e => {
		if (this.isMovingItemByClicks()) {
			this.moveItem(e);
			this.itemMovingByClicks = null;
		} else if (this.isDraggable(e.target)) {
			this.resetDraggablePosition();
			this.itemMovingByDrag = null;
			const source = this.getTilePositionUnderMouse(e);
			this.itemMovingByClicks = { source };
		}
	};
}
