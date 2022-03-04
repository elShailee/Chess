import styled from 'styled-components';

export const StyledTile = styled.div`
	//this property is responsible for marking source and target highlights
	${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}

	width: 10vmin;
	height: 10vmin;
	box-sizing: border-box;
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	user-select: none;
	-webkit-user-drag: none;
`;

export const StyledPiece = styled.img`
	width: 9vmin;
	height: 9vmin;
	user-select: none;
	-webkit-user-drag: none;
`;

export const PieceContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	user-select: none;
	-webkit-user-drag: none;
`;
