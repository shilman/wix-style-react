import React from 'react';

import AllComponents from './all-components';

const {
  Popover,
  Dropdown,
  MultiSelect,
  AutoComplete,
  Input,
  InputArea,
  Label,
  RichTextArea,
  Notification,
  FloatingHelper,
} = AllComponents;

/*
 * This file exports object with config for components.
 * It is used for automated teskit smoke tests
 *
 * { [component.displayName]: ComponentDefinition }
 *
 * [component.displayName] = {
 *   // hook function to be called before tests begin
 *   beforeAllHook?: function;
 *
 *   // hook function to be called after tests end
 *   afterAllHook?: function;
 *
 *   // set required props, if any
 *   props?: object;
 * }
 */

export default {
  ColorPicker: {
    props: {
      value: '#000',
      onChange: () => {},
      onCancel: () => {},
      onConfirm: () => {},
    },
  },

  DropdownComposite: {
    props: {
      children: <Dropdown />,
    },
  },

  MultiSelectComposite: {
    props: {
      children: <MultiSelect />,
    },
  },

  AutoCompleteComposite: {
    props: {
      children: [<AutoComplete key={1} />],
    },
  },

  ButtonHeader: {
    // it's actually Card.ButtonHeader, should be deprecated
    props: {
      buttonTitle: 'Click me',
      subtitle: 'Header Subtitle',
      title: 'Header Title',
      buttonOnClick: () => {},
    },
  },

  Popover: {
    props: {
      children: [
        <Popover.Element>
          <div>I am the trigger!</div>
        </Popover.Element>,
        <Popover.Content>
          <div>I am the content!</div>
        </Popover.Content>,
      ],
    },
  },

  FloatingHelper: {
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
  },

  RichTextArea: {
    beforeAllHook: () => (window.getSelection = () => ({})),
  },

  RichTextAreaComposite: {
    props: {
      children: [<Label key="0">Label text</Label>, <RichTextArea key="1" />],
    },
  },

  Range: {
    props: {
      children: [<Input key="0" />, <Input key="1" />],
    },
  },

  ButtonLayout: {
    props: {
      children: <div>abc</div>,
    },
  },

  Tag: {
    props: {
      useOldMargins: false,
      id: 'hello',
      children: 'a',
    },
  },

  Badge: {
    props: {
      children: 'hello',
    },
  },

  Button: {
    props: {
      upgrade: true,
    },
  },

  ImageViewer: {
    props: {
      imageUrl: '',
    },
  },

  FormField: {
    props: {
      children: <div />,
    },
  },

  BadgeSelect: {
    props: {
      options: [{ id: '0', skin: 'general', text: 'general' }],
      selectedId: '0',
    },
  },

  CalendarPanel: {
    props: {
      onChange: () => {},
    },
  },

  Breadcrumbs: {
    props: {
      items: [{ id: 0, value: 'Option 1' }, { id: 1, value: 'Option 2' }],
    },
  },

  Calendar: {
    props: {
      onChange: () => {},
    },
  },

  DataTable: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },

  Slider: {
    props: {
      onChange: () => {},
    },
  },

  Selector: {
    props: {
      id: 1,
      title: 'title',
    },
  },

  StatsWidget: {
    props: {
      title: 'test title',
    },
  },

  Table: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },

  TextField: {
    props: {
      children: <Input />,
    },
  },

  TextArea: {
    props: {
      children: <InputArea />,
    },
  },

  Tabs: {
    props: {
      items: [],
    },
  },

  Modal: {
    props: {
      isOpen: false,
    },
  },

  Notification: {
    props: {
      children: [
        <Notification.TextLabel key="0">label</Notification.TextLabel>,
        <Notification.CloseButton key="1" />,
      ],
    },
  },

  DatePicker: {
    props: {
      onChange: () => {},
    },
  },

  ModalSelectorLayout: {
    props: {
      dataSource: () =>
        Promise.resolve({
          items: [],
          totalCount: 0,
        }),
    },
  },

  Proportion: { props: { children: 'test' } },
};
