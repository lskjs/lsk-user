import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  Card,
  CardBlock,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap';

import Component from 'lsk-general/General/Component';

import Loading from 'react-icons2/md/refresh';
import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';

@inject('user')
export default class PasswordChange extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      passwordStatus: null,
      passwordValue: '',
      passwordConfirmStatus: null,
      passwordConfirmValue: '',
    };
  }

  handleChangePasswordField(field) {
    return (e) => {
      this.setState({
        [`${field}Value`]: e.target.value,
        [`${field}Status`]: this.validatePasswordOnField(field, e.target.value),
      });
    };
  }

  @autobind
  async handleSubmit(e) {
    e.preventDefault();
    const { passwordValue, passwordStatus, passwordConfirmStatus } = this.state;
    if (passwordStatus === 'success' && passwordConfirmStatus === 'success') {
      const res = await this.props.user.editPassword(passwordValue);
      if (res.message === 'ok') {
        this.redirect('/cabinet');
      }
    }
  }

  @autobind
  validatePasswordOnField(field, value) {
    const { passwordValue } = this.state;
    if (field === 'passwordConfirm') {
      return isEqual(passwordValue, value) ? 'success' : 'error';
    }
    return value.length > 6 ? 'success' : 'error';
  }

  render() {
    const {
      passwordValue,
      passwordConfirmValue,
      passwordStatus,
      passwordConfirmStatus,
    } = this.state;
    const status = null;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Card style={{ margin: '10px 0' }}>
          <CardHeader>
            Изменить пароль
          </CardHeader>
          <CardBlock>
            <FormGroup controlId="passwordValue" validationState={passwordStatus}>
              <ControlLabel>Новый пароль</ControlLabel>
              <FormControl
                type="password"
                value={passwordValue}
                onChange={this.handleChangePasswordField('password')}
              />
              {passwordStatus === 'error' && (
              <HelpBlock>Пароль должен быть больше 6 символов</HelpBlock>
                )}
            </FormGroup>
            <FormGroup controlId="passwordConfirmValue" validationState={passwordConfirmStatus}>
              <ControlLabel>Подтверждение пароля</ControlLabel>
              <FormControl
                type="password"
                value={passwordConfirmValue}
                onChange={this.handleChangePasswordField('passwordConfirm')}
              />
              {passwordConfirmStatus === 'error' && (
              <HelpBlock>Пароль не совпадает с введённым ранее</HelpBlock>
                )}
            </FormGroup>
          </CardBlock>
          <CardFooter
            style={{textAlign:'center'}}
          >
            <Button
              type="submit"
              bsStyle="primary"
              disabled={!!status}
              style={{
                position: 'relative',
              }}
            >
              <span style={{ display: !status ? 'block' : 'none' }}>
                Изменить пароль
              </span>
              <If condition={status}>
                <div
                  className={cx({
                    'button-icon-status': true,
                    spin: status === 'wait',
                  })}
                >
                  <If condition={status === 'wait'}>
                    <Loading />
                  </If>
                  <If condition={status === 'ok'}>
                    <Check />
                  </If>
                  <If condition={status === 'error'}>
                    <Error />
                  </If>
                </div>
              </If>
            </Button>
          </CardFooter>
        </Card>
      </Form>
    );
  }
}
