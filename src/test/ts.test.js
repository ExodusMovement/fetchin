import { ts } from '../../dist';

describe('qs', () => {
  it('works with empty templates', () => expect(ts('', {})).toBe(''));

  it('ignores brackets if template name is undefined', () =>
    expect(ts('{}', {})).toBe('{}'));

  it('ignores brackets if multiple template names are undefined', () =>
    expect(ts('{}/{}', {})).toBe('{}/{}'));

  it('renders an empty string if template value is undefined', () =>
    expect(ts('{foo}', {})).toBe(''));

  it('evaluates a single template properly', () =>
    expect(ts('{foo}', { foo: 'bar' })).toBe('bar'));

  it('evaluates multiple templates properly', () =>
    expect(ts('{foo}/{baz}', { foo: 'bar', baz: 123 })).toBe('bar/123'));
});
