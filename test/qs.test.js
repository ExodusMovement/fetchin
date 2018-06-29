import { qs } from '../src';

describe('qs', () => {
  it('works on empty strings', () => expect(qs({})).toBe(''));

  it('works with a single empty query', () =>
    expect(qs({ foo: '' })).toBe('foo='));

  it('works with a single query', () =>
    expect(qs({ foo: 'bar' })).toBe('foo=bar'));

  it('works with multiple queries', () =>
    expect(qs({ foo: 'bar', baz: 123 })).toBe('foo=bar&baz=123'));
});
