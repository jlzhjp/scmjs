import { createTokenStream } from "./lexer";

const tokenStream = createTokenStream("(define (display) (1.1 \"string\"))")
for (const tok of tokenStream) {
    console.log(JSON.stringify(tok))
}