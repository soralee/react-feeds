import React from 'react'
import { Feed } from 'semantic-ui-react'
import Styled from 'styled-components'
import moment from "moment"
import PropTypes from "prop-types"

const OwnerName = Styled.div`
  color: #00B68F;
  font-weight: bold;
  font-size: 16px;
`;

const Date = Styled.div`
  color: #999;
  font-size: 14px;
  margin-left: 10px;
`;

const Privacy = Styled.div`
  color: #606770;
  font-size: 12px;
`;

const Summary = ({ created_at, name, privacy }) => (
  <>
    <Feed.Summary
      date={created_at && <Date>{moment(created_at).fromNow()}</Date>}
      user={name && <OwnerName>{name}</OwnerName>}
      style={{ display: "flex" }}
    />
    {privacy && <Privacy>{privacy}</Privacy>}
  </>
)

Summary.propTypes = {
  created_at: PropTypes.number,
  name: PropTypes.string,
  privacy: PropTypes.string
};

Summary.defaultProps = {
  created_at: null,
  name: null,
  privacy: null
};

export default Summary;
