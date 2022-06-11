
function add(a,b) {
    return a+b;
}
test("TESTING ADDITION ",()=>{
    expect(add(3,7)).toBe(10);
});
test("testing null", () =>{
    let n = null;
    let a = undefined ;
    let b = 7;

    expect(n).toBeNull();
    expect(a).toBeUndefined();
    expect(b).toBeDefined();

    /**
     * toBeGreaterThan
     * toBeGreaterThanOrEqual
     * toBeLessThan
     * toBeLessThanOrEqual
     */
})
function fetchData(cb){
setTimeout(() => {
    cb("adarsh");
}, 2000);
}
test("testing the call back function", (done) => {

    try {
        function callback(data) {
            expect(data).toEqual("adarsh");
           done(); // unless untill this line is called..test will wait
        }
    }
    catch (err) {
        done(err);
    }
    fetchData(callback);
});
/**
 * 1.fetchBack expects a call back function
 * 2. Callback function should have 1 arguments
 * 3. If we execute this function by passing callbak fn
 * after 2 seconds, call back function will be called with
 * the argument Vishwa
 *
 */ 