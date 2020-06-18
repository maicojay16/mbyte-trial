import React, { useState } from "react";
import styled from "@emotion/styled";
import { SortIcon } from "@icons/";

const TableHead = styled.thead({
    color: 'rgba(0, 0, 0, 0.57)',
    backgroundColor: '#d2d2d269'
})

const Row = styled.tr({
    borderBottom: '1px solid rgba(0,0,0,0.12)'
})

const THead = styled.th({
    padding: '15px',
    textTransform: 'capitalize',
})

const SortButton = styled.button({
    backgroundColor: 'transparent',
    border: 'none'
})

const Header = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = field => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <TableHead>
            <Row>
                {headers.map(({ name, field, sortable }) => (
                    <THead
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}
                        {
                            sortable == true ? <SortButton><SortIcon/></SortButton> : ''
                        }
                    </THead>
                ))}
            </Row>
        </TableHead>
    );
};

export default Header;