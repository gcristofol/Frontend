import * as React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import {
  useClipboard,
  Flex,
  Input,
  Button,
  Text
} from '@chakra-ui/core';
import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import useProfileUrl from '../../hooks/useInviteUrl';
import QRCOde from '../../components/QRCode';
import PageHeader from '../../components/PageHeader';
import IconList from './IconList';

interface ShareViewQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}
const query = graphql`
  query ShareView {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const ShareView = () => {
  const intl = useIntl();
  const {
    site: {
      siteMetadata: { title: siteTitle }
    }
  } = useStaticQuery<ShareViewQuery>(query);
  const { absoluteUrl: url } = useProfileUrl();
  const [message, setMessage] = useState();
  const { onCopy, hasCopied } = useClipboard(message);

  useEffect(() => {
    if (url) {
      setMessage(
        intl.formatMessage({ id: 'Icon.title' }, { siteTitle }) + url
      );
    }
  }, [url]);

  return (
    url && (
      <>
        <PageHeader
          heading={intl.formatMessage({ id: 'ShareView.heading' })}
          lead={intl.formatMessage({ id: 'ShareView.lead' })}
        />
        <IconList siteTitle={siteTitle} />
        <Flex mb={2}>
          <Input
            type="text"
            value={message}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setMessage(e.currentTarget.value)}
          />
          <Button onClick={onCopy} ml={2}>
            {hasCopied
              ? intl.formatMessage({ id: 'ShareView.copied' })
              : intl.formatMessage({ id: 'ShareView.copy' })}
          </Button>
        </Flex>

        <Text mt={10}>
          {intl.formatMessage({ id: 'ShareView.scan' })}
        </Text>

        <QRCOde />
      </>
    )
  );
};

export default ShareView;
