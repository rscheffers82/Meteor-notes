import expect from 'expect';

const square = (a) => a * a;

describe('Square', ()=> {
  it('should square a number', function() {
    const res = square(5);

    expect(res).toBe(25);
    }
  });
});
