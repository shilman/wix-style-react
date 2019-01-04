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
const skipSanityTest = true;
const manualExport = true;
const unidriver = true;
const noTestkit = true;

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
 *   // skip sanity tests for this component entirely.
 *   skipSanityTest?: false;
 *
 *   // Indicate that component does not have testkit at all. It is sometimes ok not to have one.
 *   noTestkit?: false;
 *
 *   // Mark if component uses unidriver. testkit methods are always async, sanity test is different, hence the mark.
 *   unidriver?: false;
 *
 *   // set enzyme testkit factory directly.
 *   // given function will be passed to enzymeTetkitFactoryCreator
 *   enzymeTestkitPath?: function;
 *
 *   // optional object with required props
 *   props?: object;
 * }
 *
 */

export default {
  SideMenuDrill: {
    skipSanityTest,
    enzymeTestkitPath: '../src/SideMenu/DrillView/DrillView.driver',
  },

  BadgeSelectItemBuilder: { skipSanityTest, noTestkit },

  BackofficeTooltip: {
    // TODO: is this component in use at all?
    skipSanityTest,
    enzymeTestkitPath: '../src/Backoffice/Tooltip/Tooltip.driver',
  },

  ColorPicker: {
    skipSanityTest,
    enzymeTestkitPath: '../src/ColorPicker/color-picker.driver',
  },

  ButtonWithOptions: {
    skipSanityTest, // testkit does not have root `exists` method
  },

  DropdownComposite: {
    props: {
      children: <Dropdown />,
    },
  },

  IconWithOptions: {
    skipSanityTest, // testkit does not have root `exists` method
  },

  MultiSelect: {
    skipSanityTest, // testkit does not have root `exists` method
  },

  MultiSelectComposite: {
    props: {
      children: <MultiSelect />,
    },
  },

  MultiSelectCheckbox: {
    skipSanityTest, // testkit does not have root `exists` method
  },

  AutoCompleteComposite: {
    props: {
      children: [<AutoComplete key={1} />],
    },
  },

  DragAndDrop: { skipSanityTest, noTestkit },

  DragDropContextProvider: { skipSanityTest, noTestkit },

  EndorseContentLayout: { skipSanityTest },

  GoogleAddressInput: { skipSanityTest },

  GoogleAddressInputWithLabel: { skipSanityTest },

  Grid: { skipSanityTest, noTestkit },

  HBox: { skipSanityTest, noTestkit },

  Layout: { skipSanityTest, noTestkit },

  MessageBox: { skipSanityTest, noTestkit },

  ButtonHeader: {
    // it's actually Card.ButtonHeader, should be deprecated
    enzymeTestkitPath: '../src/Card/ButtonHeader/ButtonHeader.driver',
    skipSanityTest,
    props: {
      buttonTitle: 'Click me',
      subtitle: 'Header Subtitle',
      title: 'Header Title',
      buttonOnClick: () => {},
    },
  },

  LinkHeader: {
    enzymeTestkitPath: '../src/Card/LinkHeader/LinkHeader.driver',
    skipSanityTest,
  },

  CollapsedHeader: {
    skipSanityTest,
    enzymeTestkitPath: '../src/Card/CollapsedHeader/CollapsedHeader.driver',
  },

  Header: {
    enzymeTestkitPath: '../src/Card/Header/Header.driver',
    // TODO: this is actually  Card.Header, but is exported just as header
    skipSanityTest,
  },

  Page: { skipSanityTest },

  PageHeader: { skipSanityTest },

  PopoverMenuItem: { skipSanityTest, noTestkit },

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

  TableToolbar: { skipSanityTest, noTestkit },

  Tooltip: { skipSanityTest },

  VBox: { skipSanityTest, noTestkit },

  Collapse: { skipSanityTest, noTestkit },

  Card: { skipSanityTest, noTestkit },

  LinearProgressBar: {
    skipSanityTest,
    manualExport,
  },

  CircularProgressBar: {
    skipSanityTest,
    manualExport,
  },

  Composite: { skipSanityTest, noTestkit },

  FloatingHelper: {
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
    manualExport,
    },

  FullTextView: { skipSanityTest, noTestkit },

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

  Avatar: { unidriver, skipSanityTest },

  ButtonLayout: {
    skipSanityTest, // TODO: i don't knowm, it fails, need to check why. Currently it doesn't have test anyway. Leaving for later
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
    skipSanityTest, // different usage
  },

  IconButton: {
    unidriver,
    skipSanityTest,
  },

  CloseButton: {
    unidriver,
    skipSanityTest,
  },

  CardGalleryItem: {
    unidriver,
    skipSanityTest,
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
    enzymeTestkitPath: '../src/Backoffice/Button/Button.driver',
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
      isOpen: false
    },
  },

  ContactItemBuilder: { skipSanityTest },

  Draggable: {
    enzymeTestkitPath: '../src/DragAndDrop/Draggable/Draggable.driver',
    skipSanityTest,
  },

  EditableRow: {
    enzymeTestkitPath: '../src/EditableSelector/EditableRow/EditableRow.driver',
    skipSanityTest,
  },

  FieldLabelAttributes: {
    enzymeTestkitPath:
      '../src/FieldLabelAttributes/FieldLabelAttributes.driver',
    skipSanityTest,
  },

  FieldWithSelectionComposite: {
    enzymeTestkitPath:
      '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver',
    skipSanityTest,
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
    skipSanityTest, // testkit does not have root `exists` method
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

  Proportion: { skipSanityTest, unidriver, drivers: ['enzyme'] },

  GeneratedTestComponent: { skipSanityTest, unidriver, drivers: ['enzyme'] },
  DropdownPopover: { skipSanityTest, unidriver },

  TpaLink: {
    enzymeTestkitFactory: require('../src/TPA/Label/Label.driver').default,
    skipSanityTest,
  },
  TpaButton: {
    skipSanityTest,
    enzymeTestkitPath: '../src/TPA/Button/Button.driver',
  },

  TpaFloatingTabs: {
    enzymeTestkitPath: '../src/TPA/FloatingTabs/FloatingTabs.driver',
    skipSanityTest,
  },

  TpaTextLink: {
    enzymeTestkitPath: '../src/TPA/TextLink/TextLink.driver',
    skipSanityTest,
  },

  RadioButton: {
    enzymeTestkitPath: '../src/RadioGroup/RadioButton/RadioButton.driver',
    skipSanityTest,
  },

  TpaInput: {
    enzymeTestkitPath: '../src/TPA/Input/Input.driver',
    skipSanityTest,
  },

  MessageBoxMarketerialLayout: {
    enzymeTestkitPath: '../src/MessageBox/MessageBoxMarketerialLayout.driver',
    skipSanityTest,
  },

  MessageBoxFunctionalLayout: {
    enzymeTestkitPath: '../src/MessageBox/MessageBoxFunctionalLayout.driver',
    skipSanityTest,
  },

  TextLinkLayout: {
    enzymeTestkitPath:
      '../src/BaseComponents/TextLinkLayout/TextLinkLayout.driver',
    skipSanityTest,
  },
};
