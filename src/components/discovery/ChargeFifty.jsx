import React, { Component, PropTypes } from 'react';

import * as I18N from '../../utils/i18n';
import * as ContentAPI from '../../api/content';

require('./discovery.css');

export default class ChargeFifty extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasCharged: false
    };
  }
  componentWillMount () {
    ContentAPI.getCampaign(30010).then(function(data) {
      this.setState({
        hasCharged: data.applied || false
      });
    }.bind(this));
  }
  _goRecharge () {
    if (this.state.hasCharged) return;
    if(window.yyg && window.yyg.goRecharge) {
      window.yyg.goRecharge();
    } else {
      window.location.href = '/user/charge';
    }
  }

  render () {
    return (
      <div className="charge-fifty-wrapper">
        <img style={{width: '100%'}} src={require('../../img/discovery/chargefifty/banner-' + I18N.LOCALE.code + '.png')} />
        <div className="charge-btn">
          <img onTouchTap={this._goRecharge.bind(this)} src={require('../../img/discovery/chargefifty/' + (this.state.hasCharged ? 'btn_disabled-' : 'btn_active-') + I18N.LOCALE.code + '.png')}/>
        </div>
        <div className="table-title">
          <span>{I18N.t('charge_fifty_table_title')}</span>
        </div>
        <table className="coupon-desc">
          <thead>
            <tr>
              <td width="45%">{I18N.t('charge_fifty_table_header_1')}</td>
              <td>{I18N.t('charge_fifty_table_header_2')}</td>
              <td width="14%">{I18N.t('charge_fifty_table_header_3')}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{I18N.t('charge_fifty_row_1_time')}</td>
              <td>{I18N.t('charge_fifty_row_1_desc')}</td>
              <td className="amount">50</td>
            </tr>
            <tr>
              <td>{I18N.t('charge_fifty_row_2_time')}</td>
              <td>{I18N.t('charge_fifty_row_2_desc')}</td>
              <td className="amount">3</td>
            </tr>
            <tr>
              <td>{I18N.t('charge_fifty_row_3_time')}</td>
              <td>{I18N.t('charge_fifty_row_3_desc')}</td>
              <td className="amount">5</td>
            </tr>
            <tr>
              <td>{I18N.t('charge_fifty_row_4_time')}</td>
              <td>{I18N.t('charge_fifty_row_4_desc')}</td>
              <td className="amount">8</td>
            </tr>
            <tr>
              <td>{I18N.t('charge_fifty_row_5_time')}</td>
              <td>{I18N.t('charge_fifty_row_5_desc')}</td>
              <td className="amount">10</td>
            </tr>
            <tr>
              <td>{I18N.t('charge_fifty_row_6_time')}</td>
              <td>{I18N.t('charge_fifty_row_6_desc')}</td>
              <td className="amount">12</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>{I18N.t('charge_fifty_total')}</td>
              <td> </td>
              <td>88</td>
            </tr>
          </tfoot>
        </table>
        <div className="campaign-rules">
          <div className="rule-details">
            <h3 className="red rule-details-title">{I18N.t('charge_fifty_rules_title')}</h3>
            <p dangerouslySetInnerHTML={{__html: I18N.t('charge_fifty_rules_1')}}/>
            <p dangerouslySetInnerHTML={{__html: I18N.t('charge_fifty_rules_2')}}/>
            <p>{I18N.t('charge_fifty_rules_3')}</p>
            <p>{I18N.t('charge_fifty_rules_4')}</p>
            <p>{I18N.t('charge_fifty_rules_5')}</p>
            <p dangerouslySetInnerHTML={{__html: I18N.t('charge_fifty_rules_6')}}/>
            <p>{I18N.t('charge_fifty_rules_7')}</p>
            <p dangerouslySetInnerHTML={{__html: I18N.t('charge_fifty_rules_8')}}/>
          </div>
        </div>
      </div>
    );
  }
}
