import { getElapsedTime } from './time';

describe('When time is 0', () => { 
  it('should return 0:00:00', () => {
    const result = getElapsedTime(0)

    expect(result).toBe('0:00:00');
  });
 });

describe('When time is greater than 0', () => { 
  it('should render 1 second when 1000ms has elapsed', () => {
    const result = getElapsedTime(1000)

    expect(result).toBe('0:00:01');
  });
  
  it('should render 1 minute and 1 second when 61000ms has elapsed', () => {
    const result = getElapsedTime(61000)

    expect(result).toBe('0:01:01');
  });
  
  it('should render 1 hour 1 minute and 1 second when 3661000ms has elapsed', () => {
    const result = getElapsedTime(3661000)

    expect(result).toBe('1:01:01');
  });
})