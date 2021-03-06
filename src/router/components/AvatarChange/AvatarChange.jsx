import React from 'react';
import PropTypes from 'prop-types';
import Component from '@lskjs/general/Component';
import Avatar from '@lskjs/general/Avatar';
import autobind from 'core-decorators/lib/autobind';
import Dropzone from 'react-dropzone';
import { inject, observer } from 'mobx-react';
import css from 'importcss';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import {
  Card,
  CardBlock,
  CardHeader,
  CardFooter,
} from 'react-bootstrap-card';

@inject(s => ({
  user: s.user,
  upload: s.uapp.modules.upload,
}))
@observer
@css(require('./AvatarChange.css'))
export default class AvatarChange extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    files: null,
  }

  @autobind
  onDrop(files) {
    this.setState({ files });
  }

  @autobind
  async acceptSelect() {
    const { files } = this.state;
    const { upload, user } = this.props;
    if (!upload) return false;
    const avatar = await upload.uploadFile(files[0]);
    await user.editUser({
      profile: {
        avatar: avatar.path,
      },
    });
    this.setState({ files: null });
  }
  @autobind
  cancelSelect() {
    this.setState({ files: null });
  }

  render() {
    const { files } = this.state;
    const { user, upload } = this.props;
    return (
      <Card style={{ margin: '10px 0' }}>
        <CardHeader>
          Аватар
        </CardHeader>
        <CardBlock>
          {/* <CardTitle>Изменить аватар</CardTitle> */}
          <Row>
            <Col xs={upload ? 6 : 12} sm={upload ? 6 : 12} styleName="inner center">
              <b>Твой аватар</b>
              <Avatar
                size={200}
                src={user.avatar}
                title={user.fullName}
              />
            </Col>
            <If condition={upload}>
              <Col xs={6} sm={6} styleName="inner center">
                <b>Новый аватар</b>
                <If condition={files && files.length}>
                  {files.map((file, index) => (
                    <Avatar
                      size={200}
                      key={index}
                      src={file.preview}
                      title={user.fullName}
                    />
                  ))}
                </If>
                <If condition={!(files && files.length)}>
                  <Dropzone
                    multiple={false}
                    styleName="zone"
                    ref={(e) => { this.dropzone = e; }}
                    onDrop={this.onDrop}
                  >
                    <div>
                      <b>Изменить аватар</b>
                      <p>Переместите сюда изображение или нажмите на кнопку</p>
                      <button>
                        Загрузить изображение
                      </button>
                    </div>
                  </Dropzone>
                </If>
              </Col>
            </If>
          </Row>
        </CardBlock>
        <If condition={files && files.length}>
          <CardFooter>
            <Row>
              <Col xs={6} sm={6} styleName="inner center">
                <Button bsStyle="primary" onClick={this.acceptSelect}>Заменить</Button>
              </Col>
              <Col xs={6} sm={6} styleName="inner center">
                <Button onClick={this.cancelSelect}>Отменить</Button>
              </Col>
            </Row>
          </CardFooter>
        </If>
      </Card>
    );
  }
}
