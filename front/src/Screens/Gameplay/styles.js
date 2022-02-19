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
`;

export const StyledPiece = styled.img`
	width: 9vmin;
	height: 9vmin;
	user-select: none;
	-webkit-user-drag: none;
`;
