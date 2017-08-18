import { CbaWebPage } from './app.po';

describe('cba-web App', () => {
  let page: CbaWebPage;

  beforeEach(() => {
    page = new CbaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
