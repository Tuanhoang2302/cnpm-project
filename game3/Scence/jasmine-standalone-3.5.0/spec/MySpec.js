function Calculator() {
    this.add = function(a, b) { return a + b };
    this.minus = function(a, b) { return a - b };
    this.multiply = function(a, b) { return a * b };
    this.divide = function(a, b) { return a / b };
}
describe("cộng trừ", function() {
    var cal = new Calculator();
    it("Một với một là hai", function() {
        expect(3).not.toBe(cal.add(1, 1));
    });

});
describe("nhân chia", function() {
    var cal = new Calculator();
    it("năm nhân hai bằng mười", function() {
        expect(10).toBe(cal.multiply(5, 2));
    });
});