import ReactDOM from 'react-dom';

import {
  testkitFactoryCreator,
  uniTestkitFactoryCreator,
} from 'wix-ui-test-utils/vanilla';

import inputDriverFactory from '../src/Input/Input.driver';

export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import buttonLayoutDriverFactory from '../src/ButtonLayout/ButtonLayout.driver';

export const buttonLayoutTestkitFactory = testkitFactoryCreator(
  buttonLayoutDriverFactory,
);

import inputAreaDriverFactory from '../src/InputArea/InputArea.driver';

export const inputAreaTestkitFactory = testkitFactoryCreator(
  inputAreaDriverFactory,
);

import tooltipDriverFactory from '../src/Tooltip/Tooltip.driver';

export const tooltipTestkitFactory = testkitFactoryCreator(
  tooltipDriverFactory,
);

import addItemDriverFactory from '../src/AddItem/AddItem.driver';

export const addItemTestkitFactory = testkitFactoryCreator(
  addItemDriverFactory,
);

import backofficeTooltipDriverFactory from '../src/Backoffice/Tooltip/Tooltip.driver';

export const backofficeTooltipTestkitFactory = testkitFactoryCreator(
  backofficeTooltipDriverFactory,
);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.driver';

export const breadcrumbsTestkitFactory = testkitFactoryCreator(
  breadcrumbsDriverFactory,
);

import tabsDriverFactory from '../src/Tabs/Tabs.driver';

export const tabsTestkitFactory = testkitFactoryCreator(tabsDriverFactory);

import dropdownLayoutDriverFactory from '../src/DropdownLayout/DropdownLayout.driver';

export const dropdownLayoutTestkitFactory = testkitFactoryCreator(
  dropdownLayoutDriverFactory,
);

import inputWithOptionsDriverFactory from '../src/InputWithOptions/InputWithOptions.driver';

export const inputWithOptionsTestkitFactory = testkitFactoryCreator(
  inputWithOptionsDriverFactory,
);

import buttonWithOptionsDriverFactory from '../src/ButtonWithOptions/ButtonWithOptions.driver';

export const buttonWithOptionsTestkitFactory = testkitFactoryCreator(
  buttonWithOptionsDriverFactory,
);

import pageDriverFactory from '../src/Page/Page.driver';

export const pageTestkitFactory = testkitFactoryCreator(pageDriverFactory);

import pageHeaderDriverFactory from '../src/PageHeader/PageHeader.driver';

export const pageHeaderTestkitFactory = testkitFactoryCreator(
  pageHeaderDriverFactory,
);

import popoverDriverFactory from '../src/Popover/Popover.driver';

export const popoverTestkitFactory = testkitFactoryCreator(
  popoverDriverFactory,
);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.driver';

export const autoCompleteTestkitFactory = testkitFactoryCreator(
  autoCompleteDriverFactory,
);

import dropdownDriverFactory from '../src/Dropdown/Dropdown.driver';

export const dropdownTestkitFactory = testkitFactoryCreator(
  dropdownDriverFactory,
);

import multiSelectDriverFactory from '../src/MultiSelect/MultiSelect.driver';

export const multiSelectTestkitFactory = testkitFactoryCreator(
  multiSelectDriverFactory,
);

import multiSelectCheckboxDriverFactory from '../src/MultiSelectCheckbox/MultiSelectCheckbox.driver';

export const multiSelectCheckboxTestkitFactory = testkitFactoryCreator(
  multiSelectCheckboxDriverFactory,
);

import tagDriverFactory from '../src/Tag/Tag.driver';

export const tagTestkitFactory = testkitFactoryCreator(tagDriverFactory);

import checkboxDriverFactory from '../src/Checkbox/Checkbox.driver';

export const checkboxTestkitFactory = testkitFactoryCreator(
  checkboxDriverFactory,
);

import buttonDriverFactory from '../src/Backoffice/Button/Button.driver';
import { buttonDriverFactory as buttonNextDriverFactory } from '../src/Button/Button.driver';

export const buttonTestkitFactory = obj => {
  const domInstance = ReactDOM.findDOMNode(obj.wrapper);
  const hasUpgrade = domInstance.querySelector('[data-upgrade]');

  return hasUpgrade
    ? uniTestkitFactoryCreator(buttonNextDriverFactory)(obj)
    : testkitFactoryCreator(buttonDriverFactory)(obj);
};

import textLinkDriverFactory from '../src/TextLink/TextLink.driver';

export const textLinkTestkitFactory = testkitFactoryCreator(
  textLinkDriverFactory,
);

import textLinkLayoutDriverFactory from '../src/BaseComponents/TextLinkLayout/TextLinkLayout.driver';

export const textLinkLayoutTestkitFactory = testkitFactoryCreator(
  textLinkLayoutDriverFactory,
);

import dataTableDriverFactory from '../src/DataTable/DataTable.driver';

export const dataTableTestkitFactory = testkitFactoryCreator(
  dataTableDriverFactory,
);

import tableDriverFactory from '../src/Table/Table.driver';

export const tableTestkitFactory = testkitFactoryCreator(tableDriverFactory);

import tableActionCellDriverFactory from '../src/TableActionCell/TableActionCell.driver';

export const tableActionCellTestkitFactory = testkitFactoryCreator(
  tableActionCellDriverFactory,
);

import textAreaDriverFactory from '../src/TextArea/TextArea.driver';

export const textAreaTestkitFactory = testkitFactoryCreator(
  textAreaDriverFactory,
);

import textFieldDriverFactory from '../src/TextField/TextField.driver';

export const textFieldTestkitFactory = testkitFactoryCreator(
  textFieldDriverFactory,
);

import dropdownCompositeDriverFactory from '../src/DropdownComposite/DropdownComposite.driver';

export const dropdownCompositeTestkitFactory = testkitFactoryCreator(
  dropdownCompositeDriverFactory,
);

import autoCompleteCompositeDriverFactory from '../src/AutoCompleteComposite/AutoCompleteComposite.driver';

export const autoCompleteCompositeTestkitFactory = testkitFactoryCreator(
  autoCompleteCompositeDriverFactory,
);

import multiSelectCompositeDriverFactory from '../src/MultiSelectComposite/MultiSelectComposite.driver';

export const multiSelectCompositeTestkitFactory = testkitFactoryCreator(
  multiSelectCompositeDriverFactory,
);

import loaderDriverFactory from '../src/Loader/Loader.driver';

export const loaderTestkitFactory = testkitFactoryCreator(loaderDriverFactory);

import skeletonDriverFactory from '../src/Skeleton/Skeleton.driver';

export const skeletonTestkitFactory = testkitFactoryCreator(
  skeletonDriverFactory,
);

import radioGroupDriverFactory from '../src/RadioGroup/RadioGroup.driver';

export const radioGroupTestkitFactory = testkitFactoryCreator(
  radioGroupDriverFactory,
);

import radioButtonDriverFactory from '../src/RadioGroup/RadioButton/RadioButton.driver';

export const radioButtonTestkitFactory = testkitFactoryCreator(
  radioButtonDriverFactory,
);

import notificationDriverFactory from '../src/Notification/Notification.driver';

export const notificationTestkitFactory = testkitFactoryCreator(
  notificationDriverFactory,
);

import rangeDriverFactory from '../src/Range/Range.driver';

export const rangeTestkitFactory = testkitFactoryCreator(rangeDriverFactory);

import fieldWithSelectionCompositeDriverFactory from '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver';

export const fieldWithSelectionCompositeTestkitFactory = testkitFactoryCreator(
  fieldWithSelectionCompositeDriverFactory,
);

import googleAddressWithInputDriverFactory from '../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.driver';

export const googleAddressWithInputTestkitFactory = testkitFactoryCreator(
  googleAddressWithInputDriverFactory,
);

import richTextAreaCompositeDriverFactory from '../src/RichTextAreaComposite/RichTextAreaComposite.driver';

export const richTextAreaCompositeTestkitFactory = testkitFactoryCreator(
  richTextAreaCompositeDriverFactory,
);

import richTextAreaDriverFactory from '../src/RichTextArea/RichTextArea.driver';

export const richTextAreaTestkitFactory = testkitFactoryCreator(
  richTextAreaDriverFactory,
);

import buttonHeaderDriverFactory from '../src/Card/ButtonHeader/ButtonHeader.driver';

export const buttonHeaderTestkitFactory = testkitFactoryCreator(
  buttonHeaderDriverFactory,
);

import linkHeaderDriverFactory from '../src/Card/LinkHeader/LinkHeader.driver';

export const linkHeaderTestkitFactory = testkitFactoryCreator(
  linkHeaderDriverFactory,
);

import collapsedHeaderDriverFactory from '../src/Card/CollapsedHeader/CollapsedHeader.driver';

export const collapsedHeaderTestkitFactory = testkitFactoryCreator(
  collapsedHeaderDriverFactory,
);

import headerDriverFactory from '../src/Card/Header/Header.driver';

export const headerTestkitFactory = testkitFactoryCreator(headerDriverFactory);

import messageBoxFunctionalLayoutDriverFactory from '../src/MessageBox/MessageBoxFunctionalLayout.driver';

export const messageBoxFunctionalLayoutTestkitFactory = testkitFactoryCreator(
  messageBoxFunctionalLayoutDriverFactory,
);

import messageBoxMarketerialLayoutDriverFactory from '../src/MessageBox/MessageBoxMarketerialLayout.driver';

export const messageBoxMarketerialLayoutTestkitFactory = testkitFactoryCreator(
  messageBoxMarketerialLayoutDriverFactory,
);

import modalDriverFactory from '../src/Modal/Modal.driver';

export const modalTestkitFactory = testkitFactoryCreator(modalDriverFactory);

import timeInputDriverFactory from '../src/TimeInput/TimeInput.driver';

export const timeInputTestkitFactory = testkitFactoryCreator(
  timeInputDriverFactory,
);

import sliderDriverFactory from '../src/Slider/Slider.driver';

export const sliderTestkitFactory = testkitFactoryCreator(sliderDriverFactory);

import filePickerDriverFactory from '../src/FilePicker/FilePicker.driver';

export const filePickerTestkitFactory = testkitFactoryCreator(
  filePickerDriverFactory,
);

import imageViewerDriverFactory from '../src/ImageViewer/ImageViewer.driver';

export const imageViewerTestkitFactory = testkitFactoryCreator(
  imageViewerDriverFactory,
);

import sideMenuDriverFactory from '../src/SideMenu/core/SideMenu.driver';

export const sideMenuTestkitFactory = testkitFactoryCreator(
  sideMenuDriverFactory,
);

import sideMenuDrillDriverFactory from '../src/SideMenu/DrillView/DrillView.driver';

export const sideMenuDrillTestkitFactory = testkitFactoryCreator(
  sideMenuDrillDriverFactory,
);

import tpaButtonDriverFactory from '../src/TPA/Button/Button.driver';

export const tpaButtonTestkitFactory = testkitFactoryCreator(
  tpaButtonDriverFactory,
);

import tpaTextLinkDriverFactory from '../src/TPA/TextLink/TextLink.driver';

export const tpaTextLinkTestkitFactory = testkitFactoryCreator(
  tpaTextLinkDriverFactory,
);

import tpaFloatingTabsDriverFactory from '../src/TPA/FloatingTabs/FloatingTabs.driver';

export const tpaFloatingTabsTestkitFactory = testkitFactoryCreator(
  tpaFloatingTabsDriverFactory,
);

import tpaInputDriverFactory from '../src/TPA/Input/Input.driver';

export const tpaInputTestkitFactory = testkitFactoryCreator(
  tpaInputDriverFactory,
);

import tpaLabelDriverFactory from '../src/TPA/Label/Label.driver';

export const tpaLabelTestkitFactory = testkitFactoryCreator(
  tpaLabelDriverFactory,
);

import fieldLabelAttributesDriverFactory from '../src/FieldLabelAttributes/FieldLabelAttributes.driver';

export const fieldLabelAttributesTestkitFactory = testkitFactoryCreator(
  fieldLabelAttributesDriverFactory,
);

import popoverMenuDriverFactory from '../src/PopoverMenu/PopoverMenu.driver';

export const popoverMenuTestkitFactory = testkitFactoryCreator(
  popoverMenuDriverFactory,
);

import calendarDriverFactory from '../src/Calendar/Calendar.driver';

export const calendarTestkitFactory = testkitFactoryCreator(
  calendarDriverFactory,
);

import datePickerDriverFactory from '../src/DatePicker/DatePicker.driver';

export const datePickerTestkitFactory = testkitFactoryCreator(
  datePickerDriverFactory,
);

import selectorDriverFactory from '../src/Selector/Selector.driver';

export const selectorTestkitFactory = testkitFactoryCreator(
  selectorDriverFactory,
);

import editableSelectorDriverFactory from '../src/EditableSelector/EditableSelector.driver';

export const editableSelectorTestkitFactory = testkitFactoryCreator(
  editableSelectorDriverFactory,
);

import editableRowDriverFactory from '../src/EditableSelector/EditableRow/EditableRow.driver';

export const editableRowTestkitFactory = testkitFactoryCreator(
  editableRowDriverFactory,
);

import iconWithOptionsDriverFactory from '../src/IconWithOptions/IconWithOptions.driver';

export const iconWithOptionsTestkitFactory = testkitFactoryCreator(
  iconWithOptionsDriverFactory,
);

import searchDriverFactory from '../src/Search/Search.driver';

export const searchTestkitFactory = testkitFactoryCreator(searchDriverFactory);

import highlighterDriverFactory from '../src/Highlighter/Highlighter.driver';

export const highlighterTestkitFactory = testkitFactoryCreator(
  highlighterDriverFactory,
);

import statsWidgetDriverFactory from '../src/StatsWidget/StatsWidget.driver';

export const statsWidgetTestkitFactory = testkitFactoryCreator(
  statsWidgetDriverFactory,
);

import modalSelectorLayoutDriverFactory from '../src/ModalSelectorLayout/ModalSelectorLayout.driver';

export const modalSelectorLayoutTestkitFactory = testkitFactoryCreator(
  modalSelectorLayoutDriverFactory,
);

import sectionHelperDriverFactory from '../src/SectionHelper/SectionHelper.driver';

export const sectionHelperTestkitFactory = testkitFactoryCreator(
  sectionHelperDriverFactory,
);

import formFieldDriverFactory from '../src/FormField/FormField.driver';

export const formFieldTestkitFactory = testkitFactoryCreator(
  formFieldDriverFactory,
);

import emptyStateDriverFactory from '../src/EmptyState/EmptyState.driver';

export const emptyStateTestkitFactory = testkitFactoryCreator(
  emptyStateDriverFactory,
);

import headingDriverFactory from '../src/Heading/Heading.driver';

export const headingTestkitFactory = testkitFactoryCreator(
  headingDriverFactory,
);

import textDriverFactory from '../src/Text/Text.driver';

export const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

import sortableListDriverFactory from '../src/SortableList/SortableList.driver';

export const sortableListTestkitFactory = testkitFactoryCreator(
  sortableListDriverFactory,
);

import badgeSelectDriverFactory from '../src/BadgeSelect/BadgeSelect.driver';

export const badgeSelectTestkitFactory = testkitFactoryCreator(
  badgeSelectDriverFactory,
);

import genericModalLayoutDriverFactory from '../src/GenericModalLayout/GenericModalLayout.driver';

export const genericModalLayoutTestkitFactory = testkitFactoryCreator(
  genericModalLayoutDriverFactory,
);

import contactItemBuilderDriverFactory from '../src/ContactItemBuilder/ContactItemBuilder.driver';

export const contactItemBuilderTestkitFactory = testkitFactoryCreator(
  contactItemBuilderDriverFactory,
);

import calendarPanelDriverFactory from '../src/CalendarPanel/CalendarPanel.driver';

export const calendarPanelTestkitFactory = testkitFactoryCreator(
  calendarPanelDriverFactory,
);

// wix-ui-backoffice proxy

export {
  badgeTestkitFactory,
  stylableCounterBadgeTestkitFactory as counterBadgeTestkitFactory,
  toggleSwitchTestkitFactory,
  labelTestkitFactory,
  floatingHelperTestkitFactory,
  linearProgressBarTestkitFactory,
  circularProgressBarTestkitFactory,
} from 'wix-ui-backoffice/dist/src/testkit';

// wix-ui-core (unidriver)

import { textButtonDriverFactory } from '../src/TextButton/TextButton.driver';

export const textButtonTestkitFactory = uniTestkitFactoryCreator(
  textButtonDriverFactory,
);

import { avatarDriverFactory } from '../src/Avatar/Avatar.driver';

export const avatarTestkitFactory = uniTestkitFactoryCreator(
  avatarDriverFactory,
);

import cardGalleryItemDriverFactory from '../src/CardGalleryItem/CardGalleryItem.driver';

export const cardGalleryItemTestkitFactory = uniTestkitFactoryCreator(
  cardGalleryItemDriverFactory,
);

import { iconButtonDriverFactory } from '../src/IconButton/IconButton.driver';

export const iconButtonTestkitFactory = uniTestkitFactoryCreator(
  iconButtonDriverFactory,
);

import { closeButtonDriverFactory } from '../src/CloseButton/CloseButton.driver';

export const closeButtonTestkitFactory = uniTestkitFactoryCreator(
  closeButtonDriverFactory,
);

import { carouselDriverFactory } from '../src/Carousel/Carousel.driver';

export const carouselTestkitFactory = uniTestkitFactoryCreator(
  carouselDriverFactory,
);

import { proportionDriverFactory } from '../src/Proportion/Proportion.driver';

export const proportionTestkitFactory = uniTestkitFactoryCreator(
  proportionDriverFactory,
);

import { dropdownPopoverDriverFactory } from '../src/DropdownPopover/DropdownPopover.driver';

export const dropdownPopoverTestkitFactory = uniTestkitFactoryCreator(
  dropdownPopoverDriverFactory,
);

/*
 * Component generator test component
 */
import { generatedTestComponentDriverFactory } from '../src/GeneratedTestComponent/GeneratedTestComponent.driver';

export const generatedTestComponentTestkitFactory = uniTestkitFactoryCreator(
  generatedTestComponentDriverFactory,
);