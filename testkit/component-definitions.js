import React from 'react';

import {
  badgeTestkitFactory,
  stylableCounterBadgeTestkitFactory as counterBadgeTestkitFactory,
  toggleSwitchTestkitFactory,
  labelTestkitFactory,
  floatingHelperTestkitFactory,
  linearProgressBarTestkitFactory,
  circularProgressBarTestkitFactory,
} from 'wix-ui-backoffice/dist/src/testkit/enzyme';

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
 * until some typing solution is implemented in wix-style-react, i'll just write the type
 * by hand for now:
 *
 * [component.displayName] = {
 *   // what kind of drivers should be tested
 *   drivers?: ['vanilla', 'enzyme']
 *
 *   // skip automatic export AND tests for this component entirely
 *   skipSanityTest?: false;
 *
 *   // do not export testkit automatically. Some components simply lack testkits.
 *   noTestkit?: false;
 *
 *   unidriver?: false;
 *
 *   // set enzyme testkit factory directly.
 *   // given function will be passed to enzymeTetkitFactoryCreator
 *   enzymeTestkitFactory?: function;
 *
 *   // set enzyme testkit factory directly.
 *   // this is for cases when enzymeTestkitFactoryCreator has already been invoked
 *   // (mostly for proxied components)
 *   enzymeTestkit?: function;
 *
 *   // optional object with required props
 *   props?: object;
 * }
 *
 * as this file is quite extensive and could have tendency to grow, it would be best to
 * extract these definitions to live together with component implementation and make this
 * a requirement (convention) for all components
 */

export default {
  SideMenuDrill: {
    skipSanityTest,
    enzymeTestkitFactory: require('../src/SideMenu/DrillView/DrillView.driver')
      .default,
  },
  BadgeSelectItemBuilder: { skipSanityTest, noTestkit },
  BackofficeTooltip: {
    // TODO: is this component in use at all?
    skipSanityTest,
    enzymeTestkitFactory: require('../src/Backoffice/Tooltip/Tooltip.driver')
      .default,
  },
  ColorPicker: {
    skipSanityTest,
    enzymeTestkitFactory: require('../src/ColorPicker/ColorPicker.driver')
      .default,
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
    enzymeTestkitFactory: require('../src/Card/ButtonHeader/ButtonHeader.driver')
      .default,
    skipSanityTest,
    props: {
      buttonTitle: 'Click me',
      subtitle: 'Header Subtitle',
      title: 'Header Title',
      buttonOnClick: () => {},
    },
  },
  LinkHeader: {
    enzymeTestkitFactory: require('../src/Card/LinkHeader/LinkHeader.driver')
      .default,
    skipSanityTest,
  },
  CollapsedHeader: {
    skipSanityTest,
    enzymeTestkitFactory: require('../src/Card/CollapsedHeader/CollapsedHeader.driver')
      .default,
  },
  Header: {
    // TODO: this is actually  Card.Header, but is exported just as header
    enzymeTestkitFactory: require('../src/Card/Header/Header.driver').default,
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
    enzymeTestkit: linearProgressBarTestkitFactory,
  },
  CircularProgressBar: {
    enzymeTestkit: circularProgressBarTestkitFactory,
  },
  Composite: { skipSanityTest, noTestkit },
  FloatingHelper: {
    enzymeTestkit: floatingHelperTestkitFactory,
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
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
  Label: { enzymeTestkit: labelTestkitFactory },
  SideMenu: {
    enzymeTestkitFactory: require('../src/SideMenu/core/SideMenu.driver')
      .default,
  },
  ToggleSwitch: { enzymeTestkit: toggleSwitchTestkitFactory },
  CounterBadge: {
    enzymeTestkit: counterBadgeTestkitFactory,
  },
  Badge: {
    enzymeTestkit: badgeTestkitFactory,
    props: {
      children: 'hello',
    },
  },
  Button: {
    enzymeTestkitFactory: require('../src/Backoffice/Button/Button.driver')
      .default,
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
  ContactItemBuilder: { skipSanityTest },
  Draggable: {
    enzymeTestkitFactory: require('../src/DragAndDrop/Draggable/Draggable.driver')
      .default,
    skipSanityTest,
  },
  EditableRow: {
    enzymeTestkitFactory: require('../src/EditableSelector/EditableRow/EditableRow.driver')
      .default,
    skipSanityTest,
  },
  FieldLabelAttributes: {
    enzymeTestkitFactory: require('../src/FieldLabelAttributes/FieldLabelAttributes.driver')
      .default,
    skipSanityTest,
  },

  FieldWithSelectionComposite: {
    enzymeTestkitFactory: require('../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver')
      .default,
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
    enzymeTestkitFactory: require('../src/TPA/Button/Button.driver').default,
    skipSanityTest,
  },
  TpaFloatingTabs: {
    enzymeTestkitFactory: require('../src/TPA/FloatingTabs/FloatingTabs.driver')
      .default,
    skipSanityTest,
  },
  TpaTextLink: {
    enzymeTestkitFactory: require('../src/TPA/TextLink/TextLink.driver')
      .default,
    skipSanityTest,
  },
  RadioButton: {
    enzymeTestkitFactory: require('../src/RadioGroup/RadioButton/RadioButton.driver')
      .default,
    skipSanityTest,
  },
  TpaInput: {
    enzymeTestkitFactory: require('../src/TPA/Input/Input.driver').default,
    skipSanityTest,
  },
  MessageBoxMarketerialLayout: {
    enzymeTestkitFactory: require('../src/MessageBox/MessageBoxMarketerialLayout.driver')
      .default,
    skipSanityTest,
  },
  MessageBoxFunctionalLayout: {
    enzymeTestkitFactory: require('../src/MessageBox/MessageBoxFunctionalLayout.driver')
      .default,
    skipSanityTest,
  },
  TextLinkLayout: {
    enzymeTestkitFactory: require('../src/BaseComponents/TextLinkLayout/TextLinkLayout.driver')
      .default,
    skipSanityTest,
  },
};
