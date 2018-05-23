import 'moment/locale/fr'

import MuiDatePicker from 'material-ui-pickers/DatePicker'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const StyledMuiDatePicker = styled(MuiDatePicker)`
  && {
    padding-right: 1rem;
  }
`

moment.locale('fr')

export default class DatePicker extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  state = {
    selectedDate: null,
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
    this.props.onSelectDate({ controlName: this.props.name, date })
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} locale="fr">
        <StyledMuiDatePicker
          autoOk
          label={this.props.label}
          format="DD/MM/YYYY"
          onChange={this.handleDateChange}
          value={this.state.selectedDate}
        />
      </MuiPickersUtilsProvider>
    )
  }
}
