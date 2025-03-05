function runBrainfuck() {
    let code = document.getElementById("bfCode").value;
    let output = "";
    let tape = new Uint8Array(30000);
    let ptr = 0;
    let loopStack = [];
    let codePtr = 0;

    while (codePtr < code.length) {
        let cmd = code[codePtr];
        switch (cmd) {
            case '>': ptr++; break;
            case '<': ptr--; break;
            case '+': tape[ptr]++; break;
            case '-': tape[ptr]--; break;
            case '.': output += String.fromCharCode(tape[ptr]); break;
            case ',': /* handling here */ break;
            case '[':
                if (tape[ptr] === 0) {
                    let depth = 1;
                    while (depth > 0) {
                        codePtr++;
                        if (code[codePtr] === '[') depth++;
                        else if (code[codePtr] === ']') depth--;
                    }
                } else {
                    loopStack.push(codePtr);
                }
                break;
            case ']':
                if (tape[ptr] !== 0) {
                    codePtr = loopStack[loopStack.length - 1] - 1;
                } else {
                    loopStack.pop();
                }
                break;
        }
        codePtr++;
    }
    document.getElementById("output").innerText = "Output: " + output;
}
