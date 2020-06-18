import React, { useState } from "react"
import styled from "@emotion/styled";

const InputText = styled.input({
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
    borderBottom: '1px solid #9e9e9e',
    outline: 'none',
    height: '2.5rem',
    width: '50%',
    fontSize: '16px',
    margin: '0 0 20px 0',
    padding: 0,
    boxShadow: 'none',
    boxSizing: 'content-box',
    transition: 'border .3s, -webkit-box-shadow .3s',
    transition: 'box-shadow .3s, border .3s',
    transition: 'box-shadow .3s, border .3s, -webkit-box-shadow .3s'
})

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("")

    const onInputChange = (value) => {
        setSearch(value)
        onSearch(value)
    }
    return (
        <InputText type="text" placeholder="Search" value={search} onChange= {(e) => onInputChange(e.target.value)} />
    )
}

export default Search