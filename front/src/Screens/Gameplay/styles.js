import styled from 'styled-components';

export const StyledTile = styled.div`
	width: 10vmin;
	height: 10vmin;
	box-sizing: border-box;
	border: 1px solid black;
	background-color: ${({ tileColor }) => (tileColor === 'dark' ? 'bisque' : 'white')};
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
	background-color: orange;
	user-select: none;
	-webkit-user-drag: none;
`;
