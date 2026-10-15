import { act, renderHook } from 'services/testing/reactTestingLibraryWrapper';
import mockRouter from 'next-router-mock';
import { useDateFilter } from '../useDateFilter';

describe('useDateFilter', () => {
  const todayIso = new Date().toISOString().split('T')[0];

  beforeEach(() => {
    mockRouter.setCurrentUrl('/search');
  });

  it('defaults beginDate and beginDateContent to today when vigilance areas are enabled and no query params exist', () => {
    const { result } = renderHook(() => useDateFilter());

    expect(result.current.trekDateFilter.beginDate).toBe(todayIso);
    expect(result.current.trekDateFilter.endDate).toBe('');
    expect(result.current.contentDateFilter.beginDate).toBe(todayIso);
    expect(result.current.contentDateFilter.endDate).toBe('');
  });

  it('respects explicit beginDate and endDate query params if provided in URL', () => {
    mockRouter.setCurrentUrl('/search?beginDate=2026-11-01&endDate=2026-11-15');

    const { result } = renderHook(() => useDateFilter());

    expect(result.current.trekDateFilter.beginDate).toBe('2026-11-01');
    expect(result.current.trekDateFilter.endDate).toBe('2026-11-15');
  });

  it('allows updating trekDateFilter and contentDateFilter', () => {
    const { result } = renderHook(() => useDateFilter());

    act(() => {
      result.current.setTrekDateFilter({ beginDate: '2026-12-01', endDate: '2026-12-31' });
    });

    expect(result.current.trekDateFilter.beginDate).toBe('2026-12-01');
    expect(result.current.trekDateFilter.endDate).toBe('2026-12-31');
  });
});
