import React from "react";
import styled from 'styled-components';

const SortContainer = styled.div`
    display: flex;
    font-size: 18px;
    align-items:center;
`;

const HiddenInput = styled.input`
    display: none;
`;

const Label = styled.label`
    display:flex;
`;

const Sort = styled.div`
    & {
        display: flex;
        color: #8E9398;
        font-weight: 400;
        cursor: pointer;
        padding: 0px 20px;
    }

    ${HiddenInput}:checked + & {
        color: #3C6B50;
    }
`;

const Seperator = styled.div`
    display: flex;
    width: 0px;
    height: 20px;
    border: 1px solid #8E9398;
`;

const Sorts = ({ sorts, defaultSort, sortChanged }) => {

    return (
        <SortContainer>
            {Object.entries(sorts)
                .map(([key, value]) =>
                    <Label key={value.apiPath} >
                        <HiddenInput type="radio" value={value.apiPath} name="sort" onChange={sortChanged} defaultChecked={value.apiPath === sorts.HEART.apiPath} />
                        <Sort>{value.name}</Sort>
                    </Label>
                )
                .reduce((prev, curr) => [prev, <Seperator key="seperator" />, curr])
            }
        </SortContainer>
    );
};

export default Sorts;