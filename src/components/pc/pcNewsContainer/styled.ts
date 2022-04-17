import styled from 'styled-components';

export const CardWrapper = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
`;

export const CardImageWrapper = styled.div`
    padding: 6px;
    height: 100px;
`;

export const CardDescriptionWrapper = styled.div`
    padding: 6px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CardTitleWrapper = styled.h3`
    flex-grow: 1;
`;

export const CardSourceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
`;

export const StarIconWrapper = styled.div`
    &:hover {
        background: rgba(31, 35, 41, .1);
    }
    &:active {
        background: rgba(31, 35, 41, .2);
    }
    padding: 4px;
    border-radius: 6px;
`;