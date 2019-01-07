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

// these are just for object shortcuts
const manualExport = true;
const unidriver = true;
const noTestkit = true;
const skipTestkitSanity = true;

/*
 * This file exports object with component definitions.
 *
 * { [component.displayName]: ComponentDefinition }
 *
 * Ideally there should be no additional config, but:
 * * some components have required props,
 * * some are proxies to other libs,
 * * some have non-deterministic export paths
 * * some have only unidriver
 * * some have only enzyme testkit
 * * etc
 *
 * The goal is to reduce the list of snowflake components and eventually get rid of this
 * config
 *
 * [component.displayName] = {
 *   // what kind of drivers should be tested
 *   drivers?: ['vanilla', 'enzyme']
 *
 *   // set to true if testkit already has export in `test/generate-testkit-exports/enzyme.template
 *   // this is used for proxied components from other libraries (like wix-ui-backoffice)
 *   manualExport?: false;
 *
 *   // skip sanity tests for this component entirely.
 *   skipTestkitSanity?: false;
 *
 *   // Indicate that component does not have testkit at all.
 *   // It is sometimes ok not to have one.
 *   noTestkit?: false;
 *
 *   // Mark if component uses unidriver.
 *   // It is required for unidriver, because it is tested differently
 *   unidriver?: false;
 *
 *   // set path to enzyme testkit if path is not following convention
 *   // this file will imported and wrapped with either
 *   // enzymeTestkitFactoryCreator() or enzymeUniTestkitFactoryCreator()
 *   enzymeTestkitPath?: function;
 *
 *   // set required props, if any
 *   props?: object;
 * }
 */

export default {
  SideMenuDrill: {
    skipTestkitSanity,
    enzymeTestkitPath: '../src/SideMenu/DrillView/DrillView.driver',
  },

  BadgeSelectItemBuilder: { skipTestkitSanity, noTestkit },

  BackofficeTooltip: {
    // TODO: is this component in use at all?
    skipTestkitSanity,
    enzymeTestkitPath: '../src/Backoffice/Tooltip/Tooltip.driver',
  },

  ColorPicker: {
    skipTestkitSanity, // missing export in testkit/index.js, so skipping for now
    props: {
      value: '#000',
      onChange: () => {},
      onCancel: () => {},
      onConfirm: () => {},
    },
  },

  ButtonWithOptions: {
    skipTestkitSanity, // testkit does not have root `exists` method
  },

  DropdownComposite: {
    props: {
      children: <Dropdown />,
    },
  },

  IconWithOptions: {
    skipTestkitSanity, // testkit does not have root `exists` method
  },

  MultiSelect: {
    skipTestkitSanity, // testkit does not have root `exists` method
  },

  MultiSelectComposite: {
    props: {
      children: <MultiSelect />,
    },
  },

  MultiSelectCheckbox: {
    skipTestkitSanity, // testkit does not have root `exists` method
  },

  AutoCompleteComposite: {
    props: {
      children: [<AutoComplete key={1} />],
    },
  },

  DragAndDrop: { skipTestkitSanity, noTestkit },

  DragDropContextProvider: { skipTestkitSanity, noTestkit },

  EndorseContentLayout: { skipTestkitSanity },

  GoogleAddressInput: { skipTestkitSanity },

  GoogleAddressInputWithLabel: { skipTestkitSanity },

  Grid: { skipTestkitSanity, noTestkit },

  HBox: { skipTestkitSanity, noTestkit },

  Layout: { skipTestkitSanity, noTestkit },

  MessageBox: { skipTestkitSanity, noTestkit },

  ButtonHeader: {
    // it's actually Card.ButtonHeader, should be deprecated
    enzymeTestkitPath: '../src/Card/ButtonHeader/ButtonHeader.driver',
    skipTestkitSanity,
    props: {
      buttonTitle: 'Click me',
      subtitle: 'Header Subtitle',
      title: 'Header Title',
      buttonOnClick: () => {},
    },
  },

  LinkHeader: {
    enzymeTestkitPath: '../src/Card/LinkHeader/LinkHeader.driver',
    skipTestkitSanity,
  },

  CollapsedHeader: {
    skipTestkitSanity,
    enzymeTestkitPath: '../src/Card/CollapsedHeader/CollapsedHeader.driver',
  },

  Header: {
    enzymeTestkitPath: '../src/Card/Header/Header.driver',
    // TODO: this is actually  Card.Header, but is exported just as header
    skipTestkitSanity,
  },

  Page: { skipTestkitSanity },

  PageHeader: { skipTestkitSanity },

  PopoverMenuItem: { skipTestkitSanity, noTestkit },

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

  TableToolbar: { skipTestkitSanity, noTestkit },

  Tooltip: { skipTestkitSanity },

  VBox: { skipTestkitSanity, noTestkit },

  Collapse: { skipTestkitSanity, noTestkit },

  Card: { skipTestkitSanity, noTestkit },

  LinearProgressBar: {
    manualExport,
  },

  CircularProgressBar: {
    manualExport,
  },

  Composite: { skipTestkitSanity, noTestkit },

  FloatingHelper: {
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
    manualExport,
  },

  FullTextView: { skipTestkitSanity, noTestkit },

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

  Avatar: { unidriver },

  ButtonLayout: {
    skipTestkitSanity, // TODO: i don't knowm, it fails, need to check why. Currently it doesn't have test anyway. Leaving for later
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

  TextButton: {
    unidriver,
  },

  IconButton: {
    unidriver,
    skipTestkitSanity,
  },

  CloseButton: {
    unidriver,
  },

  CardGalleryItem: {
    unidriver,
  },

  Label: { manualExport },

  SideMenu: {
    enzymeTestkitPath: '../src/SideMenu/core/SideMenu.driver',
  },

  ToggleSwitch: { manualExport },

  CounterBadge: {
    manualExport,
  },

  Badge: {
    manualExport,
    props: {
      children: 'hello',
    },
  },

  Button: {
    manualExport, // TODO: should be automated but can't because of the `upgrade` prop. Once it's gone, it can be automated again
    unidriver,
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

  ContactItemBuilder: { skipTestkitSanity },

  Draggable: {
    enzymeTestkitPath: '../src/DragAndDrop/Draggable/Draggable.driver',
    skipTestkitSanity,
  },

  EditableRow: {
    enzymeTestkitPath: '../src/EditableSelector/EditableRow/EditableRow.driver',
    skipTestkitSanity,
  },

  FieldLabelAttributes: {
    enzymeTestkitPath:
      '../src/FieldLabelAttributes/FieldLabelAttributes.driver',
    skipTestkitSanity,
  },

  FieldWithSelectionComposite: {
    enzymeTestkitPath:
      '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver',
    skipTestkitSanity,
  },

  Carousel: {
    drivers: ['enzyme'],
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
    skipTestkitSanity, // testkit does not have root `exists` method
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

  Proportion: { props: { children: 'test' }, unidriver, drivers: ['enzyme'] },

  GeneratedTestComponent: { unidriver, drivers: ['enzyme'] },

  DropdownPopover: { unidriver },

  TpaLabel: {
    enzymeTestkitPath: '../src/TPA/Label/Label.driver',
    skipTestkitSanity,
  },

  TpaTextLink: {
    enzymeTestkitPath: '../src/TPA/TextLink/TextLink.driver',
    skipTestkitSanity,
  },

  TpaButton: {
    skipTestkitSanity,
    enzymeTestkitPath: '../src/TPA/Button/Button.driver',
  },

  TpaFloatingTabs: {
    enzymeTestkitPath: '../src/TPA/FloatingTabs/FloatingTabs.driver',
    skipTestkitSanity,
  },

  RadioButton: {
    enzymeTestkitPath: '../src/RadioGroup/RadioButton/RadioButton.driver',
    skipTestkitSanity,
  },

  TpaInput: {
    enzymeTestkitPath: '../src/TPA/Input/Input.driver',
    skipTestkitSanity,
  },

  MessageBoxMarketerialLayout: {
    enzymeTestkitPath: '../src/MessageBox/MessageBoxMarketerialLayout.driver',
    skipTestkitSanity,
  },

  MessageBoxFunctionalLayout: {
    enzymeTestkitPath: '../src/MessageBox/MessageBoxFunctionalLayout.driver',
    skipTestkitSanity,
  },

  TextLinkLayout: {
    enzymeTestkitPath:
      '../src/BaseComponents/TextLinkLayout/TextLinkLayout.driver',
    skipTestkitSanity,
  },
};
