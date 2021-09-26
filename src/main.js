import React from 'react'
import Header from './header'
import Body from './body'

function Main() {

    const [search,setSearch] = React.useState('');

    return (
        <>
            <Header setSearch={setSearch}/>
            <Body searchName={search}/>
        </>
    )
}

export default Main
