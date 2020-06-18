import styled from "@emotion/styled";

const Container = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: '90%',
    justifyContent: 'center',
    margin: '20px auto',
    color: theme.colors.default,
    ...theme.typography
}));

export default Container