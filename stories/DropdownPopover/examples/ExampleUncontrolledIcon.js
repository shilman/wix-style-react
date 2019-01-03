/* eslint-disable */

<div style={{ textAlign: 'center' }}>
  <DropdownPopover
    data-hook="story-dropdown-popover-uncontrolled-icon"
    showArrow
    options={[
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option' },
      { id: 3, value: 'Fourth option' },
      { id: 4, value: 'Fifth option' },
      { id: 5, value: 'Sixth option' },
    ]}
  >
    {({ open, close }) => {
      return (
        <TextButton skin="dark" onMouseEnter={open} onMouseLeave={close}>
          <Image />
        </TextButton>
      );
    }}
  </DropdownPopover>
</div>
