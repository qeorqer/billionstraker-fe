import React from 'react'
import UserInfo from "../../components/profile/UserInfo";
import { Container, Row } from 'react-bootstrap';
import './profile.scss'
import Transactions from "../../components/profile/Transactions";

const Profile = () => (
  <>
    <Container className='py-4'>
      <UserInfo/>
      <Transactions/>
    </Container>
  </>
)


export default Profile