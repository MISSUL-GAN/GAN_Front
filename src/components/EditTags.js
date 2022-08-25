import React from "react";
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const Tag = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0px 20px;
        height: 40px;
        background: #F4F4F4;
        border-radius: 40px;
        color: #3C6B50;
        cursor: pointer;

        margin-right: 10px;
        margin-top: 10px;
    }

    ${HiddenInput}:checked + & {
        color: #FFFFFF;
        background: #3C6B50;
    }
`;

const EditTags = ({ tags, newTags, tagChanged }) => {

    return (
        <>
            {tags.map(tag => 
                <label key={tag.tagId}>
                    <HiddenInput name="tagBox" type="checkbox" value={tag.tagId} onClick={tagChanged} checked={newTags.includes(tag.tagId)} />
                    <Tag>{tag.name}</Tag>
                </label>
            )}
        </>
    );
};


export default EditTags;
