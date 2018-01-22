/*
Copyright 2018 Cloudbase Solutions Srl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// @flow

import * as React from 'react'
import styled from 'styled-components'

import StyleHelper from '../../utils/StyleHelper'
import logoImage from '../../resources/images/splash-logo.svg'
import appPackage from '../../../package.json'
import ExternalLink from '../atoms/ExternalLink'

const Wrapper = styled.div`
  width: 377px;
  height: 396px;
  background: #FAFAFA;
  border-radius: 2px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`
const Logo = styled.div`
  width: 140px;
  height: 140px;
  background: url('${logoImage}') center no-repeat;
  margin-top: -60px;
`
const Body = styled.div``
const Name = styled.div`
  font-size: 42px;
  display: flex;
  margin: 32px 0 48px 0;
`
const NameLight = styled.div`
  ${StyleHelper.fontWeights.light};
`
const NameBold = styled.div`
  ${StyleHelper.fontWeights.medium};
`
const Content = styled.div`
  color: #90919B;
  text-align: center;

  & > div {
    margin-bottom: 8px;

    &:first-child {
      margin-bottom: 24px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`

class Slash extends React.Component<any> {
  render() {
    return (
      <Wrapper>
        <Logo />
        <Body>
          <Name>
            <NameLight>kub</NameLight>
            <NameBold>installer</NameBold>
          </Name>
          <Content>
            <div>
              Version {appPackage.version}&nbsp;
              <ExternalLink href={`${appPackage.homepage}/blob/master/CHANGELOG.md`}>(release notes)</ExternalLink>
            </div>
            <div>© 2018 Cloudbase Solutions SRL</div>
            <div>
              <ExternalLink href={`${appPackage.homepage}/blob/master/LICENSE`}>Terms and Conditions</ExternalLink>
            </div>
            <div>
              <ExternalLink href={`${appPackage.homepage}/blob/master/LICENSE`}>License and Open Source Notices</ExternalLink>
            </div>
          </Content>
        </Body>
      </Wrapper>
    )
  }
}

export default Slash