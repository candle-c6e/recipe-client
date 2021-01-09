import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  const auth = useAuth();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  useEffect(() => {
    if (toggleMenu) {
      setToggleMenu(!toggleMenu);
    }
  }, [router.asPath]);

  return (
    <Wrapper>
      <Nav>
        <LogoWrapper>
          <Link href="/">
            <a>
              <h1 id="logo">Recipe</h1>
            </a>
          </Link>
          <span id="nav-mobile" onClick={() => setToggleMenu(true)}>
            <GiHamburgerMenu size={35} />
          </span>
        </LogoWrapper>
        <Menu isShow={toggleMenu}>
          <li>
            <TimesWrapper onClick={() => setToggleMenu(false)}>
              <FaTimes id="nav-times" size={25} />
            </TimesWrapper>
          </li>
          <li>
            <Link href="/category/all/1">
              <a>
                <p>All</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/category/breakfast/1">
              <a>
                <p>Breakfast</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/category/lunch/1">
              <a>
                <p>Lunch</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/category/dinner/1">
              <a>
                <p>Dinner</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/category/dessert/1">
              <a>
                <p>Dessert</p>
              </a>
            </Link>
          </li>
          {auth?.user.me ? (
            <li>
              <Link href="/profile">
                <a>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={
                      auth.user.me.avatar
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatar/${auth.user.me.avatar}`
                        : "/user-placeholder.svg"
                    }
                    width={40}
                    height={40}
                    alt="avatar"
                  />
                </a>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/signin">
                <a>Sign in</a>
              </Link>
            </li>
          )}
        </Menu>
      </Nav>
      <Content>{children}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 7rem;

  #nav-mobile {
    color: var(--primary);
    display: none;
    position: relative;
    cursor: pointer;
  }

  h1 {
    margin: 0;
    letter-spacing: 2px;
    color: var(--primary);
  }

  @media (max-width: 1200px) {
    padding: 0 1rem;
  }

  @media (max-width: 600px) {
    #nav-mobile {
      display: flex;
    }
  }
`;

const Menu = styled.ul<{ isShow: boolean }>`
  display: flex;
  align-items: center;
  list-style: none;
  transition: all 0.75s;

  li:nth-child(1) {
    display: none;
  }

  li {
    margin-left: 2rem;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    padding: 5rem 0;
    align-items: center;
    position: fixed;
    flex-direction: column;
    transform: ${(props) =>
      props.isShow ? "translateX(0)" : "translateX(100%)"};

    li {
      &:nth-child(1) {
        display: block;
      }

      margin-bottom: 4rem;
      font-size: 1.2rem;
      color: #fff;
      cursor: pointer;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const TimesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Content = styled.div`
  padding: 2rem 0;

  @media (max-width: 1200px) {
    padding: 0rem 1rem;
    padding-bottom: 2rem;
  }
`;

export default Layout;
