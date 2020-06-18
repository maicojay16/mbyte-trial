import React, { useEffect, useState, useMemo } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@icons/"
import styled from "@emotion/styled";


const PagesButton = styled.button({
    fontSize: '16px',
    padding: '10px',
})

const ArrowButton = styled.button({
    fontSize: '16px',
    padding: '5px',
})

const PaginationContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px'
})


const Pagination = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <PagesButton
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </PagesButton>
            );
        }

        return pages;
    }, [totalPages, currentPage]);

    if (totalPages === 0) return null;

    return (
        <PaginationContainer>
            <ArrowButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            ><ChevronLeftIcon /></ArrowButton>
            {paginationItems}
            <ArrowButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            ><ChevronRightIcon /></ArrowButton>
        </PaginationContainer>
    );
};

export default Pagination;