import React from 'react'
import { Feed } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from "moment"

const OwnerName = styled.div`
  color: #00B68F;
  font-weight: bold;
  font-size: 16px;
`;

const Date = styled.div`
  color: #999;
  font-size: 14px;
  margin-left: 10px;
`;

const Privacy = styled.div`
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

export default Summary;
