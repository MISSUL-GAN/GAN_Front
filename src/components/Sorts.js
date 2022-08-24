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
        margin-left: 20px;
    }

    ${HiddenInput}:checked + & {
        color: #3C6B50;
    }
`;

const Seperator = styled.div`
    display: flex;
    width: 0px;
    height: 20px;
    border-right: 2px solid #8E9398;
    margin-left:20px;
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