const ops = {
  ">": function (var1, var2) { return var1 > var2; },
  "<": function (var1, var2) { return var1 < var2; },
  ">=": function (var1, var2) { return var1 >= var2; },
  "<=": function (var1, var2) { return var1 <= var2; },
  "==": function (var1, var2) { return var1 == var2; },
  "===": function (var1, var2) { return var1 === var2; },
  "!=": function (var1, var2) { return var1 != var2; },
  "!==": function (var1, var2) { return var1 !== var2; },
}

const operator = (var1, var2, op) => {
  return ops[op](var1, var2)
}

const parseLogic = (price, input) => {
  const regex = /([!=]==|[<>!=]=|[<>]){0,1}\s*(\d+)\s*(&{1,2}|\|{1,2}){0,1}/gm;
  let m;

  while ((m = regex.exec(input)) !== null) {
    // Avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const comparison = m[1] || "==="
    const num = Number(m[2])
    const logical = m[3]
    const test = ops[comparison](price, num)

    if (logical === "&&" || logical === "&") {
      if (!test) return test
    } else if (logical === "||" || logical === "|") {
      if (test) return test
    } else {
      return test
    }
  }
}

export {
  operator,
  parseLogic
}