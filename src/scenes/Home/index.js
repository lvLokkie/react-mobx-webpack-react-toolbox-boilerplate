import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'react-toolbox';

@inject('appStore')
@observer
export default class HallEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.appStore;
  }

  render() {
    return (
      <div>
        <Button
          label="Push"
          onClick={() => this.store.toggleMark()}
          accent
        />
        { this.store.mark.toString()}
      </div>
    );
  }
}

