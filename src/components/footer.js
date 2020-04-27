import React from 'react';
import styled, { keyframes } from 'styled-components';
import media from '../utils/media';
import { Link } from 'gatsby';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 0;

  ${media.tablet`
    flex-direction: column;
    text-align: center;
  `}
`;

const ExternalLink = styled(Link).attrs(() => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))``;

const LinkContainer = styled.p`
  margin: 0.8rem 0;
  display: block;
  ${ExternalLink} {
    margin: 0 1rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
`;

function Footer() {
  return (
    <Container>
      &copy; 2020 DigiDark Development
      <div
        css={`
          text-align: right;
        `}
      >
        <p
          css={`
            margin-bottom: 0.6rem;
          `}
        >
        </p>
        <LinkContainer>
          <ExternalLink
            direction="ltr"
            as="a"
            rel="me"
            href="https://twitter.com/digidarkdev"
          >
            Twitter
          </ExternalLink>
          <ExternalLink
            rel="me"
            direction="ltr"
            as="a"
            href="https://github.com/v-morris"
          >
            Github
          </ExternalLink>
        </LinkContainer>
      </div>
    </Container>
  );
}

export default Footer;