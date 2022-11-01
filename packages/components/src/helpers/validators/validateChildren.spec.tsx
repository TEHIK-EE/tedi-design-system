import Card from '../../card/card';
import CardContent from '../../card/card-content/card-content';
import CardHeader from '../../card/card-header/card-header';

describe('Validate Children', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // Mocked to test the warnings
    });
  });

  afterEach(() => {
    (console.error as any).mockRestore();
  });

  it('can be empty', () => {
    expect(<Card></Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('can have Card header, a valid component, as child', () => {
    expect(
      <Card>
        <CardHeader>A</CardHeader>
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('can have Card content, a valid component, as child', () => {
    expect(
      <Card>
        <CardContent>A</CardContent>
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('can have Card Header and Card Content as children', () => {
    expect(
      <Card>
        <CardHeader>A</CardHeader>
        <CardContent>B</CardContent>
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('can have Card Header and multiple Card Content elements as children', () => {
    expect(
      <Card>
        <CardHeader>A</CardHeader>
        <CardContent>B</CardContent>
        <CardContent>C</CardContent>
        <CardContent>D</CardContent>
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should allow custom components as children, that do not render invalid elements as children', () => {
    const DeepComponent = () => <CardHeader>A</CardHeader>;
    const DeeperComponent = () => <DeepComponent />;
    const EvenDeeperComponent = () => <DeeperComponent />;

    expect(
      <Card>
        <EvenDeeperComponent />
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should not allow HTML elements as deep direct-children, that do not render inside accepted customElement', () => {
    const DeepInvalidComponent = () => (
      <>
        <CardHeader>A</CardHeader>
        <span>A</span>
      </>
    );
    const DeeperInvalidComponent = () => <DeepInvalidComponent />;
    const EvenDeeperInvalidComponent = () => <DeeperInvalidComponent />;

    expect(
      <Card>
        <EvenDeeperInvalidComponent />
      </Card>
    ).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('cannot have other elements beside custom elements allowed', () => {
    // Fail
    expect(
      <Card>
        <CardContent>A</CardContent>
        <div>B</div>
      </Card>
    ).toBeTruthy();
    //TODO check exact error message - expect.stringContaining('div is not allowed as a child of this component')
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('does not allow strings as children', () => {
    // Fail
    expect(<Card>A</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('does not allow numbers as children', () => {
    // Fail
    expect(<Card>{1}</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('allows undefined as a child', () => {
    // Pass
    expect(<Card>{undefined}</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('allows null as a child', () => {
    // Pass
    expect(<Card>{null}</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('allows booleans as children', () => {
    // Pass
    expect(<Card>{true}</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should allow wrapper components/functions', () => {
    const passingWrapper = (): JSX.Element => {
      return <CardContent>A</CardContent>;
    };

    const passingFunction = () => {
      return passingWrapper();
    };

    // Pass
    expect(<Card>{passingFunction()}</Card>).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  // it('should disallow invalid elements inside wrapper components/functions', () => {
  //   const failingWrapper = () => <div>A</div>;
  //
  //   const failingFunction = () => {
  //     return failingWrapper();
  //   };
  //
  //   //TODO Should Fail, as it does in the application code, but for some reason it passes in Jest
  //   expect(<Card>{failingFunction()}</Card>).toBeTruthy();
  //   expect(console.error).toHaveBeenCalledTimes(1);
  // });
});
