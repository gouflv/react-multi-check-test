import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import React from 'react';
import MultiCheck, {MultiCheckProps, Option} from './MultiCheck';
import userEvent from '@testing-library/user-event';

const defaultProps: MultiCheckProps = {
  options: []
};

const setup = (props?: Partial<MultiCheckProps>) => (
  <MultiCheck {...defaultProps} {...props} />
);

const createOptions = (count = 1): Option[] =>
  Array.from({length: count}).map((_, i) => ({
    label: `option${i + 1}`,
    value: `${i + 1}`
  }));

describe('Test MultiCheck', () => {
  describe('initialize', () => {
    describe('prop: label', () => {
      it('should not renders the label if no label provided', () => {
        render(setup());
        expect(screen.queryByTestId('card-header')).not.toBeInTheDocument();
      });

      it('should renders the label if label provided', () => {
        render(setup({label: 'label'}));
        expect(screen.queryByTestId('card-header')).toHaveTextContent('label');
      });

      it('should re-renders if label changed', () => {
        const {rerender} = render(setup({label: 'label'}));
        rerender(setup({label: 'label has changed'}));
        expect(screen.queryByTestId('card-header')).toHaveTextContent(
          'label has changed'
        );
      });
    });

    describe('prop: options', () => {
      it('should not renders `Select All` option if empty options provided', async () => {
        render(setup());
        expect(screen.queryByText(/Select All/i)).not.toBeInTheDocument();
      });

      it('should renders `Select All` and options if options provided', () => {
        render(setup({options: createOptions()}));
        expect(screen.queryByText(/Select All/i)).toBeInTheDocument();
      });

      it('should renders options', () => {
        render(
          setup({
            options: createOptions(2)
          })
        );
        expect(screen.queryByText('option1')).toBeInTheDocument();
        expect(screen.queryByText('option2')).toBeInTheDocument();
      });

      it('should re-renders if options changed', () => {
        const {rerender} = render(
          setup({
            options: createOptions(2)
          })
        );
        rerender(
          setup({
            options: createOptions(3)
          })
        );
        expect(screen.queryByText('option1')).toBeInTheDocument();
        expect(screen.queryByText('option2')).toBeInTheDocument();
        expect(screen.queryByText('option3')).toBeInTheDocument();
      });
    });

    describe('prop:columns', () => {
      it('should renders options in one columns by default', () => {
        render(
          setup({
            options: createOptions(2)
          })
        );
        expect(screen.getByTestId('multi-check-option-column'));
        expect(screen.queryByText('option1')).toBeInTheDocument();
        expect(screen.queryByText('option2')).toBeInTheDocument();
      });

      it('should renders options in two columns', () => {
        render(
          setup({
            options: createOptions(2),
            columns: 2
          })
        );
        expect(
          screen.queryAllByTestId('multi-check-option-column').length
        ).toBe(2);
        expect(screen.queryByText('option1')).toBeInTheDocument();
        expect(screen.queryByText('option2')).toBeInTheDocument();
      });

      it('should re-renders if columns changed', () => {
        const {rerender} = render(
          setup({
            options: createOptions(2)
          })
        );
        expect(screen.getByTestId('multi-check-option-column'));

        rerender(
          setup({
            options: createOptions(2),
            columns: 2
          })
        );
        expect(
          screen.queryAllByTestId('multi-check-option-column').length
        ).toBe(2);
      });
    });

    describe('props:values', () => {
      it('should all options not checked by default', () => {
        render(
          setup({
            options: createOptions(2)
          })
        );
        // exclude `Select All` option
        const checkbox = screen.queryAllByRole('checkbox', {name: /option/i});
        expect(checkbox.length).toBe(2);
        checkbox.forEach((c) => {
          expect(c).not.toBeChecked();
        });
      });

      it('should options checked if values provided', () => {
        render(
          setup({
            options: createOptions(2),
            values: ['1']
          })
        );
        expect(screen.queryByRole('checkbox', {name: 'option1'})).toBeChecked();
        expect(
          screen.queryByRole('checkbox', {name: 'option2'})
        ).not.toBeChecked();
      });

      it('should re-render options if values changed', () => {
        const {rerender} = render(
          setup({
            options: createOptions(2),
            values: ['1', '2']
          })
        );

        rerender(
          setup({
            options: createOptions(5),
            values: ['1', '2', '5']
          })
        );
        expect(screen.queryByRole('checkbox', {name: 'option1'})).toBeChecked();
        expect(screen.queryByRole('checkbox', {name: 'option2'})).toBeChecked();
        expect(screen.queryByRole('checkbox', {name: 'option5'})).toBeChecked();
      });
    });

    describe('props:onChange', () => {
      it('should no calls on render', () => {
        const onChange = jest.fn();
        const {rerender} = render(
          setup({
            options: createOptions(),
            onChange
          })
        );

        rerender(
          setup({
            onChange
          })
        );

        expect(onChange).not.toBeCalled();
      });

      it('should register new onChange function if onChange changed', () => {
        const onChange = jest.fn();
        const {rerender} = render(
          setup({
            options: createOptions(),
            onChange
          })
        );

        userEvent.click(screen.getByRole('checkbox', {name: 'option1'}));
        expect(onChange).toBeCalledTimes(1);

        const onChangeNew = jest.fn();
        rerender(
          setup({
            options: createOptions(),
            onChange: onChangeNew
          })
        );

        userEvent.click(screen.getByRole('checkbox', {name: 'option1'}));
        expect(onChange).toBeCalledTimes(1);
        expect(onChangeNew).toBeCalledTimes(1);
      });
    });
  });

  describe('events', () => {
    it('should changes option check state when click', () => {
      render(
        setup({
          options: createOptions()
        })
      );
      const checkbox = screen.getByRole('checkbox', {name: 'option1'});
      expect(checkbox).not.toBeChecked();

      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should calls onClick with checked values when option checked', () => {
      const onChange = jest.fn();
      const options = createOptions(2);

      render(
        setup({
          options,
          onChange
        })
      );

      /* check option1 */
      userEvent.click(screen.getByRole('checkbox', {name: 'option1'}));
      expect(onChange).toBeCalledTimes(1);
      // first call agr should be option1
      expect(onChange.mock.calls[0][0]).toEqual([options[0]]);

      /* check option2 */
      userEvent.click(screen.getByRole('checkbox', {name: 'option2'}));
      expect(onChange).toBeCalledTimes(2);
      // second call agr should be all of options
      expect(onChange.mock.calls[1][0]).toEqual(options);

      /* uncheck option1 */
      userEvent.click(screen.getByRole('checkbox', {name: 'option1'}));
      expect(onChange).toBeCalledTimes(3);
      // third call agr should be option2
      expect(onChange.mock.calls[2][0]).toEqual([options[1]]);
    });

    it('should checked all options when `Select All` checked', () => {
      const onChange = jest.fn();
      const options = createOptions(2);

      render(
        setup({
          options,
          onChange
        })
      );

      const selectAll = screen.getByRole('checkbox', {name: /Select All/i});
      userEvent.click(selectAll);
      expect(selectAll).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'option1'})).toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'option2'})).toBeChecked();

      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(options);
    });

    it('should unchecked all options when `Select All` unchecked', () => {
      const onChange = jest.fn();
      const options = createOptions(2);

      render(
        setup({
          options,
          values: ['1', '2'],
          onChange
        })
      );

      const selectAll = screen.getByRole('checkbox', {name: /Select All/i});
      expect(selectAll).toBeChecked();

      // uncheck selectAll
      userEvent.click(selectAll);
      expect(onChange).toBeCalledTimes(1);

      expect(selectAll).not.toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'option1'})).not.toBeChecked();
      expect(screen.getByRole('checkbox', {name: 'option2'})).not.toBeChecked();
    });

    it('should `Select All` checked if all other option checked', () => {
      const onChange = jest.fn();
      const options = createOptions(2);

      render(
        setup({
          options,
          onChange
        })
      );

      const selectAll = screen.getByRole('checkbox', {name: /Select All/i});

      // check other checkbox
      const checkbox = screen.getAllByRole('checkbox', {name: /option/i});
      checkbox.forEach((el) => {
        userEvent.click(el);
      });

      expect(selectAll).toBeChecked();
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(options);
    });

    it('should `Select All` unchecked if any other option unchecked', () => {
      const onChange = jest.fn();
      const options = createOptions(2);

      render(
        setup({
          options,
          values: ['1', '2'],
          onChange
        })
      );

      const selectAll = screen.getByRole('checkbox', {name: /Select All/i});
      expect(selectAll).toBeChecked();

      // unchecked option1
      userEvent.click(screen.getByRole('checkbox', {name: 'option1'}));
      expect(selectAll).not.toBeChecked();
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual([options[1]]);
    });

    it('should `Select All` work if one of options value is equal to "Select All"', () => {
      const onChange = jest.fn();
      const options = [
        ...createOptions(),
        {label: 'Select All', value: 'Select All'}
      ];
      render(
        setup({
          options,
          onChange
        })
      );

      const [realSelectAll, fakeSelectAll] = screen.getAllByRole('checkbox', {
        name: 'Select All'
      });

      // check fakeSelectAll
      userEvent.click(fakeSelectAll);
      expect(realSelectAll).not.toBeChecked();
      expect(fakeSelectAll).toBeChecked();

      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual([options[1]]);

      // check option1
      userEvent.click(screen.getByRole('checkbox', {name: /option/}));
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(options);
      expect(realSelectAll).toBeChecked();
    });
  });
});
