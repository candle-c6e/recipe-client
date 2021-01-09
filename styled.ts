import styled, { createGlobalStyle } from 'styled-components'

export const DividerVerticle = styled.div`
  border-right: 1px solid var(--light-gray); 
  height: 100%
`

export const FormGroup = styled.div`
  margin-bottom: 2rem;
`

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #ee5253;
    --pastel-red: #ff6b6b;
    --light-gray: #eaeaea;
    --green: #01a3a4;
    --light-green: #00d2d3;
    --gray: #696969;
    --light-gray: #eaeaea;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    max-width: 1100px;
    margin: 0 auto;
    font-family: 'Inter', sans-serif;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input, 
  select {
    display: block;
    width: 100%;
    padding: .575rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .pagination {
    display: flex;
    margin-top: 3rem;
    justify-content: center;

    li {
      cursor: pointer;
      margin: 0 1rem;
      list-style: none;

      &.active {
        background: var(--pastel-red);
        color: #fff;
        border-radius: 10px;
      }

      a {
        outline: none;
        display: block;
        padding: 0.8rem 1rem;
      }
    }

    @media (max-width: 600px) {
      li {
        margin: 0 0.2rem;
      }
    }
  }
`