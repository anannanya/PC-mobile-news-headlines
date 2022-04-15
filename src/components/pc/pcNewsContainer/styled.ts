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

export const CardSourceWrapper = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
`;
