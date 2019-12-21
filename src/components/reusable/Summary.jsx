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

const Summary = ({ created_at, name }) => (
  <Feed.Summary
    date={<Date>{moment(created_at).fromNow()}</Date>}
    user={<OwnerName>{name}</OwnerName>}
    style={{ display: "flex" }}
  />
)

export default Summary;
