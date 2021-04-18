// TODO
describe('Test MultiCheck', () => {
  describe('initialize', () => {
    describe('prop: label', () => {
      it('should renders the label if label provided');

      it('should not renders the label if no label provided');

      it('should re-renders if label changed');
    });

    describe('prop: options', () => {
      it('should not renders `Select All` option if empty options provided');

      it('should renders `Select All` and options if options provided');

      it('should renders `Select All` and options if options provided');

      it('should re-renders if options changed');
    });

    describe('prop:columns', () => {
      it('should renders options in one columns by default');

      it('should renders options in two columns');

      it('should re-renders if columns changed');
    });

    describe('props:values', () => {
      it('should all options not checked by default');

      it('should options checked if values provided');

      it('should re-render options if values changed');
    });

    describe('props:onChange', () => {
      it('should no calls on render or re-render');
    });
  });

  describe('events', () => {
    it('should changes option check state when click');

    it('should calls onClick when option checked');

    it('should checked all options when `Select All` checked');

    it('should unchecked all options when `Select All` unchecked');

    it('should `Select All` checked if all other option checked');

    it('should `Select All` unchecked if any other option unchecked');
  });
});
