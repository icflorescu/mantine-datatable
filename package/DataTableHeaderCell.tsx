import { Box, Center, createStyles, Group, MantineTheme, Popover, Modal } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { ArrowDown, ArrowsVertical, Filter, FilterOff } from 'tabler-icons-react';
import { DataTableColumn, DataTableProps, DataTableSortStatus } from './DataTable.props';
import { humanize, useMediaQueryStringOrFunction } from './utils';

const DATATABLEHEADER_ICONSIZE = 14;

const useStyles = createStyles((theme) => ({
  sortableColumnHeader: {
    cursor: 'pointer',
    transition: 'background .15s ease',
    '&:hover': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  columnHeaderText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  sortableColumnHeaderText: {
    minWidth: 0,
    flexGrow: 1,
  },
  sortableColumnHeaderIcon: {
    transition: 'transform .15s ease',
  },
  sortableColumnHeaderIconRotated: {
    transform: 'rotate3d(0, 0, 1, 180deg)',
  },
  sortableColumnHeaderNeutralIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    transition: 'color .15s ease',
    'th:hover &': {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },
  },
}));

export type DataTableHeaderCellBase<T> = {
  title: ReactNode | undefined;
  sortStatus: DataTableSortStatus | undefined;
  onSortStatusChange: ((sortStatus: DataTableSortStatus) => void) | undefined;
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlignment' | 'width'>;

interface DataTableHeaderCellChild<T> extends Omit<DataTableHeaderCellBase<T>, 'textAlignment' | 'width'> {
  styles: ReturnType<typeof useStyles>;
}

interface DataTableHeaderCellParent<T> extends DataTableHeaderCellBase<T> {
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  filterButton: DataTableProps<T>['filterButton'];
}

interface DataTableHeaderCellWrapper<T> extends Pick<DataTableColumn<T>, 'sortable' | 'textAlignment' | 'width'> {
  children: ReactNode;
  styles: ReturnType<typeof useStyles>;
}

interface DataTableHeaderFilterButton {
  filterOpened: boolean;
  onOpen: (opened: boolean) => void;
}

export default function DataTableHeaderCellParent<T>({
  accessor,
  title,
  sortable,
  textAlignment,
  width,
  sortStatus,
  onSortStatusChange,
  visibleMediaQuery,
  filterButton,
}: DataTableHeaderCellParent<T>) {
  const [filterOpened, setFilterOpened] = useState(false);

  const styles = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;

  const cellWrapper = (children: ReactNode) => {
    return DataTableHeaderCellWrapper({
      sortable,
      textAlignment,
      width,
      children,
      styles,
    });
  };

  const dataTableHeaderCell = DataTableHeaderCell({
    accessor,
    title,
    sortable,
    sortStatus,
    onSortStatusChange,
    styles,
  });

  if (!filterButton) return cellWrapper(dataTableHeaderCell);

  const { popover, modal } = filterButton;

  if (popover) {
    const onOpen = popover.popoverProps?.onChange
      ? (opened: boolean) => {
          popover.popoverProps!.onChange!(opened);
          setFilterOpened(opened);
        }
      : setFilterOpened;

    return (
      <Popover
        arrowOffset={popover.popoverProps?.arrowOffset}
        arrowSize={popover.popoverProps?.arrowSize}
        clickOutsideEvents={popover.popoverProps?.clickOutsideEvents}
        closeOnClickOutside={popover.popoverProps?.closeOnClickOutside}
        closeOnEscape={popover.popoverProps?.closeOnEscape}
        exitTransitionDuration={popover.popoverProps?.exitTransitionDuration}
        id={popover.popoverProps?.id}
        middlewares={popover.popoverProps?.middlewares}
        offset={popover.popoverProps?.offset}
        onChange={onOpen}
        onClose={popover.popoverProps?.onClose}
        onOpen={popover.popoverProps?.onOpen}
        onPositionChange={popover.popoverProps?.onPositionChange}
        opened={filterOpened}
        position={popover.popoverProps?.position}
        positionDependencies={popover.popoverProps?.positionDependencies}
        radius={popover.popoverProps?.radius}
        shadow={popover.popoverProps?.shadow}
        transition={popover.popoverProps?.transition}
        transitionDuration={popover.popoverProps?.transitionDuration}
        trapFocus={popover.popoverProps?.trapFocus}
        width={popover.popoverProps?.width}
        withArrow={popover.popoverProps?.withArrow}
        withRoles={popover.popoverProps?.withRoles}
        withinPortal={popover.popoverProps?.withinPortal}
        zIndex={popover.popoverProps?.zIndex}
      >
        <Popover.Target popupType={popover.popupType}>
          {cellWrapper(
            <Group position="apart" noWrap spacing={0}>
              {dataTableHeaderCell}
              {DataTableHeaderFilterButton({ filterOpened, onOpen })}
            </Group>
          )}
        </Popover.Target>
        <Popover.Dropdown>
          {popover.item({
            accessor,
            title,
            sortable,
            textAlignment,
            width,
            sortStatus,
            onSortStatusChange,
          })}
        </Popover.Dropdown>
      </Popover>
    );
  } else {
    if (!modal) {
      console.error('filterButton is empty');
      return cellWrapper(dataTableHeaderCell);
    }

    const onClose = modal.modalProps?.onClose
      ? () => {
        modal.modalProps!.onClose!();
        setFilterOpened(false);
      }
      : () => setFilterOpened(false);

      const modalTitleProp = modal.modalProps?.title;
      let modalTitle: string | ReactNode;
      
      if (modalTitleProp) {
        if (typeof modalTitleProp === 'function') modalTitle = modalTitleProp(String(title));
        else modalTitle = modalTitleProp;
      }
      else {
        modalTitle = title;
      }
    return (
      <>
        <Modal
          centered={modal.modalProps?.centered}
          closeButtonLabel={modal.modalProps?.closeButtonLabel}
          closeOnClickOutside={modal.modalProps?.closeOnClickOutside}
          closeOnEscape={modal.modalProps?.closeOnEscape}
          fullScreen={modal.modalProps?.fullScreen}
          id={modal.modalProps?.id}
          lockScroll={modal.modalProps?.lockScroll}
          onClose={onClose}
          opened={filterOpened}
          overflow={modal.modalProps?.overflow}
          overlayBlur={modal.modalProps?.overlayBlur}
          overlayColor={modal.modalProps?.overlayColor}
          overlayOpacity={modal.modalProps?.overlayOpacity}
          padding={modal.modalProps?.padding}
          radius={modal.modalProps?.radius}
          shadow={modal.modalProps?.shadow}
          size={modal.modalProps?.size}
          target={modal.modalProps?.target}
          title={modalTitle}
          transition={modal.modalProps?.transition}
          transitionDuration={modal.modalProps?.transitionDuration}
          transitionTimingFunction={modal.modalProps?.transitionTimingFunction}
          trapFocus={modal.modalProps?.trapFocus}
          withCloseButton={modal.modalProps?.withCloseButton}
          withFocusReturn={modal.modalProps?.withFocusReturn}
          withinPortal={modal.modalProps?.withinPortal}
          zIndex={modal.modalProps?.zIndex}
        >
        {cellWrapper(
          <Group position="apart" noWrap spacing={0}>
            {dataTableHeaderCell}
            {DataTableHeaderFilterButton({ filterOpened, onOpen: setFilterOpened })}
          </Group>
        )}
        </Modal>
      </>
    );
  }
}

function DataTableHeaderCellWrapper<T>({
  sortable,
  textAlignment,
  width,
  children,
  styles,
}: DataTableHeaderCellWrapper<T>) {
  const { cx, classes } = styles;

  return (
    <Box
      component="th"
      className={cx({ [classes.sortableColumnHeader]: sortable })}
      sx={{
        '&&': { textAlign: textAlignment },
        width,
        minWidth: width,
        maxWidth: width,
      }}
    >
      {children}
    </Box>
  );
}

function DataTableHeaderFilterButton({ filterOpened, onOpen }: DataTableHeaderFilterButton) {
  return (
    <Center role="button" onClick={() => onOpen(filterOpened)}>
      {filterOpened ? <FilterOff size={DATATABLEHEADER_ICONSIZE} /> : <Filter size={DATATABLEHEADER_ICONSIZE} />}
    </Center>
  );
}

function DataTableHeaderCell<T>({
  accessor,
  title,
  sortable,
  sortStatus,
  onSortStatusChange,
  styles,
}: DataTableHeaderCellChild<T>) {
  const { cx, classes } = styles;
  const text = title ?? humanize(accessor);
  return (
    <Box
      role={sortable ? 'button' : undefined}
      onClick={
        sortable && onSortStatusChange
          ? () => {
              onSortStatusChange({
                columnAccessor: accessor,
                direction: sortStatus?.direction === 'asc' ? 'desc' : 'asc',
              });
            }
          : undefined
      }
      sx={{ flexGrow: 1 }}
    >
      {sortable || sortStatus?.columnAccessor === accessor ? (
        <Group position="apart" noWrap spacing="xs">
          <Box className={cx(classes.columnHeaderText, classes.sortableColumnHeaderText)}>{text}</Box>
          <Center>
            {sortStatus?.columnAccessor === accessor ? (
              <ArrowDown
                className={cx(classes.sortableColumnHeaderIcon, {
                  [classes.sortableColumnHeaderIconRotated]: sortStatus.direction === 'desc',
                })}
                size={DATATABLEHEADER_ICONSIZE}
              />
            ) : (
              <ArrowsVertical className={classes.sortableColumnHeaderNeutralIcon} size={14} />
            )}
          </Center>
        </Group>
      ) : (
        <Box className={classes.columnHeaderText}>{text}</Box>
      )}
    </Box>
  );
}
