import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const StyledMaternalAssistantCheck = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding-top: 1rem;
  width: 20rem;
`

export class MaternalAssistantCheck extends Component {
  static propTypes = { onValidate: PropTypes.func.isRequired }

  constructor(props) {
    super(props)

    this.state = { showUnavailableMessage: false }
  }

  onInvalid = () => this.setState({ showUnavailableMessage: true })

  render() {
    return (
      <StyledMaternalAssistantCheck>
        <Typography variant="title">
          Êtes-vous assistante maternelle ?
        </Typography>
        <ButtonsContainer>
          <Button variant="raised" onClick={this.props.onValidate}>
            Oui
          </Button>
          <Button variant="raised" onClick={this.onInvalid}>
            Non
          </Button>
        </ButtonsContainer>
        {this.state.showUnavailableMessage && (
          <Typography variant="body2">
            Ce service n'est pas encore disponible pour vous
          </Typography>
        )}
      </StyledMaternalAssistantCheck>
    )
  }
}

export default MaternalAssistantCheck