import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import Pagination from "../atom/Pagination"
import Search from "../atom/Search"
import TableHeader from "../atom/TableHeader"
import axios from "axios"

const MainTable = styled.table(({theme}) => ({
    width: '100%',
    display: 'table',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    boxShadow: theme.shadows.default
}))

const TableBody = styled.tbody(({ theme }) => ({
    boxSizing: 'inherit',
    lineHeight: 1.6,
    fontSize: '16px',
    color: theme.colors.default
}))

const Row = styled.tr({
    borderBottom: '1px solid rgba(0,0,0,0.12)'
})

const Cell = styled.td({
    padding: '15px 20px',
    display: 'table-cell',
    verticalAlign: 'middle',
    borderRadius: '2px',
    textAlign: 'center',
})


const DataTable = () => {
    const [posts, setPost] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 10;

    const headers = [
        { name: "Finishers", field: "position", sortable: true },
        { name: "Vehicle No#", field: "number", sortable: false },
        { name: "time", field: "time", sortable: false },
        { name: "status", field: "status", sortable: false },
        { name: "Name/Driver", field: "name", sortable: false },
        { name: "nationality", field: "nationality", sortable: false },
        { name: "Car Type", field: "car", sortable: false }

    ];

    useEffect(() => {
        axios.get('http://ergast.com/api/f1/2004/1/results.json')
        .then( res => {
            setPost(res.data.MRData.RaceTable.Races[0].Results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const postsData = useMemo(() => {
        let computedPosts = posts;

        if (search) {
            computedPosts = computedPosts.filter(
                post =>
                    post['position'].toLowerCase().includes( search.toLowerCase() ) || 
                    post['number'].toLowerCase().includes( search.toLowerCase() ) ||
                    post.Driver['givenName'].toLowerCase().includes( search.toLowerCase() ) || 
                    post.Driver['familyName'].toLowerCase().includes( search.toLowerCase() ) ||
                    post.Driver['nationality'].toLowerCase().includes( search.toLowerCase() ) ||
                    post.Constructor['name'].toLowerCase().includes( search.toLowerCase() ) ||
                    post.status.toLowerCase().includes( search.toLowerCase() ) 
            );
        }

        setTotalItems(computedPosts.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            
            computedPosts = computedPosts.sort(
                (a, b) =>
                    reversed * a[sorting.field] - b[sorting.field]
            );
        }

        //Current Page slice
        return computedPosts.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [posts, currentPage, search, sorting]);

    return (
            <div>
                    <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                    <MainTable>
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <TableBody>
                            {
                                 postsData.map( post => (
                                    <Row key={post.number}>
                                        <Cell>{post.position}</Cell>
                                        <Cell>{post.number}</Cell>
                                        <Cell>{post.FastestLap['Time']['time']}</Cell>
                                        <Cell>{post.status}</Cell>
                                        <Cell>{post.Driver['givenName']} {post.Driver['familyName']}</Cell>
                                        <Cell>{post.Driver['nationality']}</Cell>
                                        <Cell>{post.Constructor['name']}</Cell>
                                    </Row>
                                ))
                            }
                        </TableBody>
                    </MainTable>
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
            </div>
    );
};

export default DataTable;