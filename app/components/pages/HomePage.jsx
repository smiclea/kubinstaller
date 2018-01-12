import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import connectToStores from '../../utils/connectToStores'

import OptionsStore from '../../stores/OptionsStore'
import OptionsActions from '../../actions/OptionsActions'
import NodesStore from '../../stores/NodesStore'
import NodesActions from '../../actions/NodesActions'
import Header from '../atoms/Header'
import OptionsPanel from '../organisms/OptionsPanel'
import NodesPanel from '../organisms/NodesPanel'

const Wrapper = styled.div``
const Panels = styled.div`
  display: flex;
  margin-left: -24px;
  & > div {
    margin-left: 24px;
  }
`

class HomePage extends React.Component {
  static propTypes = {
    networkDrivers: PropTypes.array,
    selectedNetworkDriver: PropTypes.string,
    clusterNetworkStartIp: PropTypes.string,
    clusterNetworkEndIp: PropTypes.string,
    serviceNetworkStartIp: PropTypes.string,
    serviceNetworkEndIp: PropTypes.string,
    ingressToggled: PropTypes.bool,
    helmToggled: PropTypes.bool,
    registryToggled: PropTypes.bool,
    nodes: PropTypes.array,
    selectedNodes: PropTypes.array,
  }

  static getStores() {
    return [OptionsStore, NodesStore]
  }

  static getPropsFromStores() {
    let optionsStore = OptionsStore.getState()
    let nodesStore = NodesStore.getState()
    return {
      networkDrivers: optionsStore.networkDrivers,
      selectedNetworkDriver: optionsStore.selectedNetworkDriver,
      clusterNetworkStartIp: optionsStore.clusterNetworkStartIp,
      clusterNetworkEndIp: optionsStore.clusterNetworkEndIp,
      serviceNetworkStartIp: optionsStore.serviceNetworkStartIp,
      serviceNetworkEndIp: optionsStore.serviceNetworkEndIp,
      ingressToggled: optionsStore.ingressToggled,
      helmToggled: optionsStore.helmToggled,
      registryToggled: optionsStore.registryToggled,
      nodes: nodesStore.nodes,
      selectedNodes: nodesStore.selectedNodes,
    }
  }

  handleNetworkDriverChange(name) {
    OptionsActions.updateSelectedNetworkDriver(name)
  }

  handleClusterNetworkStartIpChange(ip) {
    OptionsActions.updateClusterNetworkStartIp(ip)
  }

  handleClusterNetworkEndIpChange(ip) {
    OptionsActions.updateClusterNetworkEndIp(ip)
  }

  handleServiceNetworkStartIpChange(ip) {
    OptionsActions.updateServiceNetworkStartIp(ip)
  }

  handleServiceNetworkEndIpChange(ip) {
    OptionsActions.updateServiceNetworkEndIp(ip)
  }

  handleIngressToggle(toggled) {
    OptionsActions.updateIngressToggle(toggled)
  }

  handleHelmToggle(toggled) {
    OptionsActions.updateHelmToggle(toggled)
  }

  handleRegistryToggle(toggled) {
    OptionsActions.updateRegistryToggle(toggled)
  }

  handleNodeSelection(selection) {
    NodesActions.updateSelection(selection)
  }

  handleNodeApiToggle(node, toggled) {
    NodesActions.nodeApiToggle(node, toggled)
  }

  handleNodeEnabledToggle(node, toggled) {
    NodesActions.nodeEnabledToggle(node, toggled)
  }

  handleNewNodeClick() {
    NodesActions.newNode()
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <Panels>
          <OptionsPanel
            networkDrivers={this.props.networkDrivers}
            selectedNetworkDriver={this.props.selectedNetworkDriver}
            onNetworkDriverChange={v => { this.handleNetworkDriverChange(v) }}
            clusterNetworkStartIp={this.props.clusterNetworkStartIp}
            clusterNetworkEndIp={this.props.clusterNetworkEndIp}
            onClusterNetworkStartIpChange={v => { this.handleClusterNetworkStartIpChange(v) }}
            onClusterNetworkEndIpChange={v => { this.handleClusterNetworkEndIpChange(v) }}
            serviceNetworkStartIp={this.props.serviceNetworkStartIp}
            serviceNetworkEndIp={this.props.serviceNetworkEndIp}
            onServiceNetworkStartIpChange={v => { this.handleServiceNetworkStartIpChange(v) }}
            onServiceNetworkEndIpChange={v => { this.handleServiceNetworkEndIpChange(v) }}
            ingressToggled={this.props.ingressToggled}
            onIngressToggle={v => { this.handleIngressToggle(v) }}
            helmToggled={this.props.helmToggled}
            onHelmToggle={v => { this.handleHelmToggle(v) }}
            registryToggled={this.props.registryToggled}
            onRegistryToggle={v => { this.handleRegistryToggle(v) }}
          />
          <NodesPanel
            nodes={this.props.nodes}
            selectedNodes={this.props.selectedNodes}
            onNodeSelection={selection => { this.handleNodeSelection(selection) }}
            onNodeApiToggle={(node, toggled) => { this.handleNodeApiToggle(node, toggled) }}
            onNodeEnabledToggle={(node, toggled) => { this.handleNodeEnabledToggle(node, toggled) }}
            onNewNodeClick={() => { this.handleNewNodeClick() }}
          />
        </Panels>
      </Wrapper>
    )
  }
}

export default connectToStores(HomePage)
