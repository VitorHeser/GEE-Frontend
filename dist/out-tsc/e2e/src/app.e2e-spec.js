import { BarcelonaPage } from './app.po';
describe('BarcelonaPage', () => {
    let page;
    beforeEach(() => {
        page = new BarcelonaPage();
    });
    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Barcelona!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map