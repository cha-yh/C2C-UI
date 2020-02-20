import React, { useState } from 'react';
import Modal from './Modal';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'components|Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false
    }
  },
  decorators: [withKnobs]
};

export const modal = () => {
  const title = text('title', 'Title of Modal');
  const description = text('description', 'Description of Modal');
  // const visible = boolean('visible', true);
  const confirmText = text('confirmText', 'ConfirmText');
  const cancelText = text('cancelText', 'CancelText');
  const cancellable = boolean('cancellable', true);

  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  }
  return (
    <div>
      <button onClick={()=>{setVisible(true)}}>open modal</button>
      <div style={{width: '100%', height: '2000px', background:'green'}}></div>
      <Modal
        title={title}
        description={description}
        visible={visible}
        confirmText={confirmText}
        cancelText={cancelText}
        cancellable={cancellable}
        onCancel={handleCancel}
      />
    </div>
  );
};

modal.story = {
  name: 'Default'
};

export const cancellable = () => {
  return (
    <Modal
      title="Title of Modal"
      description="Description of Modal"
      visible={true}
      cancellable
    />
  );
};

export const customContent = () => {
  return (
    <Modal visible={true} hideButtons>
      Custom Content
    </Modal>
  );
};