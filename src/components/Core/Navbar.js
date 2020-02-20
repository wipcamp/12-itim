import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'reactstrap'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

import UserService from '../../services/UserService'

const cookies = new Cookies()

const Img = styled.img`
  width: 100%;
`

const WIPId = styled.div`
  font-size: 24px;
  @media (max-width:768px) {
    font-weight: 300;
    font-size: 18px;
    line-height: 17px;
  }
`

const Logout = styled(Button)`
  font-weight: 500;
  font-size: 18px;
  background: #D11242!important;
  width: 120px;
  height: 40px;
`

export default class Navbar extends Component {

  state = {
    wipId: ''
  }

  async componentDidMount() {
    const cookieToken = cookies.get('token');
    if (cookieToken !== null && cookieToken !== undefined) {
      let promise;
      try {
        promise = await this.getUserService();
        let response = promise.data;
        if (response.success) {
          this.setState({
            wipId: response.data[0].wipId
          });
        } else {
          console.log("Error get User request")
        }
      } catch (e) {
        console.log("Error get User promise")
      }
    }
  }

  getUserService = async () => {
    return await UserService.getMe();
  }

  handleClick = () => {
    cookies.remove('token', { path: '/' })
    cookies.remove('state', { path: '/' })
    cookies.remove('nonce', { path: '/' })
    cookies.remove('loginObj', { path: '/' })
    window.location.href = '/login'
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="pt-3 pb-3">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="row">
              <div className="col-md-3 col-sm-4 col-6">
                <Img src="/img/Logo.png" alt="WIP Camp" />
              </div>
              <div className="col-md-9 col-sm-8 col-6">
                <div className="" style={{ color: "white", textAlign: "right", fontSize: '24px' }}>
                  {
                    this.state.wipId !== null || this.state.wipId !== undefined || this.state.wipId !== '' ?
                      <WIPId>
                        WIP ID : {this.state.wipId}
                      </WIPId>
                      :
                      <div>Error</div>
                  }
                  <br />
                  <Logout onClick={() => this.handleClick()}>
                    Log Out
                  </Logout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
