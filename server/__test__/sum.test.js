const theSum = require("../sum")


test("Return the number", ()=>{

    expect(theSum(10)).toBe(10)
})



test("Return the number1 and number2", ()=>{

    expect(theSum(10,17)).toBe(27)
})



test("Return the number1 and number2 and number3", ()=>{

    expect(theSum(10,20,30)).toBe(60)
})



test("Return the 0", ()=>{

    expect(theSum()).toBe(0)
}) 