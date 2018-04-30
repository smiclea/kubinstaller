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

import React from 'react'
import styled from 'styled-components'
import LinearProgress from 'material-ui/LinearProgress'
import { observer } from 'mobx-react'

import MainTemplate from './MainTemplate'
import Console from '../organisms/Console'
import ConsoleStore from '../../stores/ConsoleStore'

const ProgressBarHeight = 3
const Wrapper = styled.div`
  width: 100%;
`
const LinearProgressStyled = styled(LinearProgress)`
  z-index: 1;
  position: fixed !important;
`

type Props = {}
type State = {
  progress: number,
}
@observer
class ConsolePage extends React.Component<Props, State> {
  state = {
    progress: 50,
  }

  componentDidMount() {
    ConsoleStore.loadLines().then(() => {
      this.scrollToBottom()
    })
  }

  bodyRef: ?HTMLElement

  scrollToBottom() {
    if (!this.bodyRef) {
      return
    }

    this.bodyRef.scrollTop = this.bodyRef.scrollHeight
  }

  render() {
    return (
      <MainTemplate
        progressBarHeight={ProgressBarHeight}
        footerState="cancel"
        bodyRef={ref => { this.bodyRef = ref }}
        body={(
          <Wrapper>
            <LinearProgressStyled
              style={{ height: ProgressBarHeight, position: 'fixed' }}
              mode="determinate"
              value={this.state.progress}
            />
            <Console lines={ConsoleStore.lines} />
          </Wrapper>
        )}
      />
    )
  }
}

export default ConsolePage
